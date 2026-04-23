# SynopsLabs Portfolio V2 — Roadmap

> Reference: FLEX Study (https://study.fl-ex.co.kr/) — cinematic loader, bold editorial typography, category splits, testimonial carousel
> Design: Light theme · Playfair Display · Framer Motion 3D scroll · Minimal

---

## Phase 0 — Project Setup *(Day 1)*

- [ ] Create Next.js 15 app with TypeScript + Tailwind v4 + App Router
- [ ] Install dependencies: Framer Motion, GSAP, Lucide React, next-themes, clsx, tailwind-merge
- [ ] Configure `globals.css` — design tokens (light palette), typography utilities, animation classes
- [ ] Set up Google Fonts: Playfair Display + Inter via `next/font`
- [ ] Configure `layout.tsx` — metadata, fonts, ThemeProvider (light default)
- [ ] Scaffold file structure: `components/`, `data/`, `lib/`, `public/`
- [ ] Populate `data/projects.ts` with all 19 projects + TypeScript interfaces
- [ ] Create `lib/utils.ts` — `cn()`, `getWhatsAppLink()`, `WHATSAPP_NUMBER`
- [ ] Add SynopsLabs logo to `public/images/`

---

## Phase 1 — Cinematic Loader *(Day 1–2)* ← FLEX-inspired

- [ ] Build `components/sections/loader.tsx`
- [ ] GSAP timeline: loading text lines appear one-by-one (stagger 0.3s)
  - Lines: "Fetching 19 websites...", "Loading project data...", "Building your portfolio...", "Crafting pixel-perfect UI...", "All systems ready..."
- [ ] Animated progress counter: 0% → 100% with easing
- [ ] Full-screen overlay (dark or light) with brand logo centered
- [ ] Exit animation: loader slides UP, main page reveals underneath
- [ ] Gate main content behind loader completion (`isLoaded` state)
- [ ] Skip button for repeat visitors (localStorage flag)

**Success criteria**: Loader feels cinematic, runs in ~2.5s, no jank

---

## Phase 2 — Hero Section *(Day 2)* ← 3D Scroll

- [ ] Build `components/sections/hero.tsx`
- [ ] Background: `#FAFAF8` warm white (no video)
- [ ] SynopsLabs logo — top center
- [ ] Headline: `"Web Development Portfolio"` — Playfair Display 700, large
- [ ] Sub-headline: "150+ websites delivered across healthcare, education, e-commerce and corporate sectors in UAE, India & KSA."
- [ ] CTA buttons: `"View My Work"` (scroll to #portfolio) + `"Contact Me"` (WhatsApp green)
- [ ] Staggered word-by-word Framer Motion entrance animation
- [ ] **3D scroll effect**: `useScroll` + `useTransform` → `rotateX(0 → -8deg)` + `scale(1 → 0.95)` + `opacity(1 → 0)` as user scrolls down
- [ ] Stats bar below CTAs: `150+ Websites` · `3 Countries` · `8 Industries` · `5+ Years`
  - Numbers animate up from 0 using Framer Motion `useInView`

**Success criteria**: Hero feels immersive, 3D depth on scroll is subtle but impressive

---

## Phase 3 — Navigation Header *(Day 2)*

- [ ] Build `components/layout/header.tsx`
- [ ] Floating pill nav — centered, appears after loader
- [ ] Links: Home · Work · Services · Process · Contact
- [ ] Scroll-aware active section highlight (underline or pill indicator)
- [ ] Background: transparent → frosted glass on scroll (`backdrop-filter: blur`)
- [ ] Mobile: hamburger → full-screen overlay menu
- [ ] Logo left, nav center, CTA button right (`"Let's Talk"` → WhatsApp)
- [ ] Smooth scroll to sections on click

---

## Phase 4 — Portfolio Section *(Day 3)* ← FLEX split concept adapted

- [ ] Build `components/sections/portfolio.tsx`
- [ ] Section header: `"Featured Work"` — Playfair Display
- [ ] **Split view** (FLEX-inspired): Two sub-tabs — "Client Websites" | "Demo Projects"
  - Or: unified grid with `isDemo` badge differentiation
- [ ] Industry filter tabs: All · Healthcare · Education · E-commerce · Corporate · Creative · Industrial · Hospitality · Food
- [ ] 3-col grid (desktop), 2-col (tablet), 1-col (mobile)
- [ ] Project cards: thumbnail, name, tagline, industry badge, region badge, tech pills, "View Live →"
- [ ] Card enter animation: `rotateY(-5deg → 0)` + fade on scroll into view
- [ ] Card hover: `y(-8px)` + shadow reveal + thin accent border
- [ ] Click → opens live URL in new tab
- [ ] Build `components/ui/project-card.tsx` as separate component
- [ ] Build `components/ui/filter-tabs.tsx` — animated active indicator

---

## Phase 5 — Services Section *(Day 3)*

- [ ] Build `components/sections/services.tsx`
- [ ] Section header: `"What We Build"` — Playfair Display
- [ ] 4 service cards (2×2 grid):
  1. Business Websites — icon + title + 1-line description
  2. E-commerce Platforms
  3. Educational Platforms
  4. Corporate Portals
- [ ] Light card: white bg, `1px solid rgba(28,28,28,0.1)` border
- [ ] Hover: warm accent stripe appears on left edge + subtle shadow
- [ ] Stagger entry animation on scroll into view

---

## Phase 6 — Process Section *(Day 4)*

- [ ] Build `components/sections/process.tsx`
- [ ] Section header: `"How We Work"` — Playfair Display
- [ ] 4 steps: Discovery → Design → Build → Launch
- [ ] Desktop: horizontal timeline with connecting line
- [ ] Mobile: vertical stack
- [ ] Each step: numbered circle + icon + title + 2-line description
- [ ] Steps animate in left-to-right with stagger

---

## Phase 7 — Contact Section *(Day 4)*

- [ ] Build `components/sections/contact.tsx`
- [ ] Section header: `"Let's Work Together"` — Playfair Display
- [ ] Centred WhatsApp CTA card:
  - WhatsApp icon + phone number: +971 56 627 2141
  - `"Start WhatsApp Chat"` button (green `#25D366`)
  - "Usually responds within 2 hours" badge
- [ ] Region badges: 🇦🇪 UAE · 🇮🇳 India · 🇸🇦 KSA
- [ ] Email link: pranav@synopslabs.com
- [ ] Contact card rise-in animation: `scale(0.95 → 1)` + fade

---

## Phase 8 — Footer *(Day 4)*

- [ ] Build `components/layout/footer.tsx`
- [ ] 4-column grid:
  1. **Brand**: Logo + tagline + email + phone + location + WhatsApp button
  2. **Navigation**: Home · Work · Services · Process · Contact
  3. **Services**: Business Websites · E-commerce · Educational · Corporate
  4. **Connect**: LinkedIn, Twitter, GitHub, YouTube icons
- [ ] Bottom bar: copyright + Privacy Policy + Terms of Service
- [ ] Decorative gradient line at very bottom edge

---

## Phase 9 — Polish & Performance *(Day 5)*

- [ ] Add `loading="lazy"` to all project card images
- [ ] Add `preload` hints for hero fonts
- [ ] `useReducedMotion` check — disable animations for accessibility
- [ ] Ensure all external links have `target="_blank" rel="noopener noreferrer"`
- [ ] Semantic HTML: `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`
- [ ] All images have `alt` text
- [ ] Keyboard navigation works throughout
- [ ] Test on mobile (iPhone SE, iPhone 15, iPad)
- [ ] Test on Firefox + Safari (in addition to Chrome)

---

## Phase 10 — SEO & Metadata *(Day 5)*

- [ ] Configure `layout.tsx` metadata:
  ```typescript
  export const metadata = {
    title: 'SynopsLabs — Web Development Portfolio',
    description: '150+ websites delivered across healthcare, education, e-commerce and corporate sectors in UAE, India & KSA.',
    metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
    openGraph: { ... },
    twitter: { card: 'summary_large_image', ... },
  };
  ```
- [ ] Add LocalBusiness JSON-LD structured data
- [ ] Verify `<h1>` used only once (hero headline)
- [ ] Add `robots.txt` and `sitemap.xml`
- [ ] Confirm no console errors or warnings

---

## Phase 11 — Deployment *(Day 5–6)*

- [ ] `git init` + create GitHub repo
- [ ] Push to `main` branch
- [ ] Connect to Vercel → auto-deploy
- [ ] Test production build (`npm run build` locally first)
- [ ] Set `VERCEL_URL` env var if needed
- [ ] Verify all 19 project links open correctly
- [ ] Run Lighthouse audit → target ≥ 90 on all metrics
- [ ] Share production URL

---

## Phase 12 — 3D Enhancements *(V2.5 — Completed)*

- [x] Floating particle field behind hero (canvas 2D + mouse parallax)
- [x] 3D flip stat counters (rotateX 90deg to 0deg with count-up)
- [x] 3D tilt-on-hover portfolio split panels (perspective 800px + radial shine)
- [x] SVG scroll-drawn process timeline (golden line + glowing nodes)
- [x] Horizontal scroll carousel (3D perspective cards with rotateY)
- [x] Procedural golden wireframe tunnel (canvas 2D, scroll-driven)

---

## Phase 13 — Device Showcase *(V2.5 — Completed)*

- [x] Playwright automation: 24 OG screenshots (all projects)
- [x] Playwright automation: 7 scroll-recording videos (featured projects)
- [x] FFmpeg WebM to MP4 conversion for Safari/iOS
- [x] Device Showcase section (laptop/phone mockups with scroll-synced video)
- [x] Real screenshots in project cards (replacing gradient placeholders)
- [x] Ambient background video layer (with CSS fallback)

---

## Phase 14 — New Projects Added *(V2.5)*

- [x] ElitePoint CS (corporate, UAE)
- [x] Malik Al Harir Fashions (ecommerce, UAE)
- [x] Harven LLC (corporate, UAE) — with scroll recording
- [x] Miracle Designs Boutique (ecommerce)
- [x] NAMU UAE (corporate, UAE)

Total: 24 projects (18 client + 6 demo)

---

## Phase 15 — Veo Video Integration *(Pending)*

- [ ] Generate ambient background loop video (Flow/Veo)
- [ ] Generate tunnel transition video (Flow/Veo)
- [ ] Extract tunnel frames via FFmpeg (192 frames)
- [ ] Swap procedural tunnel for video frame tunnel
- [ ] Place ambient-bg.mp4 in public/

---

## Phase 16 — Future Enhancements *(Post-Launch)*

- [ ] Add project detail modal
- [ ] Add contact form (Formspree or Resend)
- [ ] Add Google Analytics or Plausible tracking
- [ ] CMS integration (Sanity.io)
- [ ] Case study pages for 6 featured projects
- [ ] Client testimonials section
- [ ] Blog / insights section

---

## Design Quality Checklist (Before Launch)

- [x] Cinematic loader runs smoothly
- [x] Hero 3D scroll feels premium
- [x] All 24 projects display correctly
- [x] Industry filter tabs work
- [x] WhatsApp button works (+971566272141)
- [x] Real screenshots on all project cards
- [x] Device showcase plays scroll recordings
- [ ] Mobile layout pixel-perfect
- [ ] No horizontal scroll on mobile
- [x] Light theme consistent everywhere
- [x] Typography hierarchy clear
- [x] All hover states polished

---

## Reference URLs

| Purpose | URL |
|---------|-----|
| Reference (FLEX) | https://study.fl-ex.co.kr/ |
| Reference (MindHyve) | https://www.mindhyve.ai/ |
| SynopsLabs main | https://synopslabs.com |
| Framer Motion docs | https://www.framer.com/motion/ |
| GSAP docs | https://gsap.com/docs/ |
| Next.js 16 docs | https://nextjs.org/docs |
| Tailwind v4 docs | https://tailwindcss.com/docs |

