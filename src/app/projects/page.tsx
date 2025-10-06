import projects from '@/data/projects.json';
import { ProjectCard } from '@/components/shared/ProjectCard';

export const metadata = { title: 'Projects' };

export default function ProjectsPage() {
  return (
    <div className="container-base py-16">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
