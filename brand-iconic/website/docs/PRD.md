# Brand Iconic — Product Requirements Document (PRD)

**Version:** 1.0
**Date:** 2026-03-14
**Status:** Draft — Awaiting Approval

---

## 1. Overview

### 1.1 Purpose
Build a high-conversion agency website for Brand Iconic (brandikonic.com) that positions the company as India's premier outcome-based branding partner for D2C brands. Replaces the current WordPress/Wix/Squarespace site with a custom Next.js application.

### 1.2 Business Goals
1. **Lead Generation** — 20+ qualified leads/month within 3 months of launch via brand audit bookings
2. **Portfolio Showcase** — Case studies with measurable business outcomes (revenue lift, CAC reduction)
3. **Service Catalog** — 3-tier service offering (Starter, Growth, Scale) with transparent pricing
4. **SEO Authority** — Rank for "branding agency for D2C India", "brand strategy agency Bangalore" within 6 months
5. **Credibility** — Position Brand Iconic as a ₹3L-₹5L/month agency, not a ₹10K freelancer

### 1.3 Target Users
| User Type | Description | Primary Goal on Site |
|-----------|-------------|---------------------|
| Bootstrapped D2C Founder | ₹1Cr-₹25Cr revenue, 28-42 yrs, South India | Evaluate if Brand Iconic can break their revenue ceiling |
| Funded D2C Founder | Seed to Series A, needs investor-grade brand | Assess strategic capability + view case studies |
| Referral Visitor | Sent by another founder via WhatsApp/LinkedIn | Validate recommendation, book a call |
| Google Search Visitor | Searching for branding agency in India/Bangalore | Understand positioning, see proof, take action |

---

## 2. Information Architecture

### 2.1 Sitemap
```
brandikonic.com/
├── / (Home)
├── /about
├── /services
│   ├── /services/brand-strategy
│   ├── /services/social-media-marketing
│   ├── /services/content-marketing
│   └── /services/performance-marketing
├── /portfolio
│   └── /portfolio/[slug]
├── /blog
│   └── /blog/[slug]
├── /pricing
├── /contact
├── /sitemap.xml
└── /robots.txt
```

### 2.2 Navigation
**Primary Nav (Desktop):** Home | About | Services (dropdown) | Portfolio | Blog | Pricing | Contact (CTA button)
**Services Dropdown:** Brand Strategy & Identity, Social Media Marketing, Content Marketing, Performance Marketing
**Mobile Nav:** Full-screen overlay with staggered animation

---

## 3. Page Requirements

### 3.1 Home Page (`/`)
**Goal:** Convert cold traffic into leads within 60 seconds.

| # | Section | Content | Purpose |
|---|---------|---------|---------|
| 1 | Hero | Headline: "Your D2C Brand Deserves More Than a Pretty Logo". Primary CTA: "Book a Free Brand Audit". Secondary: "See Our Work" | Hook + convert |
| 2 | Client Logos | Horizontal scroll, grayscale → color on hover. "Trusted by D2C brands across India" | Social proof |
| 3 | Problem Statement | 3 cards: Rising CAC, Creative Fatigue, Generic Brand. Stat: "60-65% of D2C brands stuck below ₹50Cr" | Trust via market knowledge |
| 4 | Services Overview | 4-column grid: icon, title, one-line, arrow link per service | Communicate breadth |
| 5 | Featured Work | 2-3 case study cards with before/after metrics | Prove capability |
| 6 | Stats Counter | Animated: Brands Transformed, Avg Revenue Lift %, Years Experience, Revenue Generated (Cr+) | Quantify credibility |
| 7 | Process | "How We Work" 4-step timeline: Discovery → Strategy → Execution → Growth | Reduce uncertainty |
| 8 | Testimonials | 3 cards: photo, name, company, quote. Gold quotation accent | Peer validation |
| 9 | CTA | Full-width dark gradient. "Ready to Build a Brand That Commands Premium?" | Final conversion |

**Acceptance Criteria:**
- Hero loads above the fold, no layout shift
- Animations trigger on scroll into viewport only
- Stats animate from 0 to target in 2s
- Primary CTA links to /contact or Calendly
- Mobile: stacked sections, no horizontal scroll except logo bar
- Page loads < 3s on 4G

---

### 3.2 About Page (`/about`)
**Goal:** Build emotional connection. Answer "Who are these people?"

**Sections:** Page Hero → Our Story (two-column) → Mission & Vision → Values (4-6 icon cards: Outcome Over Output, Research Before Execution, Radical Transparency, Speed Without Compromise) → Team grid → Why D2C? → CTA

**Acceptance Criteria:**
- Team cards show placeholder state if no photo
- Mobile: team grid becomes 1-column

---

### 3.3 Services Overview (`/services`)
**Goal:** Help visitor identify which service they need.

**Sections:** Page Hero → Service Grid (4 large cards linking to detail pages) → How Services Connect (visual flow) → Comparison Table (Brand Iconic vs. In-House vs. Freelancers) → CTA

