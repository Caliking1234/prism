import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import routes from '../content/routes.json';
import { setupReveal } from './reveal';

const SITE = 'https://prismconsulting.org';

/** Per-route title/description/canonical, hash scrolling, and scroll reveals. */
export function useRouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const path = pathname.endsWith('/') ? pathname : pathname + '/';
    const route = routes.find(r => r.path === path);
    document.title = route ? route.title : 'Page not found – Prism Consulting';
    document.querySelector('meta[name="description"]')?.setAttribute('content', route?.description ?? '');
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', SITE + (route?.path ?? path));
    document.querySelector('meta[name="robots"]')?.setAttribute('content', route ? 'index, follow' : 'noindex');
  }, [pathname]);

  useEffect(() => {
    const id = decodeURIComponent(hash.slice(1));
    const frame = requestAnimationFrame(() => {
      const el = id ? document.getElementById(id) : null;
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 92, behavior: 'smooth' });
      else window.scrollTo({ top: 0 });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  useEffect(() => setupReveal(document.getElementById('main')), [pathname]);
}
