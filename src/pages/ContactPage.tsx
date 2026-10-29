import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact Us" tone="neutral">
        <p className="page-head__lead" data-reveal="up" data-delay="160">Please choose the practice expert you’d like to speak to. We aim to respond within 2 working days.</p>
      </PageHeader>
      <section className="section section--sand-tail section--tight-top">
        <div className="wrap grid-2" data-reveal="group">
          <ContactForm practice="mc" anchorId="contact-nalin" fallbackEmail="nalin@prismconsulting.org" />
          <ContactForm practice="cm" anchorId="contact-renu" fallbackEmail="renu@prismconsulting.org" />
        </div>
      </section>
    </>
  );
}
