export const metadata = { title: 'About' };
import { resumeData } from '@/data/resume';

const skillGroups: { label: string; items: string[] }[] = [
  {
    label: 'Frontend Frameworks',
    items: ['React.js', 'Angular', 'Next.js', 'JavaScript (ES2023)', 'TypeScript']
  },
  { label: 'Markup & Styling', items: ['HTML', 'CSS / SASS / SCSS', 'Tailwind CSS', 'Bootstrap'] },
  { label: 'Component Libraries', items: ['Angular Material', 'MUI', 'React Bootstrap'] },
  { label: 'UI / UX & Design', items: ['Figma', 'Adobe XD', 'Accessibility (WCAG)'] },
  { label: 'Testing', items: ['Cypress', 'Jest', 'Jasmine'] },
  { label: 'Architecture', items: ['Webpack', 'Nx Monorepos', 'Module Federation'] },
  { label: 'DevOps / VCS', items: ['Git', 'GitHub', 'Bitbucket', 'Azure'] },
  { label: 'Backend & APIs', items: ['Node.js', 'Laravel', 'MongoDB', 'MySQL'] },
  { label: 'Integrations', items: ['ZOHO CRM', 'Google Maps', 'Intercom', 'Zoom APIs', 'Zapier', 'Teller'] },
  { label: 'Practices', items: ['Agile / Scrum', 'Jira', 'Code Reviews', 'Team Mentorship', 'ClickUp'] }
];

export default function AboutPage() {
  return (
    <div className="container-base py-16 space-y-16">
      <section className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
        <p className="text-fg-muted max-w-3xl leading-relaxed">
          I’m a Senior Front-End Engineer with 7+ years building scalable, performance-driven web
          applications. Expertise across React, Angular, and Next.js with a strong focus on design
          systems, modular architectures, and CI/CD acceleration. I love debugging complex UI
          issues, shaping reusable component libraries, and collaborating with cross-functional
          teams to elevate user experience.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Skills & Tooling</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <div key={g.label} className="rounded-xl border border-border/50 p-5 bg-bg/40 backdrop-blur">
              <h3 className="text-sm font-semibold mb-3 tracking-wide text-primary uppercase">
                {g.label}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <li
                    key={i}
                    className="text-xs rounded-md bg-primary/10 text-primary px-2 py-1 font-medium border border-primary/15"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Key Achievements</h2>
        <ul className="space-y-3 text-sm max-w-4xl">
          {resumeData.achievements.map((a) => (
            <li key={a} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-accent" />
              <span className="text-fg-muted leading-relaxed">{a}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-10 md:grid-cols-3">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Education</h2>
          <div className="rounded-lg border border-border/50 p-4 bg-bg/40 backdrop-blur">
            <p className="font-medium">{resumeData.education[0].degree}</p>
            <p className="text-sm text-fg-muted">{resumeData.education[0].institution}</p>
            <p className="text-xs text-fg-muted mt-1">{resumeData.education[0].period}</p>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Languages</h2>
          <ul className="rounded-lg border border-border/50 p-4 bg-bg/40 backdrop-blur text-sm space-y-2">
            {resumeData.languages.map(l => (
              <li key={l.name}><span className="font-medium">{l.name}:</span> {l.level}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Certification</h2>
          <div className="rounded-lg border border-border/50 p-4 bg-bg/40 backdrop-blur text-sm">
            {resumeData.certification.map(c => (
              <p key={c} className="font-medium">{c}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
