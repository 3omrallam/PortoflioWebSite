# Senior Front-End Engineer Portfolio

Modern, professional, and responsive personal portfolio built with **Next.js 15 (App Router)**, **Tailwind CSS**, **TypeScript**, and **Framer Motion**. Optimized for performance, accessibility, SEO, and deployment on **Vercel**.

## ✨ Features
- App Router architecture (Next.js 15)
- Dark/Light theme with persistence (next-themes)
- Responsive, accessible, semantic UI
- Framer Motion animations
- Project, Experience, Blog (Markdown), and Contact pages
- SEO via Next.js Metadata API + Open Graph/Twitter cards
- Contact form (React Hook Form + Yup) ready for Resend / Formspree
- Lazy-loaded components & optimized images via `next/image`

## 🗂 Folder Structure
```
src/
  app/
    layout.tsx
    page.tsx
    not-found.tsx
    about/ (TBD)
    projects/ (TBD)
    experience/ (TBD)
    blog/ (TBD)
    contact/ (TBD)
  components/
    layout/
    sections/
    shared/
    ui/
  lib/
  data/
  hooks/
public/
content/blog/
```

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run dev server
```bash
npm run dev
```
Visit http://localhost:3000

### 3. Environment Variables
Copy `.env.example` to `.env.local` and fill values.

```bash
cp .env.example .env.local
```

## 📨 Contact Form Setup (Resend)
Set `RESEND_API_KEY`, `CONTACT_FORM_TO_EMAIL`, `CONTACT_FORM_FROM_EMAIL` in `.env.local`.

## 🛠 Tech Stack
- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form + Yup
- Resend (email) / Formspree alternative
- Lucide Icons

## 📄 Deployment (Vercel)
1. Push repo to GitHub
2. Import to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

Add optional `vercel.json` if you need custom headers/redirects.

## 🔧 Scripts
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm start` – run production build
- `npm run lint` – lint code
- `npm run type-check` – TypeScript diagnostics

## 🧩 Next Steps
- Implement remaining pages & sections
- Add ProjectCard, Timeline, Testimonial components
- Add blog reading progress + tag filtering
- Add motion variants central config
- Add sitemap & robots.txt

## 📬 Attribution
Inspired by modern engineering portfolios (Vercel, Lee Robinson, Josh Comeau).

---
Feel free to customize and extend.
