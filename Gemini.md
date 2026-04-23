# SynopsLabs Portfolio V2 — Gemini.md (AI Context)

> This file is the AI assistant context for building the SynopsLabs Portfolio V2.
> Read this before every coding session. It contains all the decisions made.

---

## Project Identity

- **Project Name**: SynopsLabs Portfolio V2
- **Type**: Web development agency portfolio — single-page Next.js app
- **Owner**: Pranav Kithkin
- **Email**: pranav@synopslabs.com
- **WhatsApp**: +971 56 627 2141
- **Location**: Dubai, UAE
- **Regions Served**: UAE 🇦🇪 · India 🇮🇳 · KSA 🇸🇦

---

## Reference Site

**FLEX Study** — https://study.fl-ex.co.kr/

Key design elements to replicate:
1. **Cinematic loading sequence** — animated text lines appear one-by-one with a progress counter (e.g. "Assembling robot... 0% → 100%")
2. **Bold, full-screen hero** — large typography, immersive, editorial feel
3. **Split category sections** — e.g. Designer / Developer (adapt to: Client Websites / Demo Websites)
4. **Horizontal scroll or card carousel for project reviews/work**
5. **Smooth route transitions** — page feels like a designed experience, not a website
6. **Minimal nav** — pill or underline style, floats above content
7. **Review/testimonial carousel** — scrolling cards (adapt to: project showcase)
8. **Footer** — clean, professional contact info

---

## Design Direction (Confirmed)

- **Aesthetic**: Luxury Minimal / Editorial (Light Mode)
- **NOT dark** — light theme with `#FAFAF8` warm white
- **Inspired by**: FLEX Study's cinematic UX + editorial typography
- **Differentiation**: Playfair Display on clean white + cinematic loader + 3D scroll depth

### Color Palette

```css
:root {
  --bg: #FAFAF8;           /* warm white page background */
  --surface: #FFFFFF;       /* card backgrounds */
  --foreground: #1C1C1C;   /* near-black primary text */
  --text-muted: #6B6B7B;   /* secondary text */
  --accent: #1C1C1C;       /* buttons, active borders */
  --accent-warm: #C9B99A;  /* warm gold accent stripe */
  --border: rgba(28,28,28,0.12);
  --wa-green: #25D366;     /* WhatsApp CTA ONLY */
}
```

### Typography

```
Display/Hero:    Playfair Display — 700 — clamp(3rem, 7vw, 6rem)
Section Headers: Playfair Display — 600 — clamp(2rem, 4vw, 3.5rem)
Body:            Inter — 400 — 16–18px
Labels/Tags:     Inter — 500 — 12–14px
Nav:             Inter — 500 — 14px
```

---

## Tech Stack

```
Next.js 15 (App Router)
React 19
TypeScript 5
Tailwind CSS v4
Framer Motion 12  ← primary animation engine
GSAP 3            ← loading sequence + complex timelines
Lucide React      ← icons
next-themes       ← light mode default
Google Fonts: Playfair Display + Inter
```

### Package.json Dependencies to Install

```json
{
  "dependencies": {
    "framer-motion": "^12.0.0",
    "gsap": "^3.12.0",
    "lucide-react": "latest",
    "next": "^15.0.0",
    "next-themes": "^0.4.6",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^3.0.0",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "typescript": "^5",
    "@types/react": "^19",
    "@types/node": "^20"
  }
}
```

---

## Page Structure

```
app/
├── layout.tsx          ← Root layout: fonts, ThemeProvider, metadata
├── page.tsx            ← Main SPA (imports all sections)
└── globals.css         ← Design tokens + utilities + animations

components/
├── layout/
│   ├── header.tsx      ← Floating pill nav, scroll-aware active
│   └── footer.tsx      ← 4-col grid footer
├── sections/
│   ├── loader.tsx      ← Cinematic loading sequence (FLEX-style)
│   ├── hero.tsx        ← Full-screen hero + 3D scroll effect
│   ├── portfolio.tsx   ← Project grid with filter tabs
│   ├── services.tsx    ← 4 service cards
│   ├── process.tsx     ← 4-step timeline
│   └── contact.tsx     ← WhatsApp CTA
└── ui/
    ├── project-card.tsx   ← Individual project card
    ├── filter-tabs.tsx    ← Industry filter bar
    └── stats-ticker.tsx   ← Animated number counter

data/
└── projects.ts         ← All 19 projects + types

lib/
└── utils.ts            ← cn(), getWhatsAppLink(), WHATSAPP_NUMBER
```