**Acceptance Criteria:**
- Each card links to its detail page
- Comparison table responsive (scroll or stacked on mobile)

---

### 3.4 Individual Service Pages (`/services/[slug]`)
**Pages:** brand-strategy, social-media-marketing, content-marketing, performance-marketing

**Template Sections:** Service Hero → The Problem (verbatim ICP language) → Our Approach (3-4 steps) → Deliverables (list) → Results (mini case study) → FAQ (accordion, JSON-LD) → Related Services → CTA

**Acceptance Criteria:**
- FAQ has JSON-LD structured data
- Related services shows 3 OTHER services
- Unique meta title + description per page

---

### 3.5 Portfolio Page (`/portfolio`)
**Goal:** Showcase work with measurable outcomes.

**Sections:** Page Hero → Filter Bar (All, Brand Identity, Social Media, Content, Performance — client-side) → Portfolio Grid (thumbnail, brand name, category badge, result metric) → CTA

**Acceptance Criteria:**
- Filter updates without page reload
- "All" active by default
- Empty state handled

---

### 3.6 Case Study Page (`/portfolio/[slug]`)
**Sections:** Hero (brand, category, image, result) → Challenge → Strategy → Execution (images) → Results (stat cards, animated) → Testimonial → Prev/Next nav → CTA

**Acceptance Criteria:**
- Results use animated counter
- Images use blur placeholder
- Prev/Next loops

---

### 3.7 Blog Listing (`/blog`)
**Sections:** Page Hero → Featured Post (large card) → Blog Grid (3-col: thumbnail, title, excerpt, date, category, read time) → Category Filter → Newsletter Signup → Pagination

**Acceptance Criteria:**
- Read time auto-calculated (words / 200)
- Featured post visually distinct
- Newsletter validates email
- Mobile: 1-column grid

---

### 3.8 Blog Post (`/blog/[slug]`)
**Sections:** Header (title, author, date, read time, category) → Featured Image → MDX Body (prose) → Author Bio → Related Posts (3) → Share (LinkedIn, X, WhatsApp) → CTA

**Acceptance Criteria:**
- MDX renders headings, code, images, quotes, lists
- Share uses native URLs (no third-party scripts)
- WhatsApp share includes title + URL
- Article JSON-LD structured data

---

### 3.9 Contact Page (`/contact`)
**Goal:** Convert interested visitors into booked calls.

**Layout:** Two-column
- **Left — Form:** Name (req), Email (req), Phone (opt), Company (req), Monthly Revenue (dropdown: Under ₹50L / ₹50L-₹1Cr / ₹1Cr-₹10Cr / ₹10Cr-₹25Cr / ₹25Cr+), Services Interested (multi-checkbox), Message (req, min 20 chars)
- **Right — Info:** Email, phone, address (Bangalore), Calendly/"Book a Call", social links (LinkedIn, Instagram, X)
- **FAQ:** "What happens after I reach out?", "How long until I hear back?", "Is the brand audit really free?"

**Acceptance Criteria:**
- Validates on blur AND submit
- Loading state during submission
- Success message on-screen (no redirect)
- Error with retry option
- Rate limiting: 5/IP/hour
- Mobile: stacked (form first)

---

### 3.10 Pricing Page (`/pricing`)
**Goal:** Qualify leads with transparent pricing.

**Sections:** Page Hero → Philosophy ("We sell outcomes, not deliverables") → 3 Tiers → Feature Comparison → Guarantee → FAQ → CTA

| Tier | Price | Target | Includes |
|------|-------|--------|----------|
| Starter | ₹75K-₹1L/mo | Beginning brands | Brand audit, identity refresh, social templates |
| Growth (highlighted) | ₹1.5L-₹3L/mo | ₹1Cr-₹10Cr brands | Full strategy, social, content, reporting |
| Scale | ₹3L-₹5L/mo | ₹10Cr+ / funded | Full-service + performance marketing, packaging |

**Acceptance Criteria:**
- Growth tier highlighted as "Most Popular"
- Prices in ₹ format
- Feature table scrollable on mobile
- Each tier CTA → /contact
- FAQ accordion

---

## 4. User Flows

### 4.1 Cold Visitor → Lead
```
Land (Home/Blog/Service) → Read content → Click CTA → /contact → Fill form → Confirmation → Brand Iconic gets email
```

### 4.2 Referral Visitor
```
Shared link → Land on page → View portfolio → Click "Book a Call" → /contact or Calendly → Book
```

### 4.3 SEO Visitor
```
Google → Land on Home/Service → Read → Browse portfolio → Check pricing → Submit form or book call
```

---

## 5. Functional Requirements

### 5.1 Contact Form API
- **Endpoint:** POST `/api/contact`
- **Validation:** Server-side zod schema
- **Email:** Resend API (free: 100/day)
- **Data:** Optional webhook to Google Sheets/Notion
- **Rate limit:** 5 submissions/IP/hour
- **Response:** `{ success: true/false, message/error }`

