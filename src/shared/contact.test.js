import { beforeEach, describe, expect, it, vi } from 'vitest';
import { normalize, validate, emptyValues } from './contact.js';
import { buildEmail, escapeHtml, handleContact, resetRateLimit } from './contact-handler.js';

const env = {
  CONTACT_TO_MC: 'nalin@prismconsulting.org',
  CONTACT_TO_CM: 'renu@prismconsulting.org',
  CONTACT_FROM_EMAIL: 'Prism Consulting <forms@prismconsulting.org>',
  RESEND_API_KEY: 'test_key'
};
const good = { practice: 'mc', name: 'Jane  Doe', company: 'Acme', email: 'jane@acme.com', code: '+971', phone: '50 123 4567', enquiry: 'Project Structuring', message: 'Hello\r\nWe need help <b>now</b>', website: '' };

const req = (body, { method = 'POST', ct = 'application/json', origin } = {}) => new Request('https://prismconsulting.org/api/contact', {
  method,
  headers: { 'content-type': ct, ...(origin ? { origin } : {}) },
  body: method === 'GET' ? undefined : typeof body === 'string' ? body : JSON.stringify(body)
});
const okFetch = () => vi.fn(async () => new Response('{}', { status: 200 }));

beforeEach(() => resetRateLimit());

describe('validation', () => {
  it('accepts a complete enquiry', () => expect(validate(good, 'mc')).toEqual({}));
  it('requires name, email, phone, enquiry and message; company is optional', () => {
    expect(Object.keys(validate({ ...emptyValues() }, 'mc')).sort()).toEqual(['email', 'enquiry', 'message', 'name', 'phone']);
  });
  it('rejects malformed email and phone', () => {
    expect(validate({ ...good, email: 'jane@acme' }, 'mc').email).toBeTruthy();
    expect(validate({ ...good, phone: 'call me' }, 'mc').phone).toBeTruthy();
  });
  it('only allows enquiry options for the chosen practice', () => {
    expect(validate({ ...good, enquiry: 'Talk / Lecture / Webinar' }, 'mc').enquiry).toBeTruthy();
    expect(validate({ ...good, enquiry: 'Talk / Lecture / Webinar' }, 'cm').enquiry).toBeUndefined();
  });
  it('normalises whitespace and drops unknown fields', () => {
    const v = normalize({ ...good, name: ' Bob\r\nBcc: x@y.com ', to: 'evil@x.com' });
    expect(v.name).toBe('Bob Bcc: x@y.com');
    expect(v).not.toHaveProperty('to');
  });
});

describe('email content', () => {
  it('includes every field and escapes HTML', () => {
    const mail = buildEmail('mc', normalize(good));
    expect(mail.subject).toBe('New business enquiry — Jane Doe');
    for (const s of ['Jane Doe', 'Acme', 'jane@acme.com', '+971 50 123 4567', 'Project Structuring', 'Management Consulting']) expect(mail.text).toContain(s);
    expect(mail.html).toContain('&lt;b&gt;now&lt;/b&gt;');
    expect(mail.html).not.toContain('<b>now</b>');
    expect(escapeHtml(`<"'&>`)).toBe('&lt;&quot;&#39;&amp;&gt;');
  });
});

