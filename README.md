# Geez Creationz — Website

Portfolio website for Geez Creationz, an all-in-one creative studio (animation, game design, and marketing).

## Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org) (App Router) with React 19
- **Styling** — Tailwind CSS v4
- **Database** — MongoDB (with the official `mongodb` driver)
- **Auth** — Custom JWT-based admin authentication (`jose`, `bcryptjs`)
- **Animations** — GSAP + Lenis smooth scrolling
- **Icons** — lucide-react
- **Deployment** — Vercel

## Features

- Multi-section landing page: hero, services, case studies, clients, FAQs, booking
- Admin panel (`/admin`) with JWT-protected dashboard
## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Copy `.env.example` to `.env` and fill in the required values (MongoDB URI, JWT secret, etc).

## Live

[GeezCreationz](https://geezcreationz.com/)
