import { Link } from 'react-router-dom';
import { LINKS } from '../content/nav';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__spectrum" aria-hidden="true" />
      <div className="site-footer__inner">
        <nav aria-label="Footer">
          <ul>
            <li><Link to="/#services">Our Services</Link></li>
            <li><Link to="/our-team/">The Team</Link></li>
            <li><a href={LINKS.pgs} target="_blank" rel="noopener">Prism Global Services ↗</a></li>
            <li><Link to="/contact-us/">Contact Us</Link></li>
          </ul>
        </nav>
        <p>© 2026 Prism Consulting. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
