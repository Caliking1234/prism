import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { MC_ITEMS } from '../content/site';

export default function ManagementConsultingPage() {
  return (
    <>
      <PageHeader eyebrow="Our Services" title="Management Consulting" tone="blue" />
      <section className="section section--bridge">
        <div className="wrap">
          <div className="numbered numbered--3" data-reveal="group">
            {MC_ITEMS.map((s, i) => (
              <div className="numbered__item numbered__item--blue" key={s.title}>
                <span className="numbered__n">{String(i + 1).padStart(2, '0')}</span>
                <h2>{s.title}</h2>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <div className="btn-row btn-row--spaced">
            <Link to="/contact-us/#contact-nalin" className="btn btn--blue">Contact Us <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
