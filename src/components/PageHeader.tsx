import type { ReactNode } from 'react';
import Ambient from './Ambient';

/** Sand page header used by every inner page. */
export default function PageHeader({ eyebrow, title, tone, children, id }: {
  eyebrow?: string; title: string; tone: 'blue' | 'teal' | 'neutral'; children?: ReactNode; id?: string;
}) {
  return (
    <section className={`page-head page-head--${tone}`} id={id}>
      <Ambient variant={tone === 'neutral' ? 'gold' : tone} triangle />
      <div className="wrap page-head__inner">
        {eyebrow && <p className="eyebrow" data-reveal="up">{eyebrow}</p>}
        <h1 className={`page-head__title page-head__title--${tone}`} data-reveal="mask">{title}</h1>
        {children}
      </div>
    </section>
  );
}
