import { Project } from '@/lib/utils';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="group relative flex flex-col rounded-xl border border-border/50 overflow-hidden bg-bg/35 backdrop-blur-xl
      transition duration-300 hover:shadow-[0_4px_30px_-10px_hsl(var(--primary)/0.4)] hover:border-primary/40"
    >
      {/* Animated outline / glow ring */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500">
        <div className="absolute inset-0 rounded-xl [mask:linear-gradient(white,transparent_60%)] before:content-[''] before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-[conic-gradient(from_140deg,var(--tw-gradient-stops))] before:[--tw-gradient-from:hsl(var(--primary)/0.35)] before:[--tw-gradient-to:hsl(var(--secondary)/0.35)] before:[--tw-gradient-stops:hsl(var(--primary)/0.55),hsl(var(--secondary)/0.55),hsl(var(--accent)/0.55),hsl(var(--primary)/0.55)] before:animate-[spin_8s_linear_infinite]" />
      </div>
      {project.image && (
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Image overlay gradient on hover */}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.65),rgba(0,0,0,0.15)_60%,transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Quick action floating pill */}
          <div className="absolute top-3 right-3 flex gap-2 translate-y-[-6px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-bg/70 backdrop-blur px-3 py-1 text-xs font-medium text-primary hover:text-secondary border border-border/60 hover:border-primary/50 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Live
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-bg/70 backdrop-blur px-3 py-1 text-xs font-medium text-primary hover:text-secondary border border-border/60 hover:border-primary/50 transition-colors"
              >
                <Github className="h-3.5 w-3.5" /> Code
              </a>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5 gap-4">
        <div>
          <h3 className="font-semibold text-lg mb-1 tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {project.title}
          </h3>
          <p className="text-sm text-fg-muted line-clamp-3 leading-relaxed">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md bg-primary/12 text-primary px-2 py-1 text-xs font-medium border border-primary/15 backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="pt-2">
          <a
            href={project.live || project.repo || '#'}
            target={project.live || project.repo ? '_blank' : undefined}
            rel={project.live || project.repo ? 'noreferrer' : undefined}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-secondary transition-colors group/button"
          >
            View Project <ArrowUpRight className="h-4 w-4 transition-transform group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
