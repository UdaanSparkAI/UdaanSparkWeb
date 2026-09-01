# YUKTA AI Website — Complete Knowledge Base

> **Audience:** Anyone (dev, designer, junior engineer) who needs to understand, update, deploy, or debug the YUKTA AI marketing website.

---

## ⚠️ READ FIRST — THIS FOLDER DOES NOT DEPLOY

**`SmartSaverApp/website/` (this folder) is a stale mirror. Editing it changes nothing on the live site.**

| | This folder | The live site |
|---|---|---|
| Repo | `UdaanSparkAI/SmartSaverApp` (Android repo) | `yukta-ai-website` (separate public repo) |
| Deploys to | nothing | `https://yukta.udaansparkai.com` via Vercel |
| Last updated | 9 July 2026 (`cb76ecc`) | ahead of this copy |

**Verified 3 August 2026** — the live site is *ahead* of this folder and already contains content that does not exist here:
- a **"What Our Users Say"** testimonials section (no `TestimonialsSection.tsx` in this folder)
- **Chef Agent** and **AI Diet Plan / Nutrition Agent** marketing content
- the assets this document describes below (`yukta-icon.png`, `public/app/*.jpeg`) — **none of which exist in this folder's `public/`**

So treat the file listings in sections 3 and 8 below as describing the **deploy repo**, not this folder.

### Consequences

1. Any change made here must be **ported to the `yukta-ai-website` repo** to go live.
2. Do **not** copy this folder over the deploy repo wholesale — you would delete the testimonials section and the real screenshots. Port changes file by file.
3. There is **no clone of the deploy repo on this machine.** The path in section 10 (`C:\Users\Sonic\yukta-ai-website`) is from a *different* machine and does not exist here. Clone the deploy repo before attempting a deploy.

---

