// Shared by the browser form and the server function, so both apply identical rules.

/** @typedef {'mc' | 'cm'} Practice */
/** @typedef {{ name: string, company: string, email: string, code: string, phone: string, enquiry: string, message: string }} ContactValues */

export const PRACTICES = {
  mc: {
    label: 'Management Consulting',
    expert: 'Nalin Sachdeva',
    enquiries: ['Project Concept & Development', 'Project Structuring', 'Project & Corporate financing', 'Other']
  },
  cm: {
    label: 'Coaching & Mentoring',
    expert: 'Renu Sachdeva',
    enquiries: ['Individual Coaching or Mentoring', 'Group / Team Coaching or Mentoring', 'Executive Development Programme', 'Talk / Lecture / Webinar', 'Other']
  }
};

export const FIELDS = /** @type {const} */ (['name', 'company', 'email', 'code', 'phone', 'enquiry', 'message']);

export const LABELS = {
  name: 'Full name',
  company: 'Company / organisation',
  email: 'Email',
  code: 'Country code',
  phone: 'Phone',
  enquiry: 'Nature of enquiry',
  message: 'Message'
};

export const LIMITS = { name: 120, company: 160, email: 254, code: 5, phone: 20, enquiry: 80, message: 5000 };

export const COUNTRY_CODES = [
  ['+971', 'UAE'], ['+44', 'UK'], ['+91', 'India'], ['+65', 'Singapore'], ['+1', 'US/CA'], ['+966', 'Saudi'],
  ['+974', 'Qatar'], ['+968', 'Oman'], ['+973', 'Bahrain'], ['+965', 'Kuwait'], ['+60', 'Malaysia'],
  ['+86', 'China'], ['+49', 'Germany'], ['+33', 'France'], ['+61', 'Australia']
].map(([value, country]) => ({ value, label: `${value} ${country}` }));

export const DEFAULT_CODE = '+971';

/** @returns {ContactValues} */
export function emptyValues() {
  return { name: '', company: '', email: '', code: DEFAULT_CODE, phone: '', enquiry: '', message: '' };
}

/**
 * Picks only the known fields, coerces to strings and normalises whitespace.
 * Unknown fields are dropped deliberately.
 * @param {Record<string, unknown>} raw
 * @returns {ContactValues}
 */
export function normalize(raw) {
  const out = emptyValues();
  for (const k of FIELDS) {
    const v = raw && typeof raw[k] === 'string' ? /** @type {string} */ (raw[k]) : '';
    out[k] = k === 'message'
      ? v.replace(/\r\n?/g, '\n').replace(/[^\S\n]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim()
      : v.replace(/\s+/g, ' ').trim();
  }
  if (!out.code) out.code = DEFAULT_CODE;
  return out;
}

// Excludes quote, angle-bracket, comment and group characters so the address is always a plain addr-spec.
const EMAIL_RE = /^[^\s@"<>(),;:\\[\]]+@[^\s@"<>(),;:\\[\]]+\.[^\s@"<>(),;:\\[\]]{2,}$/;

/**
 * @param {Record<string, unknown>} values
 * @param {Practice} practice
 * @returns {Record<string, string>} field name -> message; empty when valid
 */
export function validate(values, practice) {
  const v = normalize(values);
  /** @type {Record<string, string>} */
  const e = {};
  if (!v.name) e.name = 'Enter your full name.';
  else if (v.name.length > LIMITS.name) e.name = `Keep your name under ${LIMITS.name} characters.`;
  if (v.company.length > LIMITS.company) e.company = `Keep this under ${LIMITS.company} characters.`;
  if (!v.email) e.email = 'Enter your email address.';
  else if (v.email.length > LIMITS.email || !EMAIL_RE.test(v.email)) e.email = 'Enter a valid email address, like name@company.com.';
  const digits = v.phone.replace(/[\s().-]/g, '');
  if (!/^\+\d{1,4}$/.test(v.code)) e.phone = 'Choose a country code.';
  else if (!digits) e.phone = 'Enter your phone number.';
  else if (!/^\d{6,15}$/.test(digits)) e.phone = 'Use digits only, 6 to 15 digits.';
  const options = PRACTICES[practice] ? PRACTICES[practice].enquiries : [];
  if (!v.enquiry) e.enquiry = 'Choose the nature of your enquiry.';
  else if (!options.includes(v.enquiry)) e.enquiry = 'Choose one of the listed options.';
  if (!v.message) e.message = 'Enter your message.';
  else if (v.message.length > LIMITS.message) e.message = `Keep your message under ${LIMITS.message} characters.`;
  return e;
}
