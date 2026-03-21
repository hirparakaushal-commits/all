# Brand Iconic — Website Product Requirements Document (PRD)
**Version:** 1.0
**Date:** 2026-03-14
**Status:** Draft — Awaiting Approval

---

## 1. Overview

### 1.1 Purpose
Build a high-conversion agency website for Brand Iconic (brandikonic.com) that positions the company as India's premier outcome-based branding partner for D2C brands. The website replaces the current WordPress/Wix/Squarespace site with a custom Next.js application.

### 1.2 Business Goals
1. **Lead Generation** — Convert cold traffic into qualified leads (brand audit bookings) with a target of 20+ qualified leads/month within 3 months of launch
2. **Portfolio Showcase** — Display case studies with measurable business outcomes (revenue lift, CAC reduction) to build trust
3. **Service Catalog** — Clearly present the 3-tier service offering (Starter, Growth, Scale) with transparent pricing
4. **SEO Authority** — Rank for "branding agency for D2C India", "brand strategy agency Bangalore", and related terms within 6 months
5. **Credibility** — Make Brand Iconic look like a ₹3L-₹5L/month agency, not a ₹10K freelancer

### 1.3 Target Users
| User Type | Description | Primary Goal on Site |
|-----------|-------------|---------------------|
| **Bootstrapped D2C Founder** | ₹1Cr-₹25Cr revenue, 28-42 years old, South India | Evaluate if Brand Iconic can help break revenue ceiling |
| **Funded D2C Founder** | Seed to Series A, needs investor-grade brand | Assess strategic capability + view case studies |
| **Referral Visitor** | Sent by another founder via WhatsApp/LinkedIn | Validate the recommendation, book a call |
| **Google Search Visitor** | Searching for branding agency in India/Bangalore | Quickly understand positioning, see proof, take action |

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
│   └── /portfolio/[slug] (Case Study)
├── /blog
│   └── /blog/[slug] (Blog Post)
├── /pricing
├── /contact
├── /sitemap.xml
└── /robots.txt
```

### 2.2 Navigation Structure

**Primary Nav (Desktop):** Home | About | Services (dropdown) | Portfolio | Blog | Pricing | Contact (CTA button)

**Services Dropdown:**
- Brand Strategy & Identity
- Social Media Marketing
- Content Marketing
- Performance Marketing

**Mobile Nav:** Full-screen overlay with staggered animation

---

## 3. Page Requirements

### 3.1 Home Page (`/`)

**Goal:** Convert cold traffic into leads within 60 seconds of landing.

**Sections (scroll order):**

| # | Section | Content | Purpose |
|---|---------|---------|---------|
| 1 | **Hero** | Headline addressing core ICP pain (e.g., "Your D2C Brand Deserves More Than a Pretty Logo"). Sub-headline with outcome-based positioning. Primary CTA: "Book a Free Brand Audit". Secondary CTA: "See Our Work". | Hook + convert |
| 2 | **Client Logos** | Horizontal scrolling strip. Grayscale → color on hover. "Trusted by D2C brands across India" | Social proof |
| 3 | **Problem Statement** | 3 cards: Rising CAC, Creative Fatigue, Generic Brand. Use stat: "60-65% of D2C brands stuck below ₹50Cr" | Build trust via market understanding |
| 4 | **Services Overview** | 4-column grid with icon, title, one-line description, arrow link per service | Communicate breadth |
| 5 | **Featured Work** | 2-3 case study cards with before/after metrics + imagery | Prove capability |
| 6 | **Stats Counter** | Animated counters: Brands Transformed, Avg Revenue Lift %, Years Experience, Revenue Generated (Cr+) | Quantify credibility |
| 7 | **Process** | "How We Work" — 4-step horizontal timeline: Discovery → Strategy → Execution → Growth | Reduce uncertainty |
| 8 | **Testimonials** | 3 testimonial cards with photo, name, company, quote. Gold quotation accent | Peer validation |
| 9 | **CTA** | Full-width dark gradient. "Ready to Build a Brand That Commands Premium?" + CTA button | Final conversion push |

**Acceptance Criteria:**
- [ ] Hero loads above the fold with no layout shift
- [ ] All animations trigger on scroll into viewport (not on page load)
- [ ] Stats counter animates from 0 to target number in 2 seconds
- [ ] Primary CTA links to /contact or Calendly booking
- [ ] Mobile: sections stack vertically, no horizontal scroll except logo bar
- [ ] Page loads in < 3 seconds on 4G connection

---

### 3.2 About Page (`/about`)

**Goal:** Build emotional connection and trust. Answer "Who are these people?"

**Sections:**
1. **Page Hero** — Title + subtitle + breadcrumb
2. **Our Story** — Narrative: why Brand Iconic exists, the gap in the market, AI-native approach
3. **Mission & Vision** — Two-column layout with gold accent divider
4. **Values** — 4-6 value cards: Outcome Over Output, Research Before Execution, Radical Transparency, Speed Without Compromise
5. **Team** — Grid of team member cards (photo, name, role, brief bio)
6. **Why D2C?** — Explanation of deliberate D2C focus with market stats
7. **CTA** — Reusable CTA component

**Acceptance Criteria:**
- [ ] Team cards show placeholder state if no photo provided
- [ ] Values section uses icon + title + description format
- [ ] Mobile: team grid becomes 1-column

---

### 3.3 Services Overview (`/services`)

**Goal:** Help visitor identify which service they need and navigate to detail page.

**Sections:**
1. **Page Hero** — "Everything Your D2C Brand Needs to Break Through"
2. **Service Grid** — 4 large cards, each linking to detail page. Icon/illustration, name, 2-3 lines, key deliverables preview, "Learn More" link
3. **How Services Connect** — Visual flow showing Brand Strategy → Social → Content → Performance integration
4. **Comparison Table** — Brand Iconic vs. In-House Team vs. Freelancers (addresses key objection from market research)
5. **CTA** — "Not Sure What You Need? Book a Free Brand Audit"

**Acceptance Criteria:**
- [ ] Each service card links to its detail page
- [ ] Comparison table is responsive (horizontal scroll on mobile or stacked cards)
- [ ] Visual flow diagram renders correctly at all breakpoints

---

### 3.4 Individual Service Pages (`/services/[slug]`)

**Applies to all 4 pages:**
- `/services/brand-strategy` — Brand Strategy & Identity
- `/services/social-media-marketing` — Social Media Marketing
- `/services/content-marketing` — Content Marketing
- `/services/performance-marketing` — Performance Marketing & Paid Ads

**Sections (shared template):**
1. **Service Hero** — Service name, value proposition, background visual
2. **The Problem** — Specific D2C pain this service solves (use verbatim ICP language from market research)
3. **Our Approach** — 3-4 step process specific to this service
4. **Deliverables** — Clear list of what the client receives
5. **Results** — Mini case study or metrics from a relevant project
6. **FAQ** — 4-5 service-specific questions (implement as FAQ structured data for SEO)
7. **Related Services** — Cross-links to the other 3 services
8. **CTA** — Service-specific CTA

**Acceptance Criteria:**
- [ ] FAQ section renders as accordion (expand/collapse)
- [ ] FAQ has JSON-LD FAQ structured data
- [ ] Related services section shows the 3 OTHER services (not the current one)
- [ ] Each page has unique meta title and description

---

### 3.5 Portfolio Page (`/portfolio`)

**Goal:** Showcase work with measurable outcomes.

**Sections:**
1. **Page Hero** — "Work That Speaks Louder Than Pitches"
2. **Filter Bar** — Categories: All, Brand Identity, Social Media, Content, Performance. Client-side filtering (no route change)
3. **Portfolio Grid** — Uniform or masonry grid. Each card: thumbnail, brand name, category badge, one-line result metric
4. **CTA** — "Want Results Like These?"

**Acceptance Criteria:**
- [ ] Filter updates grid without page reload (client-side state)
- [ ] Grid maintains layout during filter animation
- [ ] "All" filter is active by default
- [ ] Empty state shown if no items match filter (unlikely but handle)
- [ ] Cards link to individual case study pages

---

### 3.6 Case Study Page (`/portfolio/[slug]`)

**Goal:** Provide detailed proof of capability with specific outcomes.

**Sections:**
1. **Case Study Hero** — Brand name, category, hero image, one-line result
2. **The Challenge** — Problem the brand faced (maps to ICP pain points)
3. **The Strategy** — What Brand Iconic did and why
4. **The Execution** — Key deliverables with images/mockups
5. **The Results** — Large stat cards: revenue lift, CAC reduction, brand awareness increase
6. **Client Testimonial** — Quote from founder/decision-maker
7. **Prev/Next Navigation** — Navigate between case studies
8. **CTA** — "Ready for Similar Results?"

**Acceptance Criteria:**
- [ ] Results stats use animated counter on scroll
- [ ] Images use blur placeholder loading
- [ ] Prev/Next links loop (last → first, first → last)
- [ ] Page has Article structured data

---

### 3.7 Blog Listing (`/blog`)

**Goal:** Establish thought leadership and drive organic traffic.

**Sections:**
1. **Page Hero** — "Insights for D2C Founders Who Think Like Brand Builders"
2. **Featured Post** — Large card for latest/pinned post
3. **Blog Grid** — 3-column grid of cards (thumbnail, title, excerpt, date, category, read time)
4. **Category Filter** — Tags: Brand Strategy, D2C Growth, Social Media, Content Marketing, Case Studies
5. **Newsletter Signup** — Inline form: "Get weekly D2C branding insights. No fluff."
6. **Pagination** — "Load More" button or simple prev/next

**Acceptance Criteria:**
- [ ] Blog posts render from MDX files or data source
- [ ] Read time is calculated automatically (words / 200)
- [ ] Featured post is visually distinct from grid items
- [ ] Newsletter form validates email format before submission
- [ ] Mobile: grid becomes 1-column

---

### 3.8 Blog Post (`/blog/[slug]`)

**Goal:** Deliver value, build trust, and convert readers to leads.

**Sections:**
1. **Post Header** — Title, author, date, read time, category badge
2. **Featured Image** — Full-width with blur placeholder
3. **Article Body** — MDX-rendered content with styled prose typography
4. **Author Bio** — Card with photo, name, role
5. **Related Posts** — 3 related blog posts
6. **Share Buttons** — LinkedIn, X (Twitter), WhatsApp (critical for India market)
7. **CTA** — "Want us to apply this to your brand? Talk to us."

**Acceptance Criteria:**
- [ ] MDX renders headings, code blocks, images, quotes, lists correctly
- [ ] Share buttons use native share URLs (no third-party scripts)
- [ ] WhatsApp share includes post title + URL
- [ ] Related posts are from the same category (fallback: most recent)
- [ ] Article has Article JSON-LD structured data

---

### 3.9 Contact Page (`/contact`)

**Goal:** Convert interested visitors into booked calls / form submissions.

**Sections:**
1. **Page Hero** — "Let's Build Something Iconic Together"
2. **Two-Column Layout:**
   - **Left: Contact Form**
     - Name (required)
     - Email (required, validated)
     - Phone (optional, Indian format)
     - Company Name (required)
     - Monthly Revenue Range (dropdown: "Under ₹50L", "₹50L-₹1Cr", "₹1Cr-₹10Cr", "₹10Cr-₹25Cr", "₹25Cr+")
     - Services Interested (multi-checkbox: Brand Strategy, Social Media, Content, Performance Marketing)
     - Message (required, min 20 characters)
   - **Right: Contact Info**
     - Email address
     - Phone number
     - Office address (Bangalore)
     - Calendly embed or "Book a Call" button
     - Social links (LinkedIn, Instagram, X)
3. **FAQ** — "What happens after I reach out?", "How long until I hear back?", "Is the brand audit really free?"

**Acceptance Criteria:**
- [ ] Form validates on blur AND on submit
- [ ] Form shows loading state during submission
- [ ] Success message shown after submission (not a redirect)
- [ ] Error message shown if submission fails (with retry option)
- [ ] Revenue range dropdown uses ₹ currency symbol
- [ ] Form submission sends email notification AND saves lead data
- [ ] Rate limiting: max 5 submissions per IP per hour
- [ ] Mobile: two-column becomes stacked (form first, info second)

---

### 3.10 Pricing Page (`/pricing`)

**Goal:** Qualify leads by showing transparent pricing. Overcome "we've been burned by agencies" objection.

**Sections:**
1. **Page Hero** — "Transparent Pricing for D2C Brands Ready to Grow"
2. **Pricing Philosophy** — "We don't sell deliverables. We sell outcomes." Brief section addressing agency trust issues
3. **Pricing Tiers** — 3 cards:
   | Tier | Price | Target | Includes |
   |------|-------|--------|----------|
   | **Starter** | ₹75K-₹1L/month | Brands beginning to invest | Brand audit, visual identity refresh, social media templates |
   | **Growth** (highlighted) | ₹1.5L-₹3L/month | Core D2C brands ₹1Cr-₹10Cr | Full brand strategy, social media, content strategy, monthly reporting |
   | **Scale** | ₹3L-₹5L/month | ₹10Cr+ or funded brands | Full-service incl. performance marketing, packaging, dedicated strategist |
4. **Feature Comparison** — Detailed table comparing what's included across tiers
5. **Guarantee** — "30-Day Satisfaction Guarantee" or outcome-based guarantee
6. **FAQ** — "Custom scope?", "Minimum commitment?", "Outcome-based contracts?"
7. **CTA** — "Book a Call to Discuss Your Growth Plan"

**Acceptance Criteria:**
- [ ] Growth tier is visually highlighted as "Most Popular"
- [ ] Prices display in ₹ (Indian Rupees) format
- [ ] Feature comparison table is scrollable on mobile
- [ ] Each tier card has a CTA button linking to /contact
- [ ] FAQ uses accordion pattern

---

## 4. User Flows

### 4.1 Primary Conversion Flow (Cold Visitor → Lead)

```
Landing (Home/Blog/Service page)
  → Reads content, sees proof/stats
  → Clicks CTA ("Book a Free Brand Audit")
  → Arrives at /contact
  → Fills out contact form
  → Receives confirmation message on-screen
  → Brand Iconic receives email notification with lead details
