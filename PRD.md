# SynopsLabs Portfolio V2 — Product Requirements Document

> **Version:** 2.0  
> **Date:** April 2026  
> **Owner:** Pranav Kithkin — SynopsLabs AI  
> **Contact:** pranav@synopslabs.com | +971 56 627 2141  

---

## 1. Executive Summary

**SynopsLabs Portfolio V2** is a complete rebuild of the existing Zorx/SynopsLabs web development portfolio. The new site transitions from a dark-themed, card-based layout to a **minimal light-theme, 3D scroll-driven** experience — premium, editorial, and conversion-focused.

The portfolio showcases **19+ delivered client websites** across Healthcare, Education, E-commerce, Corporate, Creative, Industrial, Hospitality, and Food industries — serving clients across **UAE, India, and KSA**.

---

## 2. Goals

| Priority | Goal |
|----------|------|
| P0 | Convert portfolio visitors into WhatsApp leads |
| P0 | Establish SynopsLabs as a premium, credible web agency |
| P1 | Showcase all 19 client & demo projects with real live URLs |
| P1 | Light theme with 3D scroll + Framer Motion — wow factor |
| P2 | Minimal, editorial aesthetic — not another SaaS template |
| P2 | Fast (< 2s LCP), accessible (WCAG AA), mobile-first |

---

## 3. Target Audience

- **Primary**: Business owners & decision-makers in UAE, India, KSA seeking web development services
- **Secondary**: Startups needing a credible digital presence
- **Tertiary**: Corporate procurement teams comparing web agencies

---

## 4. Brand Identity (SynopsLabs)

| Property | Value |
|----------|-------|
| **Company** | SynopsLabs AI |
| **Website** | https://synopslabs.com |
| **Email** | pranav@synopslabs.com |
| **Phone/WhatsApp** | +971 56 627 2141 |
| **Location** | Dubai, UAE |
| **LinkedIn** | https://www.linkedin.com/company/synops-labs/ |
| **Coverage** | UAE 🇦🇪 · India 🇮🇳 · KSA 🇸🇦 |
| **Tagline** | "Transforming businesses with intelligent automation." |

---

## 5. Design Direction

### 5.1 Aesthetic

- **Direction**: Luxury Minimal / Editorial
- **Theme**: **Light mode only** (warm white background, charcoal text)
- **Differentiation**: Large Playfair Display serif headings on clean white — feels like a premium editorial magazine, not a startup template
- **DFII Score**: 13/15 (Excellent)

### 5.2 Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#FAFAF8` | Page background (warm white) |
| `--surface` | `#FFFFFF` | Card backgrounds |
| `--foreground` | `#1C1C1C` | Primary text (near-black) |
| `--text-muted` | `#6B6B7B` | Secondary text |
| `--accent` | `#1C1C1C` | Buttons, active states |
| `--accent-warm` | `#C9B99A` | Warm gold accent |
| `--border` | `rgba(28,28,28,0.12)` | Subtle borders |
| `--wa-green` | `#25D366` | WhatsApp CTA only |

### 5.3 Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Hero Display | Playfair Display | 700 | clamp(3rem, 7vw, 6rem) |
| Section Heading | Playfair Display | 600 | clamp(2rem, 4vw, 3.5rem) |
| Body | Inter | 400 | 16–18px |
| Label/Tag | Inter | 500 | 12–14px |
| Nav | Inter | 500 | 14px |

### 5.4 Motion Philosophy

All animations must be **purposeful, sparse, and premium**:

- **Hero entrance**: Staggered word-by-word Framer Motion reveal
- **Scroll parallax**: `useScroll` + `useTransform` for subtle 3D depth
- **Project cards**: `whileHover` with Y-lift + soft shadow reveal
- **3D perspective scroll**: On hero — `rotateX` from `0deg → -8deg` + `scale(0.96)` depth pull
- **Section reveals**: `useInView` triggered opacity + Y-axis slide (once)

### 5.5 3D Scroll Effects

1. **Hero section**: On scroll, `rotateX` tilt + slight scale down (depth illusion)
2. **Project grid**: Cards enter with `rotateY(-5deg → 0deg)` 
3. **Section headers**: Parallax Y at 0.3x scroll speed
4. **Contact section**: Rise in with `scale(0.95 → 1)`

---

## 6. Site Architecture

```
/ (Single-page SPA)
├── #home        ← Hero + animated stats
├── #portfolio   ← Project grid (all 19 projects)
├── #services    ← 4 service cards
├── #process     ← 4-step process timeline
└── #contact     ← WhatsApp CTA + regions

Fixed floating pill nav with scroll-aware active states
Footer: 4-col grid — Brand | Nav | Services | Connect
```

---

## 7. Sections Specification

### 7.1 Hero

- Background: `#FAFAF8` (no video)
- SynopsLabs logo (top-center)
- Headline: `"Web Development Portfolio"` — Playfair Display
- Sub: `"150+ websites delivered across healthcare, education, e-commerce and corporate sectors in UAE, India & KSA."`
- CTAs: `"View My Work"` → #portfolio | `"Contact Me"` → WhatsApp
- Stats ticker: `150+ Websites` · `3 Countries` · `8 Industries` · `5+ Years`
- 3D effect: Hero content tilts back on downscroll

