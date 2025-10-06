import { Project } from '@/lib/utils';
import { ExternalLink, Github, ArrowUpRight, Lock } from 'lucide-react';
import Image from 'next/image';

export function ProjectCard({ project }: { project: Project }) {
  const hasLive = typeof project.live === 'string' && project.live.trim().length > 0;
  const isConfidential = project.live === '' && !hasLive;
  return (
    <div
      className="group relative flex flex-col rounded-xl border border-border/50 overflow-hidden bg-bg/35 backdrop-blur-xl
      transition duration-300 hover:shadow-[0_4px_30px_-10px_hsl(var(--primary)/0.4)] hover:border-primary/40"
    >
      {/* Animated outline / glow ring */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500">
        <div className="absolute inset-0 rounded-xl [mask:linear-gradient(white,transparent_60%)] before:content-[''] before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-[conic-gradient(from_140deg,var(--tw-gradient-stops))] before:[--tw-gradient-from:hsl(var(--primary)/0.35)] before:[--tw-gradient-to:hsl(var(--secondary)/0.35)] before:[--tw-gradient-stops:hsl(var(--primary)/0.55),hsl(var(--secondary)/0.55),hsl(var(--accent)/0.55),hsl(var(--primary)/0.55)] before:animate-[spin_8s_linear_infinite]" />
      </div>
      {(project.screenshots && project.screenshots.length > 0) ? (
        <div className="relative h-44 w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
          <div className="relative w-[340px] h-[170px] [perspective:1600px]">
            {project.screenshots.slice(0,3).map((shot, i) => {
              const rotations = ['-6deg','0deg','6deg'];
              const offsets = ['-14%','0%','14%'];
              return (
                <div
                  key={shot}
                  className="absolute top-1/2 left-1/2 w-[210px] h-[130px] -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden shadow-[0_4px_18px_-6px_hsl(var(--primary)/0.4)] border border-border/60 bg-bg/50 backdrop-blur-sm transition-transform duration-500 group-hover:scale-105"
                  style={{
                    transform:`translate(-50%,-50%) translateX(${offsets[i]}) rotate(${rotations[i]}) translateZ(${i===1? '30px':'0'})`,
                    zIndex: i===1?30:10+i
                  }}
                >
                  <Image
                    src={shot}
                    alt={`${project.title} screenshot ${i+1}`}
                    fill
                    className="object-cover"
                    sizes="210px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-bg/10 to-transparent opacity-0 group-hover:opacity-60 transition-opacity" />
                </div>
              );
            })}
          </div>
          {/* Floating pills on top */}
          <div className="absolute top-3 right-3 flex gap-2 translate-y-[-6px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-40">
            {hasLive && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-bg/70 backdrop-blur px-3 py-1 text-xs font-medium text-primary hover:text-secondary border border-border/60 hover:border-primary/50 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Live
              </a>
            )}
            {isConfidential && (
              <div className="inline-flex items-center gap-1 rounded-full bg-border/40 backdrop-blur px-3 py-1 text-xs font-medium text-fg-muted border border-border/60">
                <Lock className="h-3.5 w-3.5" /> Confidential
              </div>
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
      ) : project.image && (
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.65),rgba(0,0,0,0.15)_60%,transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-3 right-3 flex gap-2 translate-y-[-6px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            {hasLive && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-bg/70 backdrop-blur px-3 py-1 text-xs font-medium text-primary hover:text-secondary border border-border/60 hover:border-primary/50 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Live
              </a>
            )}
            {isConfidential && (
              <div className="inline-flex items-center gap-1 rounded-full bg-border/40 backdrop-blur px-3 py-1 text-xs font-medium text-fg-muted border border-border/60">
                <Lock className="h-3.5 w-3.5" /> Confidential
              </div>
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
          <h3 className="font-semibold text-lg mb-1 tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text ">
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
          {isConfidential ? (
            <div className="inline-flex items-center gap-2 text-xs font-medium text-fg-muted bg-border/30 px-3 py-2 rounded-md border border-border/60">
              <Lock className="h-4 w-4" /> Not authorized to show live preview
            </div>
          ) : (
            <a
              href={project.live || project.repo || '#'}
              target={project.live || project.repo ? '_blank' : undefined}
              rel={project.live || project.repo ? 'noreferrer' : undefined}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-secondary transition-colors group/button"
            >
              View Project <ArrowUpRight className="h-4 w-4 transition-transform group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