## Table of Contents
1. [High-Level Architecture](#1-high-level-architecture)
2. [Tech Stack](#2-tech-stack)
3. [File Structure](#3-file-structure)
4. [Pages Reference](#4-pages-reference)
5. [Design System](#5-design-system)
6. [Key Components](#6-key-components)
7. [Content & Copy — Where to Edit](#7-content--copy--where-to-edit)
8. [Images & Assets](#8-images--assets)
9. [Environment Variables](#9-environment-variables)
10. [Deployment Workflow](#10-deployment-workflow)
11. [Vercel — Health Checks & Dashboard](#11-vercel--health-checks--dashboard)
12. [Common Tasks](#12-common-tasks)
13. [Common Mistakes & How to Avoid Them](#13-common-mistakes--how-to-avoid-them)

---

## 1. High-Level Architecture

```
Developer (Windows Machine)
        │
        │  git push origin main
        ▼
GitHub (public repo: payengsonic/yukta-ai-website)
        │
        │  Vercel auto-detects push → triggers build
        ▼
Vercel Build Pipeline
        │  npm run build (Next.js 16, ~1-2 min)
        │  Output: static HTML + edge functions
        ▼
Vercel CDN (global edge network)
        │
        │  HTTPS (SSL auto-managed by Vercel)
        ▼
https://yukta.udaansparkai.com
        │
        ▼
End User (browser / Google Play Store link checker)
```

**What each piece does:**
- **GitHub repo** — source of truth; every push to `main` triggers a Vercel deploy
- **Vercel** — builds the Next.js app, hosts it on a global CDN, manages SSL automatically
- **Custom domain** — `yukta.udaansparkai.com` pointed at Vercel via CNAME in Google Domains (now Squarespace Domains)
- **No backend** — all forms use `mailto:` links; zero server-side API calls from the website

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.10 |
| Language | TypeScript | 5.x |
| UI Library | React | 19.2.4 |
| Styling | Tailwind CSS v4 | 4.x |
| Animations | Framer Motion | 12.42.2 |
| Fonts | next/font/google | — |
| Images | next/image | — |
| Hosting | Vercel | Free tier |
| Domain DNS | Google Domains → Squarespace | — |
| SSL | Vercel (auto Let's Encrypt) | — |
| Package manager | npm | — |

### Why these choices
- **Next.js App Router** — server components by default, built-in SEO metadata, automatic sitemap/robots
- **Tailwind v4** — CSS-first config (no `tailwind.config.js`); uses `@theme {}` block in `globals.css`
- **Framer Motion 12** — scroll-trigger animations (`whileInView`), page transitions, floating effects
- **Vercel** — zero-config Next.js hosting; free SSL + CDN; auto-deploys on every git push
- **No backend** — forms open the user's email app via `mailto:` — no server maintenance needed

---

## 3. File Structure

```
yukta-ai-website/
├── public/
│   ├── yukta-icon.png              ← App icon (used in navbar + footer)
│   ├── chatbot-hero.jpeg           ← Chatbot illustration (hero section)
│   ├── logo.jpeg                   ← Legacy logo (no longer used)
│   ├── og-image.svg                ← OpenGraph fallback image
│   └── app/
│       ├── chatbot.jpeg            ← App screenshot: chatbot screen
│       ├── chatbot-features.jpeg   ← App screenshot: chatbot features
│       ├── nutrition.jpeg          ← App screenshot: nutrition agent
│       ├── chef.jpeg               ← App screenshot: chef agent
│       └── sidebar.jpeg            ← App screenshot: sidebar/dashboard
│
├── src/
│   ├── app/
│   │   ├── globals.css             ← Tailwind v4 theme + global CSS utilities
│   │   ├── layout.tsx              ← Root layout: fonts, Navbar, Footer
│   │   ├── page.tsx                ← / Landing page (assembles all sections)
│   │   ├── opengraph-image.tsx     ← Dynamic OG image (edge runtime)
│   │   ├── sitemap.ts              ← Auto-generated sitemap.xml
│   │   ├── robots.ts               ← Auto-generated robots.txt
│   │   ├── privacy/page.tsx        ← /privacy
│   │   ├── terms/page.tsx          ← /terms
│   │   ├── contact/page.tsx        ← /contact
│   │   ├── delete-account/
│   │   │   └── page.tsx            ← /delete-account (Play Store required)
│   │   ├── refund/page.tsx         ← /refund
│   │   └── support/page.tsx        ← /support
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          ← Sticky glassmorphism navbar + mobile drawer
│   │   │   └── Footer.tsx          ← 4-column footer with links
│   │   ├── sections/               ← Landing page sections (used only in page.tsx)
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── WhyYuktaSection.tsx
│   │   │   ├── AppPreviewSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── FAQSection.tsx
│   │   └── ui/                     ← Reusable primitives
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       ├── GradientText.tsx
│   │       ├── AnimatedSection.tsx ← Scroll-trigger Framer Motion wrapper
│   │       ├── Accordion.tsx       ← FAQ expand/collapse
│   │       ├── StepTimeline.tsx    ← How It Works steps
│   │       ├── ContactForm.tsx     ← mailto: contact form
│   │       └── DeleteAccountForm.tsx ← mailto: delete account form
│   │
│   ├── lib/
│   │   ├── constants.ts            ← ALL editable copy: features, FAQ, steps, brand info
│   │   └── metadata.ts             ← generatePageMetadata() factory for SEO
│   │
│   └── types/
│       └── index.ts                ← TypeScript types: FeatureCard, FAQItem, Step, etc.
│
├── .env.local                      ← Local env (not committed)
├── .env.local.example              ← Template for env vars
├── next.config.ts                  ← Next.js config
├── package.json
├── tsconfig.json
└── WEBSITE_KNOWLEDGE_BASE.md       ← This file
```

---

## 4. Pages Reference

| Route | File | Purpose | Notes |
|---|---|---|---|
| `/` | `app/page.tsx` | Landing page | Assembles 7 sections |
| `/privacy` | `app/privacy/page.tsx` | Privacy Policy | Play Store + GDPR compliance |
| `/terms` | `app/terms/page.tsx` | Terms & Conditions | Legal |
| `/contact` | `app/contact/page.tsx` | Contact Us | mailto: form |
| `/delete-account` | `app/delete-account/page.tsx` | Delete Account Request | Google Play Store mandatory |
| `/refund` | `app/refund/page.tsx` | Refund Policy | Legal |
| `/support` | `app/support/page.tsx` | Support Center | Links to contact + FAQ |

> **Important:** `/delete-account` is required by Google Play Store. Do not remove it.

---

## 5. Design System

### Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#4F46E5` | Indigo — buttons, highlights, links |
| `--color-accent` | `#00C2A8` | Teal — badges, secondary accents |
| `--color-dark` | `#0F172A` | Footer background, hero dark sections |
| `--color-text` | `#111827` | Body text |
| `--color-muted` | `#6B7280` | Subtitles, placeholders |

Defined in `src/app/globals.css` under `@theme {}`. Available as Tailwind classes: `bg-primary`, `text-accent`, `bg-dark`, etc.

### Typography

| Font | Weight | Variable | Used for |
|---|---|---|---|
| Plus Jakarta Sans | 400–800 | `--font-heading` | All headings (h1–h4) |
| Inter | 400–500 | `--font-body` | Body text, labels, buttons |

Both loaded via `next/font/google` in `layout.tsx`.

### Glassmorphism Pattern
```css
backdrop-blur-xl bg-white/85 border border-gray-200/60 shadow-lg
```
Used in: Navbar (when scrolled), Cards.

### Gradient Text
```tsx
<GradientText>Shop Intelligently</GradientText>
// or
<span className="gradient-text">Save More</span>
```
CSS: `linear-gradient(135deg, #4f46e5, #00c2a8)` with `background-clip: text`.

---

## 6. Key Components

### `AnimatedSection` — scroll reveal wrapper
Wrap any block to fade+slide up as it enters the viewport:
```tsx
<AnimatedSection delay={0.1} direction="up">
  <YourContent />
</AnimatedSection>
```
- `direction`: `"up"` (default) | `"left"` | `"right"`
- `delay`: seconds (e.g. `0.1`, `0.2`) — staggers cards
- Uses `whileInView` with `once: true` so it only fires once

### `Button` — CTA button
```tsx
<Button href="https://..." size="lg" variant="primary">Download App</Button>
```
- `variant`: `"primary"` | `"secondary"` | `"outline"` | `"ghost"`
- `size`: `"sm"` | `"md"` | `"lg"`
- Pass `href` for link buttons, no `href` for submit buttons

### `GradientText` — brand gradient on text
```tsx
<GradientText>Save More</GradientText>
```

### `ContactForm` / `DeleteAccountForm` — mailto: forms
Both are `"use client"` components that build a `mailto:` URL on submit. No API calls. Opens the user's default email app with fields pre-filled.

---

## 7. Content & Copy — Where to Edit

> **95% of content changes only require editing one file: `src/lib/constants.ts`**

| Content | Where to edit |
|---|---|
| Brand name, tagline, support email, Play Store URL | `constants.ts` → `BRAND` object |
| Navbar links | `constants.ts` → `NAV_LINKS` |
| Feature cards (6 cards on landing) | `constants.ts` → `FEATURES` |
| How It Works steps + stats | `constants.ts` → `HOW_IT_WORKS` + `HowItWorksSection.tsx` |
| Why Yukta cards | `constants.ts` → `WHY_YUKTA` |
| FAQ questions & answers | `constants.ts` → `FAQ_ITEMS` |
| Footer links | `constants.ts` → `FOOTER_LINKS` |
| Testimonials (7 user reviews) | `TestimonialsSection.tsx` → `TESTIMONIALS` array |
| App preview bullet points | `AppPreviewSection.tsx` |
| Hero headline & sub-copy | `HeroSection.tsx` |
| Privacy / Terms / Refund text | Each respective `page.tsx` file |

---

## 8. Images & Assets

### Current images in `public/`

| File | Used in | Notes |
|---|---|---|
| `yukta-icon.png` | Navbar, Footer | App icon — green leaf+AI dots logo |
| `chatbot-hero.jpeg` | Hero section | Floating chatbot illustration |
| `app/chatbot.jpeg` | AppPreviewSection | Real app screenshot |
| `app/nutrition.jpeg` | AppPreviewSection | Real app screenshot |
| `app/chef.jpeg` | AppPreviewSection | Real app screenshot |
| `app/chatbot-features.jpeg` | Available for use | Real app screenshot |
| `app/sidebar.jpeg` | Available for use | Dashboard/sidebar screenshot |

### To add a new image
1. Copy the image into `public/` or `public/app/`
2. Reference it in code as `/your-image.jpg` (relative to `public/`)
3. Use `next/image` with `fill` + `sizes` for responsive loading:
```tsx
import Image from "next/image";
<div className="relative w-32 h-32">
  <Image src="/your-image.jpg" alt="description" fill className="object-cover" sizes="128px" />
</div>
```

### To replace the logo
Drop a new file into `public/yukta-icon.png` (same filename) — it will automatically update in Navbar and Footer.

---

## 9. Environment Variables

File: `.env.local` (not committed — copy from `.env.local.example`)

| Variable | Required | Value |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://yukta.udaansparkai.com` |

> There are no server-side secrets. The website has no backend API routes.

To create locally:
```powershell
echo "NEXT_PUBLIC_SITE_URL=https://yukta.udaansparkai.com" > .env.local
```

On Vercel this is set in: **Vercel Dashboard → yukta-ai-website → Settings → Environment Variables**

---

## 10. Deployment Workflow

### Where to work

Deployable website code lives in the **standalone `yukta-ai-website` repo** — *not* in
`SmartSaverApp/website/`. See the ⚠️ banner at the top of this document.

The absolute path differs per machine. On the machine this doc was originally written on it was
`C:\Users\Sonic\yukta-ai-website\`; **that path does not exist on every machine.** Confirm you are
in the right place before working:

```powershell
# You are in the DEPLOY repo only if this prints a yukta-ai-website remote:
git remote -v
# If it prints UdaanSparkAI/SmartSaverApp, you are in the Android repo — changes here will NOT deploy.
```

If you have no local clone yet, clone the deploy repo first, then open it in VS Code.

### Standard deploy (make changes → push → live in ~1 min)

```powershell
# 1. Navigate to the website repo
cd C:\Users\Sonic\yukta-ai-website

# 2. Check what changed
git status
git diff

# 3. Stage all changes
git add .

# 4. Commit with a descriptive message
git commit -m "feat(website): describe what you changed"

# 5. Push to GitHub — Vercel auto-deploys on push
git push origin main
```

Vercel picks up the push and deploys in ~60–90 seconds.

### Commit message conventions
```
feat(website): add new section or feature
fix(website): correct a bug or broken layout
content: update copy, FAQ answers, testimonials
style: visual changes only (colors, spacing)
chore: update dependencies, config
```

### Run locally before pushing
```powershell
cd C:\Users\Sonic\yukta-ai-website
npm run dev
# Open http://localhost:3000
```

### Build locally to catch TypeScript errors before pushing
```powershell
npm run build
# Must show: ✓ Compiled successfully
# Must show: ✓ Linting and checking validity of types
# Zero errors before you push
```

---

## 11. Vercel — Health Checks & Dashboard

### URLs to check

| What | URL |
|---|---|
| Live website | https://yukta.udaansparkai.com |
| Vercel project dashboard | https://vercel.com/sonic-yukta/yukta-ai-website |
| Deployments list | https://vercel.com/sonic-yukta/yukta-ai-website/deployments |
| Domain settings | https://vercel.com/sonic-yukta/yukta-ai-website/settings/domains |
| Environment variables | https://vercel.com/sonic-yukta/yukta-ai-website/settings/environment-variables |

### After every push — verify these

1. **Deployment status** → Go to Vercel Deployments — should show green `Ready` within 90 seconds
2. **Live site** → Open https://yukta.udaansparkai.com — verify your changes are visible
3. **All 7 pages load** → Check `/privacy`, `/terms`, `/contact`, `/delete-account`, `/refund`, `/support`
4. **SSL padlock** → Browser address bar must show the lock icon (Vercel handles this automatically)

### If a deployment fails
1. Go to Vercel → Deployments → click the failed deploy
2. Click **View Build Logs** — scroll to the red error
3. Fix the TypeScript/build error locally (`npm run build` will show the same error)
4. Push the fix — Vercel retries automatically

### DNS health check (if domain stops working)
DNS is managed in **Squarespace Domains** (formerly Google Domains):
- Login: domains.squarespace.com with your Google account
- Domain: `udaansparkai.com`
- Check: `yukta` CNAME → `576da23c3cfae745.vercel-dns-017.com.`
- Check: `_vercel` TXT → `vc-domain-verify=yukta.udaansparkai.com,9552f986bb3e7f4ecb22`

---

## 12. Common Tasks

### Add a new testimonial
Edit `src/components/sections/TestimonialsSection.tsx` → add an entry to the `TESTIMONIALS` array:
```ts
{
  name: "User Name",
  location: "City",
  initials: "UN",
  color: "#4f46e5",   // pick any brand color
  rating: 5,
  text: "Their review text here.",
},
```

### Update the Google Play Store link
Edit `src/lib/constants.ts` → `BRAND.playStoreUrl`:
```ts
playStoreUrl: "https://play.google.com/store/apps/details?id=com.udaansparkai.smartsaver",
```

### Add a new FAQ question
Edit `src/lib/constants.ts` → append to `FAQ_ITEMS`:
```ts
{
  question: "Your question here?",
  answer: "Your answer here.",
},
```

### Add a new landing page section
1. Create `src/components/sections/YourSection.tsx`
2. Import and add it to `src/app/page.tsx` in the desired position

### Add a new website page (e.g. `/about`)
1. Create `src/app/about/page.tsx`
2. Export `metadata` using `generatePageMetadata`
3. Add a link in `constants.ts` → `FOOTER_LINKS` or `NAV_LINKS`
4. Add the URL to `src/app/sitemap.ts`

---

## 13. Common Mistakes & How to Avoid Them

### ❌ Editing files in `SmartSaverApp/website/` and expecting them to deploy
**Why it fails:** That folder is a stale mirror inside the Android repo. Nothing builds or deploys from it. The live site is built from the standalone `yukta-ai-website` repo.
**Symptom:** You push, Vercel shows no new deployment, and the live site is unchanged.
**Fix:** Run `git remote -v` before editing. If it shows `UdaanSparkAI/SmartSaverApp`, you are in the wrong repo — port your change to `yukta-ai-website` instead.
**Also:** the mirror is *behind* the live site, so never bulk-copy it over the deploy repo. Port file by file. See the ⚠️ banner at the top.

### ❌ Using `"use client"` on a page that also exports `metadata`
**Why it fails:** Next.js App Router cannot export `metadata` from a Client Component file.
**Fix:** Keep the page file as a Server Component. Extract the interactive/stateful part into a separate `"use client"` component (see `delete-account/page.tsx` + `DeleteAccountForm.tsx` as the pattern).

### ❌ Adding an `ease` array without the type assertion in Framer Motion 12
**Why it fails:** Framer Motion 12 expects a typed `[number, number, number, number]` tuple, not a plain `number[]`.
**Fix:**
```tsx
// Wrong
ease: [0.22, 1, 0.36, 1]

// Correct
ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
```

### ❌ Pushing without running `npm run build` first
**Symptom:** Vercel build fails — red deployment — site goes down or stays on old version.
**Fix:** Always run `npm run build` locally. It must complete with zero errors before you push.

### ❌ Adding images without using `next/image`
**Why it matters:** Plain `<img>` tags bypass Next.js image optimisation — slower loads, worse Lighthouse score.
**Fix:** Always use `import Image from "next/image"` with the `fill` + `sizes` props for responsive images.

### ❌ Forgetting to add a new page to `sitemap.ts`
**Why it matters:** Google won't index the page as quickly without a sitemap entry.
**Fix:** Every new route in `app/` should have a corresponding entry in `src/app/sitemap.ts`.

### ❌ Domain not resolving after DNS change
**Why it happens:** DNS changes can take up to 24h to propagate globally (Google Cloud DNS is usually faster — 1–5 min).
**Check:** Use https://dnschecker.org to verify your CNAME record has propagated.
