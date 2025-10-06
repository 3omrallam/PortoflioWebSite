export const metadata = { title: 'Blog' };

export default function BlogPage() {
  return (
    <div className="container-base py-16">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-muted mb-8">Coming soon: articles on performance, DX, and design systems.</p>
      {/* TODO: Implement blog list with tags, search, reading time */}
    </div>
  );
}
