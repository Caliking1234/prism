// Vercel Function for POST /api/contact. Shares all validation and spam checks with the Netlify function
// through src/shared/contact-handler.js. With SMTP_USER + SMTP_PASS set, mail goes out through Gmail SMTP;
// otherwise it falls back to Resend (RESEND_API_KEY), exactly like the Netlify version.
import nodemailer from 'nodemailer';
import { handleContact } from '../src/shared/contact-handler.js';

let transport;
function smtp(env) {
  transport ??= nodemailer.createTransport({
    host: env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(env.SMTP_PORT || 465),
    secure: Number(env.SMTP_PORT || 465) === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000
  });
  return transport;
}

function handle(request) {
  const env = { ...process.env };
  const useSmtp = !!(env.SMTP_USER && env.SMTP_PASS);
  // Gmail only sends as the signed-in account, so default the From to that mailbox.
  if (useSmtp && !env.CONTACT_FROM_EMAIL) env.CONTACT_FROM_EMAIL = `Prism Consulting <${env.SMTP_USER}>`;
  const ip = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || undefined;
  const sendMail = useSmtp
    ? async m => { await smtp(env).sendMail({ from: m.from, to: m.to, replyTo: m.replyTo, subject: m.subject, text: m.text, html: m.html }); }
    : undefined;
  return handleContact(request, { env, ip, sendMail });
}

export const POST = handle;
// Other methods reach the shared handler, which answers 405.
export const GET = handle;
