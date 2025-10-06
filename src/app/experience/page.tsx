import { Timeline } from '@/components/shared/Timeline';

export const metadata = { title: 'Experience' };

const experience = [
  {
    company: 'Watania Solutions Co. (KSA)',
    role: 'Senior Front-End Developer',
    period: 'Apr 2023 – Present',
    description:
      'Architecting micro frontends & refactoring legacy platforms to Next.js for performance and maintainability.',
    highlights: [
      'Designed React-based Micro Frontends (Webpack Module Federation)',
      'Refactored legacy apps to Next.js improving scalability',
      'Built reusable UI component libraries aligned to design system',
      'Implemented robust Jest unit test coverage & mock services',
      'Partnered with backend & DevOps to streamline CI/CD'
    ]
  },
  {
    company: 'Asuro (Germany)',
    role: 'Senior Front-End Developer (Contract)',
    period: 'Sep 2022 – Apr 2023',
    description:
      'Delivered scalable Angular 17 applications in an Nx Monorepo with performance-focused patterns.',
    highlights: [
      'Optimized load via lazy module boundaries & change detection tuning',
      'Integrated Cypress e2e tests in GitHub Actions pipeline',
      'Mentored juniors & enforced code review quality'
    ]
  },
  {
    company: 'Englease.com (UAE)',
    role: 'Senior Front-End Developer (Contract)',
    period: 'Nov 2021 – Sep 2022',
    description:
      'Implemented React features embedded in a Laravel backend with multiple 3rd-party integrations.',
    highlights: [
      'Integrated APIs: ZOHO, Zapier, Zoom, Intercom with auth & state logic',
      'Led UI enhancements & mobile-first optimizations',
      'Supported marketing & customer success teams as technical liaison'
    ]
  },
  {
    company: 'Lun for Software Development (KSA)',
    role: 'Team Lead Front-End Developer (Part-time)',
    period: 'Nov 2021 – Mar 2022',
    description:
      'Managed small team delivering a real-time React dashboard (Firebase) with payments & mapping.',
    highlights: [
      'Integrated Google Maps & Teller Payments dynamic configs',
      'Established Agile sprint rhythm & Git workflow standards',
      'Scaled UI component patterns using SASS + Tailwind'
    ]
  },
  {
    company: 'IT Share (Egypt)',
    role: 'Front-End Instructor (Part-time)',
    period: 'Sep 2020 – Sep 2022',
    description:
      'Delivered MEAN & MERN front-end diploma training to 100+ students with project-based learning.',
    highlights: [
      'Prepared real-life project scenarios & exercises',
      'Conducted Angular & React workshops',
      'Mentored students on best practices'
    ]
  },
  {
    company: 'Creative Motion (UAE)',
    role: 'Front-End Developer',
    period: 'Jul 2019 – Oct 2021',
    description:
      'Built marketing sites & enterprise UI for diverse clients (React & Angular) with responsive & cross-browser focus.',
    highlights: [
      'Developed SASS utility + layout template system',
      'Improved delivery velocity through reusable components',
      'Collaborated closely with design & QA under Agile practices'
    ]
  }
];

export default function ExperiencePage() {
  return (
    <div className="container-base py-16">
      <h1 className="text-4xl font-bold mb-10">Experience</h1>
      <Timeline items={experience} />
    </div>
  );
}
