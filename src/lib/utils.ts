import { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const siteConfig = {
  name: 'Omar Allam',
  title: 'Sr. Front-End Engineer',
  description:
    'Senior Front-End Engineer (7+ yrs) specializing in scalable, performance-driven web apps with React, Angular, and Next.js. Passionate about design systems, debugging, and elevating UI/UX in cross-functional teams.',
  url: process.env.SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.png',
  links: {
    github: 'https://github.com/your-handle',
    linkedin: 'https://linkedin.com/in/omar-allam-dev',
    email: 'mailto:3omrallam@gmail.com'
  },
  contact: {
    phone: '+20 114 993 9395',
    location: '1st New Cairo, Cairo, Egypt'
  }
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  repo?: string;
  live?: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
};
