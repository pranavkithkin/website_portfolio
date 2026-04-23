# SynopsLabs Portfolio V2 — Initial Build Prompt

> Use this prompt verbatim when starting a new coding session (Antigravity, Claude Code, Cursor, etc.)
> Read `Gemini.md`, `PRD.md`, and `Roadmap.md` before starting any code.

---

## PROMPT

You are building **SynopsLabs Portfolio V2** — a premium, minimal, light-theme web development agency portfolio for SynopsLabs AI. This is a Next.js 15 + Framer Motion + GSAP single-page application.

**Read these files first before writing any code:**
- `Gemini.md` — full technical context, patterns, and all project data
- `PRD.md` — product requirements and design specification
- `Roadmap.md` — phased build plan

---

### Project Overview

Build a stunning portfolio website for **SynopsLabs AI** (pranav@synopslabs.com, +971 56 627 2141, Dubai UAE) that showcases **19 delivered and demo websites** across healthcare, education, e-commerce, corporate, creative, industrial, hospitality, and food industries — serving UAE, India, and KSA.

**Reference site for design inspiration**: https://study.fl-ex.co.kr/
- Replicate: cinematic loading sequence, bold editorial typography, immersive full-screen hero, smooth scroll-driven animations
- DO NOT copy content — only borrow the UX patterns

---

### Design Direction

- **Theme**: Light mode ONLY — warm white `#FAFAF8` background, near-black `#1C1C1C` text
- **Typography**: Playfair Display (headings) + Inter (body) from Google Fonts
- **Aesthetic**: Luxury Minimal / Editorial — NOT a SaaS template, NOT dark
- **Animation engine**: Framer Motion (primary) + GSAP (loading sequence)
- **Accent**: Warm gold `#C9B99A` for decorative elements, WhatsApp green `#25D366` for CTA only

---

### Tech Stack

```
Next.js 15 (App Router)
React 19 + TypeScript 5
Tailwind CSS v4
Framer Motion 12
GSAP 3
Lucide React (icons)
next-themes (light default)
Google Fonts: Playfair Display + Inter
```

---

### Build Order (Follow Phase by Phase)

**Phase 0** — Setup
1. Scaffold with `npx create-next-app@latest . --typescript --tailwind --app --no-src-dir`
2. Install: `npm install framer-motion gsap lucide-react next-themes clsx tailwind-merge`
3. Create `globals.css` with the full design token system (see Gemini.md color palette)
4. Configure `layout.tsx` with Playfair Display + Inter fonts, ThemeProvider (light default)
5. Create `data/projects.ts` with all 19 projects (see Gemini.md for complete data)
6. Create `lib/utils.ts` with `cn()`, `getWhatsAppLink()`, `WHATSAPP_NUMBER = '971566272141'`

**Phase 1** — Cinematic Loader (FLEX-inspired)
Build `components/sections/loader.tsx`:
- GSAP timeline with staggered text lines appearing one-by-one
- Lines: "Fetching 19 websites...", "Loading project data...", "Building your portfolio...", "Crafting pixel-perfect UI...", "All systems ready..."
- Animated progress counter 0% → 100%
- Full-screen overlay with SynopsLabs logo centered
- Exit: entire loader slides UP revealing main page
- Skip for repeat visitors (localStorage)

