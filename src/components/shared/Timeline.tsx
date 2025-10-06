type TimelineItem = {
  company: string;
  role: string;
  period: string;
  description: string;
  logo?: string;
  highlights?: string[];
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative border-l border-border/40 ml-4">
      {items.map((item, idx) => (
        <li key={idx} className="mb-10 ml-6">
          <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full border border-border/60 bg-bg/60 backdrop-blur">
            <span className="h-3 w-3 rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
          </span>
          <h3 className="text-lg font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text ">
              {item.role}
            </span>{' '}
            <span className="text-fg-muted">· {item.company}</span>
          </h3>
          <time className="text-[11px] uppercase tracking-wide text-fg-muted/80 font-medium">
            {item.period}
          </time>
          <p className="mt-2 text-sm text-fg-muted leading-relaxed">{item.description}</p>
          {item.highlights && (
            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm">
              {item.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
