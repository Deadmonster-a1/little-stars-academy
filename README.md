<div align="center">
  <h1>🌟 Little Stars Academy</h1>
  <p>A modern, interactive, and playful web application built for a kindergarten & playgroup academy.</p>
</div>

---

## 🎨 Overview

**Little Stars Academy** is a beautifully designed, high-performance web application tailored for children's education. Designed with a play-first aesthetic, the website features smooth scrolling, dynamic 3D elements, playful animations, and a secure backend for handling parent inquiries.

## ✨ Key Features

- **Immersive 3D Experience:** Interactive 3D floating elements using `three.js` and `@react-three/fiber`.
- **Fluid Animations:** Scroll-triggered animations and fluid transitions powered by `GSAP` and `motion`.
- **Smooth Scrolling:** Silky smooth native scrolling experience via `Lenis`.
- **Responsive Design:** Mobile-first, fully responsive layouts styled beautifully with Tailwind CSS v4.
- **Automated Notifications:** Form submissions are saved to a PostgreSQL database and instantly trigger HTML email notifications to administrators via Supabase Edge Functions & Resend.
- **Production Ready:** Pre-configured for Cloudflare Pages deployment with full SEO optimizations, OpenGraph tags, sitemaps, and React Router redirects.

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS, Lucide React (Icons)
- **Animation & 3D:** GSAP, Framer Motion, Three.js, React Three Fiber
- **Backend & Database:** Supabase (PostgreSQL, Row Level Security, Edge Functions)
- **Forms:** React Hook Form, Zod
- **Email:** Resend API

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"
```

### 3. Local Development
Start the Vite development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🚢 Deployment

This project is optimized for deployment on **Cloudflare Pages**. 

1. Connect this repository to your Cloudflare account.
2. Build command: `npm run build`
3. Build directory: `dist`
4. Add the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables in the Cloudflare dashboard.

_Note: The `public/_redirects` file is already included to ensure React Router handles client-side routing correctly._
