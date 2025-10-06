// Central structured resume data for reuse across pages/components.
export const resumeData = {
  name: 'Omar Allam',
  title: 'Sr. Front-End Engineer',
  summary: 'Senior Front-End Engineer (7+ yrs) experienced in React, Angular, Next.js, design systems, scalable architectures, and CI/CD. Passionate about debugging, performance optimization, and elevating UI/UX.',
  contact: {
    phone: '+20 114 993 9395',
    email: '3omrallam@gmail.com',
    location: '1st New Cairo, Cairo, Egypt',
    linkedin: 'https://linkedin.com/in/omar-allam-dev'
  },
  education: [
    {
      degree: 'Bachelor of Business Administration',
      institution: 'Canadian International College (CIC)',
      period: 'Sep 2015 – Oct 2019'
    }
  ],
  certification: ['Diploma in MEAN Stack'],
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'Advanced' }
  ],
  experience: [
    {
      company: 'Watania Solutions Co. (KSA)',
      role: 'Senior Front-End Developer',
      period: 'Apr 2023 – Present',
      highlights: [
        'Architected React micro frontends (Webpack Module Federation)',
        'Refactored legacy platforms to Next.js for maintainability',
        'Built reusable UI libraries aligned with design standards',
        'Implemented robust Jest test coverage & mock services',
        'Streamlined CI/CD with backend & DevOps collaboration'
      ]
    },
    {
      company: 'Asuro (Germany)',
      role: 'Senior Front-End Developer (Contract)',
      period: 'Sep 2022 – Apr 2023',
      highlights: [
        'Developed Angular 17 apps in Nx Monorepo',
        'Optimized performance via lazy loading & change detection',
        'Integrated Cypress e2e tests with GitHub Actions',
        'Mentored junior engineers'
      ]
    },
    {
      company: 'Englease.com (UAE)',
      role: 'Senior Front-End Developer (Contract)',
      period: 'Nov 2021 – Sep 2022',
      highlights: [
        'Implemented React components inside Laravel backend',
        'Integrated APIs: ZOHO, Zapier, Zoom, Intercom',
        'Led mobile-first UI enhancements'
      ]
    },
    {
      company: 'Lun for Software Development (KSA)',
      role: 'Team Lead Front-End Developer (Part-time)',
      period: 'Nov 2021 – Mar 2022',
      highlights: [
        'Led team delivering real-time React dashboard (Firebase)',
        'Integrated Google Maps & Teller Payments',
        'Established Agile sprints & Git workflow standards'
      ]
    },
    {
      company: 'IT Share (Egypt)',
      role: 'Front-End Instructor (Part-time)',
      period: 'Sep 2020 – Sep 2022',
      highlights: [
        'Delivered MEAN & MERN training to 100+ students',
        'Prepared real-life projects & problem-solving workshops'
      ]
    },
    {
      company: 'Creative Motion (UAE)',
      role: 'Front-End Developer',
      period: 'Jul 2019 – Oct 2021',
      highlights: [
        'Built responsive marketing sites & enterprise portals',
        'Created SASS utilities & layout templates for reuse'
      ]
    }
  ],
  achievements: [
    'Reduced bundle sizes and improved performance budgets across multiple platforms',
    'Introduced scalable design token architecture in multi-brand system',
    'Delivered training & mentorship improving team front-end maturity',
    'Implemented CI pipelines integrating unit, e2e, and visual regression checks'
  ],
  skillGroups: [
    { label: 'Frontend Frameworks', items: ['React.js', 'Angular', 'Next.js', 'TypeScript', 'JavaScript (ES2023)'] },
    { label: 'Styling', items: ['HTML', 'CSS', 'SASS / SCSS', 'Tailwind CSS', 'Bootstrap'] },
    { label: 'Component Libraries', items: ['Angular Material', 'MUI', 'React Bootstrap'] },
    { label: 'Design & A11y', items: ['Figma', 'Adobe XD', 'Accessibility (WCAG)'] },
    { label: 'Testing', items: ['Cypress', 'Jest', 'Jasmine'] },
    { label: 'Architecture', items: ['Webpack', 'Nx Monorepos', 'Module Federation'] },
    { label: 'DevOps / VCS', items: ['Git', 'GitHub', 'Bitbucket', 'Azure'] },
    { label: 'Backend & DB', items: ['Node.js', 'Laravel', 'MongoDB', 'MySQL'] },
    { label: 'Integrations', items: ['ZOHO CRM', 'Google Maps', 'Intercom', 'Zoom APIs', 'Zapier', 'Teller'] },
    { label: 'Practices', items: ['Agile / Scrum', 'Jira', 'Code Reviews', 'Team Mentorship', 'ClickUp'] }
  ]
};
