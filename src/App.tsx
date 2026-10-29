import { Route, Routes } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import { useRouteEffects } from './lib/useRouteEffects';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ManagementConsultingPage from './pages/ManagementConsultingPage';
import CoachingMentoringPage from './pages/CoachingMentoringPage';
import TeamPage from './pages/TeamPage';
import AffiliatesPage from './pages/AffiliatesPage';
import AssociatesPage from './pages/AssociatesPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  useRouteEffects();
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us/" element={<AboutPage />} />
          <Route path="/our-services/management-consulting/" element={<ManagementConsultingPage />} />
          <Route path="/our-services/coaching-mentoring/" element={<CoachingMentoringPage />} />
          <Route path="/our-team/" element={<TeamPage />} />
          <Route path="/affiliate/" element={<AffiliatesPage />} />
          <Route path="/associates/" element={<AssociatesPage />} />
          <Route path="/contact-us/" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  );
}
