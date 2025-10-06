export default function NotFound() {
  return (
    <div className="container-base py-32 text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-muted mb-6">This page could not be found.</p>
      <a
        href="/"
        className="inline-block rounded-md border border-border px-6 py-3 hover:bg-primary/10 transition-colors"
      >
        Go Home
      </a>
    </div>
  );
}
