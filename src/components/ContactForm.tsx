import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { COUNTRY_CODES, PRACTICES, emptyValues, validate } from '../shared/contact.js';

type Practice = 'mc' | 'cm';
type Values = ReturnType<typeof emptyValues>;
type Errors = Record<string, string>;
type Status = 'idle' | 'sending' | 'success' | 'error';

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
let recaptchaScript: Promise<void> | null = null;

function loadRecaptcha(key: string) {
  recaptchaScript ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(key)}`;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => { recaptchaScript = null; reject(new Error('recaptcha')); };
    document.head.appendChild(s);
  });
  return recaptchaScript;
}

async function getRecaptchaToken(): Promise<string | undefined> {
  if (!SITE_KEY) return undefined;
  try {
    await loadRecaptcha(SITE_KEY);
    return await new Promise<string>((resolve, reject) =>
      window.grecaptcha!.ready(() => window.grecaptcha!.execute(SITE_KEY, { action: 'contact' }).then(resolve, reject)));
  } catch {
    return undefined; // server rejects if reCAPTCHA is required
  }
}

const SUCCESS = 'Thank you for contacting Prism Consulting. We will get back to you within 2 working days.';

export default function ContactForm({ practice, anchorId, fallbackEmail }: { practice: Practice; anchorId: string; fallbackEmail: string }) {
  const p = PRACTICES[practice];
  const tone = practice === 'mc' ? 'blue' : 'teal';
  const { hash } = useLocation();
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const inFlight = useRef(false);
  const id = (k: string) => `${practice}-${k}`;

  const onChange = (k: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (tried) setErrors(validate(next, practice));
    if (status === 'error') setStatus('idle');
  };

  const focusFirst = (errs: Errors) => {
    const first = Object.keys(errs)[0];
    if (first) requestAnimationFrame(() => document.getElementById(id(first))?.focus());
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (inFlight.current) return;
    setTried(true);
    const errs = validate(values, practice);
    setErrors(errs);
    if (Object.keys(errs).length) { focusFirst(errs); return; }

    inFlight.current = true;
    setStatus('sending');
    setServerMessage('');
    try {
      const recaptchaToken = await getRecaptchaToken();
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ practice, ...values, website: honeypot, recaptchaToken })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus('success');
        setValues(emptyValues());
        setTried(false);
        setErrors({});
      } else {
        if (data.fieldErrors) { setErrors(data.fieldErrors); focusFirst(data.fieldErrors); }
        setServerMessage(typeof data.error === 'string' ? data.error : '');
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      inFlight.current = false;
    }
  }

  const count = Object.keys(errors).length;
  const sending = status === 'sending';
  const field = (k: keyof Values) => ({
    id: id(k), name: k, value: values[k], onChange: onChange(k),
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${id(k)}-err` : undefined,
    className: `field__control${errors[k] ? ' has-error' : ''}`
  });
  const err = (k: string) => errors[k] && <p className="field__error" id={`${id(k)}-err`}>Error: {errors[k]}</p>;
  const label = (k: string, text: string, required = true) => (
    <label htmlFor={id(k)} className="field__label">{text} <span>{required ? 'Required' : 'Optional'}</span></label>
  );

  return (
    <div id={anchorId} className={`form-card form-card--${tone}${hash === '#' + anchorId ? ' is-target' : ''}`}>
      <div className="form-card__head">
        <h2>{p.label}</h2>
        <p>{p.expert}</p>
      </div>
      <div className="form-card__body">
        <div role="status" aria-live="polite">
          {status === 'success' && (
            <div className="form-success">
              <span className="form-success__icon" aria-hidden="true">✓</span>
              <p className="form-success__text">{SUCCESS}</p>
              <button type="button" className={`btn btn--outline-${tone}`} onClick={() => setStatus('idle')}>Send another enquiry</button>
            </div>
          )}
          {status !== 'success' && count > 0 && <p className="form-alert">Please correct {count} field{count > 1 ? 's' : ''} below.</p>}
          {status === 'error' && count === 0 && (
            <p className="form-alert">
              <strong>Your message wasn’t sent.</strong> {serverMessage || 'Please try again in a moment.'} You can also email <a href={`mailto:${fallbackEmail}`}>{fallbackEmail}</a>.
            </p>
          )}
        </div>

        {status !== 'success' && (
          <form noValidate onSubmit={onSubmit} className="form">
            <div className="field">{label('name', 'Full name')}<input type="text" autoComplete="name" maxLength={120} {...field('name')} />{err('name')}</div>
            <div className="field">{label('company', 'Company / organisation', false)}<input type="text" autoComplete="organization" maxLength={160} {...field('company')} />{err('company')}</div>
            <div className="field">{label('email', 'Email')}<input type="email" autoComplete="email" maxLength={254} {...field('email')} />{err('email')}</div>
            <div className="field">
              {label('phone', 'Phone')}
              <div className="field__phone">
                <select aria-label="Country code" name="code" value={values.code} onChange={onChange('code')} className="field__control">
                  {COUNTRY_CODES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
                <input type="tel" inputMode="tel" autoComplete="tel-national" maxLength={20} {...field('phone')} />
              </div>
              {err('phone')}
            </div>
            <div className="field">
              {label('enquiry', 'Nature of enquiry')}
              <select {...field('enquiry')}>
                <option value="" disabled>Select an option</option>
                {p.enquiries.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              {err('enquiry')}
            </div>
            <div className="field">{label('message', 'Message')}<textarea rows={5} maxLength={5000} {...field('message')} />{err('message')}</div>
            <div className="hp" aria-hidden="true">
              <label htmlFor={id('website')}>Website</label>
              <input id={id('website')} type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
            </div>
            <button type="submit" className={`btn btn--${tone} btn--block`} disabled={sending} aria-disabled={sending}>
              {sending ? 'Sending…' : 'Send enquiry'}
            </button>
            {SITE_KEY && <p className="form-note">This form is protected by reCAPTCHA. Google’s <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener">Terms</a> apply.</p>}
          </form>
        )}
      </div>
    </div>
  );
}