### 5.2 Blog System
- MDX files in repo (Phase 1), migratable to CMS later
- Syntax highlighting, image optimization, reading time
- 9 posts per page, "Load More" pagination

### 5.3 Portfolio System
- Data from `src/data/portfolio.ts`
- Client-side category filtering
- Dynamic routes `/portfolio/[slug]`

---

## 6. Non-Functional Requirements

### 6.1 Performance
| Metric | Target |
|--------|--------|
| Lighthouse Performance | 90+ |
| Lighthouse SEO | 95+ |
| Lighthouse Accessibility | 90+ |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Time to Interactive | < 3.5s |
| Page weight (home) | < 1.5MB |

### 6.2 SEO
- Unique `<title>` + `<meta description>` on every page
- Open Graph + Twitter Card tags
- Canonical URLs
- JSON-LD: Organization, LocalBusiness, Service, Article, FAQ, BreadcrumbList
- Dynamic sitemap.xml + robots.txt
- Semantic HTML, proper heading hierarchy, alt text
- Target keywords: "branding agency for D2C India", "D2C brand strategy Bangalore", "brand identity agency India"

### 6.3 Responsive Breakpoints
| Breakpoint | Width |
|------------|-------|
| Mobile | 320-767px |
| Tablet | 768-1023px |
| Desktop | 1024-1439px |
| Large Desktop | 1440px+ (max-width container) |

### 6.4 Accessibility (WCAG 2.1 AA)
- Keyboard navigable
- Screen reader compatible (ARIA, semantic HTML)
- Color contrast ≥ 4.5:1 (gold on dark — verify)
- Focus indicators
- Skip to content link
- Alt text on all images

### 6.5 Browser Support
Chrome 90+, Safari 15+, Firefox 90+, Edge 90+, Mobile Safari (iOS 15+), Chrome Android

---

## 7. Content Requirements

### 7.1 Copy Guidelines
- Use verbatim ICP language: "stuck below ₹50 crore", "CAC keeps going up", "changed agencies 3 times"
- Frame services around outcomes, not deliverables
- Include specific numbers: "60-65% of D2C brands", "30% YoY CAC increase"
- Address top 4 sales objections on pricing and services pages
- Use ₹ (Indian Rupees) throughout — never USD
- Reference: boAt, Mamaearth, Licious, Nykaa as aspirational benchmarks
- Tone: Direct 8/10, Conversational 7/10, Bold 8/10, Accessible 7/10

### 7.2 Image Requirements
| Asset | Min Size | Format |
|-------|----------|--------|
| Hero images | 1920×1080 | Dark-toned, abstract/branded |
| Portfolio thumbnails | 800×600 | Consistent aspect ratio |
| Team photos | 400×400 | Square, professional |
| Blog thumbnails | 800×450 | 16:9 |
| All images | Auto WebP/AVIF via Next.js | Blur hash placeholder |

### 7.3 Launch Content Needed
- 2-3 portfolio case studies (can be anonymized/mockup initially)
- 3-5 blog posts (D2C branding topics)
- Team bios + photos
- 3+ client testimonials (placeholder OK)
- 4-6 client logos

---

## 8. Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 14+ (App Router) | SSR/SSG, SEO, performance |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS | Utility-first, dark theme |
| Animations | Framer Motion | Scroll-triggered, performant |
| Forms | react-hook-form + zod | Validation |
| Blog | next-mdx-remote | MDX, future CMS path |
| Icons | lucide-react | Lightweight |
| Email | Resend | Free tier |
| Utilities | clsx + tailwind-merge | Class management |
| Deploy | Vercel | Native Next.js |
| Analytics | Vercel Analytics + GA4 | Web Vitals + traffic |

---

## 9. Success Metrics

| Metric | Target | Timeframe |
|--------|--------|-----------|
| Qualified leads (form submissions) | 20+/month | 3 months |
| Organic search traffic | 1,000+/month | 6 months |
| Avg session duration | > 2 min | 1 month |
| Bounce rate (home) | < 50% | 1 month |
| Form conversion rate | > 3% | 3 months |
| Lighthouse Performance | 90+ | Launch |

---

## 10. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| No real case studies at launch | Anonymized/mockup studies; replace ASAP |
| Gold on dark contrast fails WCAG | Test against 4.5:1; adjust shade if needed |
| Contact form spam | Honeypot + rate limiting; add reCAPTCHA later if needed |
| Blog content velocity low | 5 cornerstone articles at launch; monthly schedule |
| Animation perf degradation | `will-change`, lazy-load below-fold, Lighthouse testing |

---

## 11. Out of Scope (v1)

- CMS integration (Sanity/Contentful)
- Multi-language support
- Client portal / dashboard
- E-commerce / payments
- Live chat
- A/B testing
- Dark/light toggle (dark-only in v1)
- Email marketing integration (manual newsletter initially)

---

## 12. Approval

| Reviewer | Status | Date |
|----------|--------|------|
| Founder | Pending | — |
