type Testimonial = {
  name: string;
  position: string;
  company: string;
  message: string;
  rating?: number; // 1-5
};

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="group relative rounded-xl border border-border/50 p-6 bg-bg/35 backdrop-blur-xl flex flex-col gap-4 transition hover:shadow-[0_4px_30px_-10px_hsl(var(--primary)/0.35)]">
      <p className="text-sm leading-relaxed text-fg-muted">“{t.message}”</p>
      <div className="mt-auto">
        <p className="font-medium text-sm bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          {t.name}
        </p>
        <p className="text-[11px] uppercase tracking-wide text-fg-muted/80 font-medium mt-1">
          {t.position} · {t.company}
        </p>
        {t.rating && (
          <div className="mt-3 flex gap-1">
            {Array.from({ length: t.rating }).map((_, i) => (
              <span key={i} className="text-accent drop-shadow-[0_0_4px_hsl(var(--accent)/0.6)]">★</span>
            ))}
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 via-secondary/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
