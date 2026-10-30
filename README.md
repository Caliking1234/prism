# Prism Consulting website

> **Launch steps:** see [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) for everything still to do before go-live.

React + TypeScript + Vite rebuild of prismconsulting.org, following the client brief ("Prism Consulting Website – Brief"). It has two contact forms, one for Management Consulting and one for Coaching & Mentoring. Each sends its email through a Netlify Function to its own recipient.

## Quick start

```bash
npm ci
npm test               # contact validation + endpoint tests (Vitest)
npm run dev:netlify    # site + /api/contact function together (needs: npm i -g netlify-cli)
npm run build          # type-check, build, pre-render per-route HTML + sitemap into dist/
```

`npm run dev` runs the site and the contact endpoint together: Vite serves `/api/contact` from `api/contact.js`, using server settings from `.env` (copy `.env.example`).

## Routes

| Path | Page |
|---|---|
| `/` | Home: hero, About Us, Our Services |
| `/about-us/` | About Us |
| `/our-services/management-consulting/` | Management Consulting |
| `/our-services/coaching-mentoring/` | Coaching & Mentoring, plus How It Works, Why Us and About Us from PGS |
| `/our-team/` (`#nalin`, `#renu`) | Our Team, with expandable full profiles |
| `/affiliate/` | Affiliates (Watt, Precision Legal). Legacy URL kept |
| `/associates/` | Associates, copied from the PGS Our Experts page |
| `/contact-us/` (`#contact-nalin`, `#contact-renu`) | Two contact forms. Legacy URL kept |
| `/profile/` | 301 redirect to `/our-team/` (vercel.json / netlify.toml) |
| anything else | Branded 404 with a real 404 status |

## Contact form

The endpoint is `POST /api/contact`. On Vercel it is `api/contact.js`; on Netlify it is `netlify/functions/contact.mjs`. Both call `src/shared/contact-handler.js`, so validation and spam checks are identical.

Fields follow the brief: Full name\*, Company / organisation, Email\*, Phone\* (country code, default +971), Nature of enquiry\* (options differ per practice), Message\*.

| | Management Consulting | Coaching & Mentoring |
|---|---|---|
| Recipient env var | `CONTACT_TO_MC` (nalin@prismconsulting.org) | `CONTACT_TO_CM` (renu@prismconsulting.org) |
| Subject | `[Management Consulting] New business enquiry — {Full name}` | `[Coaching & Mentoring] New business enquiry — {Full name}` |
| Success message | "Thank you for contacting Prism Consulting. We will get back to you within 2 working days." | same |

The browser and the server use the same validation rules (`src/shared/contact.js`).

**Security**
- Recipients come only from server env vars, and any recipient sent from the browser is ignored.
- The `From` address is your verified sender; the visitor's email goes in `Reply-To`.
- HTML in the email is escaped, and a plain-text version is always included.
- Hidden honeypot field. Bots get a fake success and nothing is sent.
- Per-IP rate limit of 5 messages per 10 minutes.
- Optional reCAPTCHA v3, enabled by setting `VITE_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET`.
- Body size limit, JSON-only, POST-only, optional `ALLOWED_ORIGIN` check.
- Logs record a request ID and outcome only, never message contents.

### Set up email delivery on Vercel (Gmail SMTP — current setup)

Both forms currently deliver to `prismcounselling@gmail.com`. The subject starts with the practice name so the two are easy to tell apart.

1. On the Google account `prismcounselling@gmail.com`, turn on **2-Step Verification**, then create an **App password** (Google Account → Security → App passwords). Copy the 16-character password.
2. In Vercel → Project → Settings → Environment Variables (Production and Preview), add:
   - `SMTP_USER` = `prismcounselling@gmail.com`
   - `SMTP_PASS` = the app password (no spaces)
   - `CONTACT_TO_MC` = `prismcounselling@gmail.com`
   - `CONTACT_TO_CM` = `prismcounselling@gmail.com`
   - Optional: `ALLOWED_ORIGIN` = your live origin(s), comma-separated. Leave it unset while testing on `*.vercel.app` preview URLs.
3. Redeploy (env var changes only apply to new deployments), then send one test from **each** form.

The email comes from `Prism Consulting <prismcounselling@gmail.com>`; Reply goes to the visitor. A personal Gmail account can send roughly 500 messages a day, far above what a contact form needs. To move to separate inboxes later, change `CONTACT_TO_MC` / `CONTACT_TO_CM` only. To switch to Resend, remove `SMTP_USER`/`SMTP_PASS` and follow the Resend steps below.

Local test: copy `.env.example` to `.env`, put the app password in `SMTP_PASS`, then `npm run dev`. Vite serves `/api/contact` from `api/contact.js` itself, so no Vercel or Netlify CLI is needed. Restart `npm run dev` after editing `.env`.

### Set up email delivery (Resend)

1. Create a Resend account and add the domain `prismconsulting.org`. Add the SPF and DKIM DNS records it shows, at your DNS host. **Don't change your MX records.**
2. Create an API key.
3. In Netlify, go to Site configuration → Environment variables and add `CONTACT_TO_MC`, `CONTACT_TO_CM`, `CONTACT_FROM_EMAIL` (e.g. `Prism Consulting <forms@prismconsulting.org>`) and `RESEND_API_KEY`. See `.env.example`.
4. Deploy, then send one test from **each** form and confirm with Nalin and Renu that it arrived in the right inbox (check spam too).

The brief mentions SMTP / WP Mail SMTP and storing submissions in the WordPress dashboard. This site has no WordPress, so delivery uses Resend's API instead. If you need a backup copy of submissions, add a second recipient such as an archive mailbox to the env var (comma-separated).

## SEO

- `scripts/prerender-meta.mjs` writes `dist/<route>/index.html` with a unique title, description, canonical and Open Graph tags for each route. It also writes `404.html` and `sitemap.xml`.
- Page content itself renders on the client. If full static HTML content becomes a requirement, switch to a Vite SSG plugin.
- `public/robots.txt` points to the sitemap.

## Assets to supply

- `public/assets/partners/watt.png` and `precision-legal.png`. Until these are added, the partner name shows instead.
- Fonts: the brief says "same as PGS". `index.html` and `src/styles/tokens.css` use Newsreader and Figtree as placeholders. Replace them once the PGS fonts are confirmed.

## Open content points from the brief

- Nalin is described as having "41 years" in About and his profile, but "over 40 years" in the team summary.
- Renu is described as having "13 years" in About, but "14 years" in the team summary.
- How It Works (copied from PGS) says "48 hours", while the contact page says "2 working days".
- "…find greater fulfilment at work through ." had a dangling "through", which was removed.

## Deploy

On Netlify, connect the repo. The build command and publish dir come from `netlify.toml` (`npm run build` → `dist`). Set the env vars, deploy a preview, test both forms, then point DNS at Netlify. Keep the old WordPress site and its backup until the new one is verified.
