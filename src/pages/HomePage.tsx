import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Ambient from "../components/Ambient";
import AboutCopy, { ABOUT_LEAD } from "../components/AboutCopy";
import { CM_ITEMS, MC_ITEMS, type Item } from "../content/site";
import { LINKS } from "../content/nav";

function ServiceCard({
  tone,
  title,
  items,
  children,
}: {
  tone: "blue" | "teal";
  title: string;
  items: Item[];
  children: ReactNode;
}) {
  return (
    <article className={`service-card service-card--${tone}`}>
      <div className="service-card__head">
        <h3>{title}</h3>
      </div>
      <div className="service-card__body">
        {items.map((s) => (
          <div className="service-card__item" key={s.title}>
            <h4>{s.title}</h4>
            <p>{s.text}</p>
          </div>
        ))}
        <div className="service-card__cta">{children}</div>
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <img
          className="hero__img"
          src="/assets/banner-prism.png"
          alt=""
          width={2033}
          height={388}
        />
        <div className="hero__scrim" aria-hidden="true" />
        <Ambient variant="hero" />
        <div className="wrap hero__inner">
          <div className="hero__copy">
            <div className="gold-rule" data-reveal="line" />
            <h1 className="hero__title" data-reveal="mask" data-delay="120">
              Prism Consulting
            </h1>
            <p className="hero__lead" data-reveal="up" data-delay="320">
              Bespoke consultancy and coaching &amp; mentoring – diverse
              practices with one commitment for growth &amp; development
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="section about-home">
        <div className="wrap split">
          <div>
            <p className="eyebrow" data-reveal="up">
              About Us
            </p>
            <h2 className="about-home__lead" data-reveal="up" data-delay="80">
              {ABOUT_LEAD}
            </h2>
          </div>
          <div className="about-home__notes" data-reveal="group">
            <AboutCopy />
          </div>
        </div>
      </section>

      <section id="services" className="section services-home">
        <div className="wrap">
          <h2 className="section-title" data-reveal="mask">
            Our Services
          </h2>
          <div className="grid-2" data-reveal="group">
            <ServiceCard
              tone="blue"
              title="Management Consulting"
              items={MC_ITEMS}
            >
              <Link to="/contact-us/#contact-nalin" className="btn btn--blue">
                Contact Us <span aria-hidden="true">→</span>
              </Link>
            </ServiceCard>
            <ServiceCard
              tone="teal"
              title="Coaching & Mentoring"
              items={CM_ITEMS}
            >
              <a
                href={LINKS.pgs}
                target="_blank"
                rel="noopener"
                className="btn btn--teal"
              >
                Find Out More <span aria-hidden="true">↗</span>
              </a>
            </ServiceCard>
          </div>
        </div>
      </section>
    </>
  );
}
