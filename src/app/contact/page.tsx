import ContactForm from '@/components/shared/ContactForm';
import { siteConfig } from '@/lib/utils';

export const metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <div className="container-base py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Get In Touch</h1>
      <p className="text-muted mb-8 max-w-2xl">
        Have a project or opportunity? I’d love to hear about it. Use the form below or reach
        out directly.
      </p>
      <div className="mb-10 grid gap-6 sm:grid-cols-2 text-sm">
        <div className="rounded-lg border border-border/50 p-4 bg-bg/40 backdrop-blur">
          <p className="font-medium mb-1">Email</p>
          <a href={siteConfig.links.email} className="text-primary hover:underline break-all">
            {siteConfig.links.email.replace('mailto:', '')}
          </a>
        </div>
        <div className="rounded-lg border border-border/50 p-4 bg-bg/40 backdrop-blur">
          <p className="font-medium mb-1">Phone</p>
          <p className="text-primary">{siteConfig.contact.phone}</p>
        </div>
        <div className="rounded-lg border border-border/50 p-4 bg-bg/40 backdrop-blur">
          <p className="font-medium mb-1">Location</p>
          <p className="text-fg-muted">{siteConfig.contact.location}</p>
        </div>
        <div className="rounded-lg border border-border/50 p-4 bg-bg/40 backdrop-blur">
          <p className="font-medium mb-1">LinkedIn</p>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            {siteConfig.links.linkedin}
          </a>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