describe('handleContact', () => {
  it('sends Management Consulting enquiries to CONTACT_TO_MC with reply-to', async () => {
    const f = okFetch();
    const res = await handleContact(req(good), { env, ip: '1.1.1.1', fetchImpl: f });
    expect(res.status).toBe(200);
    const sent = JSON.parse(f.mock.calls[0][1].body);
    expect(sent.to).toEqual(['nalin@prismconsulting.org']);
    expect(sent.reply_to).toBe('jane@acme.com');
    expect(sent.from).toBe(env.CONTACT_FROM_EMAIL);
  });
  it('sends Coaching & Mentoring enquiries to CONTACT_TO_CM', async () => {
    const f = okFetch();
    await handleContact(req({ ...good, practice: 'cm', enquiry: 'Other' }), { env, ip: '1.1.1.2', fetchImpl: f });
    expect(JSON.parse(f.mock.calls[0][1].body).to).toEqual(['renu@prismconsulting.org']);
  });
  it('ignores recipient/sender fields from the browser', async () => {
    const f = okFetch();
    await handleContact(req({ ...good, to: 'evil@x.com', from: 'evil@x.com' }), { env, ip: '1.1.1.3', fetchImpl: f });
    const sent = JSON.parse(f.mock.calls[0][1].body);
    expect(sent.to).toEqual(['nalin@prismconsulting.org']);
    expect(sent.from).toBe(env.CONTACT_FROM_EMAIL);
  });
  it('returns 422 with field errors', async () => {
    const res = await handleContact(req({ practice: 'mc' }), { env, ip: '1.1.1.4', fetchImpl: okFetch() });
    expect(res.status).toBe(422);
    expect((await res.json()).fieldErrors.name).toBeTruthy();
  });
  it('silently accepts honeypot submissions without sending', async () => {
    const f = okFetch();
    const res = await handleContact(req({ ...good, website: 'http://spam' }), { env, ip: '1.1.1.5', fetchImpl: f });
    expect(res.status).toBe(200);
    expect(f).not.toHaveBeenCalled();
  });
  it.each([
    ['GET', req(null, { method: 'GET' }), 405],
    ['form-encoded', req('a=1', { ct: 'application/x-www-form-urlencoded' }), 415],
    ['malformed JSON', req('{oops'), 400],
    ['unknown practice', req({ ...good, practice: 'xx' }), 400],
    ['oversized body', req({ ...good, message: 'x'.repeat(25000) }), 413]
  ])('rejects %s', async (_n, r, status) => {
    expect((await handleContact(r, { env, fetchImpl: okFetch() })).status).toBe(status);
  });
  it('rejects other origins when ALLOWED_ORIGIN is set', async () => {
    const res = await handleContact(req(good, { origin: 'https://evil.com' }), { env: { ...env, ALLOWED_ORIGIN: 'https://prismconsulting.org' }, fetchImpl: okFetch() });
    expect(res.status).toBe(403);
  });
  it('rate limits after 5 messages per IP', async () => {
    let res;
    for (let i = 0; i < 6; i++) res = await handleContact(req(good), { env, ip: '9.9.9.9', fetchImpl: okFetch() });
    expect(res.status).toBe(429);
  });
  it('reports provider failure instead of false success', async () => {
    const res = await handleContact(req(good), { env, ip: '2.2.2.2', fetchImpl: async () => new Response('{}', { status: 500 }) });
    expect(res.status).toBe(502);
    expect((await res.json()).ok).toBe(false);
  });
  it('fails safely when configuration is missing', async () => {
    const res = await handleContact(req(good), { env: {}, ip: '2.2.2.3', fetchImpl: okFetch() });
    expect(res.status).toBe(500);
  });
  it('enforces reCAPTCHA when RECAPTCHA_SECRET is set', async () => {
    const low = async (url) => url.includes('recaptcha') ? new Response(JSON.stringify({ success: true, score: 0.2, action: 'contact' })) : new Response('{}');
    const high = async (url) => url.includes('recaptcha') ? new Response(JSON.stringify({ success: true, score: 0.9, action: 'contact' })) : new Response('{}');
    const e = { ...env, RECAPTCHA_SECRET: 's' };
    expect((await handleContact(req({ ...good, recaptchaToken: 't' }), { env: e, ip: '3.3.3.1', fetchImpl: low })).status).toBe(400);
    expect((await handleContact(req({ ...good, recaptchaToken: 't' }), { env: e, ip: '3.3.3.2', fetchImpl: high })).status).toBe(200);
  });
});
