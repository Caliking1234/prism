import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { ASSOCIATES } from '../content/site';

export default function AssociatesPage() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  return (
    <>
      <PageHeader eyebrow="Affiliates & Associates · Coaching & Mentoring" title="Our Associates" tone="teal" />
      <section className="section section--bridge">
        <div className="wrap">
          <ul className="associates" data-reveal="group">
            {ASSOCIATES.map(a => (
              <li className="associate" key={a.slug}>
                <div className="associate__head">
                  <span className="associate__initials" aria-hidden="true">{a.name.replace(/^Dr\. /, '').split(' ').map(w => w[0]).join('').slice(0, 2)}</span>
                  <div>
                    <h2>{a.name}</h2>
                    <p className="associate__role">{a.role}</p>
                  </div>
                </div>
                <p className="associate__quals">{a.quals}</p>
                <button type="button" className="associate__toggle" aria-expanded={!!open[a.slug]} aria-controls={`bio-${a.slug}`}
                  onClick={() => setOpen(o => ({ ...o, [a.slug]: !o[a.slug] }))}>
                  {open[a.slug] ? 'Hide details −' : 'View details +'}
                </button>
                {open[a.slug] && (
                  <ul className="associate__bio" id={`bio-${a.slug}`}>
                    {a.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
