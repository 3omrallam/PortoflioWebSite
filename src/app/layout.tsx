import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Cormorant_Garamond } from 'next/font/google';
import { siteConfig } from '@/lib/utils';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { ScrollToTop } from '@/components/shared/ScrollToTop';
// Background mode provider removed (fixed background mode)
import { ClientBackground } from '@/components/layout/ClientBackground';

// Primary sans (UI)
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
// Formal serif (headings / body as requested, light weight available)
const formal = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-formal',
  display: 'swap'
});
// Monospace (code / technical snippets)
const jet = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [siteConfig.ogImage],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${formal.variable} ${jet.variable} font-formal font-light bg-bg text-fg relative min-h-screen flex flex-col`}>        
        <ClientBackground />
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}

// (DynamicBackground removed; replaced with ClientBackground client component)
