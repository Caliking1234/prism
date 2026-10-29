import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV, type NavItem } from '../content/nav';

const isActive = (item: NavItem, pathname: string) => {
  const path = pathname.endsWith('/') ? pathname : pathname + '/';
  return item.key === 'home' ? path === '/' : item.match.some(m => path.startsWith(m));
};

export default function SiteHeader() {
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => { setOpen(null); setMenu(false); }, [pathname, hash]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = 0; setScrolled(window.scrollY > 12); });
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(null); setMenu(false); } };
    const onClick = (e: MouseEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-header__spectrum" aria-hidden="true" />
      <div className="site-header__inner">
        <Link to="/" className="site-header__logo" aria-label="Prism Consulting home">
          <img src="/assets/prism-logo.png" alt="Prism" width={934} height={576} />
        </Link>

        <nav className="nav-desktop" aria-label="Main" ref={navRef}>
          <ul>
            {NAV.map(item => {
              const active = isActive(item, pathname);
              if (!item.children) {
                return (
                  <li key={item.key}>
                    <NavLink to={item.to!} end className={`nav-link${active ? ' is-active' : ''}`} aria-current={active ? 'page' : undefined}>{item.label}</NavLink>
                  </li>
                );
              }
              const expanded = open === item.key;
              return (
                <li key={item.key} className="nav-group">
                  <button type="button" className={`nav-link${active ? ' is-active' : ''}`} aria-expanded={expanded} aria-controls={`menu-${item.key}`}
                    onClick={() => setOpen(expanded ? null : item.key)}>
                    {item.label}<span className={`chev${expanded ? ' is-open' : ''}`} aria-hidden="true" />
                  </button>
                  {expanded && (
                    <ul className="dropdown" id={`menu-${item.key}`}>
                      {item.children.map(c => <li key={c.to}><Link to={c.to}>{c.label}</Link></li>)}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <button type="button" className={`burger${menu ? ' is-open' : ''}`} aria-label="Menu" aria-expanded={menu} aria-controls="mobile-nav" onClick={() => setMenu(m => !m)}>
          <span /><span /><span />
        </button>
      </div>

      {menu && (
        <nav id="mobile-nav" className="nav-mobile" aria-label="Main">
          <ul>
            {NAV.map(item => (
              <li key={item.key}>
                {item.children ? (
                  <>
                    <p className="nav-mobile__group">{item.label}</p>
                    <ul>{item.children.map(c => <li key={c.to}><Link to={c.to} className="nav-mobile__child">{c.label}</Link></li>)}</ul>
                  </>
                ) : (
                  <Link to={item.to!} className={`nav-mobile__link${isActive(item, pathname) ? ' is-active' : ''}`} aria-current={isActive(item, pathname) ? 'page' : undefined}>{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