```

### 4.2 Referral Visitor Flow

```
Arrives via shared link (WhatsApp/LinkedIn)
  → Lands on Home or specific page
  → Views portfolio/case studies for validation
  → Clicks "Book a Call" on any page
  → Arrives at /contact or Calendly
  → Books a call
```

### 4.3 SEO Visitor Flow

```
Google search: "branding agency for D2C India"
  → Lands on Home or Service page (organic)
  → Reads relevant content
  → Browses portfolio for proof
  → Checks pricing for budget fit
  → Submits contact form or books call
```

---

## 5. Functional Requirements

### 5.1 Contact Form Backend
- **Endpoint:** POST `/api/contact`
- **Validation:** Server-side zod schema matching client-side
- **Email:** Send notification via Resend API (free tier: 100/day)
- **Data storage:** Optional webhook to Google Sheets or Notion for lead tracking
- **Rate limiting:** 5 submissions per IP per hour
- **Response:** JSON `{ success: true, message: "..." }` or `{ success: false, error: "..." }`

### 5.2 Blog System
- **Content source:** MDX files in repository (Phase 1), migratable to headless CMS later
- **Features:** Syntax highlighting, image optimization, table of contents, reading time
- **Pagination:** 9 posts per page, "Load More" or numbered pagination

### 5.3 Portfolio System
- **Content source:** TypeScript data files in `src/data/portfolio.ts`
- **Filtering:** Client-side category filtering with animation
- **Dynamic routes:** `/portfolio/[slug]` generated from data

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
| Total page weight (home) | < 1.5MB |

### 6.2 SEO Requirements
- Unique `<title>` and `<meta description>` on every page
- Open Graph + Twitter Card meta tags on every page
- Canonical URLs on every page
- JSON-LD structured data: Organization (home), LocalBusiness (contact), Service (service pages), Article (blog posts), FAQ (service/pricing pages), BreadcrumbList (all inner pages)
- Dynamic `sitemap.xml` covering all static and dynamic routes
- `robots.txt` allowing all crawlers
- Semantic HTML (proper heading hierarchy, landmarks, alt text)
- Target keywords: "branding agency for D2C India", "D2C brand strategy Bangalore", "brand identity agency India", "D2C marketing agency"

### 6.3 Responsive Breakpoints
| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | 320px - 767px | Single column, stacked sections |
| Tablet | 768px - 1023px | 2-column where appropriate |
| Desktop | 1024px - 1439px | Full layout |
| Large Desktop | 1440px+ | Max-width container, centered |

### 6.4 Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigable (all interactive elements)
- Screen reader compatible (ARIA labels, semantic HTML)
- Sufficient color contrast (especially gold accent on dark background — minimum 4.5:1 for text)
- Focus indicators on all interactive elements
- Skip to content link
- Alt text on all images

### 6.5 Browser Support
- Chrome 90+ (primary)
- Safari 15+ (primary — many founders use iPhone)
- Firefox 90+
- Edge 90+
- Mobile Safari (iOS 15+)
- Chrome Android

---

## 7. Content Requirements

### 7.1 Copy Guidelines
- Use verbatim ICP language from market research (e.g., "stuck below ₹50 crore", "CAC keeps going up", "changed agencies 3 times")
- Frame every service around an outcome, not a deliverable
- Include specific numbers: "60-65% of D2C brands", "30% YoY CAC increase"
- Address top 4 sales objections on pricing and services pages
- Use Indian Rupee (₹) formatting throughout — never USD
- Reference aspirational Indian D2C brands (boAt, Mamaearth, Licious, Nykaa)
- Tone: Direct (8/10), Conversational (7/10), Bold (8/10), Accessible (7/10)

### 7.2 Image Requirements
- Hero images: 1920x1080 minimum, dark-toned, abstract or branded
- Portfolio thumbnails: 800x600 minimum, consistent aspect ratio
- Team photos: 400x400 minimum, square, professional
- Blog thumbnails: 800x450 minimum, 16:9 ratio
- All images: WebP/AVIF format via Next.js optimization
- Placeholder: Blur hash for all images

### 7.3 Sample Content Needed at Launch
- 2-3 portfolio case studies (can use anonymized/mockup data initially)
- 3-5 blog posts (D2C branding topics)
- Team bios + photos
- 3+ client testimonials (can use placeholder initially)
- Client logos (minimum 4-6)

---

## 8. Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 14+ (App Router) | SSR/SSG, SEO, performance |
| Language | TypeScript | Type safety, DX |
| Styling | Tailwind CSS | Utility-first, fast development, dark theme support |
| Animations | Framer Motion | Best React animation library, scroll-triggered animations |
| Forms | react-hook-form + zod | Performant forms + schema validation |
| Blog | next-mdx-remote | MDX rendering, future CMS migration path |
| Icons | lucide-react | Lightweight, tree-shakable |
| Email | Resend | Free tier (100/day), simple API |
| Utilities | clsx + tailwind-merge | Conditional class management |
| Deployment | Vercel | Native Next.js support, free tier, analytics |
| Analytics | Vercel Analytics + GA4 | Core Web Vitals + traffic data |
| Images | next/image + /public/ | Auto-optimization, lazy loading |

---

## 9. Success Metrics

| Metric | Target | Timeframe |
|--------|--------|-----------|
| Monthly qualified leads (form submissions) | 20+ | 3 months post-launch |
| Organic search traffic | 1,000+ monthly visits | 6 months post-launch |
| Average session duration | > 2 minutes | 1 month post-launch |
| Bounce rate (home page) | < 50% | 1 month post-launch |
| Contact form conversion rate | > 3% of visitors | 3 months post-launch |
| Lighthouse Performance score | 90+ | At launch |
| Mobile traffic share | Track (expect 60%+) | Ongoing |

---

## 10. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| No real case studies at launch | Low credibility | Use anonymized/mockup case studies with clear "sample" labels; replace ASAP |
| Gold on dark contrast fails accessibility | Legal/UX risk | Test all gold text combos against WCAG 4.5:1 ratio; adjust accent shade if needed |
| Contact form spam | Noise, email reputation | Implement honeypot field + rate limiting; add reCAPTCHA if needed later |
| Blog content velocity low | SEO won't compound | Prepare 5 cornerstone articles at launch; schedule monthly content |
| Page speed degradation from animations | Performance score drop | Use `will-change`, lazy-load below-fold animations, test with Lighthouse |

---

## 11. Out of Scope (v1)

- CMS integration (Sanity/Contentful) — future enhancement
- Multi-language support
- Client portal / dashboard
- E-commerce / payment processing
- Live chat widget
- A/B testing infrastructure
- Dark/light mode toggle (ship dark-only in v1)
- Email marketing integration (Mailchimp/ConvertKit) — manual newsletter initially

---

## 12. Approval

This PRD must be approved before proceeding to Step 2 (Wireframes).

| Reviewer | Status | Date |
|----------|--------|------|
| Founder | Pending | — |
