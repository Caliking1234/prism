// Site copy. Service, profile and associate text comes from the client brief and the Prism Global Services site.
export interface Associate {
  slug: string;
  name: string;
  role: string;
  quals: string;
  bullets: string[];
  /** Square headshot under /public; falls back to initials when absent. */
  photo?: string;
}
export interface Item {
  title: string;
  text: string;
}
export interface Step {
  n: number;
  title: string;
  href: string;
  text: string;
}

export const MC_ITEMS: Item[] = [
  {
    title: "Project Concept & Development",
    text: "Transforming initial concepts into viable business opportunities through feasibility assessment, business planning, commercial strategy and development roadmaps.",
  },
  {
    title: "Project Structuring",
    text: "Identifying key stakeholders, defining commercial models, product specifications and pricing strategies, and developing practical plans for implementation and delivery.",
  },
  {
    title: "Project & Corporate Financing",
    text: "Structuring financial transactions, developing capital solutions and connecting businesses with institutional investors, family offices and strategic partners across global markets.",
  },
];
export const CM_ITEMS: Item[] = [
  {
    title: "Personal Growth & Life Direction",
    text: "Clarify what matters most, set meaningful goals and build the confidence to move forward with purpose.",
  },
  {
    title: "Career & Professional Life",
    text: "Navigate transitions, strengthen your leadership and communication, and find greater fulfilment at work.",
  },
  {
    title: "Health, Wellbeing & Balance",
    text: "Build healthy, sustainable habits, manage stress and create a lifestyle that supports your wellbeing.",
  },
  {
    title: "Family & Social Life",
    text: "Strengthen your relationships, communicate better and find balance between the many roles you play.",
  },
];
export const STEPS: Step[] = [
  {
    n: 1,
    title: "The Discovery Session",
    href: "https://prismglobalservices.com/our-experts/",
    text: "We will respond to you within 48 hours and set up a brief discovery call to discuss your requirements so we can match you with the most relevant professional from our team of experts.",
  },
  {
    n: 2,
    title: "The Service Agreement",
    href: "https://prismglobalservices.com/service-agreement/",
    text: "Once you’ve decided to go ahead, you must give your consent to the Prism Service Agreement which outlines all key aspects of the process, such as confidentiality, scope, and cancellation policy.",
  },
  {
    n: 3,
    title: "Fee Payment",
    href: "https://prismglobalservices.com/fees-structure-individual-counselling-therapy/",
    text: "Finally, you can review the pricing and plans to decide which package suits your needs best. Once we have received the payment, you will be connected with your coach or mentor so you can start scheduling your sessions.",
  },
];
export const WHY: string[] = [
  "Workshops & Training Programs",
  "Psycho-Educational Talks",
  "Individual and Team Coaching",
  "Professional Mentoring",
  "Counselling and Psychotherapy",
];
export const ASSOCIATES: Associate[] = [
  // {
  //   slug: "renu-sachdeva",
  //   name: "Renu Sachdeva",
  //   role: "Coach, Psychotherapist & Trainer, Gurgaon & Dubai",
  //   quals:
  //     "Internationally Credentialed Coach and Mentor, MSc. Counselling & Family Therapy, PG Diploma in Integrative Psychotherapy, MBA, BSc Psych",
  //   bullets: [
  //     "Founder of Prism Counselling",
  //     "Associate Certified Coach (ACC) from International Coaching Federation (ICF)",
  //     "Certified Master Mentor (CMM) from International Mentoring Centre (IMC)",
  //     "Certified in Transactional Analysis, Cognitive Behavioural Therapy, Integrated Hypnotherapy (Level 3), Metaphor Therapy, Hatha Yoga",
  //     "4000+ hours of counselling, coaching and mentoring experience",
  //     "200+ group / team programs conducted for institutions",
  //     "Over 25 years corporate experience in marketing research and consulting, media marketing and advertising working with TNS/Kantar(WPP), Rediffusion Dentsu Y&R, The Times of India Group and others in UK, India and Singapore",
  //     "Extensive experience in strategic consulting with a wide range of clients including Unilever, BAT, Reckitt Benckiser, Tesco, Kellogg’s, Nestle, Danone, Heinz, Jaguar, Hilton and IBM",
  //     "Keen interest in charitable work: Founder and Trustee of NGO UdayREP and Co-Founder of NGO Dementia India Alliance",
  //     "Other interests and pastimes include painting, handicrafts, board games, yoga and travelling",
  //   ],
  // },
  {
    slug: "amita-devnani",
    name: "Amita Devnani",
    photo: "/assets/associates/amita-devnani.jpg",
    role: "Life Coach & Psychologist, Gurgaon, India",
    quals:
      "Masters in Psychology, ICF Certified Life Coach, Certified in CBT, REBT, NLP, TA, ACT & Hypnosis",
    bullets: [
      "Over 6 years experience",
      "Coached & counselled over 300 clients",
      "Expertise spans multiple areas of mental health, including stress management, anxiety, self-esteem, procrastination, relationships, work-life balance, and emotional eating",
      "Worked extensively with corporates, colleges, and schools, training over 2,000 employees and students",
      "Has own podcast called “Compassionate Minds”",
    ],
  },
  {
    slug: "anupama-easwaran",
    name: "Anupama Easwaran",
    photo: "/assets/associates/anupama-easwaran.jpg",
    role: "Diversity and Inclusion Counsellor & Coach, Mumbai, India",
    quals:
      "Erickson International Certified Executive Coach specialising in Diversity and Inclusion, Certified Counsellor, PG in Management",
    bullets: [
      "Founder of in.harmony – a diversity, equity and inclusion consultancy",
      "25 years of work experience in diversity and inclusion consulting, employee wellbeing, marketing and brand management",
      "On D&I council of several companies, POSH expert and external member on the POSH Internal Committees of companies",
      "Maternity Transition consultant and coach",
      "Board member of TWEET Foundation, an NGO for and by transgender people",
      "Given two TEDx Talks about being a transgender ally",
      "Fitness enthusiast – has successfully completed 5 Half-Marathons",
      "Interests and pastimes include acting, oil painting, community engagement, Hindustani light music",
      "Life Mantras: “Live Life to the Fullest” and “Life is Beautiful”",
    ],
  },
  {
    slug: "divya-pandey",
    name: "Divya Pandey",
    photo: "/assets/associates/divya-pandey.jpg",
    role: "Life-Coach, Psychotherapist & Clinical Hypnotherapist, Dubai",
    quals:
      "Counselling Psychologist (M.A. Psychology), Certificated Clinical Hypnotherapist, Certified Life Coach (ICF-ACC), Certified Inner Child Healer, NLP & Theta Healing Practitioner, MBA",
    bullets: [
      "7+ years of professional experience in therapy, coaching and holistic healing",
      "Specializes in helping individuals overcome emotional challenges, manage stress & anxiety, and achieve personal growth",
      "Guides students and young adults to achieve goals, reset direction, realign and design a fulfilling life path",
      "Support individuals in healing deep-seated emotional wounds, releasing fears, and rediscovering joy, playfulness, and self-worth",
      "Helps clients transform early life patterns into a foundation for emotional freedom and confidence",
      "Works with a blend of psychological techniques and holistic healing modalities for deep and lasting transformation",
      "Focuses on Inner Child Healing, emotional well-being, and personal growth",
      "Chakra diagnosis and healing by identifying energy imbalances and restoring balance to promote overall well-being",
      "Trained in Theta Healing, Reiki, Access Bars",
    ],
  },
  {
    slug: "renu-gulati",
    name: "Dr. Renu Gulati",
    photo: "/assets/associates/renu-gulati.jpg",
    role: "Adolescence/Youth and Parenting Specialist, Delhi, India",
    quals:
      "Associate Professor, Department of Human Development and Childhood Studies, Delhi University, with over 35 years experience",
    bullets: [
      "Student Advisor for over 7 years, Guiding and Counselling students for both academic and personal concerns",
      "Worked with UNICEF as a Child Development Specialist",
      "Nominated as the Chairperson for the CSR programme of ‘Sonalika’",
      "Executive Member of ‘Buniyaadi Sanskaar Foundation’ working towards developing Morality and Life Skills among children and youth",
      "Counselling of Delhi Police Personnel and their families (Police Family Welfare Association)",
    ],
  },
  {
    slug: "veenu-wadhwa",
    name: "Dr. Veenu Wadhwa",
    photo: "/assets/associates/veenu-wadhwa.jpg",
    role: "Early Childhood and Parenting Specialist, Delhi, India",
    quals:
      "BSc. Home Science (specialization Child Development), MSc. Child Development, BEd, PhD – Child Development, MSc Counselling & Family Therapy",
    bullets: [
      "Professor, Department of Human Development and Childhood Studies, Institute of Home Economics, Delhi University, with over 25 years experience",
      "Member of the advisory committee of Centre for Early Childhood Education and Development at Ambedkar University, Delhi",
      "Conducts lectures on ‘Child Development across the Life Span’ at NIPCCD",
      "Guiding and Counselling students for both academic and personal concerns for about 20 years now",
      "Counselling of Delhi Police Personnel and their families (Police Family Welfare Association)",
    ],
  },
  {
    slug: "monika-vasal",
    name: "Monika Vasal",
    photo: "/assets/associates/monika-vasal.jpg",
    role: "Family Counsellor and Marital Therapist, Gurgaon, India",
    quals: "Masters in Counselling and Family Therapy",
    bullets: [
      "Founder, MVLife Coach",
      "2,200+ hours of counselling practice",
      "Expertise in Systemic Family & Marriage Therapy, Executive Coaching & Emotional Resilience, Corporate Wellness & Behavioral Dynamics and Crisis & Conflict Resolution",
      "Over 22 years of cross-sector experience including a decade of corporate experience working with global institutions like HSBC and Citigroup",
      "Frequent speaker in podcasts and seminars where she has shared evidence-based perspectives on mental health, relationships, and personal growth",
      "Featured in Cosmopolitan Magazine for her insights on relationships and emotional well-being",
      "Outside her practice, she is a dedicated yoga and wellness enthusiast",
    ],
  },
  {
    slug: "pompi-sarma",
    name: "Pompi Sarma",
    photo: "/assets/associates/pompi-sarma.jpg",
    role: "Life Coach / Emotional Intelligence Coach, Delhi, India",
    quals:
      "Masters in Psychology, Diploma in Counselling Skills, Certificate in Student Counselling, Certified Emotional Intelligence Coach, Diploma in NLP. Received AWWA Award of Excellence in 2019",
    bullets: [
      "Independent freelance counsellor for various institutions",
      "Interned as Student Counsellor in Army Public School, Bengaluru and Sambhrti Centre for Mental Health",
      "Expertise in parenting issues, relationship issues, coaching on goal setting and procrastination issues, children and adolescent counselling, stress and anxiety counselling",
    ],
  },
  {
    slug: "pradeep-saxena",
    name: "Pradeep Saxena",
    photo: "/assets/associates/pradeep-saxena.jpg",
    role: "Executive Coach & Life Coach, Gurgaon, India",
    quals:
      "Associate Certified Coach (ACC) – International Coach Federation, ACSTH ACC Certificate, Certificate in Leadership Pipeline Development, MBA, Greatest Marketing Influencers Award 2018",
    bullets: [
      "Worked with Multinational Corporations in top leadership roles. Companies worked for – MSX International, TNS Global, Hyundai Motor, Hero Honda Motors",
      "Coached senior and mid-level executives in the areas of leadership effectiveness, time management and business success",
      "Coaching expertise in achieving happiness, being productive and life skills",
    ],
  },
  {
    slug: "ruchira-bhatia",
    name: "Ruchira Bhatia",
    photo: "/assets/associates/ruchira-bhatia.jpg",
    role: "Psychotherapist, Gurgaon, India",
    quals: "PG Diploma in Integrative Counselling",
    bullets: [
      "Independent Psychotherapist and Founder of RealTalkTherapy.in",
      "Certified in Carkhuff’s Personal Counselling, Transactional Analysis and Rational Emotive Behavior Therapy from HTH Mumbai",
      "Certified in Anger Management, Parenting Coaching and Therapeutic Writing",
      "Over 200+ hours of training and counselling across age groups and categories – individuals, families and corporates",
      "Certified as Trainer and Practitioner in Human-Centred Design Thinking by LUMA and Genpact",
      "30+ Design Thinking workshops led and facilitated for corporate teams",
      "20+ years work experience in Marketing and Consulting, leading teams and driving P&Ls",
      "Explores art through pottery, fluid art and vintage scrapbooking",
    ],
  },
  // { slug: 'vinay-kumar', name: 'Vinay Kumar', role: 'Wellness Coach & Psychotherapist, Hyderabad', quals: 'MSc. Psychology, Clinical Program in Psychology (certified), PGD Business Administration (HR), Bachelors in Business Management', bullets: ['Working as Wellness Coach', 'Over 10 years in HR involving Training & Development, Employee Engagement & Relations and Grievance Handling', 'Worked with psychiatric patients with counselling needs', 'Extensive experience in grief counselling'] },
  // { slug: 'sharda-wadhwa', name: 'Sharda Wadhwa', role: 'Health & Wellness Expert, Delhi', quals: 'MSc. Foods and Nutrition, Certificate in Reiki', bullets: ['Currently Working as a Diet and Lifestyle Counsellor', 'Worked in the weight management industry for 28 years', 'Has successfully run own diet clinic for 28 years', 'Has been doing Lifestyle Management Counselling to help clients with health problems related to poor lifestyle/habits'] },
  {
    slug: "sneha-atal",
    name: "Sneha Atal",
    photo: "/assets/associates/sneha-atal.jpg",
    role: "Counselling Psychologist, Vizag, India",
    quals:
      "Masters in Applied Psychology, PG Dip in Guidance and Counselling, BSc Psychology, Certified in Rational Emotive Behavioral Therapy and Client-Centred Counselling, Certified Parenting Coach",
    bullets: [
      "Counselling Psychologist & Founder – Humane Counselling & Tests",
      "Previously worked as School Counsellor at Delhi Public School, Jorhat and Counselling Psychologist at Jorhat Medical College Hospital",
      "Experienced in counselling for all types of issues including career counselling, marital problems, depression, anxiety, anger management, etc.",
    ],
  },
  // { slug: 'jamal-hassan', name: 'Jamal Hassan', role: 'Counselling Psychologist, Kuala Lumpur', quals: 'Masters in Psychology, MPhil in Psychology, Member of Association of Professional Psychologists, Chennai', bullets: ['Almost 25 years experience in mental health care for mild and major psychological problems including marital problems, depression, anxiety, relationship break-ups, family counseling, grief counseling, PTSD, and Adolescence issues.', 'Imparting knowledge in Psychology and Counselling', 'Proficiency in online counselling in English, Tamil, Malayalam, Hindi, Urdu, Tamil (MY) Tamil (SG) and Tamil (SL).'] },
  // { slug: 'parita-shah', name: 'Parita Shah', role: 'Counselling Psychologist, Oman', quals: 'Masters in Counselling Psychology, Bachelors in Human Development, Certified in Cognitive Behavioural Therapy, Certified in Psychometric Assessments', bullets: ['Working as Independent Counsellor', 'About 10 years of experience in counseling all types of clients and issues including marital problems, depression, anxiety, relationship break-ups, family counseling, career counseling, workplace testing and counseling, PTSD, Adolescence issues.'] },
  // { slug: 'alka-tandon', name: 'Alka Tandon', role: 'Parenting & Mental Wealth Coach, Goa', quals: 'Certified in NLP, EFT & Passion Test, Diploma in Clinic Hypnotherapy & Past Life Regression, Certified in Personal Counselling and Sex Education, BA Math', bullets: ['Over twenty years experience in training, conducting self-empowerment, self enhancement and self-healing workshops with corporates and large business organizations, schools, NGOs, doctors and other professionals', 'Conducts Emotional Freedom Techniques (EFT) training', 'Conducts Common Sense Parenting workshops for parents, educators and others who work with children on how to better communicate with children and teach them self-discipline', 'Passion Test Facilitator working on goal setting & prioritization to help people live a more fulfilling life and enjoy their work', 'Teacher and Trainer in the Responsible Childcare programme for teachers and parents', 'Career Clarity Coaching: Strategic guidance for education and career path decisions aligned with authentic strengths'] }
];
