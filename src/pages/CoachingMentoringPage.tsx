import { Link } from "react-router-dom";
import Ambient from "../components/Ambient";
import PageHeader from "../components/PageHeader";
import { CM_ITEMS, STEPS, WHY } from "../content/site";
import { LINKS } from "../content/nav";

export default function CoachingMentoringPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="Coaching & Mentoring"
        tone="teal"
      />
      <section className="section section--bridge">
        <div className="wrap">
          <div className="numbered numbered--4" data-reveal="group">
            {CM_ITEMS.map((s, i) => (
              <div
                className="numbered__item numbered__item--teal"
                key={s.title}
              >
                <span className="numbered__n">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2>{s.title}</h2>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <div className="btn-row btn-row--spaced">
            <a
              href={LINKS.pgsServices}
              target="_blank"
              rel="noopener"
              className="btn btn--teal"
            >
              Find Out More <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section steps-section">
        <div className="wrap">
          <h2 className="section-title section-title--sm" data-reveal="mask">
            How It Works
          </h2>
          <p className="section-intro" data-reveal="up">
            Starting your journey with Prism is a simple 3 step process that
            begins when you submit a request using the{" "}
            <Link to="/contact-us/#contact-renu">CONTACT FORM</Link>.
          </p>
          <ol className="steps" data-reveal="group">
            {STEPS.map((st) => (
              <li className="step" key={st.n}>
                <span className="step__n" aria-hidden="true">
                  {st.n}
                </span>
                <h3>
                  <a href={st.href} target="_blank" rel="noopener">
                    {st.title}
                  </a>
                </h3>
                <p>{st.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* <section className="section why-section">
        <div className="wrap split">
          <div>
            <p className="eyebrow eyebrow--teal" data-reveal="up">Why Us</p>
            <h2 className="section-title section-title--sm" data-reveal="mask">Facilitating Growth</h2>
            <p className="body-lg">Prism Global Services is a one-stop service provider offering a range of customized services to individuals and organisations for personal and professional growth.</p>
            <p className="body-lg muted">Our qualified and experienced professionals offer a wide range of services including:</p>
          </div>
          <ul className="why-list" data-reveal="group">
            {WHY.map(w => <li key={w}><span className="diamond" aria-hidden="true" />{w}</li>)}
          </ul>
        </div>
      </section> */}

      <section className="cta-band">
        <Ambient variant="shift" />
        <div className="wrap wrap--narrow cta-band__inner" data-reveal="group">
          {/* <p className="eyebrow eyebrow--light">About Us</p> */}
          <h2>
            You Don’t Have to Do This Alone. Our Team Is Here To Support You.
          </h2>
          <p className="cta-band__text">
            We are committed to your personal &amp; professional growth. Contact
            us to explore our range of services to suit your needs.
          </p>
          <Link to="/contact-us/" className="btn btn--gold">
            Contact Us <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