**Phase 2** — Hero Section (3D Scroll)
Build `components/sections/hero.tsx`:
- Background: `#FAFAF8` (no video, no dark overlay)
- SynopsLabs logo top-center
- Headline: "Web Development Portfolio" — Playfair Display, massive
- Sub: "150+ websites delivered across healthcare, education, e-commerce and corporate sectors in UAE, India & KSA."
- CTAs: "View My Work" (dark button, scroll to #portfolio) + "Contact Me" (WhatsApp link, with WA icon)
- Staggered word-by-word Framer Motion entrance on mount
- 3D scroll: `useScroll` + `useTransform` → `rotateX(0 → -8deg)` + `scale(1 → 0.95)` as user scrolls
- Stats row: 150+ Websites · 3 Countries · 8 Industries · 5+ Years (numbers count up with useInView)

**Phase 3** — Floating Nav
Build `components/layout/header.tsx`:
- Floating pill, centered, appears after loader completes
- Links: Home · Work · Services · Process · Contact
- Transparent → frosted glass (backdrop-filter) on scroll
- Animated active indicator (layoutId spring)
- Mobile: hamburger → slide-in menu

**Phase 4** — Portfolio Section
Build `components/sections/portfolio.tsx` + `components/ui/project-card.tsx`:
- Section header: "Featured Work" (Playfair Display)
- Industry filter tabs with animated active indicator
- 3-col (desktop) / 2-col (tablet) / 1-col (mobile) responsive grid
- Cards: thumbnail placeholder → live OG image, name, tagline, badges, tech pills, "View Live →"
- Card entrance: `rotateY(-5deg → 0)` + fade on scroll into view (staggered)
- Card hover: `y(-8px)` + shadow + border highlight
- isDemo badge differentiation (subtle "Demo" tag)

**Phase 5** — Services Section
4 cards: Business Websites, E-commerce Platforms, Educational Platforms, Corporate Portals
Light cards, thin borders, warm accent left stripe on hover, staggered entrance

**Phase 6** — Process Section
4 steps: Discovery → Design → Build → Launch
Horizontal timeline desktop, vertical mobile, numbered circles, staggered

**Phase 7** — Contact Section
WhatsApp CTA card (centred):
- Phone: +971 56 627 2141
- "Start WhatsApp Chat" button (green #25D366)
- "Usually responds within 2 hours"
- Region badges: 🇦🇪 UAE · 🇮🇳 India · 🇸🇦 KSA
- rise-in animation: scale 0.95 → 1

**Phase 8** — Footer
4-col grid: Brand (logo + contact info + WA button) | Navigation | Services | Social links
Bottom bar: copyright + Privacy + Terms

**Phase 9** — SEO + Polish
- metadata in layout.tsx with metadataBase
- LocalBusiness JSON-LD
- All images: lazy loading + alt text
- useReducedMotion for accessibility
- Mobile QA pass

---

### Critical Rules

- ❌ NO dark mode (light only)
- ❌ NO video background in hero
- ❌ NO ChromaGrid or complex external UI libraries
- ❌ NO Inter as the heading font (use Playfair Display)
- ❌ NO placeholder initials — use colored gradient thumbnails if no image
- ✅ ALL 19 projects must render in the portfolio grid
- ✅ WhatsApp number must be exactly: +971 56 627 2141
- ✅ All live project URLs must open in new tab
- ✅ Light theme must be consistent across every section
- ✅ Cinematic loader MUST run before main content appears
- ✅ 3D scroll effect on hero MUST use `useScroll` + `useTransform`

---

### All 19 Project URLs (for data/projects.ts)

**Client Projects:**
1. BWMC — https://bwmc.ae — Corporate, UAE
2. Payyoli Mixture — https://www.payyolimixture.co.in/ — Healthcare, India
3. Alduz Trading — https://www.alduztrading.com/ — Corporate, UAE
4. Aurora Souq — https://www.aurorasouq.com/ — E-commerce, UAE
5. Al Rizq — https://www.alrizq.sa/ — Corporate, KSA
6. Jaypee Dent — https://jaypeedent.com/ — Healthcare, India
7. Pixel and Pepper — https://pixelandpepper.com/ — Creative
8. Learnix Education — https://learnixeducation.com/ — Education
9. Sahara Tutors — https://saharatutors.com/ — Education
10. Sun Tools Engineering — https://suntoolsengineering.com/ — Industrial
11. Ahalia Group — https://ahaliagroup.com/ahh/ — Corporate, UAE
12. DUA College — https://duacollege.in/ — Education, India
13. Ayisha Portfolio — https://zorxmedia.com/ayisha/ — Creative

**Demo Projects:**
14. Natural Yoga — https://fazilfazi991natural-yoga.vercel.app/ — Healthcare
15. Jim Harvey — https://jimharvey.vercel.app/ — Creative
16. BioVitazen — https://biovitazen.vercel.app/ — Healthcare
17. Lamps Plus — https://lampsplus.vercel.app/ — E-commerce
18. Jerins Food Stuff — https://websites-jerins-food-stuff.vercel.app/ — Food
19. StepVision Hotel Supplies — https://websites-stepvision-hotel-supplies.vercel.app/ — Hospitality

---

### Contact Details to Hardcode

```
Company: SynopsLabs AI
Website: https://synopslabs.com
Email: pranav@synopslabs.com
WhatsApp/Phone: +971 56 627 2141
Location: Dubai, UAE
LinkedIn: https://www.linkedin.com/company/synops-labs/
Twitter: https://twitter.com/synopslabs
GitHub: https://github.com/synopslabs
YouTube: https://youtube.com/synopslabs
Logo: /images/synopslabs-logo.png (copy from existing zorx-portfolio/public/images/)
```

---

Begin with Phase 0 — project setup. Confirm when each phase is complete before moving to the next.
