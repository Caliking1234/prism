# Prism Consulting: launch to-do list

This lists everything still needed to take the new site from the delivered code to a live site at prismconsulting.org. The owner tag on each item shows who usually does it.

- **[Client]** Nalin / Renu: content, approvals, accounts
- **[Dev]** Whoever runs the code: build, deploy, configuration
- **[DNS]** Whoever controls the domain's DNS: often the same person as Dev

---

## 1. Decisions and content from the client  [Client]

- [ ] **Homepage hero design.** The code ships **A (landscape hero)**. Direction **B (split practices)** is in the prototype (`Prism Consulting Site v2.dc.html`). Confirm which one; switching to B is a small change in `src/pages/HomePage.tsx`.
- [ ] **Fonts.** The brief says "same as PGS". Confirm the PGS font names. Placeholders are Newsreader and Figtree (`index.html`, `src/styles/tokens.css`).
- [ ] **Partner logos.** Supply Watt and Precision Legal logo files and confirm they may be used.
  - Save them as `public/assets/partners/watt.png` and `public/assets/partners/precision-legal.png`.
- [ ] **Associate photos** (optional). The PGS Our Experts page has photos. Supply them if wanted; the cards currently show initials.
- [ ] **Resolve copy conflicts in the brief**, which are currently kept as written:
  - [ ] Nalin: "over 41 years" (About and profile) vs "over 40 years" (team summary)
  - [ ] Renu: "over 13 years" (About) vs "14 years" (team summary)
  - [ ] How It Works (from PGS): "respond within 48 hours" vs the contact page's "within 2 working days"
- [ ] **Confirm the one typo fix.** "…fulfilment at work through ." now ends "…fulfilment at work."
- [ ] **Confirm form recipients.** Management Consulting goes to nalin@prismconsulting.org and Coaching & Mentoring to renu@prismconsulting.org. Should anyone else get a copy, such as an archive mailbox?
- [ ] **Submission backup.** The brief asked for submissions to be stored in the WordPress dashboard, but there is no WordPress any more. Choose an option:
  - (a) Add an archive email address as a second recipient. Recommended; no extra cost.
  - (b) Netlify Forms backup.
  - (c) None.
- [ ] **reCAPTCHA v3.** The brief requests it. Confirm, and create the keys at google.com/recaptcha/admin (v3, domain prismconsulting.org).
- [ ] **Privacy wording.** Is a privacy notice or policy link needed under the forms? None is included because no policy text was supplied.
- [ ] **Analytics and cookies.** Does the current site use Google Analytics or a cookie banner that must carry over? None is included.
- [ ] **Social share image.** Approve one, or keep the default (`banner-prism.png`).
- [ ] **New logo on PGS.** The brief notes the same new logo must also go on the Prism Global Services site. That is a separate site and not part of this project.

## 2. Accounts and access  [Client]

- [ ] A **GitHub** (or GitLab) account or repository to hold the code.
- [ ] A **Netlify** account. The free tier is enough to start.
- [ ] A **Resend** account for sending email. The free tier is 3,000 emails a month.
- [ ] Login or contact details for the **domain registrar / DNS host** of prismconsulting.org.
- [ ] Access to the **current WordPress hosting**, to take a backup before switching.
- [ ] **Google Search Console** access for prismconsulting.org.

## 3. Local setup and checks  [Dev]

- [ ] Install Node 20+ and run `npm ci`.
- [ ] Run `npm test`. All contact-form tests should pass.
- [ ] Run `npm run build`. Type-check, build and pre-render should finish with no errors.
- [ ] Install the Netlify CLI (`npm i -g netlify-cli`), copy `.env.example` to `.env`, fill in test values, then run `npm run dev:netlify`.
- [ ] Click through every page on desktop and on a phone-sized window:
  - Home, About Us, Management Consulting, Coaching & Mentoring, Our Team, Affiliates, Associates, Contact Us.
  - Also an unknown URL, which should show the 404 page.
- [ ] Check that both menus work, including the dropdowns, the mobile menu and Escape to close.
- [ ] Check that these deep links scroll to the right place: `/our-team/#nalin`, `/our-team/#renu`, `/contact-us/#contact-nalin`, `/contact-us/#contact-renu`.
- [ ] Check reduced motion. Turn on "Reduce motion" in the OS; the site should show no animations and all content.
- [ ] Add the partner logos and fonts from section 1 once supplied.

## 4. Email delivery setup  [Dev + DNS]

