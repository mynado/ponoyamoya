# Moya/Abyssal (formerly known as Pono ya Moya)

A contemporary platform for spiritual practice, ancestral knowledge, creative work, and reflective writing. The site is structured around two primary branches: ndumba (ancestral and spiritual work) and abyss (creative practice), with journal, contact, and about pages supporting the broader platform.

## What this site includes

- A landing page that directs visitors to the two main practice areas
- A ndumba section for offerings, consultations, and healing-related content
- An abyss section for archival and artistic work
- A journal for publishing essays and reflections
- An about page for contextual writing
- A contact form connected to EmailJS
- Content managed through Sanity CMS

## Current stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Sanity CMS
- EmailJS for contact submissions
- pnpm

## Local development

### Prerequisites

- Node.js 20+
- pnpm
- A Sanity project with access to the configured dataset
- EmailJS credentials for the contact form

### Install dependencies

```bash
pnpm install
```

### Start the app

```bash
pnpm dev
```

Then open http://localhost:3000 in your browser.

### Production build

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

## Environment variables

Create a `.env.local` file in the project root with values similar to:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_STUDIO_URL=
SANITY_VIEWER_TOKEN=
NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY=
EMAIL_JS_SERVICE_ID=
EMAIL_JS_TEMPLATE_ID=
EMAIL_JS_PRIVATE_KEY=
```

These values power the Sanity client and the contact form API route.

## Project structure

```bash
app/
├── about/                  # About page
├── abyss/                  # Creative practice archive and detail pages
├── api/
│   ├── contact/            # EmailJS contact endpoint
│   ├── draft-mode/        # Draft mode routes
│   └── revalidate*        # Sanity revalidation endpoints
├── contact/                # Contact page with EmailJS form
├── journal/                # Journal listing and article pages
├── ndumba/                 # Healing / offering page
├── globals.css             # Global styling
├── layout.tsx              # Root layout and metadata
├── page.tsx                # Landing page
├── not-found.tsx           # 404 page
├── error.tsx               # Error boundary
├── loading.tsx            # Optional loading UI if added later
components/
├── ui/                     # Reusable UI components
├── ContactForm.tsx         # Contact form
├── Header.tsx              # Navigation and mobile menu
├── Footer.tsx              # Footer / social links
├── FooterWrapper.tsx       # Footer composition
├── DisableDraftMode.tsx    # Draft mode helper
icons/                     # SVG icon assets
lib/
├── sanity/
│   ├── client.ts           # Sanity client configuration
│   ├── queries/            # Query modules for pages/posts/offerings
│   ├── seo.ts              # SEO metadata helpers
│   ├── types/              # TypeScript models
│   └── utils.ts            # Sanity asset helpers
└── ...
public/
├── robots.txt
├── sitemap.xml
package.json
pnpm-lock.yaml
```

## Site architecture

The app is currently organized around a content-driven editorial structure:

- Home: landing page with ndumba and abyss entry points
- ndumba: service/offering content and consultation calls-to-action
- abyss: portfolio/archive content from Sanity
- journal: editorial posts and notes
- contact: inquiry form that can preselect an offering by subject

## Content model

The site is backed by Sanity documents for pages and content collections, including:

- about page
- contact page
- offerings
- portfolio entries
- journal pages
- site settings with navigation and social links

## Deployment

This project is designed to deploy well on Vercel as a Next.js app.

```bash
vercel deploy
```

For more details, see the Next.js deployment guide: https://nextjs.org/docs/app/building-your-application/deploying

## Notes

This repository reflects the current site structure and app flow rather than a generic starter template. The content, navigation, and contact flow are intentionally tied to the ongoing Pono ya Moya / moyabyssal brand and editorial direction.