---

## Key Implementation Patterns

### Cinematic Loader (FLEX-inspired)

```tsx
// components/sections/loader.tsx
// GSAP timeline that:
// 1. Shows loading text lines one by one (stagger 0.3s)
// 2. Counts up 0% → 100% with easing
// 3. Slides entire loader panel UP (clip-path or Y translate)
// 4. Reveals main content underneath

const lines = [
  "Fetching project screenshots...",
  "Loading 19 websites...",
  "Building your portfolio...",
  "Crafting pixel-perfect UI...",
  "Almost ready...",
];
```

### 3D Scroll Effect (Hero)

```tsx
// components/sections/hero.tsx
const { scrollY } = useScroll();
const rotateX = useTransform(scrollY, [0, 400], [0, -8]);
const scale = useTransform(scrollY, [0, 400], [1, 0.95]);
const opacity = useTransform(scrollY, [0, 300], [1, 0]);

<motion.div style={{ rotateX, scale, opacity, perspective: 1200 }}>
  {/* hero content */}
</motion.div>
```

### Section Reveal Pattern

```tsx
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: '-80px' });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 40 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
>
```

### WhatsApp Link

```ts
// lib/utils.ts
export const WHATSAPP_NUMBER = '971566272141';
export function getWhatsAppLink(message = "Hi, I'd like to discuss a web development project.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
```

### Project Card Hover

```tsx
<motion.div
  whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}
  transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
>
```

---

## All 19 Projects (Data Reference)

### Delivered Client Websites

```typescript
// Paste directly into data/projects.ts
const clientProjects = [
  { slug: 'bwmc', name: 'BWMC', tagline: 'Professional Corporate Excellence',
    industry: 'corporate', region: 'UAE', liveUrl: 'https://bwmc.ae',
    techStack: ['React', 'Next.js', 'Tailwind CSS'], isFeatured: true },

  { slug: 'payyoli-mixture', name: 'Payyoli Mixture', tagline: 'Authentic Ayurvedic Healthcare',
    industry: 'healthcare', region: 'India', liveUrl: 'https://www.payyolimixture.co.in/',
    techStack: ['WordPress', 'WooCommerce'], isFeatured: true },

  { slug: 'alduz-trading', name: 'Alduz Trading', tagline: 'Global Trading Solutions',
    industry: 'corporate', region: 'UAE', liveUrl: 'https://www.alduztrading.com/',
    techStack: ['React', 'Node.js', 'MongoDB'], isFeatured: false },

  { slug: 'aurora-souq', name: 'Aurora Souq', tagline: 'Premium E-commerce Experience',
    industry: 'ecommerce', region: 'UAE', liveUrl: 'https://www.aurorasouq.com/',
    techStack: ['Shopify', 'Liquid'], isFeatured: true },

  { slug: 'alrizq', name: 'Al Rizq', tagline: 'Saudi Corporate Excellence',
    industry: 'corporate', region: 'KSA', liveUrl: 'https://www.alrizq.sa/',
    techStack: ['Next.js', 'Tailwind', 'i18n'], isFeatured: true },

  { slug: 'jaypee-dent', name: 'Jaypee Dent', tagline: 'Modern Dental Care',
    industry: 'healthcare', region: 'India', liveUrl: 'https://jaypeedent.com/',
    techStack: ['WordPress', 'PHP'], isFeatured: false },

  { slug: 'pixel-and-pepper', name: 'Pixel and Pepper', tagline: 'Creative Agency Portfolio',
    industry: 'creative', liveUrl: 'https://pixelandpepper.com/',
    techStack: ['React', 'GSAP'], isFeatured: true },

  { slug: 'learnix-education', name: 'Learnix Education', tagline: 'Empowering Digital Learning',
    industry: 'education', liveUrl: 'https://learnixeducation.com/',
    techStack: ['Next.js', 'Supabase'], isFeatured: false },

  { slug: 'sahara-tutors', name: 'Sahara Tutors', tagline: 'Personalized Learning Solutions',
    industry: 'education', liveUrl: 'https://saharatutors.com/',
    techStack: ['React', 'Firebase'], isFeatured: false },

  { slug: 'sun-tools-engineering', name: 'Sun Tools Engineering', tagline: 'Industrial Solutions Provider',
    industry: 'industrial', liveUrl: 'https://suntoolsengineering.com/',
    techStack: ['WordPress', 'WooCommerce'], isFeatured: false },

  { slug: 'ahalia-group', name: 'Ahalia Group', tagline: 'Diversified Business Excellence',
    industry: 'corporate', region: 'UAE', liveUrl: 'https://ahaliagroup.com/ahh/',
    techStack: ['Next.js', 'Strapi CMS'], isFeatured: true },

  { slug: 'dua-college', name: 'DUA College', tagline: 'Excellence in Education',
    industry: 'education', region: 'India', liveUrl: 'https://duacollege.in/',
    techStack: ['PHP', 'MySQL', 'Bootstrap'], isFeatured: false },

  { slug: 'ayisha-portfolio', name: 'Ayisha Portfolio', tagline: 'Creative Personal Brand',
    industry: 'creative', liveUrl: 'https://zorxmedia.com/ayisha/',
    techStack: ['React', 'Framer Motion'], isFeatured: false },
];
```

