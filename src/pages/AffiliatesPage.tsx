import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { LINKS } from '../content/nav';

/** Shows the partner logo; falls back to the partner name until the file is added to public/assets/partners/. */
function PartnerLogo({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="partner__logo">
      {failed ? <span className="partner__logo-fallback">{name}</span> : <img src={src} alt={`${name} logo`} loading="lazy" onError={() => setFailed(true)} />}
    </div>
  );
}

export default function AffiliatesPage() {
  return (
    <>
      <PageHeader eyebrow="Affiliates & Associates · Management Consulting" title="Affiliates" tone="blue" />
      <section className="section section--bridge">
        <div className="wrap grid-2 grid-2--stretch" data-reveal="group">
          <article className="partner">
            <PartnerLogo src="/assets/partners/watt.png" name="Watt" />
            <h2>Watt</h2>
            <div className="partner__text">
              <p>Watt was formed in 2019 with the goal of becoming a virtual investment office for institutional investors that want the skills and connections of the best alternatives managers without having to pay their fees.</p>
              <p>Watt have unique expertise in renewable energy, consumer finance, insurance and in fitting complex investments into financial institutions.</p>
              <p className="partner__more">Nalin is an Advisor to Watt. For more information, please visit: <a href={LINKS.watt} target="_blank" rel="noopener">www.wattasset.com ↗</a></p>
            </div>
          </article>
          <article className="partner">
            <PartnerLogo src="/assets/partners/precision-legal.png" name="Precision Legal Consultancy" />
            <h2>Precision Legal Consultancy</h2>
            <div className="partner__text">
              <p>Known for their experienced legal professionals and comprehensive services, Precision Legal Consultancy brings expertise in various fields, ensuring tailored and effective legal solutions. This partnership enhances our ability to deliver top-tier legal services and achieve the best possible outcomes for our clients.</p>
              <p>From facilitating entry into the UAE and establishing legal status to meticulously drafting contracts, setting up businesses, counselling on complex corporate transactions, and navigating the intricacies of employment arrangements, our solutions extend seamlessly to supporting clients, business houses and corporations.</p>
              <p className="partner__more">Nalin is a Founding Partner at Precision Legal. For more information, please visit: <a href={LINKS.precisionLegal} target="_blank" rel="noopener">www.precisionlegalconsultancy.com ↗</a></p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