### 7.2 Portfolio

- 3-col grid (desktop), 2-col (tablet), 1-col (mobile)
- Industry filter tabs: All · Healthcare · Education · E-commerce · Corporate · Creative · Industrial · Hospitality · Food
- Project cards with: thumbnail, name, tagline, badges, tech stack, live link
- Hover: Y-lift + shadow + subtle scale

### 7.3 Services

- 4 cards: Business Websites · E-commerce · Educational Platforms · Corporate Portals
- Light cards with thin border + warm accent stripe on hover

### 7.4 Process

- 4 steps: Discovery → Design → Build → Launch
- Horizontal timeline (desktop), vertical (mobile)

### 7.5 Contact

- WhatsApp CTA card (centered, green accent)
- Phone: +971 56 627 2141
- "Usually responds within 2 hours"
- Region badges: 🇦🇪 UAE · 🇮🇳 India · 🇸🇦 KSA

### 7.6 Footer

- Logo + tagline
- Navigation links
- Services links
- Social: LinkedIn, Twitter, GitHub, YouTube
- Legal: Privacy Policy · Terms of Service
- Copyright: © 2026 SynopsLabs AI

---

## 8. Project Data (All 19 — Scraped from V1)

### Delivered Client Websites (13)

| # | Name | Industry | Region | Live URL | Featured |
|---|------|----------|--------|----------|---------|
| 1 | BWMC | Corporate | UAE | https://bwmc.ae | ✅ |
| 2 | Payyoli Mixture | Healthcare | India | https://www.payyolimixture.co.in/ | ✅ |
| 3 | Alduz Trading | Corporate | UAE | https://www.alduztrading.com/ | ❌ |
| 4 | Aurora Souq | E-commerce | UAE | https://www.aurorasouq.com/ | ✅ |
| 5 | Al Rizq | Corporate | KSA | https://www.alrizq.sa/ | ✅ |
| 6 | Jaypee Dent | Healthcare | India | https://jaypeedent.com/ | ❌ |
| 7 | Pixel and Pepper | Creative | — | https://pixelandpepper.com/ | ✅ |
| 8 | Learnix Education | Education | — | https://learnixeducation.com/ | ❌ |
| 9 | Sahara Tutors | Education | — | https://saharatutors.com/ | ❌ |
| 10 | Sun Tools Engineering | Industrial | — | https://suntoolsengineering.com/ | ❌ |
| 11 | Ahalia Group | Corporate | UAE | https://ahaliagroup.com/ahh/ | ✅ |
| 12 | DUA College | Education | India | https://duacollege.in/ | ❌ |
| 13 | Ayisha Portfolio | Creative | — | https://zorxmedia.com/ayisha/ | ❌ |

### Demo Websites (6)

| # | Name | Industry | Live URL |
|---|------|----------|----------|
| 14 | Natural Yoga | Healthcare | https://fazilfazi991natural-yoga.vercel.app/ |
| 15 | Jim Harvey | Creative | https://jimharvey.vercel.app/ |
| 16 | BioVitazen | Healthcare | https://biovitazen.vercel.app/ |
| 17 | Lamps Plus | E-commerce | https://lampsplus.vercel.app/ |
| 18 | Jerins Food Stuff | Food | https://websites-jerins-food-stuff.vercel.app/ |
| 19 | StepVision Hotel Supplies | Hospitality | https://websites-stepvision-hotel-supplies.vercel.app/ |

---

## 9. Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.x App Router | React framework |
| React | 19.x | UI components |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | v4 | Utility CSS |
| Framer Motion | 12.x | 3D scroll + animations |
| GSAP | 3.x | Complex sequences |
| Lucide React | Latest | Icons |
| next-themes | 0.4.x | Light theme default |
| Playfair Display | Google Fonts | Display typography |
| Inter | Google Fonts | Body typography |

---

## 10. Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.0s |
| CLS | < 0.1 |
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 90 |
| Mobile-first | Required |

---

## 11. SEO Requirements

- Proper `<title>` + `<meta description>` per page
- OpenGraph tags for social sharing
- Structured data (LocalBusiness schema)
- Single `<h1>` per page
- Semantic HTML5
- `metadataBase` set for Vercel deployment

---

## 12. Success Metrics (V2 Targets)

| Metric | Target |
|--------|--------|
| WhatsApp click-through | > 5% visitors |
| Bounce rate | < 60% |
| Avg time on page | > 2 min |
| Core Web Vitals | All green |
| Mobile usability | 100% |

---

## 13. Out of Scope

- CMS integration (TypeScript data file is fine)
- Blog / case studies
- Multi-language support
- Client login area
- Analytics dashboard

---

## 14. Deployment

- **Platform**: Vercel
- **Repository**: GitHub (pranavkithkin/)
- **Build**: `npm run build`
- **Framework**: Next.js preset
