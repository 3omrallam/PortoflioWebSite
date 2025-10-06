export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border/60 py-10 text-sm bg-bg/30 backdrop-blur-xl">
      <div className="container-base flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-fg-muted">© {year} Your Name. All rights reserved.</p>
        <p className="text-fg-muted">Built with <span className="text-primary font-medium">Next.js 15</span>, <span className="text-secondary font-medium">Tailwind CSS</span>, and <span className="text-accent font-medium">❤️</span></p>
      </div>
    </footer>
  );
}
