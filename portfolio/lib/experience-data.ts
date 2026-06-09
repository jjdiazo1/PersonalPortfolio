export interface Job {
  title: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description: string;
  bullets: string[];
  skills: string[];
  logo: string;
}

export const JOBS: Job[] = [
  {
    title: 'AI Engineering Intern',
    company: 'Conformitee',
    type: 'Internship',
    period: 'May 2026 – Present',
    location: 'Lyon, France · On-site',
    description:
      'Developing full-stack AI features and agentic workflows for a RegTech platform focused on regulatory compliance (KYC, document verification) using Angular and Python.',
    bullets: [
      'Enhance system security through testing, validation, and hardening practices to improve platform robustness and compliance.',
      'Work on an AI module for document intelligence, including automatic data extraction and form pre-filling for compliance workflows.',
    ],
    skills: ['LangGraph', 'Agentic AI', 'Angular', 'Python'],
    logo: '/Logos/conformitee.png',
  },
  {
    title: 'AI Engineering Consultant',
    company: 'Intersektion',
    type: 'Contract · Part-time · START-IF Program',
    period: 'Feb 2026 – Apr 2026',
    location: 'Lyon, France · Hybrid',
    description:
      'Built an AI orchestration backend integrating APIs, Tavily and AWS Bedrock. Designed a first data pipeline for FEC Carbon analysis (S3, Lambda, AI processing). Contributed to ESG-focused data solutions for real-world use cases.',
    bullets: [
      'Delivered a final pitch to stakeholders with strong positive feedback.',
      'Collaborated in a team of 7 engineers in an industry-driven project.',
    ],
    skills: ['AWS', 'Amazon Bedrock', 'Tavily'],
    logo: '/Logos/intersektion.png',
  },
  {
    title: 'Mobile Application Development TA — iOS & Flutter',
    company: 'Universidad de Los Andes',
    type: 'Contract · Part-time',
    period: 'Aug 2025 – Dec 2025',
    location: 'Remote',
    description:
      'Architected and developed a cross-platform mobile marketplace for university materials, making 80+ contributions to the core codebase.',
    bullets: [
      'Mentored students in software architecture, debugging, and UI/UX best practices for mobile environments.',
      'Integrated advanced features including Augmented Reality (AR) for product visualization and AI-driven search indexing.',
      'Designed and implemented a data pipeline (PostgreSQL → BigQuery → Looker Studio) to track user behavior and business metrics.',
    ],
    skills: ['iOS Development', 'Flutter', 'Firebase', 'BigQuery'],
    logo: '/Logos/uniandes.png',
  },
  {
    title: 'Founder & Developer',
    company: 'Early To Wear',
    type: 'Self-employed',
    period: 'Mar 2024 – Dec 2025',
    location: 'Lyon, France · Hybrid',
    description:
      'Founded and developed an AI-powered fashion recommendation platform utilizing CLIP (Contrastive Language-Image Pre-training) and vector databases for visual search.',
    bullets: [
      'Scaled the project internationally, securing a spot in the entrepreneurship center of the Rhône-Alpes region (France) for further incubation.',
      'Successfully piloted the MVP during Innovation Week at Universidad de los Andes, onboarding 6 fashion brands as initial partners.',
      'Built the full-stack infrastructure using Next.js, Node.js, and Medusa.js, focusing on scalable architecture and user-centric design.',
      'Iterated product features based on rapid user testing and hypothesis validation in both the Colombian and French markets.',
    ],
    skills: ['Next.js', 'Python', 'CLIP', 'Vector Databases', 'Lean Startup'],
    logo: '/Logos/etw.png',
  },
  {
    title: 'Full Stack Developer',
    company: 'Hotel Juan María',
    type: 'Contract',
    period: 'Dec 2024 – Nov 2025',
    location: 'Remote',
    description:
      'Led the digital transformation of a hospitality business by replacing a 15-year-old legacy system with a modern Next.js and Payload CMS platform.',
    bullets: [
      'Increased direct digital revenue by over 20% by building a custom internal booking engine that eliminated third-party intermediary fees.',
      'Optimized SEO and Core Web Vitals, significantly improving organic search rankings and page load speeds.',
      'Developed custom internal tools for inventory and reservation management.',
    ],
    skills: ['Next.js', 'Payload CMS', 'TypeScript', 'SEO'],
    logo: '/Logos/hotel.png',
  },
];