- [ ] In Resend, add the domain **prismconsulting.org** and copy the DNS records it shows (SPF and DKIM, sometimes a return-path CNAME).
- [ ] Add those records at the DNS host. **Do not change or delete the existing MX records**, or existing email will stop working.
- [ ] Wait until Resend shows the domain as **Verified**.
- [ ] Check that a DMARC record exists, or add one that fits the domain's email policy. If unsure, start with `p=none`.
- [ ] Create a Resend **API key** with sending access only.

## 5. Netlify deployment  [Dev]

- [ ] Push the code to the Git repository.
- [ ] In Netlify, create a new site from the repo. The build settings come from `netlify.toml`: `npm run build`, publish folder `dist`.
- [ ] Under Site configuration → Environment variables, add:
  - `CONTACT_TO_MC` = `nalin@prismconsulting.org`
  - `CONTACT_TO_CM` = `renu@prismconsulting.org`
  - `CONTACT_FROM_EMAIL` = `Prism Consulting <forms@prismconsulting.org>` (must be on the verified domain)
  - `RESEND_API_KEY` = the key from step 4
  - `ALLOWED_ORIGIN` = `https://prismconsulting.org` (add the Netlify preview URL while testing, comma-separated)
  - If using reCAPTCHA: `VITE_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET`, `RECAPTCHA_MIN_SCORE=0.5`
- [ ] Deploy, and open the Netlify preview URL.
- [ ] Optional: enable Netlify's rate limiting on `/api/contact` for stronger spam protection.

## 6. Contact form acceptance tests (on the preview)  [Dev + Client]

- [ ] Submit the **Management Consulting** form with real details. Nalin should receive an email:
  - [ ] Subject reads "New business enquiry — {name}"
  - [ ] All fields are present: name, company, email, phone with country code, nature of enquiry, message
  - [ ] Clicking Reply goes to the visitor's email address
- [ ] Submit the **Coaching & Mentoring** form. Renu should receive the same.
- [ ] Check spam and junk folders in both inboxes. If emails land there, re-check SPF, DKIM and DMARC.
- [ ] Submit with empty fields. Errors should show next to each field, and the first error should get focus.
- [ ] Submit with a bad email or phone. You should see a clear error message.
- [ ] Double-click Send. Only one email should arrive.
- [ ] The success message should read: "Thank you for contacting Prism Consulting. We will get back to you within 2 working days."
- [ ] Temporarily remove `RESEND_API_KEY` and submit. The form should show a "wasn't sent" error, not a success. Put the key back afterwards.
- [ ] **Nalin and Renu confirm in writing** that the test emails arrived.

## 7. Go-live  [Dev + DNS]

- [ ] **Back up WordPress** (files and database) and keep the old hosting active for now.
- [ ] Export or screenshot the current DNS records before changing anything.
- [ ] In Netlify → Domain management, add `prismconsulting.org` and `www.prismconsulting.org`, and pick one as the main address.
- [ ] Update the web DNS records (A/ALIAS for the root domain, CNAME for www) as Netlify instructs. **Leave the MX and email TXT records alone.**
- [ ] Wait for HTTPS to turn on in Netlify. It is automatic.
- [ ] On the live domain, check:
  - [ ] Every page loads directly and after a refresh
  - [ ] `/profile/` redirects to `/our-team/`
  - [ ] An unknown URL shows the 404 page with a real 404 status
  - [ ] `/sitemap.xml` and `/robots.txt` load
  - [ ] Both forms deliver again on the live domain
  - [ ] Normal email to and from @prismconsulting.org still works

## 8. After launch  [Dev / Client]

- [ ] In Google Search Console, submit `https://prismconsulting.org/sitemap.xml` and inspect the key URLs.
- [ ] Watch Search Console for 404s or indexing problems for 2–4 weeks.
- [ ] Watch Netlify Function logs for contact errors. They show request IDs only, no personal data.
- [ ] After 2–4 stable weeks, cancel the old WordPress hosting, keeping the backup.
- [ ] Update the copyright year when needed. It is fixed at "© 2026" as written in the brief.

## Rollback plan

If something serious breaks after go-live:
1. Point the web DNS records back to the old WordPress host using the records exported in step 7.
2. The email records were never changed, so email keeps working throughout.
3. Fix the issue on a Netlify preview, then switch DNS again.

---

### Where things are in the code

| What | File |
|---|---|
| Page copy (services, steps, associates) | `src/content/site.ts` |
| Page titles and descriptions (SEO) | `src/content/routes.json` |
| Menu and external links | `src/content/nav.ts` |
| Team profiles | `src/pages/TeamPage.tsx` |
| Form fields, options and validation | `src/shared/contact.js` |
| Email sending (server) | `src/shared/contact-handler.js`, `netlify/functions/contact.mjs` |
| Colours, fonts, spacing | `src/styles/tokens.css` |
| Redirects and headers | `netlify.toml` |
