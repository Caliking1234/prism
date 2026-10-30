// Server-side contact endpoint logic. Runs in the Vercel or Netlify function (never in the browser bundle).
import { PRACTICES, FIELDS, LABELS, normalize, validate } from './contact.js';

const MAX_BODY_BYTES = 20_000;
const RATE_MAX = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map();

/** Best-effort per-instance rate limit. Pair with Netlify's platform rate limiting for stronger protection. */
export function rateLimited(ip, now = Date.now()) {
  const recent = (hits.get(ip) || []).filter(t => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}
export function resetRateLimit() { hits.clear(); }

export const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function buildEmail(practice, v) {
  const p = PRACTICES[practice];
  // Practice goes first so enquiries stay easy to tell apart when both forms share one inbox.
  const subject = `[${p.label}] New business enquiry — ${v.name}`.slice(0, 200);
  const rows = FIELDS.filter(k => k !== 'code').map(k => [LABELS[k], k === 'phone' ? `${v.code} ${v.phone}` : (v[k] || '—')]);
  rows.unshift(['Practice', p.label]);
  const text = rows.map(([l, val]) => `${l}: ${val}`).join('\n') + '\n\nSent from the contact form on prismconsulting.org';
  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#1E2A36">
<h2 style="margin:0 0 16px">New enquiry — ${escapeHtml(p.label)}</h2>
<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;max-width:640px">
${rows.map(([l, val]) => `<tr><th align="left" valign="top" style="border-bottom:1px solid #E3D8C8;width:180px">${escapeHtml(l)}</th><td style="border-bottom:1px solid #E3D8C8;white-space:pre-wrap">${escapeHtml(val)}</td></tr>`).join('\n')}
</table>
<p style="color:#4A5866;font-size:13px">Sent from the contact form on prismconsulting.org. Reply to this email to answer the enquirer directly.</p>
</body></html>`;
  return { subject, text, html };
}

const json = (status, body, headers = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers }
});

async function verifyRecaptcha(token, env, fetchImpl) {
  if (typeof token !== 'string' || !token) return false;
  const res = await fetchImpl('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret: env.RECAPTCHA_SECRET, response: token }).toString()
  });
  if (!res.ok) return false;
  const data = await res.json();
  const min = Number(env.RECAPTCHA_MIN_SCORE || 0.5);
  return !!data.success && (data.action === undefined || data.action === 'contact') && (data.score === undefined || data.score >= min);
}

/**
 * @param {Request} req
 * @typedef {{ from: string, to: string[], replyTo: string, subject: string, text: string, html: string }} OutgoingMail
 * @param {{ env: Record<string, string | undefined>, ip?: string, fetchImpl?: typeof fetch, now?: number,
 *   sendMail?: (mail: OutgoingMail) => Promise<void> }} ctx
 *   sendMail: optional transport (e.g. SMTP). It must throw on failure. Without it, mail goes through Resend.
 */
export async function handleContact(req, { env, ip, fetchImpl = fetch, now = Date.now(), sendMail }) {
  const requestId = (globalThis.crypto?.randomUUID?.() || String(now)).slice(0, 8);
  const fail = (status, error, extra = {}) => json(status, { ok: false, error, requestId, ...extra });

  if (req.method !== 'POST') return json(405, { ok: false, error: 'Method not allowed.', requestId }, { allow: 'POST' });
  if (!(req.headers.get('content-type') || '').toLowerCase().includes('application/json')) return fail(415, 'Send the form as JSON.');
  if (env.ALLOWED_ORIGIN) {
    const origin = req.headers.get('origin');
    const allowed = env.ALLOWED_ORIGIN.split(',').map(s => s.trim());
    if (origin && !allowed.includes(origin)) return fail(403, 'This origin is not allowed.');
  }

  const raw = await req.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return fail(413, 'Your message is too long.');
  let body;
  try { body = JSON.parse(raw); } catch { return fail(400, 'The form data could not be read.'); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return fail(400, 'The form data could not be read.');

  const practice = body.practice;
  if (!Object.prototype.hasOwnProperty.call(PRACTICES, practice)) return fail(400, 'Unknown practice.');

  // Honeypot: bots fill the hidden "website" field. Pretend success, send nothing.
  if (typeof body.website === 'string' && body.website.trim()) {
    console.info(`[contact ${requestId}] honeypot`);
    return json(200, { ok: true, requestId });
  }

  if (ip && rateLimited(ip, now)) return fail(429, 'Too many messages. Please try again in a few minutes.');

  const values = normalize(body);
  const fieldErrors = validate(values, practice);
  if (Object.keys(fieldErrors).length) return fail(422, 'Please correct the highlighted fields.', { fieldErrors });

  if (env.RECAPTCHA_SECRET) {
    let human = false;
    try { human = await verifyRecaptcha(body.recaptchaToken, env, fetchImpl); } catch { human = false; }
    if (!human) {
      console.warn(`[contact ${requestId}] recaptcha rejected`);
      return fail(400, 'We could not verify your submission. Please try again.');
    }
  }

  const to = (practice === 'mc' ? env.CONTACT_TO_MC : env.CONTACT_TO_CM) || '';
  const recipients = to.split(',').map(s => s.trim()).filter(Boolean);
  if (!recipients.length || !env.CONTACT_FROM_EMAIL || (!sendMail && !env.RESEND_API_KEY)) {
    console.error(`[contact ${requestId}] missing configuration`);
    return fail(500, 'The form is temporarily unavailable. Please email us directly.');
  }

  const mail = buildEmail(practice, values);
  if (sendMail) {
    try {
      await sendMail({ from: env.CONTACT_FROM_EMAIL, to: recipients, replyTo: values.email, ...mail });
    } catch (err) {
      console.error(`[contact ${requestId}] smtp failed: ${err?.code || err?.responseCode || 'error'}`);
      return fail(502, 'Your message could not be sent. Please try again shortly.');
    }
    console.info(`[contact ${requestId}] sent practice=${practice} via smtp`);
    return json(200, { ok: true, requestId });
  }

  try {
    const res = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from: env.CONTACT_FROM_EMAIL, to: recipients, reply_to: values.email, subject: mail.subject, text: mail.text, html: mail.html })
    });
    if (!res.ok) {
      console.error(`[contact ${requestId}] provider status ${res.status}`);
      return fail(502, 'Your message could not be sent. Please try again shortly.');
    }
  } catch {
    console.error(`[contact ${requestId}] provider unreachable`);
    return fail(502, 'Your message could not be sent. Please try again shortly.');
  }

  console.info(`[contact ${requestId}] sent practice=${practice}`);
  return json(200, { ok: true, requestId });
}
