import { Link } from 'react-router-dom';
import { LINKS } from '../content/nav';

/** About Us copy (shared by Home and About pages). */
export default function AboutCopy() {
  return (
    <>
      <div className="practice-note practice-note--blue">
        <p className="practice-note__label">Management Consulting</p>
        <p>Our Management Consulting practice was founded by <a href={LINKS.nalinLinkedIn} target="_blank" rel="noopener">Nalin Sachdeva</a>, who has over 41 years of experience in corporate and project finance across diverse infrastructure sectors worldwide. Our small team of specialists and affiliates balances client interest with market dynamics, giving clients access to commercial relationships and institutional capital that may not be available under conventional frameworks. Strong affiliations in investment banking and financial services allow us to offer broad, end-to-end support.</p>
      </div>
      <div className="practice-note practice-note--teal">
        <p className="practice-note__label">Coaching &amp; Mentoring</p>
        <p>Our Coaching &amp; Mentoring practice is led by <a href={LINKS.renuLinkedIn} target="_blank" rel="noopener">Renu Sachdeva</a>, an ICF-credentialed coach and IMC-certified master mentor with over 13 years of evidence-based practice, grounded in more than 25 years of corporate experience in people management, business strategy and client service across the UK, Singapore and India. Renu is also the Founder of <a href={LINKS.pgs} target="_blank" rel="noopener">Prism Global Services</a>, an Accredited Corporate Training Provider (IMC ATP) offering a wide range of services to individuals and institutions across the globe.</p>
      </div>
      <div className="btn-row">
        <Link to="/our-team/" className="btn btn--gold">Meet the team <span aria-hidden="true">→</span></Link>
      </div>
    </>
  );
}

export const ABOUT_LEAD = 'Prism Consulting is a specialized consulting, coaching & mentoring firm serving corporate and individual clients across the globe. We are driven by our clients’ needs for independent, hands-on support, backed by decades of real-world experience.';
