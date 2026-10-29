import AboutCopy, { ABOUT_LEAD } from '../components/AboutCopy';

export default function AboutPage() {
  return (
    <>
      <section className="image-head">
        <img className="image-head__img" src="/assets/banner-meeting.png" alt="" width={2033} height={375} />
        <div className="image-head__scrim" aria-hidden="true" />
        <div className="wrap image-head__inner">
          <div className="gold-rule" data-reveal="line" />
          <h1 className="image-head__title" data-reveal="mask">About Us</h1>
        </div>
      </section>
      <section className="section section--bridge">
        <div className="wrap wrap--narrow stack-40">
          <p className="about-page__lead" data-reveal="up">{ABOUT_LEAD}</p>
          <div className="about-page__notes" data-reveal="group">
            <AboutCopy />
          </div>
        </div>
      </section>
    </>
  );
}
