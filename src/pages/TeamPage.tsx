import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { LINKS } from '../content/nav';

interface Person {
  key: 'nalin' | 'renu';
  tone: 'blue' | 'teal';
  name: string;
  title: string;
  summary: string;
  photo: { src: string; w: number; h: number; pos: string };
  contact: string;
  extra: { label: string; to: string };
  linkedIn: string;
  profile: string[];
}

const PEOPLE: Person[] = [
  {
    key: 'nalin', tone: 'blue', name: 'Nalin Sachdeva',
    title: 'Founder & Principal Consultant, Business & Finance Advisory',
    summary: 'Career Finance professional with over 40 years of global work experience in corporate and project finance, private equity, and business management in various multi-national organisations.',
    photo: { src: '/assets/nalin.png', w: 813, h: 684, pos: '50% 25%' },
    contact: '/contact-us/#contact-nalin', extra: { label: 'Our Affiliates', to: '/affiliate/' }, linkedIn: LINKS.nalinLinkedIn,
    profile: [
      'Nalin Sachdeva is a seasoned business leader with over 41 years of international experience in corporate and project finance, private equity, and business management, particularly across infrastructure-intensive sectors.',
      'As CEO of Prism Consulting since 2019, he leads engagements spanning project development, financial structuring, capital solutions and strategic business partnerships across Europe, the Americas, the Middle East and India. His sector expertise includes energy, healthcare, aviation, mobility and infrastructure.',
      'His career includes senior leadership positions at Philips Healthcare, General Electric, the International Finance Corporation (World Bank Group) and Bank of America, where he has led complex financial transactions, investment structures and strategic business initiatives.',
      'Nalin also serves as Vice Chairman of Jupiter Wealth Advisors in DIFC, Dubai, leading the firm’s global Strategic Partnerships and Private Markets business.',
      'He brings an extensive international network, significant board and governance experience, and a strong academic foundation, including an MBA in Finance and qualifications in Cost & Management Accounting.'
    ]
  },
  {
    key: 'renu', tone: 'teal', name: 'Renu Sachdeva',
    title: 'Consultant – Coaching & Mentoring Services',
    summary: 'Life Coach, Master Mentor and Accredited Corporate Training Provider with 14 years of evidence-based practice following 25+ years of global corporate experience in marketing, advertising, media and marketing research.',
    photo: { src: '/assets/renu.png', w: 1299, h: 1384, pos: '50% 20%' },
    contact: '/contact-us/#contact-renu', extra: { label: 'Our Associates', to: '/associates/' }, linkedIn: LINKS.renuLinkedIn,
    profile: [
      'Renu is an internationally credentialed coach and certified master mentor who helps individuals and teams gain clarity, navigate change and progress in their personal and professional lives. She works with leaders strengthening their effectiveness, professionals exploring their career goals and individuals seeking clarity, balance or harmony.',
      'In her coaching, mentoring and training work, Renu combines psychological insights with real-world experience to help clients deepen self-awareness, explore their perspectives, strengthen communication and turn their goals into practical, sustainable actions.',
      'She brings a rich business perspective and an understanding of diverse cultures and workplaces from over 25 years of corporate experience spanning market research, strategic consulting, media and advertising across the UK, India and Singapore. She has worked with organisations including TNS/Kantar (WPP), Rediffusion Dentsu Y&R, The Times of India Group and The Research Pacific Group, advising global brands such as Unilever, Nestlé, Tesco, Reckitt Benckiser, BAT, IBM, Jaguar and Hilton.',
      'Renu has 4,000+ hours of client experience across her professional practice and has delivered 200+ group and team programmes for organisations and institutions.',
      'Her academic qualifications include MBA, MSc Counselling & Family Therapy, BA Psychology and BSc Maths.'
    ]
  }
];

export default function TeamPage() {
  const { hash } = useLocation();
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const key = hash.slice(1);
    if (key === 'nalin' || key === 'renu') setOpen(o => ({ ...o, [key]: true }));
  }, [hash]);

  return (
    <>
      <PageHeader eyebrow="Our Team" title="Meet the people you’ll work with" tone="neutral" />
      <section className="section section--sand-tail">
        <div className="wrap grid-2 grid-2--stretch" data-reveal="group">
          {PEOPLE.map(p => (
            <article id={p.key} key={p.key} className={`person person--${p.tone}`}>
              <div className="person__band">
                <img src={p.photo.src} alt={`Portrait of ${p.name}`} width={p.photo.w} height={p.photo.h} loading="lazy" style={{ objectPosition: p.photo.pos }} />
              </div>
              <div className="person__body">
                <h2>{p.name}</h2>
                <p className="person__title">{p.title}</p>
                <p className="person__summary">{p.summary}</p>
                <div className="btn-row person__actions">
                  <button type="button" className={`btn btn--outline-${p.tone}`} aria-expanded={!!open[p.key]} aria-controls={`full-${p.key}`}
                    onClick={() => setOpen(o => ({ ...o, [p.key]: !o[p.key] }))}>
                    {open[p.key] ? 'Hide profile' : 'View profile'}
                  </button>
                  <Link to={p.contact} className={`btn btn--${p.tone}`}>Contact {p.name.split(' ')[0]}</Link>
                  <Link to={p.extra.to} className={`text-link text-link--${p.tone}`}>{p.extra.label} <span aria-hidden="true">→</span></Link>
                </div>
                {open[p.key] && (
                  <div id={`full-${p.key}`} className="person__profile">
                    {p.profile.map((para, i) => <p key={i}>{para}</p>)}
                    <a href={p.linkedIn} target="_blank" rel="noopener" className={`text-link text-link--${p.tone}`}>LinkedIn profile ↗</a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
