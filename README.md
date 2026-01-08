# ModelLink MVP Wireframe

A white-label model portfolio platform built with Vite, React 19, TypeScript, and Tailwind CSS. This wireframe provides a functional, interactive prototype for showcasing model portfolios with customizable agency branding.

## Features

- **Model Profiles**: Individual profile pages with photos, stats, video reels, galleries, and work history
- **Portfolio Galleries**: Genre-based image galleries (Formal, Streetwear, Summer, Commercial, Editorial)
- **Video Reels**: Horizontal scrollable video thumbnails with lightbox playback
- **Experience Timeline**: Work history with brand collaborations and project details
- **Agency Customization**: Theme customization panel with color palettes, fonts, and logo placement
- **Responsive Design**: Mobile-first design that works across all device sizes
- **Smooth Animations**: Framer Motion powered micro-interactions and transitions

## Tech Stack

- **Framework**: Vite 5 + React 19
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS + custom Liquid Glass utilities
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
cd Modelink
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
Modelink/
├── src/
│   ├── api/                # Client-side data helpers (models, agencies, inquiries)
│   ├── components/         # React components + Liquid Glass primitives
│   ├── data/               # Mock agencies/models/types
│   ├── hooks/              # Theme + utility hooks
│   ├── lib/                # Palette + helper utilities
│   ├── pages/              # Route components (Home, ModelProfile, Customize)
│   ├── styles/             # Tailwind + Liquid Glass style layers
│   ├── App.tsx             # Router layout
│   └── main.tsx            # Vite entry point
├── index.html              # Document head + font preloads
├── vite.config.ts          # Vite + alias configuration
├── tailwind.config.ts      # Tailwind theme extensions
└── tsconfig.json           # TypeScript compiler settings
```

## Component Usage

### ModelCard

Displays a model card on the landing page with hover effects:

```tsx
import { ModelCard } from "@/components/ModelCard";

<ModelCard model={modelData} />
```

### ProfileHero

Shows model profile information with stats and CTA:

```tsx
import { ProfileHero } from "@/components/ProfileHero";

<ProfileHero model={modelData} agencyName="Agency Name" />
```

### VideoReel

Horizontal scrolling video gallery:

```tsx
import { VideoReel } from "@/components/VideoReel";

<VideoReel videos={modelData.videos} />
```

### GallerySection

Tabbed image galleries by genre:

```tsx
import { GallerySection } from "@/components/GallerySection";

<GallerySection galleries={modelData.galleries} />
```

### ExperienceTimeline

Work history timeline:

```tsx
import { ExperienceTimeline } from "@/components/ExperienceTimeline";

<ExperienceTimeline experience={modelData.experience} />
```

## Data Helpers

`src/api` exposes tiny helpers that mirror the previous Next.js API routes:

- `getAllModels()` / `getModelBySlug(slug)` – return mock model data
- `getAgencies()` / `getAgencyById(id)` / `getAgencyBySlug(slug)` – return agencies with embedded models
- `submitInquiry(payload)` – logs booking inquiries (wireframe mode)

## Customization

The customization panel (`/admin/customize`) allows agencies to:

- Select color palettes (Blush, Sage, Lavender, or Custom)
- Choose font pairings (Inter, Outfit, Playfair)
- Upload and position logos
- Toggle section visibility
- Preview changes in real-time

## Color Palettes

Default pastel color schemes:

- **Blush**: `#F8E8E8` (primary), `#FDF5F5` (secondary)
- **Sage**: `#E8F0E8` (primary), `#F0F5F5` (secondary)
- **Lavender**: `#EDE8F5` (primary), `#F5F0FA` (secondary)
- **Cream**: `#FDF9F3` (background)

## Deployment

- `npm run build` produces a static `dist/` bundle
- `npm run preview` serves the bundle locally
- Deploy `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, S3, etc.)

## Development Notes

- **Mock Data**: All data is stored in TypeScript files (`data/mockModels.ts`, `data/mockAgencies.ts`)
- **No Database**: This is a wireframe - no database connection required
- **Type Safety**: Full TypeScript support with strict mode enabled
- **Responsive**: Mobile-first design with Tailwind breakpoints
- **Animations**: Framer Motion for smooth micro-interactions

## Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Authentication system (Clerk/Auth0)
- Image upload and management
- Email notifications for inquiries
- Advanced search and filtering
- Multi-agency support with subdomains
- Analytics dashboard

## License

This is a wireframe/prototype project. All rights reserved.

