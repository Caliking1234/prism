import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

export default function NotFoundPage() {
  return (
    <PageHeader eyebrow="Error 404" title="We couldn’t find that page" tone="neutral">
      <p className="page-head__lead">The link may be out of date. These pages may help:</p>
      <div className="btn-row">
        <Link to="/" className="btn btn--gold">Home</Link>
        <Link to="/our-team/" className="btn btn--outline-ink">Our Team</Link>
        <Link to="/affiliate/" className="btn btn--outline-ink">Affiliates</Link>
        <Link to="/contact-us/" className="btn btn--outline-ink">Contact Us</Link>
      </div>
    </PageHeader>
  );
}
