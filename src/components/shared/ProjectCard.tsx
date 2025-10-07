"use client";
import { Project } from '@/lib/utils';
import { ExternalLink, Github, ArrowUpRight, Lock, X } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

export function ProjectCard({ project }: { project: Project }) {
  const hasLive = typeof project.live === 'string' && project.live.trim().length > 0;
  const isConfidential = project.live === '' && !hasLive;
  const [open, setOpen] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  // interactive tilt state via CSS vars (no re-renders)
  const handlePointerMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 -> 1
    const y = (e.clientY - rect.top) / rect.height; // 0 -> 1
    // convert to -1 -> 1 centered
    const mx = (x - 0.5) * 2;
    const my = (y - 0.5) * 2;
    el.style.setProperty('--mx', mx.toFixed(3));
    el.style.setProperty('--my', my.toFixed(3));
  };

  const resetPointer = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--mx', '0');
    el.style.setProperty('--my', '0');
  };

  // Lock body scroll when modal open
  React.useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);
  return (
    <>
    <div
      ref={cardRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
      className="group relative flex flex-col rounded-xl border border-border/50 overflow-hidden bg-bg/35 backdrop-blur-xl
      transition duration-300 hover:shadow-[0_8px_36px_-12px_hsl(var(--primary)/0.55)] hover:border-primary/40 will-change-transform"
      style={{
        // root subtle perspective tilt for the whole card
        transform: 'perspective(1400px) rotateX(calc(var(--my,0)*5deg)) rotateY(calc(var(--mx,0)*5deg))',
        '--mx': '0',
        '--my': '0'
      } as React.CSSProperties}
    >
      {/* Animated outline / glow ring */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500">
        <div className="absolute inset-0 rounded-xl [mask:linear-gradient(white,transparent_60%)] before:content-[''] before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-[conic-gradient(from_140deg,var(--tw-gradient-stops))] before:[--tw-gradient-from:hsl(var(--primary)/0.35)] before:[--tw-gradient-to:hsl(var(--secondary)/0.35)] before:[--tw-gradient-stops:hsl(var(--primary)/0.55),hsl(var(--secondary)/0.55),hsl(var(--accent)/0.55),hsl(var(--primary)/0.55)] before:animate-[spin_8s_linear_infinite]" />
      </div>
  {(project.screenshots?.length ?? 0) > 0 ? (
        <div className="relative h-44 w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
          <div
            className="relative w-[340px] h-[170px] [perspective:1600px] transition-transform duration-500 ease-out"
            style={{
              transform: 'rotateX(calc(var(--my,0)*7deg)) rotateY(calc(var(--mx,0)*7deg)) translateZ(0)'
            }}
          >
            {project.screenshots!.slice(0,3).map((shot, i) => {
              const rotations = ['-6deg','0deg','6deg'];
              const offsets = ['-14%','0%','14%'];
              const depth = [18, 34, 22]; // px translateZ
              const parallax = [6, 10, 6]; // % multiplier for var based movement
              return (
                <div
                  key={shot}
                  className="absolute top-1/2 left-1/2 w-[210px] h-[130px] -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden shadow-[0_4px_18px_-6px_hsl(var(--primary)/0.4)] border border-border/60 bg-bg/50 backdrop-blur-sm transition-transform duration-500 ease-out group-hover:shadow-[0_6px_28px_-10px_hsl(var(--primary)/0.55)]"
                  style={{
                    transform: `translate(-50%,-50%) translateX(${offsets[i]}) rotate(${rotations[i]}) translateZ(${depth[i]}px) translateX(calc(var(--mx,0)*${parallax[i]}%)) translateY(calc(var(--my,0)*${parallax[i]}%))`,
                    zIndex: i===1?30:10+i,
                    willChange: 'transform'
                  }}
                >
                  <Image
                    src={shot}
                    alt={`${project.title} screenshot ${i+1}`}
                    fill
                    className="object-cover select-none pointer-events-none"
                    sizes="210px"
                    draggable={false}
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
        <div className="pt-2 flex flex-wrap gap-3 items-center">
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
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1 text-xs font-medium rounded-md px-3 py-2 border border-border/60 bg-bg/60 backdrop-blur hover:border-primary/50 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-label={`More details about ${project.title}`}
          >
            More Details
          </button>
        </div>
      </div>
  </div>
  {open ? (
    <div
        className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-4 md:p-10"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
        onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_70%),linear-gradient(to_bottom_right,hsl(var(--bg)/0.85),hsl(var(--bg)/0.95))] backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border/60 bg-bg/90 shadow-xl backdrop-blur-xl p-6 md:p-10 animate-[fadeIn_.4s_ease]">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 rounded-full p-2 bg-bg/70 border border-border/60 hover:text-primary hover:border-primary/50 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex flex-col gap-6">
            <header className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">{project.title}</h2>
              <p className="text-sm text-fg-muted leading-relaxed whitespace-pre-line">{project.description}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.map(t => (
                  <span key={t} className="rounded-md bg-primary/12 text-primary px-2 py-1 text-[11px] font-medium border border-primary/15">{t}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-3">
                {hasLive && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium rounded-md px-3 py-2 border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Live
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium rounded-md px-3 py-2 border border-border/60 hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" /> Code
                  </a>
                )}
                {isConfidential && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium rounded-md px-3 py-2 border border-border/60 bg-border/30 text-fg-muted">
                    <Lock className="h-3.5 w-3.5" /> Confidential
                  </span>
                )}
              </div>
            </header>
            {(project.screenshots?.length ?? 0) > 0 && (
              <section className="grid gap-4 md:grid-cols-3">
                {project.screenshots!.slice(0,6).map((shot, i) => (
                  <div key={shot} className="relative group/screen aspect-video rounded-lg overflow-hidden border border-border/50 bg-bg/40 shadow-sm">
                    <Image
                      src={shot}
                      alt={`${project.title} screenshot ${i+1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover/screen:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-bg/20 to-transparent opacity-0 group-hover/screen:opacity-100 transition-opacity" />
                  </div>
                ))}
              </section>
            )}
            {project.highlights && project.highlights.length > 0 && (
              <section className="space-y-3 mt-2">
                <h3 className="text-sm font-semibold tracking-wide uppercase text-fg/70">Key Highlights</h3>
                <ul className="grid gap-2 text-sm leading-relaxed list-none pl-0">
                  {project.highlights.map(h => (
                    <li key={h} className="relative pl-5">
                      <span className="absolute left-0 top-[0.55em] -translate-y-1/2 size-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent shadow-[0_0_0_3px_hsl(var(--bg))]" />
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    ) : null}
    </>
  );
}
