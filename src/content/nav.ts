export interface NavChild { label: string; to: string }
export interface NavItem { key: string; label: string; to?: string; match: string[]; children?: NavChild[] }

export const NAV: NavItem[] = [
  { key: 'home', label: 'Home', to: '/', match: ['/'] },
  { key: 'about', label: 'About Us', to: '/about-us/', match: ['/about-us/'] },
  {
    key: 'services', label: 'Our Services', match: ['/our-services/'],
    children: [
      { label: 'Management Consulting', to: '/our-services/management-consulting/' },
      { label: 'Coaching & Mentoring', to: '/our-services/coaching-mentoring/' }
    ]
  },
  {
    key: 'team', label: 'Our Team', match: ['/our-team/'],
    children: [
      { label: 'Nalin Sachdeva', to: '/our-team/#nalin' },
      { label: 'Renu Sachdeva', to: '/our-team/#renu' }
    ]
  },
  {
    key: 'aff', label: 'Affiliates & Associates', match: ['/affiliate/', '/associates/'],
    children: [
      { label: 'Affiliates', to: '/affiliate/' },
      { label: 'Associates', to: '/associates/' }
    ]
  },
  { key: 'contact', label: 'Contact Us', to: '/contact-us/', match: ['/contact-us/'] }
];

export const LINKS = {
  nalinLinkedIn: 'https://www.linkedin.com/in/nalins/',
  renuLinkedIn: 'https://www.linkedin.com/in/renu-sachdeva/',
  pgs: 'https://prismglobalservices.com/',
  pgsServices: 'https://prismglobalservices.com/#services',
  watt: 'https://wattasset.com/',
  precisionLegal: 'https://www.precisionlegalconsultancy.com/'
};
