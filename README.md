# Pono ya Moya

An anti-disciplinary platform that centers traditional healing and similar immersions in the 'otherwise'.

## About

Pono ya Moya is a modern web platform built with Next.js, featuring services including consultations, cleansing and home fortification, collective offerings, and workshops. The site is powered by Sanity CMS for content management and includes a contact form with email integration.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: [Sanity](https://www.sanity.io/)
- **Email**: EmailJS for contact form submissions
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the site.

### Build

```bash
pnpm build
pnpm start
```

## Project Structure

```
app/
├── components/       # Reusable React components
├── icons/           # SVG icon components
├── api/             # Next.js API routes (contact form)
├── lib/
│   └── sanity/      # Sanity CMS client and queries
├── contact/         # Contact page
├── about/           # About page
├── offerings/       # Offerings/services page
├── layout.tsx       # Root layout
└── page.tsx         # Home page
```

## Features

- Responsive design
- Contact form with email notifications
- Sanity CMS integration for dynamic content
- Server-side rendering with Next.js App Router
- TypeScript for type safety

## Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_EMAIL_JS_SERVICE_ID=
NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID=
NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY=
NEXT_PUBLIC_EMAIL_JS_PRIVATE_KEY=
```

## Deployment

Deploy on [Vercel](https://vercel.com) for the best Next.js experience:

```bash
vercel deploy
```

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
