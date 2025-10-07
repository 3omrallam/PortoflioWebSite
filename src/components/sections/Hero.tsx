"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/utils';
import Button from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative container-base pt-24 pb-32">
      <div className="flex flex-col-reverse gap-12 md:grid md:grid-cols-12 md:items-center">
        <div className="col-span-7 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl gradient-text"
          >
            {siteConfig.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="text-lg text-fg-muted max-w-xl leading-relaxed"
          >
            👋 Hi, I’m Omar — a Senior
            Front-End Developer & Architect specializing in React.js, Next.js, and modern,
            scalable web applications. I help startups, enterprises, and government
            projects build high-performing, SEO-friendly, pixel-perfect web apps that
            deliver results. 💡 With years of hands-on experience in SaaS, dashboards, and
            design systems, I focus on clarity, collaboration, and clean code — turning
            ideas into beautiful, maintainable digital experiences. 🚀 Let’s build
            something impactful — from MVPs to large-scale platforms.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-wrap gap-4"
          >
            <Button href="/contact" >
              Hire Me
            </Button>
            <Button href="/OmatAllamResume.pdf" variant="outline" download>
              Download CV
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="col-span-5 justify-self-center"
        >
          <div className="relative h-52 w-52 sm:h-64 sm:w-64 rounded-full overflow-hidden border-4 border-border shadow-[0_0_0_1px_hsl(var(--border)),0_0_40px_-10px_hsl(var(--primary)/0.55)]">
            <Image
              src="/OmarImage.jpg"
              alt="Profile"
              // fill
              /* Adjust the object position to center your face. Example: 50% 30% moves focus slightly upward. */
              className="object-cover object-[60%_0%]"
              height={256}
              width={256}
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