### Demo Websites

```typescript
const demoProjects = [
  { slug: 'natural-yoga', name: 'Natural Yoga', tagline: 'Wellness & Mindfulness',
    industry: 'healthcare', liveUrl: 'https://fazilfazi991natural-yoga.vercel.app/',
    techStack: ['Next.js', 'Framer Motion'], isDemo: true },

  { slug: 'jim-harvey', name: 'Jim Harvey', tagline: 'Professional Personal Brand',
    industry: 'creative', liveUrl: 'https://jimharvey.vercel.app/',
    techStack: ['Next.js', 'TypeScript'], isDemo: true },

  { slug: 'biovitazen', name: 'BioVitazen', tagline: 'Natural Health Products',
    industry: 'healthcare', liveUrl: 'https://biovitazen.vercel.app/',
    techStack: ['Next.js', 'Stripe'], isDemo: true },

  { slug: 'lamps-plus', name: 'Lamps Plus', tagline: 'Premium Lighting E-commerce',
    industry: 'ecommerce', liveUrl: 'https://lampsplus.vercel.app/',
    techStack: ['Next.js', 'Stripe'], isDemo: true },

  { slug: 'jerins-food-stuff', name: 'Jerins Food Stuff', tagline: 'Premium Food & Beverages',
    industry: 'food', liveUrl: 'https://websites-jerins-food-stuff.vercel.app/',
    techStack: ['Next.js', 'Sanity CMS'], isDemo: true },

  { slug: 'stepvision-hotel-supplies', name: 'StepVision Hotel Supplies',
    tagline: 'B2B Hospitality Solutions', industry: 'hospitality',
    liveUrl: 'https://websites-stepvision-hotel-supplies.vercel.app/',
    techStack: ['Next.js', 'PostgreSQL'], isDemo: true },
];
```

---

## Navigation Links

```typescript
const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#portfolio', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
];
```

---

## Social Links

```typescript
const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/synops-labs/' },
  { name: 'Twitter', href: 'https://twitter.com/synopslabs' },
  { name: 'GitHub', href: 'https://github.com/synopslabs' },
  { name: 'YouTube', href: 'https://youtube.com/synopslabs' },
];
```

---

## Development Commands

```bash
npx create-next-app@latest synopslabs-portfolio-v2 \
  --typescript --tailwind --app --no-src-dir --import-alias "@/*"

cd synopslabs-portfolio-v2
npm install framer-motion gsap lucide-react next-themes tailwind-merge clsx

npm run dev   # → http://localhost:3000
npm run build
npm run start
```

---

## Deployment Checklist

- [ ] `metadataBase` set in `layout.tsx` (use `VERCEL_URL` env var)
- [ ] OpenGraph image configured
- [ ] `next.config.ts` — no `unoptimized: true` (let Vercel optimize)
- [ ] `.env.local` not committed
- [ ] Push to GitHub → Vercel auto-deploys on main branch

---

## Known Issues from V1 (Do NOT repeat)

- ❌ Dark mode by default — V2 is **light mode only**
- ❌ Placeholder initials instead of real thumbnails — use OG image screenshots
- ❌ Video background in hero — removed in V2
- ❌ No loading animation — V2 has cinematic FLEX-style loader
- ❌ No industry filter — V2 has filter tab bar
- ❌ ChromaGrid dependency — V2 uses clean custom project grid
- ❌ `unoptimized: true` in next.config — causes Vercel build issues

---

## Coding Conventions

```typescript
// Always use 'use client' for animated components
// Use cn() for conditional classes
// Inline styles only for values that come from motion transforms
// All section IDs: id="home" | "portfolio" | "services" | "process" | "contact"
// Image alt text always filled
// All external links: target="_blank" rel="noopener noreferrer"
```
