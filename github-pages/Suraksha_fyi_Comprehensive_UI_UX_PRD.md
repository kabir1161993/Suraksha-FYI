# Suraksha.fyi — Comprehensive UI/UX & Product Design Document
**Version 3.0 | August 2026**
**Status: Working Draft — India-First Edition**

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Platform Vision & Inspiration (Refined)](#3-platform-vision--inspiration-refined)
4. [Target Users & Personas](#4-target-users--personas)
5. [Sitemap & Navigation Architecture](#5-sitemap--navigation-architecture)
6. [Design System](#6-design-system)
7. [Screen-by-Screen UI Specifications](#7-screen-by-screen-ui-specifications)
   - 7.1 Landing Page
   - 7.2 Report Submission Flow (step by step)
   - 7.3 Live Hazard Map
   - 7.4 Restaurant & Brand Profile Page
   - 7.5 City & Regional Dashboard
   - 7.6 Search & Filter
   - 7.7 My Reports (Lightweight Account)
   - 7.8 FSSAI Official Portal View
8. [Edge Cases & Error States](#8-edge-cases--error-states)
9. [Empty States](#9-empty-states)
10. [Notification System](#10-notification-system)
11. [Accessibility & Inclusive Design](#11-accessibility--inclusive-design)
12. [Multi-Language Support](#12-multi-language-support)
13. [Mobile-First & PWA Specifications](#13-mobile-first--pwa-specifications)
14. [Core Platform Mechanics Comparison (Original — Retained)](#14-core-platform-mechanics-comparison)
15. [Detailed Technical Architecture](#15-detailed-technical-architecture)
16. [Data Schema (Expanded)](#16-data-schema-expanded)
17. [Automated Civic Action & FOI/RTI Engine (Expanded)](#17-automated-civic-action--foirti-engine-expanded)
18. [Moderation Pipeline](#18-moderation-pipeline)
19. [Public API Design](#19-public-api-design)
20. [Browser Extension & WhatsApp Bot](#20-browser-extension--whatsapp-bot)
21. [Analytics & Success Metrics (KPIs)](#21-analytics--success-metrics-kpis)
22. [Competitive Analysis](#22-competitive-analysis)
23. [Legal & Compliance Considerations](#23-legal--compliance-considerations)
24. [Monetization & Sustainability](#24-monetization--sustainability)
25. [Execution Roadmap (Expanded)](#25-execution-roadmap-expanded)
26. [India-First: First-Principles Deep Dive](#26-india-first-first-principles-deep-dive)
    - 26.1 Real India Device Stack
    - 26.2 Connectivity Reality
    - 26.3 India-Specific Hazard Taxonomy (Expanded — 10 categories)
    - 26.4 Indian Regulatory Topology & Dispatch Routing
    - 26.5 The Cloud Kitchen Identification Problem
    - 26.6 India Trust Architecture
    - 26.7 WhatsApp-First Strategy for Bharat
    - 26.8 User Acquisition Strategy
    - 26.9 India-Specific UI/UX Patterns
    - 26.10 Ola Maps as Primary Mapping Provider
    - 26.11 India-Specific Legal Hooks (Full Map)
    - 26.12 RWA as Power User Segment
    - 26.13 Delivery Partner as Reporter
    - 26.14 Missing Technical Decisions (DPDP, UPI, ONDC, Aadhaar-optional)
    - 26.15 Network Effect Flywheel
    - 26.16 Minimal Viable vs. Maximum Quality Roadmap
27. [Final Checklist: Is This Ready to Build?](#27-final-checklist-is-this-ready-to-build)

---

## 1. Executive Summary

Suraksha.fyi is an open, crowdsourced food safety registry and live hazard map for India. It transforms individual encounters with adulterated food, contaminated meals, expired products, and unhygienic kitchens into structured, publicly searchable, jurisdiction-aware data.

**The core bet:** 95% of food safety violations in India go unreported because the reporting path (complain to local FSO → wait → follow up → nothing happens) is broken. Suraksha.fyi removes every friction point from the citizen side — no account, no login, no form-filling, < 25 seconds — and routes that signal directly to public pressure and regulatory actors.

**What makes this different from existing complaint portals:**
- Zero bureaucratic login wall (unlike pgportal.gov.in, FSSAI's own portal)
- Immediate public visibility creates reputational pressure before any government action
- Automated legal dispatch when thresholds are hit — not just data aggregation
- Open dataset for journalists, food aggregators, and researchers

---

## 2. Problem Statement

### The Food Safety Gap in India

India has ~14 million food businesses, but FSSAI's enforcement capacity is severely limited. The consequence:

| Fact | Source |
|---|---|
| ~7.6 crore Indians experience foodborne illness annually | WHO India estimates |
| Only ~2% of food safety violations are ever formally reported | FSSAI Annual Report 2024 |
| Average time from complaint filing to FSO inspection: 45–90 days | Citizen surveys, RTI data |
| Most FSSAI consumer complaint portals require OTP + Aadhaar linkage | Observed behavior |
| Delivery app complaint resolution primarily ends in refunds, not enforcement | Platform policy review |

### The Specific Friction Points We Eliminate

```
CURRENT STATE (broken)
User finds contaminated food
      ↓
Searches "how to report food safety india" → 47 results, none are the right one
      ↓
Lands on FSSAI portal → "Create account / Login with Aadhaar"
      ↓
Gives up. Posts angry tweet instead. → No enforcement.

SURAKSHA.FYI STATE
User finds contaminated food
      ↓
Opens suraksha.fyi on phone (PWA, no install needed)
      ↓
Photo → GPS auto-tags → tap hazard type → 25 seconds → LIVE on map
      ↓
3rd report on that restaurant in 7 days → automated FOI dispatch to District Officer
```

---

## 3. Platform Vision & Inspiration (Refined)

### Inspiration Source 1: NammaKasa.in (Garbage Reporting, Bangalore)

**What it does right:**
- Zero-login: user clicks, takes photo, GPS-tags location in < 30s
- Automated ward-level routing: the complaint lands at the right municipal officer's desk
- Public visibility of all unresolved dumps creates accountability via shaming
- MapLibre-based live map makes the scale of the problem impossible to ignore

**Gaps we adopt from:**
- NammaKasa only works for one city (Bengaluru). We need pan-India jurisdiction resolution.
- NammaKasa doesn't have a "resolution outcome" from the complainant — we adopt Bribes.fyi's outcome toggle.

### Inspiration Source 2: Bribes.fyi (Corruption Reporting)

**What it does right:**
- Privacy-hashed, fully anonymous — users trust it because it can't be traced to them
- Merchant/department scoreboard creates viral social pressure
- Open CSV/JSON dataset for journalists unlocks secondary discovery
- "Bribe demanded vs. refused rate" metric is deceptively powerful — it reframes each data point as a signal, not just a complaint

**Gaps we adopt from:**
- Bribes.fyi has no spatial map — the data is too sparse for a geo view. We have dense restaurant data.
- No automated civic action — just data. We add the RTI/FOI dispatch layer.

### How Suraksha.fyi Synthesizes Both

```
                     ┌─────────────────────────────────────────┐
                     │          SURAKSHA.FYI INTAKE            │
                     │  (< 25s, Zero-Login, Privacy-Hashed)   │
                     └────────────────────┬────────────────────┘
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
┌──────────────────────────────────┐            ┌──────────────────────────────────┐
│     NAMMAKASA-STYLE ENGINE       │            │       BRIBES.FYI-STYLE ENGINE    │
│  - Spatial GPS Mapping           │            │  - Privacy Hashing & Anonymous   │
│  - Auto-Tagging FSO / Ward / DO  │            │  - Brand & Category Heatmaps     │
│  - Real-Time Live Hazard Map     │            │  - Action Taken vs. Ignored Stats│
│  - Public Spot-Check Feed        │            │  - Open Downloadable CSV Dataset │
└─────────────────┬────────────────┘            └─────────────────┬────────────────┘
                  │                                               │
                  └───────────────────────┬───────────────────────┘
                                          ▼
                     ┌─────────────────────────────────────────┐
                     │      PUBLIC ACCOUNTABILITY ENGINE       │
                     │ (Automated FOI/RTI & FSSAI Dispatch)    │
                     └─────────────────────────────────────────┘
```

---

## 4. Target Users & Personas

### Persona 1: Priya — The Urban Diner (Primary)

```
Name:        Priya Krishnamurthy
Age:         28
City:        Bengaluru
Occupation:  Software Engineer
Orders food: 3-4x/week via Swiggy/Zomato, eats out 2x/week
Tech comfort: High — uses 15+ apps daily
Pain point:  Found a dead cockroach in her biryani from a cloud kitchen.
             Got a ₹150 refund. The restaurant is still live on Zomato
             with 4.1 stars. "I just want someone to actually DO something."
Goal:        Report fast, without giving up her name, and know it had impact.
```

**Suraksha.fyi job-to-be-done:** Report in < 30s while the container is still in front of her. Get public confirmation the report is live. Track if any action was taken.

**Design implications for Priya:**
- Submission must work within a delivery app flow — she still has the open Swiggy page, the packaging in hand
- One-handed use on mobile (right thumb reach zone)
- No login interruption — she will not create an account under any circumstances
- Instant feedback: "Your report is live on the map" within 5 seconds of submitting

---

### Persona 2: Ravi — The Street Food Patron (Primary)

```
Name:        Ravi Kumar
Age:         42
City:        Patna
Occupation:  Government school teacher
Orders food: Mostly eats at street vendors near his school
Tech comfort: Medium — uses WhatsApp heavily, basic smartphone
Data:        On a 1GB/day plan; often on 4G with spotty coverage
Language:    Comfortable in Hindi, reads English slowly
Pain point:  Fell ill after eating at a popular chaat stall.
             Doesn't know the FSSAI license exists. Doesn't know
             how to complain. "I just don't want others to suffer."
Goal:        Report without needing to know any official terminology.
```

**Suraksha.fyi job-to-be-done:** Submit a photo and GPS location in one tap, without reading any form. Get a WhatsApp confirmation.

**Design implications for Ravi:**
- Hindi language interface by default based on device locale
- Camera → GPS → one visual tap is the entire flow for him
- No OCR dependency in his flow — FSSAI license is a bonus, not a requirement
- WhatsApp bot fallback as primary channel (he lives in WhatsApp)
- Works on 2G/3G — offline-capable image capture, upload on reconnect

---

### Persona 3: Ananya — The Journalist / Researcher (Secondary)

```
Name:        Ananya Sharma
Age:         35
City:        Delhi
Occupation:  Investigative journalist at a national news outlet
Tech comfort: Very high — uses APIs, downloads datasets
Pain point:  Gets tips about adulteration in fast food chains but
             can't build a systemic picture from individual cases.
             "I need aggregate data, not anecdotes."
Goal:        Download open dataset, filter by city/brand/hazard type,
             write data-driven story.
```

**Suraksha.fyi job-to-be-done:** API access + CSV download + visualization of trend lines over time.

**Design implications for Ananya:**
- Public API explorer page with live examples
- Data download with filter: date range + city + brand + hazard type
- Trend chart: "Reports over time for [restaurant chain]"
- Shareable embed URL: "Embed this brand's safety timeline on your article"
- API key via email (not OAuth) to keep friction low

---

### Persona 4: Commissioner Krishnaswamy — FSSAI District Officer (Tertiary)

```
Name:        V. Krishnaswamy
Age:         52
City:        Chennai
Occupation:  District Designated Officer, Tamil Nadu Food Safety
Tech comfort: Low-medium; uses WhatsApp for official communication
Pain point:  Receives 200+ complaints per month via email/portal,
             most with no verifiable location, photo, or details.
             "I can't act on 'I got sick at some restaurant in Mylapore.'"
Goal:        Receive actionable, structured, geo-verified complaints
             with photo evidence and FSSAI license number.
```

**Suraksha.fyi job-to-be-done:** Receive an automated, well-formatted email with: FSSAI license, GPS coordinates, Google Maps link, hazard category, photo, and a summary of the cluster that triggered this dispatch.

**Design implications for Krishnaswamy:**
- He never opens Suraksha.fyi — the platform reaches him via email
- Email must be formatted like an official notice, not a website notification
- PDF attachment with: incident cluster map, incident list, FSSAI license block
- Reply-to email triggers an "acknowledged" flag that updates the public map

---

## 5. Sitemap & Navigation Architecture

```
suraksha.fyi/
│
├── /                              ← Landing Page (Map + CTA)
│   ├── Live Hazard Map (embedded)
│   ├── "Report Now" FAB button
│   └── Recent Reports Feed (sidebar)
│
├── /report                        ← Report Submission Flow (5 steps)
│   ├── Step 1: Media Capture
│   ├── Step 2: Location Confirm
│   ├── Step 3: Hazard Type Select
│   ├── Step 4: Resolution Outcome
│   └── Step 5: Confirmation
│
├── /map                           ← Full-Screen Map View
│   ├── Filter Panel (hazard type, date, status)
│   ├── Cluster Detail Sidebar
│   └── Jurisdiction Overlay Toggle
│
├── /restaurant/[slug]             ← Restaurant/Brand Profile
│   ├── Incident Timeline
│   ├── Safety Score Card
│   ├── FSSAI License Info
│   └── Share / Embed
│
├── /dashboard                     ← City & Regional Analytics
│   ├── City League Table
│   ├── Brand Hall of Shame/Fame
│   ├── Hazard Category Breakdown
│   ├── Resolution Rate Trends
│   └── Monthly Trend Charts
│
├── /search                        ← Search & Filter
│   ├── Search by restaurant name
│   ├── Search by FSSAI license
│   ├── Filter by city / category
│   └── Results Grid
│
├── /my-reports                    ← My Submissions (device-local, no login)
│   ├── List of submitted reports
│   ├── Status tracker (live / acknowledged / inspected)
│   └── Share individual report
│
├── /api                           ← Public API Docs (static)
│   ├── Endpoints reference
│   ├── Live playground (try it)
│   └── Dataset download
│
├── /about                         ← Mission & How It Works
│   ├── Privacy policy
│   ├── Moderation policy
│   └── Partner logos (FSSAI, media)
│
└── /admin (protected)             ← Internal Moderation Panel
    ├── Report Queue
    ├── Flagged Content
    ├── Dispatch Log
    └── Jurisdiction Map
```

---

## 6. Design System

### 6.1 Color Palette

**Primary — Safety Amber:**
The brand color is amber/saffron — chosen because it's the color of Indian food culture, warning signs, and action. It's not "government portal blue" which carries distrust, and not "alarming red" which feels punitive.

```
--color-primary:       #F59E0B  (Amber 500)  — CTAs, active states, highlights
--color-primary-dark:  #D97706  (Amber 600)  — Hover, pressed states
--color-primary-light: #FEF3C7  (Amber 50)   — Backgrounds, subtle highlights

--color-critical:      #DC2626  (Red 600)    — P0 hazard pins, critical alerts
--color-warning:       #F59E0B  (Amber 500)  — P1 hazard pins, warnings
--color-resolved:      #16A34A  (Green 600)  — Resolved/inspected pins, success
--color-pending:       #6B7280  (Gray 500)   — Pending moderation

--color-neutral-900:   #111827              — Primary text
--color-neutral-700:   #374151              — Secondary text
--color-neutral-300:   #D1D5DB              — Borders, dividers
--color-neutral-50:    #F9FAFB              — Page backgrounds
--color-white:         #FFFFFF              — Cards, surfaces

--color-overlay:       rgba(0,0,0,0.5)      — Map sidebar overlays
```

**Hazard Pin Colors on Map:**
```
🔴 P0 Critical (Glass, Metal, Chemical, Mass Poisoning):  #DC2626
🟡 P1 Moderate (Insect, Hair, Expired, Spoilage):         #F59E0B
🔵 P2 Reported Hygiene (Handling, Pest, Unverified):      #3B82F6
🟢 Resolved (Merchant acknowledged or FSO inspected):     #16A34A
⚫ Under Review (Moderation pending):                     #6B7280
```

### 6.2 Typography

**Font Stack:** `Inter` (primary), system fallback sans-serif

```
--font-heading:   'Inter', sans-serif; weight 700, 600
--font-body:      'Inter', sans-serif; weight 400, 500
--font-mono:      'JetBrains Mono', monospace  (for FSSAI license, IDs, JSON)

Scale:
--text-xs:   12px / line-height 1.5   — Labels, captions, meta
--text-sm:   14px / line-height 1.5   — Secondary body, form labels
--text-base: 16px / line-height 1.6   — Primary body, form inputs
--text-lg:   18px / line-height 1.5   — Card titles, section intros
--text-xl:   20px / line-height 1.4   — Page headings (mobile)
--text-2xl:  24px / line-height 1.3   — Page headings (desktop)
--text-3xl:  30px / line-height 1.2   — Hero statements
--text-4xl:  36px / line-height 1.1   — Landing hero number stats
```

**Localization Note:** When rendering Hindi/regional script, increase line-height by 0.2 and font-size by 1px. Devanagari descenders require more vertical space.

### 6.3 Spacing System

```
4px base unit. Scale: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96px
```

### 6.4 Component Inventory

**Buttons:**
```
PRIMARY BUTTON
┌─────────────────────────────┐
│  [Icon]  Report a Hazard   │     bg: --color-primary
└─────────────────────────────┘     h: 48px, px: 20px, radius: 8px
                                    hover: --color-primary-dark
                                    disabled: opacity 40%, cursor not-allowed

SECONDARY BUTTON
┌─────────────────────────────┐
│  [Icon]  View All Reports  │     bg: white, border: 1.5px --color-primary
└─────────────────────────────┘     text: --color-primary

GHOST BUTTON
  Skip this step →                  no border/bg, text: --color-neutral-700
                                    hover: underline

DANGER BUTTON
┌─────────────────────────────┐
│       Delete Report        │     bg: #DC2626 (only in admin)
└─────────────────────────────┘

FAB (Floating Action Button — Report Now)
  ●  Large circular button, 56px diameter
     bg: --color-primary, shadow: 0 4px 16px rgba(245,158,11,0.5)
     Position: fixed, bottom-right, z-index 100
     Pulsing amber ring animation on idle (draws attention)
     Label: "Report" below the camera icon
```

**Hazard Type Chips:**
```
Single-tap selection cards, arranged in a 2-column grid:

┌────────────────────┐  ┌────────────────────┐
│  🐛  Foreign       │  │  🤢  Food          │
│      Object        │  │      Poisoning     │
└────────────────────┘  └────────────────────┘
┌────────────────────┐  ┌────────────────────┐
│  🦠  Spoilage /    │  │  📅  Expired       │
│      Mold          │  │      Product       │
└────────────────────┘  └────────────────────┘
┌────────────────────┐  ┌────────────────────┐
│  🐀  Pest /        │  │  🧪  Chemical /    │
│      Infestation   │  │      Adulteration  │
└────────────────────┘  └────────────────────┘

Selected state: amber border (2px), amber background tint, checkmark
Unselected: gray border, white background
Touch target: minimum 48 × 72px per chip
```

**Map Pin Component:**
```
Unselected:
  Circle, 12px diameter, color by severity
  
Selected / Hovered:
  Circle, 20px diameter + white ring (4px) + shadow
  Tooltip card appears 8px above:
  ┌──────────────────────────┐
  │ 🍛 Cloud Kitchen         │
  │ 3 reports this month     │
  │ ⚠ Foreign Object found  │
  │ [View Details →]         │
  └──────────────────────────┘

Clustered (> 5 pins in view radius):
  Larger circle with count number inside
  Color: highest severity in cluster
  Example: ●23 (red, meaning 23 reports including at least 1 P0 critical)
```

**Status Line (Report Progress):**
```
Step 1  Step 2  Step 3  Step 4  Step 5
  ●───────○───────○───────○───────○
  
Completed step: filled amber circle
Current step:   amber circle, pulsing border
Upcoming step:  gray empty circle
Line between:   amber when left step complete, gray otherwise
```

**Toast Notifications:**
```
Position: top-center on mobile, bottom-right on desktop
Duration: 4s auto-dismiss, plus X button

SUCCESS TOAST:
┌──────────────────────────────────────┐
│ ✅  Your report is now live on map  │
└──────────────────────────────────────┘
bg: #F0FDF4, border-left: 4px #16A34A

ERROR TOAST:
┌──────────────────────────────────────┐
│ ❌  GPS signal weak. Try again?     │
└──────────────────────────────────────┘
bg: #FEF2F2, border-left: 4px #DC2626

INFO TOAST:
┌──────────────────────────────────────┐
│ ℹ️  3 other reports near this loc.  │
└──────────────────────────────────────┘
bg: #EFF6FF, border-left: 4px #3B82F6
```

**Data Stat Cards:**
```
┌─────────────────────────┐
│   1,247                 │  ← Large number (text-4xl, bold)
│   Reports This Month    │  ← Label (text-sm, neutral-700)
│   ↑ 23% vs last month  │  ← Trend (text-xs, green or red)
└─────────────────────────┘
bg: white, border: 1px neutral-200, radius: 12px, padding: 20px
Shadow: 0 1px 3px rgba(0,0,0,0.08)
```

### 6.5 Iconography

Use Lucide icons throughout (already in Next.js 15 tech stack). Key mappings:
```
Camera icon        → Media capture
MapPin icon        → Location
AlertTriangle      → Hazard (P0)
AlertCircle        → Hazard (P1)
CheckCircle        → Resolved
Clock              → Pending
Share2             → Share report
Download           → CSV download
Search             → Search
Filter             → Filter panel
ChevronRight       → Navigation arrow
X / XCircle        → Close / Remove
Info               → Tooltip trigger
Shield             → Safety / FSSAI
Zap                → Fast / < 25s badge
```

---

## 7. Screen-by-Screen UI Specifications

### 7.1 Landing Page (suraksha.fyi/)

**Purpose:** Convert a curious visitor into a reporter or an engaged viewer. Must communicate the product's value in < 5 seconds.

**Layout (Mobile — 375px viewport):**
```
┌──────────────────────────────────┐  ← status bar
│  ≡  Suraksha.fyi         🔍 📊  │  ← navbar (h: 56px)
│                                  │
│ ┌──────────────────────────────┐ │
│ │                              │ │  ← Live Hazard Map
│ │   [MAPLIBRE GL MAP]          │ │     fills ~55% of viewport
│ │   Colored pins visible       │ │     auto-centers on user city
│ │                              │ │
│ │   ●3  ●  ●12  ●  ●          │ │  ← incident clusters
│ └──────────────────────────────┘ │
│                                  │
│  1,247 reports this month  →     │  ← Stat strip (scrollable horizontal)
│  84 restaurants flagged          │
│  12 FSO actions taken            │
│                                  │
│  ⚡ Latest Reports               │
│  ┌────────────────────────────┐  │
│  │ 🐛 Foreign Object          │  │  ← Recent report card
│  │ Zomato Cloud Kitchen       │  │
│  │ Koramangala, Bengaluru     │  │
│  │ 2 minutes ago · P0 Critical│  │
│  └────────────────────────────┘  │
│  ┌────────────────────────────┐  │
│  │ 📅 Expired Product         │  │  ← Second card
│  │ Big Bazaar — Packaging     │  │
│  │ Andheri, Mumbai            │  │
│  │ 15 minutes ago · P1        │  │
│  └────────────────────────────┘  │
│                                  │
│         ╔══════════════╗         │
│         ║   📷 Report  ║         │  ← Primary FAB (amber, prominent)
│         ╚══════════════╝         │
└──────────────────────────────────┘
```

**Desktop Layout (1280px viewport):**
```
┌────────────────────────────────────────────────────────┐
│  Suraksha.fyi   [Dashboard]  [Search]  [API]  [About] │  ← Nav
├──────────────────────────────────┬─────────────────────┤
│                                  │                     │
│                                  │  ⚡ Live Feed       │
│   [MAPLIBRE FULL HEIGHT MAP]     │                     │
│                                  │  ● Report @ 2m ago  │
│   Pins, clusters, jurisdiction   │  Koramangala        │
│   overlay toggle (top-right)     │  🐛 Foreign Object  │
│                                  │                     │
│   [Filter: All | P0 | P1 | Res.] │  ● Report @ 5m ago  │
│                                  │  Andheri, Mumbai    │
│                                  │  📅 Expired Pdt.    │
│                                  │                     │
│                                  │  [Load More]        │
│                                  │                     │
│                                  │  ──────────────     │
│                                  │  📷 Report a        │
│                                  │     Hazard          │
│                                  │  [Start Report →]   │
├──────────────────────────────────┴─────────────────────┤
│  1,247 Reports · 84 Restaurants Flagged · 12 Inspected │  ← Footer stat bar
└────────────────────────────────────────────────────────┘
```

**Behavior Details:**
- Map auto-locates using `navigator.geolocation` on page load. If denied, defaults to last-visited city or Bengaluru.
- Live Feed polls `/api/v1/reports/recent?limit=20` every 30 seconds.
- "Report a Hazard" FAB is sticky on mobile.
- Map clusters zoom in on tap/click to reveal individual pins.
- First-time visitor sees a subtle bottom-sheet intro tooltip: "Found contaminated food? Report it in 25 seconds. No login needed." → [Got it] [Report Now]

---

### 7.2 Report Submission Flow — 5-Step Wizard

**Design Principle:** Each step must be completable with one hand, in < 5 seconds, with no typing required if possible. The progress bar at the top always shows where the user is.

---

#### STEP 1 — Media Capture

```
┌──────────────────────────────────┐
│  ←   Report a Hazard      1 of 5 │
│  ●───────○───────○───────○───────○│  ← Progress strip
├──────────────────────────────────┤
│                                  │
│  📷  Add Photo or Video          │  ← Section title
│  (required for moderation)       │
│                                  │
│  ┌────────────────────────────┐  │
│  │                            │  │
│  │    [ CAMERA VIEWFINDER ]   │  │  ← Camera preview (live)
│  │                            │  │     or shows last frame
│  │         [  SNAP  ]         │  │     after capture
│  └────────────────────────────┘  │
│                                  │
│  or  [  Upload from Gallery  ]   │
│                                  │
│  ───────────────────────────     │
│  Tips:                           │
│  • Show the food/packaging       │
│  • Include the FSSAI sticker     │  ← Collapsible tip panel
│    if visible (license #)        │
│  • Show the receipt / bill       │
│                                  │
│           [   NEXT   →]          │  ← disabled until photo taken
└──────────────────────────────────┘
```

**After photo taken — thumbnail preview replaces camera:**
```
  ┌──────────────────┐
  │   [THUMBNAIL]    │  [✏ Retake]
  └──────────────────┘
  ✅ Photo added
```

**OCR (automatic, runs in background):**
- If FSSAI license number (14-digit string) detected in photo → auto-populate field in Step 2
- User sees: "📋 FSSAI license detected: 11223344556677. Tap to confirm."
- If not detected → no disruption to flow, license field remains optional in Step 2

---

#### STEP 2 — Location Confirm

```
┌──────────────────────────────────┐
│  ←   Report a Hazard      2 of 5 │
│  ●───────●───────○───────○───────○│
├──────────────────────────────────┤
│                                  │
│  📍  Confirm Location            │
│                                  │
│  ┌────────────────────────────┐  │
│  │   [MAP SNIPPET]            │  │  ← Small static map
│  │   📍 Pin at your location  │  │     user can drag pin
│  └────────────────────────────┘  │
│                                  │
│  Auto-detected:                  │
│  Koramangala 5th Block,          │
│  Bengaluru, Karnataka            │
│  [📋 Use This Location]  [Edit]  │
│                                  │
│  ─────────────────────────────── │
│  Restaurant / Outlet Name        │
│  [ Search or type name... ]      │  ← Search against Google Places / OSM
│                                  │
│  FSSAI License # (optional)      │
│  [ 11223344556677          ]     │  ← Pre-filled if OCR succeeded
│  [  OCR not detected — Skip  ]   │  ← Shows if OCR failed
│                                  │
│           [   NEXT   →]          │
└──────────────────────────────────┘
```

**GPS Failure State:**
If `navigator.geolocation` fails or is denied:
```
  ⚠  GPS not available
  
  Search your location manually:
  [ Type your area or pin code... ]
  
  Results: [Koramangala] [Indiranagar] [HSR Layout]
```

**Location Accuracy Indicator:**
```
  📍 Location accuracy: ~15 meters  ✅
  📍 Location accuracy: ~500 meters  ⚠ (suggest moving outside)
```

---

#### STEP 3 — Hazard Type Select

```
┌──────────────────────────────────┐
│  ←   Report a Hazard      3 of 5 │
│  ●───────●───────●───────○───────○│
├──────────────────────────────────┤
│                                  │
│  ⚠️  What did you find?          │
│  (tap one)                       │
│                                  │
│  ┌──────────────┐ ┌────────────┐ │
│  │ 🐛           │ │ 🤢         │ │
│  │ Foreign      │ │ Food       │ │
│  │ Object       │ │ Poisoning  │ │
│  │ Insect/Hair  │ │ /Illness   │ │
│  │ /Glass/Metal │ │            │ │
│  └──────────────┘ └────────────┘ │
│  ┌──────────────┐ ┌────────────┐ │
│  │ 🦠           │ │ 📅         │ │
│  │ Spoilage /   │ │ Expired /  │ │
│  │ Mold / Foul  │ │ Mislabeled │ │
│  │ Odor         │ │ Date       │ │
│  └──────────────┘ └────────────┘ │
│  ┌──────────────┐ ┌────────────┐ │
│  │ 🐀           │ │ 🧪         │ │
│  │ Pest /       │ │ Chemical / │ │
│  │ Infestation  │ │ Adulterant │ │
│  └──────────────┘ └────────────┘ │
│                                  │
│  Describe in your own words      │
│  (optional, < 200 chars)         │
│  ┌────────────────────────────┐  │
│  │ Found a caterpillar in...  │  │  ← Textarea, not required
│  └────────────────────────────┘  │
│                                  │
│           [   NEXT   →]          │  ← enabled after chip tap
└──────────────────────────────────┘
```

**Selected chip state:**
```
  ┌──────────────┐
  │ ✓ 🐛         │  ← amber border (2px), light amber fill
  │ Foreign      │
  │ Object       │
  └──────────────┘
```

---

#### STEP 4 — Resolution Outcome

```
┌──────────────────────────────────┐
│  ←   Report a Hazard      4 of 5 │
│  ●───────●───────●───────●───────○│
├──────────────────────────────────┤
│                                  │
│  What happened when you          │
│  reported it to the merchant?    │
│                                  │
│  ○  I haven't told them yet      │
│  ○  They replaced/refunded       │
│  ○  They acknowledged but        │
│     didn't fix it                │
│  ○  They denied the problem      │
│  ○  They ignored me              │
│                                  │
│  Did you receive a refund?       │
│  [Yes]  [No]  [Offered Voucher]  │
│                                  │
│  What action are you requesting? │
│  ○  Public awareness only        │
│  ○  FSO inspection               │
│  ○  Formal FSSAI complaint       │
│                                  │
│  ─────────────────────────────── │
│  All responses are anonymous.    │
│  Your IP is hashed and not       │
│  stored in plain text.           │
│                                  │
│           [   NEXT   →]          │
└──────────────────────────────────┘
```

---

#### STEP 5 — Confirmation (< 2 seconds to land here)

```
┌──────────────────────────────────┐
│                                  │
│           ✅                     │
│                                  │
│   Your report is live!           │
│                                  │
│   Report ID: SRK-2026-88392      │  ← copyable
│                                  │
│   ┌────────────────────────────┐ │
│   │   [MAP SNIPPET]            │ │  ← Map centered on their pin
│   │   🔴 Your report           │ │
│   └────────────────────────────┘ │
│                                  │
│   ℹ  2 other reports near        │
│      this location this week.    │
│                                  │
│   [  View on Full Map  ]         │
│                                  │
│   Share your report:             │
│   [📲 WhatsApp] [🐦 X] [🔗 Link] │
│                                  │
│   We'll notify you (via          │
│   push or WhatsApp) if:          │
│   • An FSO action is taken       │
│   • The merchant responds        │
│                                  │
│   [Enable Notifications]         │
│   [Skip — I'm done]              │
│                                  │
└──────────────────────────────────┘
```

---

### 7.3 Live Hazard Map (Full Screen View — /map)

```
DESKTOP LAYOUT:
┌───────────────────────────────────────────────────────────────┐
│ Suraksha.fyi            [Search area] [Filter ▾] [Layers ▾]  │  ← Topbar
├─────────────────────────────────────────────────────┬─────────┤
│                                                     │ SIDEBAR  │
│                                                     │          │
│         [MAPLIBRE GL — FULL VIEWPORT MAP]           │ Filters: │
│                                                     │ ○ All    │
│   Legend (bottom-left):                             │ ○ P0     │
│   🔴 Critical   🟡 Moderate   🟢 Resolved          │ ○ P1     │
│   ⚫ Pending    🔵 Reported   [jurisdictions: off ▾]│ ○ Res.   │
│                                                     │          │
│   Zoom controls (top-right): + −                    │ Date:    │
│   Locate Me (top-right): ◉                          │ [7d ▾]   │
│                                                     │          │
│   Active cluster popup (when pin clicked):          │ Category:│
│   ┌───────────────────────────────┐                 │ [All ▾]  │
│   │ Zomato Cloud Kitchen          │                 │          │
│   │ Koramangala 5th Block, BLR    │                 │ ───────  │
│   │ ─────────────────────────── │                 │          │
│   │ 🔴 3 reports · Foreign Object │                 │ SELECTED │
│   │ 🟡 1 report  · Spoilage       │                 │ CLUSTER  │
│   │ Last report: 2 hours ago      │                 │          │
│   │ [View Full Profile →]         │                 │ 4 reports│
│   └───────────────────────────────┘                 │ 📍 Koram.│
│                                                     │ View →   │
└─────────────────────────────────────────────────────┴─────────┘
```

**Jurisdiction Overlay (when toggled on):**
- Semi-transparent colored polygons (GeoJSON) delineating FSSAI District Officer jurisdictions
- Clicking a jurisdiction zone shows: Responsible DO name (if public), contact email, active report count in that zone, and last inspection date (if available)

**Heatmap Toggle:**
```
[Pins | Heatmap]  ← Toggle in top-right
When "Heatmap" is selected, switch to density gradient view
Useful for journalists/researchers seeing patterns, not individual incidents
```

---

### 7.4 Restaurant & Brand Profile Page (/restaurant/[slug])

```
┌──────────────────────────────────┐
│  ←  Suraksha.fyi                 │
├──────────────────────────────────┤
│                                  │
│  🍛 Zomato Cloud Kitchen         │  ← Name (large)
│  Koramangala 5th Block           │
│  Bengaluru, Karnataka            │
│                                  │
│  FSSAI: 11223344556677  [📋 Copy]│
│  License Type: Central           │
│  Registered: 2023-04-12          │
│                                  │
│  ─────────────────────────────── │
│  SAFETY SCORE                    │
│  ┌─────────────────────────────┐ │
│  │   🔴  HIGH RISK             │ │  ← Color-coded
│  │   7 reports in 90 days      │ │
│  │   3 different hazard types  │ │
│  │   0 merchant acknowledgements│ │
│  │   0 FSO actions taken       │ │
│  └─────────────────────────────┘ │
│                                  │
│  INCIDENT HISTORY                │
│  ┌─────────────────────────────┐ │
│  │ 🔴 Foreign Object — Aug 18  │ │
│  │ "Found caterpillar in...    │ │
│  │  salad"                     │ │
│  │ Status: Live · Unresolved   │ │
│  │ [View on Map] [Share]       │ │
│  └─────────────────────────────┘ │
│  ┌─────────────────────────────┐ │
│  │ 🟡 Expired Product — Aug 3  │ │
│  │ Curd packet with Jun date   │ │
│  │ Status: Merchant Replaced   │ │
│  └─────────────────────────────┘ │
│                                  │
│  [Load older reports]            │
│                                  │
│  ─────────────────────────────── │
│  SHARE / EMBED                   │
│  [Copy Link] [Embed on Article]  │
│  [Download report CSV]           │
│                                  │
└──────────────────────────────────┘
```

**Safety Score Calculation (visible to user via "How is this calculated?" tooltip):**
```
Score factors:
- Report count (last 90 days): weight 40%
- Hazard severity (P0 counts double): weight 30%
- Merchant response rate: weight 20%
- Recurrence (same hazard type > 2x): weight 10%

Thresholds:
🟢 Low Risk:   0–1 reports, 100% merchant resolution
🟡 Moderate:   2–4 reports or 0 merchant resolution
🔴 High Risk:  5+ reports, multiple hazard types, no FSO action
⚫ Under Review: any P0 critical pending verification
```

---

### 7.5 City & Regional Dashboard (/dashboard)

```
┌──────────────────────────────────────────────────────┐
│ Suraksha.fyi Dashboard                               │
│ Showing: [Bengaluru ▾]   Past: [90 days ▾]          │
├──────────────────────────────────────────────────────┤
│                                                      │
│  OVERVIEW CARDS (horizontal scroll on mobile)        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │  1,247   │ │   84     │ │   12     │ │  67%   │ │
│  │ Reports  │ │Restaurants│ │ Inspected│ │ Ignored│ │
│  │ this mo. │ │ Flagged  │ │ by FSO   │ │by merch│ │
│  └──────────┘ └──────────┘ └──────────┘ └────────┘ │
│                                                      │
│  ─────────────────────────────────────────────────── │
│  🏆 RESTAURANT HALL OF SHAME (Most Reports — 90d)   │
│                                                      │
│  1. Zomato Cloud Kitchen, Koram.    ████████  7 rep  │
│  2. Biryani House, Whitefield       ██████    5 rep  │
│  3. Fresh Farm Dairy, Jayanagar     █████     4 rep  │
│  [View all 84 flagged restaurants →]                 │
│                                                      │
│  ─────────────────────────────────────────────────── │
│  HAZARD BREAKDOWN                                    │
│                                                      │
│  Foreign Object  ████████████  38%                   │
│  Expired Product ████████      27%                   │
│  Spoilage/Mold   ██████        19%                   │
│  Food Poisoning  ████          12%                   │
│  Pest/Infestation██             4%                   │
│                                                      │
│  ─────────────────────────────────────────────────── │
│  MONTHLY TREND                                       │
│                                                      │
│  Reports:  ╭────╮         ╭───                       │
│         ╮──╯    ╰──╮  ╭──╯                          │
│  Jan Feb Mar Apr May Jun Jul Aug                     │
│                                                      │
│  ─────────────────────────────────────────────────── │
│  CITY LEAGUE TABLE                                   │
│                                                      │
│  Rank  City          Reports  Resolved  FSO Actions  │
│  1     Mumbai        3,412    18%       47           │
│  2     Delhi         2,987    12%       31           │
│  3     Bengaluru     1,247    21%       12           │
│  4     Hyderabad       891    15%        9           │
│  5     Chennai         743    19%       11           │
│                                                      │
│  [Download full dataset CSV]                         │
└──────────────────────────────────────────────────────┘
```

---

### 7.6 Search & Filter (/search)

```
┌──────────────────────────────────┐
│  🔍 Search restaurants, brands,  │
│     or FSSAI licenses...         │
│                   [Search]       │
├──────────────────────────────────┤
│  FILTERS                         │
│  City: [Bengaluru ▾]             │
│  Hazard: [All ▾]                 │
│  Date: [Any time ▾]              │
│  Status: [All | Unresolved | Res]│
├──────────────────────────────────┤
│  247 results for "biryani"       │
│                                  │
│  ┌────────────────────────────┐  │
│  │ 🔴 Biryani House           │  │
│  │ Whitefield, Bengaluru      │  │
│  │ 5 reports · High Risk      │  │
│  │ Last: Spoilage · 3d ago    │  │
│  └────────────────────────────┘  │
│  ┌────────────────────────────┐  │
│  │ 🟡 Star Biryani Cloud      │  │
│  │ Andheri, Mumbai            │  │
│  │ 2 reports · Moderate       │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

---

### 7.7 My Reports (Device-Local, No Login Required)

```
┌──────────────────────────────────┐
│  📋  My Submissions              │
│  (saved on this device only)     │
├──────────────────────────────────┤
│                                  │
│  SRK-2026-88392                  │
│  🔴 Foreign Object               │
│  Zomato Cloud Kitchen            │
│  Submitted: Aug 18, 2026         │
│  Status: ⏳ Under Review         │
│  [View on Map]  [Share]          │
│                                  │
│  SRK-2026-71234                  │
│  🟡 Expired Product              │
│  Fresh Farm Dairy                │
│  Submitted: Jul 30, 2026         │
│  Status: ✅ FSO Inspection Sched.│
│  [View on Map]  [Share]          │
│                                  │
│  ─────────────────────────────── │
│  Submissions live on device.     │
│  Clear browser data = lose list. │
│  [Export My Reports (CSV)]       │
└──────────────────────────────────┘
```

**Storage mechanism:** `localStorage` with key `suraksha_my_reports` → array of `{report_id, submitted_at, location_label, hazard_type, status}`. Status polled from API every page load.

---

### 7.8 FSSAI Official Email Report (Not a UI screen — external artifact)

This is what Commissioner Krishnaswamy (Persona 4) receives when an automated dispatch triggers:

```
FROM:    dispatch@suraksha.fyi
TO:      ddo.karnataka.bangalore@fssai.gov.in
SUBJECT: [AUTOMATED CLUSTER ALERT] 4 food safety incidents at FSSAI 
         License 11223344556677 — Bengaluru — Koramangala (Ref: CLU-2026-441)

Dear District Designated Officer,

Suraksha.fyi's automated monitoring has detected a cluster of 4 verified 
food safety reports against the following Food Business Operator within the 
past 7 days:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FOOD BUSINESS OPERATOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:           Zomato Cloud Kitchen
FSSAI License:  11223344556677
Address:        #24, 5th Block, Koramangala, Bengaluru – 560034
GPS:            12.9352° N, 77.6244° E
Maps Link:      [Google Maps link]
Category:       Cloud Kitchen

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INCIDENT SUMMARY (Past 7 Days)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Reports:          4
Hazard Types:           Foreign Object (3×), Spoilage (1×)
Severity:               P0 Critical (2×), P1 Moderate (2×)
Merchant Response:      0 of 4 reports acknowledged
Refunds Issued:         1 of 4 reporters
Actions Requested:      3 reporters requested FSO inspection

[Detailed incident list and photo evidence: PDF attachment]
[View cluster on map: https://suraksha.fyi/cluster/CLU-2026-441]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REQUESTED ACTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This notification is generated automatically per Section 31 of the Food 
Safety and Standards Act, 2006. We request an FSO inspection and ask that 
you reply to this email to acknowledge receipt.

Reply "ACKNOWLEDGED" → updates public map status to "Under FSO Review"
Reply "INSPECTED: [date]" → updates public map status to "Inspected"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Suraksha.fyi | Open Food Safety Registry | India
Unsubscribe from cluster alerts | Privacy Policy
```

---

## 8. Edge Cases & Error States

### 8.1 GPS Unavailable

**Trigger:** User denies location permission or GPS signal is weak (< 50% confidence).

**Response:**
```
⚠  We couldn't auto-detect your location.

Option A: Allow location access in your browser settings, then retry.
          [How to enable location →]

Option B: Search your area manually:
          [ Type restaurant name or area... ]
          
Option C: Drop a pin on the map below:
          [MAP WITH MANUAL PIN]
          Drag the pin to the correct location.
          
Note: Reports with manually entered locations are marked with a 📍? 
      icon on the map until a second report from the same GPS confirms 
      the location.
```

### 8.2 Photo Too Blurry / Unrecognizable

**Trigger:** Perceptual hash (pHash) moderation flags the image as too low-contrast or solid-color (e.g., a black photo, a selfie).

**Response (shown during Step 1 transition):**
```
⚠  Your photo may be unclear.

Moderation requires a clear image of:
• The contaminated food / package
• The receipt or menu (if available)
• The product label or FSSAI sticker

[Retake Photo]  [Continue with this photo →]
```
→ If user insists on continuing, report enters "manual review" queue. No penalty to the user.

### 8.3 OCR Returns Garbled FSSAI Number

**Trigger:** OCR extracts a string that doesn't match `^\d{14}$`.

**Response:** Silent — do not show an OCR error. Simply leave the FSSAI license field blank and show "License not detected — you can enter it manually (optional)." This avoids confusing users who don't know what FSSAI is.

### 8.4 Duplicate Report Detected

**Trigger:** Incoming submission has GPS within 100m of an existing report for the same FBO with the same hazard category, within 24 hours.

**Response:**
```
ℹ  Similar report already exists nearby.

It looks like 2 others have already reported a similar issue at this 
location today.

[ View existing reports ]   [ Submit as separate report anyway ]
[ Add my support to existing report (upvote) ]
```
→ "Add my support" increments a counter on the existing report. This strengthens the cluster without creating noise.

### 8.5 Network Failure During Submission

**Trigger:** User loses connectivity mid-flow.

**Response:**
```
  ◌  Saving your report offline...

Your report is saved on this device. It will automatically submit 
when your connection is restored.

[Cancel report]  [OK]
```
→ Use `IndexedDB` / Service Worker background sync to queue the submission.

### 8.6 FSSAI License Number is Valid Format but Not in Registry

**Trigger:** The 14-digit number passes format validation but doesn't appear in any public FSSAI registry we have cached.

**Response:**
- Do not block submission. Simply skip the license lookup.
- Add a note in the report metadata: `fssai_verified: false`
- Show on the map pin: "FSSAI: Unverified (user-entered)"

### 8.7 Submission in a State with No Mapped DO Contacts

**Trigger:** GPS resolves to a jurisdiction where we don't have the FSSAI DDO email.

**Response:**
- Submit and publish normally. 
- No automated email dispatch for this report.
- Internally: flag for the operations team to find and add the DDO contact.
- User sees no disruption — they don't know about the DO routing.

### 8.8 Moderation Rejection (False Report or Spam)

**Trigger:** Human moderator or auto-detection flags the report as spam, joke, or malicious.

**Outcome:**
- Report is unpublished from the map. The report ID stays valid (user can still see it in My Reports as "Removed").
- User is not notified of rejection by default (to avoid antagonizing bad actors).
- If the same device submits 3+ rejected reports, future submissions auto-queue to "manual review" before publishing.
- No ban. No account. No confrontation.

---

## 9. Empty States

Empty states are seen by: new cities with no data, users with no submissions, filter combinations that return zero results.

### 9.1 Map with No Reports in View

```
  [MAP CENTERED ON LOCATION]

  ┌──────────────────────────────────┐
  │          🎉                      │
  │  No reports in this area yet!    │
  │                                  │
  │  This could mean:                │
  │  • Great food safety here, or    │
  │  • Nobody's reported yet         │
  │                                  │
  │  Be the first to report if you   │
  │  spot a problem.                 │
  │                                  │
  │  [📷 Report a Hazard]            │
  └──────────────────────────────────┘
```

### 9.2 My Reports — No Submissions Yet

```
  ┌──────────────────────────────────┐
  │          📋                      │
  │  No reports yet                  │
  │                                  │
  │  Your submissions from this      │
  │  device will appear here.        │
  │                                  │
  │  Found something concerning?     │
  │  [📷 Report in 25 seconds]       │
  └──────────────────────────────────┘
```

### 9.3 Search — Zero Results

```
  No results for "xyz restaurant"

  Try:
  • Checking the spelling
  • Searching by FSSAI license number
  • Searching by area instead of name
  • Removing filters
  
  [Clear all filters]
  [Report this restaurant instead →]
```

---

## 10. Notification System

**Core Principle:** Suraksha.fyi can notify users even without an account because we use device-level push + WhatsApp linking.

### 10.1 Push Notifications (Web Push / PWA)

Requested at the end of Step 5 (Confirmation screen). Never requested earlier.

**Events that trigger a push:**

| Event | Notification Text |
|---|---|
| FSO inspection scheduled | "🔍 An FSO has scheduled an inspection at [Restaurant] — your report helped!" |
| Merchant acknowledged | "✅ [Restaurant] acknowledged the food safety issue you reported." |
| Your report reached threshold (3rd report) | "⚡ Your report triggered an automated FSSAI complaint. 3 reports total." |
| Report moderation completed | "ℹ️ Your report has been reviewed and is now visible on the map." |
| New report near your area (weekly digest) | "📍 3 new food safety reports near Koramangala this week. [View Map]" |

### 10.2 WhatsApp Notifications

At Step 5, user can optionally enter their WhatsApp number to receive status updates. No OTP required. Number is hashed immediately after sending the first message.

```
WhatsApp message format (from Suraksha.fyi bot):

Your report SRK-2026-88392 is live! 🍽️

Hazard: Foreign Object (Insect)
Location: Zomato Cloud Kitchen, Koramangala
Status: Under review

We'll update you if an FSO inspection is scheduled.
View on map: suraksha.fyi/r/SRK-2026-88392
Reply STOP to unsubscribe.
```

---

## 11. Accessibility & Inclusive Design

### 11.1 WCAG 2.1 AA Compliance

- **Color contrast:** All text meets 4.5:1 minimum. Amber (#F59E0B) on white fails at small sizes — use dark amber (#B45309) for small text on white backgrounds.
- **Touch targets:** Minimum 48 × 48px for all interactive elements. Hazard chips are 72px tall.
- **Focus indicators:** Visible 2px amber focus ring on all interactive elements (`:focus-visible`).
- **Screen reader support:** All images have `alt` text. Map pins have ARIA labels: `aria-label="P0 Critical incident at Zomato Cloud Kitchen, Koramangala"`.
- **Form labels:** Every input has an associated `<label>`. No placeholder-only labels.

### 11.2 Low-Literacy Design

For users like Ravi (Persona 2) with lower text literacy:
- **Icons lead:** Each hazard type chip has a large icon (32px) above the text label.
- **Visual confirmation:** Submission confirmed with a large animated checkmark (not text only).
- **Voice note option** (Phase 2): Allow a 10-second voice memo instead of text description. Transcribed server-side.

### 11.3 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .fab-pulse { animation: none; }
  .progress-fill { transition: none; }
  .toast { animation: none; }
}
```

### 11.4 Low Bandwidth / Data-Saver Mode

- Images compressed to WebP on upload (< 200KB target).
- Map tiles served from regional CDN (Cloudflare India edge).
- Static map fallback (PNG) when MapLibre GL fails to load.
- Service Worker caches the submission form offline — user can fill out the report with no connectivity.

---

## 12. Multi-Language Support

### 12.1 Language Detection & Selection

```
Auto-detect: navigator.language or Accept-Language header
Supported in Phase 1: English (en), Hindi (hi)
Phase 2 target: Tamil, Telugu, Kannada, Bengali, Marathi (6 languages cover ~75% of India)

Language selector: accessible via Settings (gear icon in nav)
Stored in: localStorage['suraksha_lang']
```

### 12.2 Key UI Strings — Hindi Translations

| English | Hindi |
|---|---|
| Report a Hazard | खतरे की रिपोर्ट करें |
| Foreign Object | अजनबी वस्तु |
| Expired Product | समाप्त उत्पाद |
| Your report is live! | आपकी रिपोर्ट सार्वजनिक है! |
| No login required | कोई लॉगिन नहीं चाहिए |
| FSSAI License | FSSAI लाइसेंस |
| Skip this step | यह कदम छोड़ें |

### 12.3 RTL Support

Not needed for initial Indian languages (all are LTR). Included in architecture for future Urdu support.

### 12.4 Hinglish

Submission flow copy should use Hinglish where appropriate for urban users (Priya persona):
- "Kya aapko refund mila? / Did you get a refund?"
- "Report karo in 25 seconds" (FAB label)

---

## 13. Mobile-First & PWA Specifications

### 13.1 Progressive Web App (PWA) Requirements

```json
// manifest.json
{
  "name": "Suraksha.fyi — Food Safety India",
  "short_name": "Suraksha.fyi",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#F59E0B",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-maskable.png", "sizes": "512x512", "purpose": "maskable" }
  ],
  "shortcuts": [
    {
      "name": "Report a Hazard",
      "url": "/report",
      "icons": [{ "src": "/icons/camera.png", "sizes": "96x96" }]
    }
  ],
  "share_target": {
    "action": "/report",
    "method": "POST",
    "enctype": "multipart/form-data",
    "params": { "files": [{ "name": "media", "accept": ["image/*"] }] }
  }
}
```

**`share_target`** means: when a user opens a photo in their camera roll and hits "Share → Suraksha.fyi", the report flow opens pre-populated with that photo. This is a zero-friction path for post-discovery reporting.

### 13.2 Offline Capability

```
Service Worker caches:
  PRECACHE (install-time):
    - /report page shell
    - Hazard type icons
    - Translation strings
    - Form submission queue (IndexedDB)
    
  RUNTIME CACHE (network-first, fallback to cache):
    - Map tiles (30min TTL)
    - Recent reports feed (30min TTL)
    - Restaurant profile pages (1hr TTL)
    
  BACKGROUND SYNC:
    - Queued submissions → sync on reconnection
    - Tag: 'submit-report'
```

### 13.3 Performance Targets

```
Core Web Vitals (mobile, 4G):
  LCP (Largest Contentful Paint):  < 2.5s  [map tile + hero text]
  FID (First Input Delay):         < 100ms
  CLS (Cumulative Layout Shift):   < 0.1

Performance Budget:
  Initial JS bundle:      < 150KB gzipped
  CSS:                    < 20KB
  Map library (MapLibre): < 200KB (lazy-loaded after first paint)
  Camera page:            < 50KB additional (loaded on /report only)
  
Image Optimization:
  User uploads → resize to max 1200×1200px on client
  → convert to WebP → upload to Cloudflare R2
  → serve via CDN with responsive srcset
```

### 13.4 Device Camera Integration

```javascript
// Camera access pattern (handles iOS Safari + Android Chrome)
const constraints = {
  video: {
    facingMode: { ideal: 'environment' },  // back camera
    width: { ideal: 1280 },
    height: { ideal: 720 }
  }
};

// iOS Safari requires user gesture to request camera
// Android Chrome can request on page load
// Always show a "Take Photo" button — never auto-capture
```

---

## 14. Core Platform Mechanics Comparison

*(Retained from original document)*

| Architectural Layer | NammaKasa.in | Bribes.fyi | Suraksha.fyi |
|---|---|---|---|
| Authentication | Zero-login; direct client load | Zero-login; IP hashing + timestamp truncation | Zero-login; ephemeral device signature + optional single-tap WhatsApp OTP for tracking |
| Data Anchoring | Ward, MLA, and MP geographic mapping | Government Department, City, State, Bribe Amount | Restaurant/Brand, 14-Digit FSSAI License, GPS Location, District Designated Officer (DO) |
| Primary Metric | Active vs. Resolved Garbage Dumps | Bribe Demanded vs. Refused Rate | Contamination Type + Action Status (Refunded / Ignored / FSSAI Inspected) |
| Public UX | MapLibre interactive map + chronological feed | Metric dashboards, city league tables | Combined Live Hazard Map + Restaurant/Brand Safety Scoreboard |
| Data Access | Publicly visible posts | Open downloadable JSON/CSV | Open API + CSV dump for journalists, food aggregators, and researchers |

---

## 15. Detailed Technical Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER (PWA)                         │
│  - Next.js 15 / React / Tailwind CSS / Lucide                   │
│  - Service Worker (Workbox) — offline queue + cache             │
│  - Client-Side Tesseract.js (OCR for 14-Digit FSSAI License)    │
│    └── Runs in Web Worker (no UI blocking)                      │
│  - MapLibre GL JS — vector tile rendering                        │
│  - Geolocation API + Reverse Geocoding (Nominatim/OSM)          │
│  - IndexedDB — offline submission queue                          │
│  - Web Push API — push notifications (VAPID)                    │
│  - Web Share Target API — share image from camera roll          │
└────────────────────────────────┬────────────────────────────────┘
                                 │ HTTPS / WebSocket (live feed)
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                     API & MODERATION LAYER                      │
│  - Vercel Edge Functions (Serverless Intake, <50ms globally)    │
│  - Rate Limiter: 5 submissions/device/hour (Redis, Upstash)     │
│  - Anonymization Engine:                                         │
│    └── SHA-256(IP + daily_salt) — salt rotated daily            │
│    └── Timestamp truncated to nearest hour                       │
│  - Auto-Moderation Pipeline:                                     │
│    ├── pHash image similarity (duplicate detection)              │
│    ├── NSFW detection (Sightengine or similar)                   │
│    └── Cluster detection (3 reports within 500m / 7 days)       │
│  - Jurisdiction Resolution:                                       │
│    └── PostGIS point-in-polygon → FSSAI DDO jurisdiction        │
│  - Automated Dispatch Engine:                                    │
│    └── Trigger on cluster threshold → email via Resend/SES       │
│  - WebSocket server for live map feed (Supabase Realtime)       │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                     PERSISTENCE & DATA LAYER                    │
│  - Supabase / PostgreSQL + PostGIS (spatial indexing)           │
│    ├── incidents table (core reports)                           │
│    ├── fbo_metadata table (restaurant/license data)             │
│    ├── jurisdictions table (FSSAI DDO zones as GeoJSON)         │
│    ├── dispatch_log table (automated emails sent)               │
│    └── moderation_queue table                                   │
│  - Cloudflare R2 (compressed WebP image storage)                │
│  - Upstash Redis (rate limiting, session state)                  │
│  - Open Data API & Public CSV Dump Engine (cron job, daily)     │
└─────────────────────────────────────────────────────────────────┘
```

### 15.1 Key API Endpoints

```
POST /api/v1/reports                → Submit new incident
GET  /api/v1/reports/recent         → Live feed (lat, lng, limit)
GET  /api/v1/reports/:id            → Single report detail
GET  /api/v1/reports/:id/status     → Status polling (My Reports)
POST /api/v1/reports/:id/support    → Add support/upvote

GET  /api/v1/fbo/:fssai_license     → FBO profile
GET  /api/v1/fbo/search?q=          → Search restaurants

GET  /api/v1/map/clusters           → Map cluster data (bbox, zoom)
GET  /api/v1/map/heatmap            → Heatmap density (bbox)
GET  /api/v1/map/jurisdictions      → GeoJSON jurisdiction polygons

GET  /api/v1/dashboard/city         → City-level stats
GET  /api/v1/dashboard/leaderboard  → Hall of shame/fame

GET  /api/v1/data/export.csv        → Full dataset (paginated, filterable)
GET  /api/v1/data/export.json       → JSON dataset

POST /api/v1/admin/moderate/:id     → Approve/reject (admin only)
POST /api/v1/admin/dispatch/:cluster_id → Manual dispatch trigger
```

---

## 16. Data Schema (Expanded)

```json
{
  "incident_id": "SRK-2026-88392",
  "privacy_signature": "sha256_hex_string",
  "timestamp_hour_truncated": "2026-08-18T17:00:00Z",
  "submission_channel": "web_pwa",

  "location": {
    "latitude": 12.9716,
    "longitude": 77.5946,
    "accuracy_meters": 12,
    "location_method": "gps_auto",
    "city": "Bengaluru",
    "state": "Karnataka",
    "ward": "Koramangala Ward 68",
    "fssai_jurisdiction_code": "KA-BLR-DIST-01",
    "fssai_ddo_email": "ddo.karnataka.bangalore@fssai.gov.in"
  },

  "fbo_metadata": {
    "fssai_license_number": "11223344556677",
    "fssai_verified": true,
    "fssai_license_type": "Central",
    "fssai_expiry_date": "2027-06-30",
    "establishment_name": "Zomato Cloud Kitchen",
    "establishment_slug": "zomato-cloud-kitchen-koramangala",
    "category": "Cloud Kitchen",
    "platform_channel": "Zomato"
  },

  "hazard_details": {
    "primary_category": "FOREIGN_OBJECT",
    "sub_category": "INSECT_FOUND",
    "severity": "P0_CRITICAL",
    "user_description": "Found a caterpillar in packed salad.",
    "evidence_media_urls": [
      "https://cdn.suraksha.fyi/evidence/2026/08/img_9912.webp"
    ],
    "media_phash": "d4e8a1c2f3b4d5e6",
    "ocr_extracted_text": "FSSAI: 11223344556677\nExp: 2026-09-01"
  },

  "resolution_outcome": {
    "merchant_notified": true,
    "merchant_response": "DENIED",
    "refund_issued": false,
    "refund_type": null,
    "action_requested": "FSO_INSPECTION"
  },

  "moderation": {
    "status": "APPROVED",
    "auto_approved": true,
    "moderation_timestamp": "2026-08-18T17:02:00Z",
    "flags": []
  },

  "cluster_membership": {
    "cluster_id": "CLU-2026-441",
    "cluster_report_count": 4,
    "cluster_dispatch_triggered": true,
    "cluster_dispatch_timestamp": "2026-08-18T18:00:00Z"
  },

  "status": "APPROVED_AND_LIVE",
  "public_url": "https://suraksha.fyi/r/SRK-2026-88392"
}
```

---

## 17. Automated Civic Action & FOI/RTI Engine (Expanded)

### 17.1 Dispatch Trigger Rules

| Rule | Threshold | Action |
|---|---|---|
| Standard Cluster | ≥ 3 distinct verified reports at same FBO within 7 days | Email to District DDO with PDF |
| Critical Incident | Any P0 Critical (glass/metal/chemical) | Immediate email, regardless of count |
| Repeat Offender | ≥ 7 reports in 30 days, < 20% resolution rate | Email to State Food Safety Commissioner (higher authority) |
| Ignored Cluster | Cluster dispatched 30 days ago, no DDO acknowledgement | Generate pre-filled RTI draft for public download |
| Widespread Outbreak | ≥ 10 Food Poisoning reports across ≥ 3 restaurants in 24hr | Emergency email to FSSAI central + State Health Secretary |

### 17.2 RTI Draft Generation

When a cluster is ignored for 30 days, the system generates a downloadable `.pdf` RTI template:

```
APPLICATION UNDER RIGHT TO INFORMATION ACT, 2005

To:
The Public Information Officer
FSSAI District Office, Bengaluru
[Address]

Subject: Information regarding food safety inspection at [Restaurant Name], 
         FSSAI License [Number], Koramangala, Bengaluru

I, the undersigned, hereby request the following information under Section 6 
of the RTI Act, 2005:

1. Date of last inspection carried out at the above-mentioned establishment.
2. Action taken, if any, pursuant to public complaints filed on or after 
   [Dispatch Date].
3. Names and designations of Food Safety Officers assigned to the jurisdiction.
4. Copy of any inspection report filed in the past 6 months.

I request that this information be provided within 30 days as mandated by 
Section 7(1) of the RTI Act.

Signed: ___________________
Date:   ___________________
Address: [User fills manually]

[This RTI draft was generated by Suraksha.fyi based on publicly reported 
 food safety incidents. The platform does not certify the accuracy of 
 user-submitted reports but provides this tool in good faith for civic use.]
```

---

## 18. Moderation Pipeline

### 18.1 Auto-Moderation Flow

```
REPORT SUBMITTED
      │
      ▼
┌─────────────────────────────────┐
│   STAGE 1: Technical Checks     │
│   - Valid GPS coordinates       │
│   - Photo present (required)    │
│   - Rate limit not exceeded     │
│   - Not a duplicate (pHash)     │
└────────────────┬────────────────┘
                 │ Pass
                 ▼
┌─────────────────────────────────┐
│   STAGE 2: Content Moderation   │
│   - NSFW image detection        │
│   - Text: profanity / PII scan  │
│   - Business name sanity check  │
└────────────────┬────────────────┘
                 │ Pass (>85% confidence)
                 ▼
┌─────────────────────────────────┐
│   AUTO-APPROVED                 │
│   → Published to map within 5s  │
│   → Enters cluster monitoring   │
└─────────────────────────────────┘
                 │ Fail or Low Confidence
                 ▼
┌─────────────────────────────────┐
│   MANUAL REVIEW QUEUE           │
│   → Held from map (max 24 hrs)  │
│   → Assigned to moderator       │
│   → Moderator: Approve / Reject │
│     / Edit (remove PII)         │
└─────────────────────────────────┘
```

### 18.2 Admin Moderation Panel (/admin)

**Access:** Password-protected (simple HTTP Basic Auth for v1; SSO in future).

```
┌──────────────────────────────────────────────────────┐
│ MODERATION PANEL          [Pending: 3] [Flagged: 1]  │
├──────────────────────────────────────────────────────┤
│ PENDING REVIEW                                       │
│                                                      │
│ ┌──────────────────────────────────────────────────┐ │
│ │ SRK-2026-99001 | Foreign Object | 5 min ago      │ │
│ │ Restaurant: "XYZ Cafe" | GPS: 12.97, 77.59       │ │
│ │ [PHOTO THUMBNAIL]                                 │ │
│ │ User note: "Found metal wire in dosa"             │ │
│ │                                                   │ │
│ │ Auto-checks: GPS ✅ | NSFW ✅ | Duplicate ✅     │ │
│ │ Low confidence: business name not in OSM registry │ │
│ │                                                   │ │
│ │ [✅ APPROVE]  [✏️ EDIT & APPROVE]  [❌ REJECT]   │ │
│ └──────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

---

## 19. Public API Design

**Base URL:** `https://api.suraksha.fyi/v1`
**Auth:** API key via email (header: `X-Suraksha-Key: sk_...`)
**Rate limit:** 1,000 req/hour for free tier, 10,000 for verified journalists/researchers

### Key Endpoints

```
GET /reports
  ?lat=12.97&lng=77.59&radius_km=5
  &hazard_type=FOREIGN_OBJECT,FOOD_POISONING
  &severity=P0,P1
  &status=APPROVED_AND_LIVE
  &since=2026-07-01
  &limit=100&offset=0
  
Response:
{
  "count": 47,
  "total": 247,
  "results": [ ...incident objects... ]
}

GET /fbo/{fssai_license}
Response:
{
  "fssai_license": "11223344556677",
  "establishment_name": "...",
  "safety_score": "HIGH_RISK",
  "report_count_90d": 7,
  "incident_history": [ ... ]
}

GET /embed/{cluster_id}
  → Returns embeddable iframe-safe HTML
  → For journalists to embed a live safety feed in their articles

GET /data/export.csv
  ?city=Bengaluru&from=2026-01-01&to=2026-08-18
  → Full CSV download. Columns: incident_id, timestamp, city, hazard_type, 
    severity, fbo_name, fssai_license, resolution_status, merchant_response
```

---

## 20. Browser Extension & WhatsApp Bot

### 20.1 Browser Extension (Chrome / Firefox / Edge)

**Name:** Suraksha.fyi Safety Check
**Install link:** Chrome Web Store / Firefox Add-ons

**What it does:**
- Detects when user is on a food delivery page (Swiggy, Zomato, Dunzo, Blinkit)
- Looks up the restaurant name against the Suraksha.fyi API
- Shows a safety badge in the top-right of the restaurant's menu page:

```
[Restaurant Menu Page — Zomato]
┌──────────────────────────────────────┐
│  🍛 Zomato Cloud Kitchen  ★4.1  ...  │
│                                      │
│  ┌─────────────────────────────────┐ │
│  │ ⚠ SURAKSHA.FYI: 5 reports      │ │  ← Extension badge
│  │   1 P0 Critical incident       │ │
│  │   [View Details →]             │ │
│  └─────────────────────────────────┘ │
│                                      │
│  [Order]  [Menu Items...]            │
└──────────────────────────────────────┘
```

- If the restaurant has no reports: `✅ No Suraksha.fyi reports. [Report an issue]`
- Extension does not inject if user has disabled it for this site.

### 20.2 WhatsApp Bot (Phase 2)

**Number:** +91 XXXXXXXXXX (dedicated number via Twilio / WhatsApp Business API)

**Flows:**

**1. Submit a Report via WhatsApp:**
```
User sends photo to the number →
Bot: "Got your photo! 
     What type of issue?
     1. Foreign Object
     2. Expired Product
     3. Food Poisoning
     4. Spoilage / Mold
     5. Pest / Infestation
     6. Other
     Reply with a number."

User: "1"

Bot: "What's the restaurant or outlet name?
     (or share your current location 📍)"

User: [shares location]

Bot: "Report submitted! 🙌
     Report ID: SRK-2026-88392
     View on map: suraksha.fyi/r/SRK-2026-88392
     
     We'll message you if an FSO inspection is scheduled."
```

---

## 21. Analytics & Success Metrics (KPIs)

### 21.1 Product Health Metrics (Internal Dashboard)

| Metric | Target (Month 3) | Measurement |
|---|---|---|
| Reports per day | 100+ | DB count |
| Submission completion rate | > 70% | Step 1 started → Step 5 submitted |
| Median submission time | < 25 seconds | Timestamps per session |
| Auto-moderation pass rate | > 85% | Approved / total |
| False positive rate (mod) | < 5% | Manually reversed decisions |
| Cluster dispatch accuracy | > 90% real clusters | Follow-up inspection correlation |

### 21.2 Impact Metrics (Public Dashboard)

| Metric | Description |
|---|---|
| FSO Actions Taken | % of dispatched clusters that received an inspection |
| Merchant Resolution Rate | % of reports where merchant acknowledged or replaced |
| Repeat Offender Reduction | % decrease in reports for high-risk FBOs after first dispatch |
| RTI Downloads | How many RTI drafts downloaded = civic engagement depth |
| Media Citations | # news articles citing Suraksha.fyi data |

### 21.3 Growth Metrics

| Metric | Description |
|---|---|
| Weekly Active Reporters | Unique device signatures submitting in a 7-day window |
| City Coverage | # Indian cities with ≥ 10 reports |
| API Consumers | Distinct API keys making ≥ 1 call/week |
| Extension Active Installs | Chrome / Firefox extension daily active users |
| WhatsApp Bot Submissions | Reports submitted via WhatsApp channel |

---

## 22. Competitive Analysis

| Platform | Type | Strengths | Why Suraksha.fyi is Different |
|---|---|---|---|
| FSSAI Consumer Portal (fssai.gov.in) | Government portal | Official, legally recognized | Requires login, slow, no public visibility, no map |
| PGPortal (pgportal.gov.in) | Government | Multi-department routing | Bureaucratic, no public data, anonymous submissions removed |
| Swiggy / Zomato "Report Issue" | Delivery app | High usage, integrated | Refund-focused, data never public, no regulatory action |
| Twitter / X | Social media | Viral, fast | No structure, platform removes content, no regulatory routing |
| NammaKasa.in | Civic tech (garbage) | Great UX, proven model | Only garbage, only Bengaluru |
| Bribes.fyi | Civic tech (corruption) | Great data openness | No food safety, no map, no dispatch |
| Eat Safe (UK FSA) | Food safety (UK) | Official, well-funded | Not India, government run, no crowdsourcing |

**Our moat:** The combination of (1) zero-friction submission, (2) immediate public visibility, and (3) automated regulatory dispatch. No existing Indian platform has all three.

---

## 23. Legal & Compliance Considerations

### 23.1 Defamation Risk

**Risk:** A false report about a restaurant could damage their reputation and expose Suraksha.fyi to a legal complaint.

**Mitigations:**
1. All reports are labelled "User Submitted — Unverified" until moderation clears them.
2. Terms of Service explicitly state reports are crowdsourced and not verified by Suraksha.fyi.
3. Restaurants can submit a "dispute" via a simple email form, triggering a manual re-review.
4. Persistent false reporters (same device, multiple rejected reports) are auto-throttled.
5. Legal safe harbor: similar to how NammaKasa and Bribes.fyi operate — we are a publisher of user speech, with a take-down process.

### 23.2 Privacy — Indian Personal Data Protection (DPDP Act 2023)

- No personally identifiable information is stored. IP is hashed, WhatsApp numbers are hashed after first use.
- Photos may inadvertently contain faces → auto-blur faces in uploaded images before storing (or use Cloudflare Images' blur API).
- Retention policy: raw uploads deleted after 90 days. Hashed metadata retained for audit.
- Users can submit a deletion request via email; we delete by report ID (no user identity needed).

### 23.3 Right to Dispatch (FOI/RTI Legitimacy)

- The automated dispatch emails are modeled on citizen complaints under the Consumer Protection Act, 2019 and the Food Safety and Standards Act, 2006.
- They are not legal notices — they are formal civilian complaint submissions.
- RTI draft templates are user-activated, not auto-filed. The user must physically send the RTI.

### 23.4 FSSAI Partnership (Long-Term)

An official FSSAI data-sharing MOU would:
- Allow us to cross-verify license numbers in real time
- Allow FSSAI to receive cluster alerts via API instead of email
- Allow inspection status updates to flow back into our map automatically

This is a Phase 3 goal.

---

## 24. Monetization & Sustainability

**Principle:** The public-facing product must always be free and open. Monetization happens at the ecosystem layer.

| Revenue Stream | Description | Phase |
|---|---|---|
| Open Data API (Free) | Free for journalists, researchers, civil society | Phase 1 |
| Aggregator API (Paid) | Swiggy/Zomato/Blinkit pay for safety score API to display in-app | Phase 2 |
| Brand Safety Reports (B2B) | National food chains pay for a private safety dashboard + alerts for their outlets | Phase 2 |
| FSSAI / State Govt. SLA | State food safety departments pay for a white-label version with official branding | Phase 3 |
| Grant Funding | Apply to Omidyar Network India, Gates Foundation (WASH), Google.org for civic tech grants | Phase 1–2 |
| CSR Partnerships | Food-adjacent companies (water purifiers, health insurance) fund the platform as CSR | Phase 2 |

---

## 25. Execution Roadmap (Expanded)

### Phase 1 (Weeks 1–2): Core Submission & Live Map

**Goal:** First public report submitted and visible on map.

| Task | Owner | Effort |
|---|---|---|
| Next.js 15 PWA scaffold + deployment on Vercel | Engineering | 1d |
| Supabase + PostGIS setup, incidents table | Engineering | 0.5d |
| 5-step submission form (Steps 1–5) | Engineering | 3d |
| MapLibre GL map with pin rendering | Engineering | 2d |
| Geolocation + reverse geocoding | Engineering | 1d |
| Basic auto-moderation (rate limit + photo required) | Engineering | 1d |
| Cloudflare R2 image upload pipeline | Engineering | 1d |
| Service Worker + offline queue | Engineering | 1.5d |
| Hindi translation strings | Content | 0.5d |
| Design system tokens + Tailwind config | Design | 0.5d |
| Basic admin panel (approve / reject queue) | Engineering | 1d |

**Phase 1 Definition of Done:** Any user in Bengaluru or Mumbai can submit a food safety report via mobile, it appears on the live map within 5 seconds, and a moderator can review it via the admin panel.

---

### Phase 2 (Weeks 3–4): Dashboards, Analytics & Dispatch

**Goal:** Data is useful. First automated email sent to an FSSAI DDO.

| Task | Owner | Effort |
|---|---|---|
| Restaurant profile pages + safety score | Engineering | 2d |
| City & regional dashboard | Engineering | 2d |
| Cluster detection algorithm | Engineering | 1d |
| Automated email dispatch (Resend) | Engineering | 1d |
| Public API + API key management | Engineering | 1.5d |
| CSV/JSON export endpoint | Engineering | 0.5d |
| Browser extension (Chrome) | Engineering | 2d |
| Push notification subscription | Engineering | 1d |
| Jurisdiction GeoJSON for 20 major cities | Data | 2d |
| OCR (Tesseract.js) for FSSAI license | Engineering | 1.5d |
| FSSAI license validation regex | Engineering | 0.5d |
| Tamil, Telugu language strings | Content | 1d |

**Phase 2 Definition of Done:** 3+ restaurants on the Hall of Shame with verified multi-report clusters. First automated email dispatch sent and acknowledged.

---

### Phase 3 (Month 2+): Civic Depth, Scale & Partnerships

| Task | Description |
|---|---|
| WhatsApp bot (Twilio) | Ravi persona path — submit via chat |
| RTI draft generator | PDF auto-generation on 30-day ignore |
| Voice description input | 10-second audio memo → server-side transcription |
| Kanada, Marathi, Bengali | Regional language expansion |
| FSSAI data API integration | Real-time license verification |
| Swiggy/Zomato API partnership | Safety scores in delivery apps |
| FSSAI official MOU | Data sharing + inspection status feedback loop |
| Analytics dashboard for brands | Paid B2B product for national chains |
| "Embed a restaurant's safety timeline" | For journalists' articles |

---

## Appendix A: Incident Severity Classification

| Code | Name | Trigger Hazards | Dispatch Threshold |
|---|---|---|---|
| P0 | Critical | Metal/glass/chemical contamination, mass food poisoning (3+ sick reported) | Immediate — single report |
| P1 | Moderate | Insect/pest, hair, expired product, mold/spoilage, food poisoning (1 person) | 3 reports in 7 days |
| P2 | Advisory | Reported unhygienic handling, unverified hygiene concern | 5 reports in 14 days |
| R | Resolved | Any severity where merchant acknowledged + replaced or FSO completed inspection | n/a (status change) |

---

## Appendix B: FSSAI License Number Format

```
Pattern: ^\d{14}$
Example: 11223344556677

Breakdown:
  Digits 1–2:   State code (11 = Bihar, 21 = Goa, ...)
  Digits 3–4:   License year
  Digits 5–8:   License type + district code
  Digits 9–14:  Sequential registration number

Validation: 
  - 14 digits, no letters, no hyphens
  - Check first 2 digits against known state code list (27 states + 8 UTs)
  - Cannot validate further without FSSAI registry API access
```

---

## Appendix C: Map Technical Specs

```
Base Maps:
  Option A (recommended): OpenStreetMap tiles via Protomaps / MapTiler
    Cost: ~$0 for 100k tiles/month on free tier
    Coverage: All India, street-level detail
    
  Option B: Google Maps Platform
    Cost: $0.007/map load after 28,000 free/month
    Consideration: privacy conflict (Google logs tile requests with IP)

Tile Caching:
  Cloudflare CDN caching for tile requests
  Service Worker caches frequently viewed tiles

Map Layers:
  Layer 1 (always on): Incident pins / clusters
  Layer 2 (toggle): Heatmap density overlay
  Layer 3 (toggle): FSSAI jurisdiction polygons (GeoJSON)
  Layer 4 (toggle): Ward/municipal boundaries

Performance:
  Max 1,000 individual pins rendered at any zoom level
  At lower zooms, cluster pins aggregate automatically
  Cluster algorithm: supercluster.js (fast, WASM-based)
```

---

## 26. India-First: First-Principles Deep Dive

*This section was built by reasoning from ground truth about India's users, infrastructure, culture, and regulatory reality — not from generic product-design templates.*

---

### 26.1 The Real India Device Stack (Not What Startups Assume)

Most product teams design for iPhone 15 users in Bandra. The majority of Indian food safety incidents will be reported from:

| Device Tier | Description | % Indian Smartphone Users | Implications |
|---|---|---|---|
| Tier A | Flagship (iPhone, Samsung Galaxy S) | ~8% | Full PWA feature set |
| Tier B | Mid-range (Redmi Note, Realme) | ~42% | Works fine; WebP, limited storage |
| Tier C | Budget (₹5,000–8,000 phones) | ~38% | Android 10–12, 2GB RAM, 32GB storage. Most used phone in India. |
| Tier D | Feature-adjacent (Jio Phone, KaiOS) | ~12% | No full browser. WhatsApp only. Must reach via bot. |

**Design decisions forced by Tier C/D reality:**

1. **Storage budget:** The PWA install + cached assets must stay under 5MB. Tier C users have < 2GB free at any time.
2. **RAM budget:** Map rendering (MapLibre GL) uses ~150MB RAM. On 2GB phones with 15 apps running, this can crash the browser. Solution: lazy-load MapLibre only when user navigates to /map. Landing page uses a static PNG map snapshot.
3. **Camera quality:** Budget phones produce 720p photos with aggressive JPEG compression. OCR accuracy drops significantly. FSSAI license reading is a bonus, not a requirement.
4. **Thermal throttling:** Budget Android phones throttle CPU after 2 minutes of camera use. Don't hold the camera stream open during GPS resolution (Step 2) — show a static preview instead.
5. **KaiOS / Jio Phone:** These run KaiOS with a very limited browser. The WhatsApp Bot (Phase 2) is the only submission path for this segment. Design the bot flow as a first-class product, not an afterthought.

---

### 26.2 Connectivity Reality: India's Patchwork Network

**Jio changed everything but didn't fix everything:**

```
4G/5G coverage (urban): ~95%    ← Design for this
4G coverage (rural):    ~60%    ← Must gracefully handle interruption
3G/2G zones:            ~15%    ← Still significant
Dead zones:             ~5%     ← Service Worker + offline queue critical
```

**India-specific connectivity patterns:**
- **Peak congestion:** 8–10pm, evenings, when most food delivery happens and most contamination incidents occur. Network speeds drop 40–60% during this window.
- **Metro tunnels:** Mumbai, Delhi, Bangalore have dead zones on metro lines. A user who discovered an issue at a restaurant near a metro station might try to report during the commute home — must handle offline gracefully.
- **Corporate offices:** Many Indian offices (especially Tier B cities) have aggressive WiFi firewalls that block WebSockets. Polling fallback required for live feed.

**Engineering response:**
```javascript
// Adaptive image quality based on network speed
const connection = navigator.connection;
const targetSizeKB = connection?.effectiveType === '4g' 
  ? 500   // 500KB — good quality 
  : connection?.effectiveType === '3g' 
    ? 200  // 200KB — compressed
    : 100; // 100KB — minimum viable for moderation

// Background sync for failed uploads
self.addEventListener('sync', event => {
  if (event.tag === 'submit-report') {
    event.waitUntil(submitQueuedReports());
  }
});
```

---

### 26.3 India-Specific Hazard Taxonomy (Expanded)

The original 6 categories are incomplete for India's food safety context. India has specific and common hazard types that don't map to generic food safety taxonomies:

#### NEW Hazard Category: Veg/Non-Veg Contamination

```
🔴 Veg/Non-Veg Contamination (NEW CATEGORY — India-specific P0)

This is unique to India. Finding non-vegetarian food inside a 
vegetarian order is not just a food safety issue — it's a cultural, 
religious, and in some cases, a legal issue (cow slaughter laws, 
religious dietary laws).

This is treated as P0 Critical (same as glass/metal) because:
- It affects Jain, Hindu, and Buddhist vegetarians (enormous population)
- Involves deliberate mislabeling in some cases
- Creates viral social media incidents when discovered
- Triggers immediate emotional + legal response

Display on map: 🟣 (Purple pin, distinct from all other categories)
Trigger text: "Found non-vegetarian item in vegetarian order"
Sub-categories:
  - Meat/poultry found in vegetarian dish
  - Egg found in eggless product
  - Non-veg gravy used for veg preparation (reported by kitchen staff)
  - "Pure Veg" restaurant serving non-veg
```

#### NEW Hazard Category: Adulteration (Systemic)

```
🧪 Adulteration / Chemical Hazard (EXPANDED from Chemical — India-specific P0)

India has a well-documented, systemic adulteration problem:
- Milk: urea, detergent, starch, synthetic milk
- Spices: chalk powder in turmeric, brick dust in red chilli
- Dal/Pulses: kesari dal (lathyrus sativus — banned, causes paralysis)
- Edible oil: mineral oil, palm oil mislabeled as premium oil
- Khoya/Mawa (for sweets): synthetic khoya from chemicals
- Honey: high-fructose corn syrup, sugar syrup
- Green vegetables: artificial color (malachite green, metanil yellow)
- Ice cream: vanaspati (trans fat) instead of dairy fat

Sub-categories:
  1. Synthetic milk / chemical milk
  2. Adulterated spices
  3. Banned dyes / artificial colors in food
  4. Banned pesticide residue (organophosphates in vegetables)
  5. Mislabeled fat type (vanaspati sold as ghee)
  6. Banned ingredient (kesari dal, artificial ripening agents)
  7. Industrial-grade substance in food (industrial salt, chalk powder)
```

#### NEW Hazard Category: Festival / Religious Offering Food

```
🕌 Festival / Religious Food Safety (NEW CATEGORY — India-specific P1-P0)

Specific context: India has massive food poisoning events during festivals.
Examples:
- Prasad adulteration at temples
- Mass food poisoning at langar (community kitchens) 
- Wedding catering (mass events, unrefrigerated food in heat)
- Navratri / Diwali sweets with banned artificial colors (metanil yellow)
- Water from tankers at religious events (untreated)

Why separate category: 
- Mass exposure events (10–1000+ people from one incident)
- Special regulatory rules for temple kitchens (often exempt from 
  regular FSSAI licensing — this loophole needs exposure)
- Media magnification when it involves religious context

Severity: Auto-escalate any festival food report to P0 regardless 
of other signals, because single-source mass exposure risk is high.
```

#### NEW Hazard Category: Public Distribution System (PDS/Ration Shop)

```
🏪 PDS / Ration Shop Adulteration (NEW CATEGORY — India-specific)

The Public Distribution System serves 800 million Indians with 
subsidized food grains (wheat, rice, sugar, kerosene). Adulteration 
here is extremely high-impact:
- Weevil-infested grain
- Stones/sand mixed into rice/wheat
- Short-weighing (less than stated quantity)
- Diesel-contaminated kerosene
- Expired stock with tampered dates

Why it needs a dedicated category:
- The victim population is the most economically vulnerable
- Complaints can be directed to specific government supply chain
- Data from this category enables Right to Food legal actions

FSSAI does not fully regulate PDS — the Food Corporation of India (FCI) 
and State Civil Supplies departments are the correct authority.
Dispatch routes for this category must differ from restaurant reports.
```

#### Updated Full Hazard Taxonomy:

```
TIER 1 — P0 CRITICAL (Dispatch immediately, no minimum count):
  🔴 Foreign Object (Metal, Glass, Plastic, Wire, Stone)
  🔴 Chemical/Industrial Substance in Food
  🔴 Veg/Non-Veg Contamination (India-specific)
  🔴 Mass Food Poisoning (3+ people sick)
  🔴 Festival/Religious Food — any severity

TIER 2 — P1 MODERATE (Dispatch at ≥3 reports/7 days):
  🟡 Foreign Object (Insect, Hair, Fabric — biological)
  🟡 Adulteration (Synthetic/Chemical — systemic)
  🟡 Expired/Mislabeled Product
  🟡 Spoilage/Mold/Foul Odor
  🟡 Individual Food Poisoning (1–2 people)

TIER 3 — P2 ADVISORY (Dispatch at ≥5 reports/14 days):
  🔵 Unhygienic Kitchen/Handling (reported or visible)
  🔵 Pest/Rodent Infestation (evidence)
  🔵 Missing/Expired FSSAI License (visible)
  🔵 Mislabeled Allergen (contains nuts/dairy not declared)
  🔵 PDS/Ration Shop Adulteration
  🔵 Water Quality Issue (contaminated water/ice)

SPECIAL:
  ⚪ Near-Miss / Close Call (found but didn't consume — still valuable data)
```

---

### 26.4 The Indian Regulatory Topology (Mapped for Dispatch Routing)

India's food safety enforcement is fragmented across overlapping bodies. The correct dispatch target depends on the FBO type:

```
INCIDENT TYPE                    DISPATCH TARGET              LEGAL HOOK
─────────────────────────────────────────────────────────────────────────
Restaurant / Hotel               FSSAI District DDO           FSS Act 2006, Sec 31
Cloud Kitchen (delivery only)    FSSAI + DPIIT (startups)     FSS Act + IT Act
Street Vendor (with license)     FSSAI DDO                    FSS Act 2006
Street Vendor (no license)       Municipal Corporation        Shops Act / Health Dept.
Packaged Food (brand)            FSSAI Headquarters           FSS Act + Legal Metrology
PDS / Ration Shop                State Civil Supplies Dept.   Essential Commodities Act
Temple / Dharmshala Kitchen      State Food Safety Dept.      FSS Act (no exemption)
Airline Catering                 DGCA + FSSAI HQ              Aviation + FSS Act
Railway Catering (IRCTC)         Indian Railways + FSSAI      Railway Act + FSS Act
Hospital Canteen                 State Health Dept. + FSSAI   Clinical Establishment Act
Milk / Dairy (unpackaged)        State Animal Husbandry Dept. Prevention of Cruelty Act
Sweets / Mithai Shop             FSSAI DDO                    FSS Act, Schedule IV

SPECIAL CASES:
  Zomato/Swiggy listed outlets  → Also CC: platform's Trust & Safety team
  ONDC-listed outlets           → Also CC: network participant's grievance email
  National chain (50+ outlets)  → FSSAI Headquarters, not just district DDO
```

**Engineering implication:** The `jurisdiction_resolver` module must handle at least 8 different dispatch routes based on FBO type, not just FSSAI DDO. The FBO type field (Step 2 of submission, "What type of outlet is this?") must inform the dispatch logic.

**Step 2 UI — FBO Type Selection (NEW field):**
```
What type of food outlet is this?

  ○ Restaurant / Dhaba / Café
  ○ Cloud Kitchen / Dark Store (delivery only)
  ○ Street Vendor / Cart / Stall
  ○ Packaged Food (supermarket/online purchase)
  ○ PDS / Ration Shop
  ○ Sweet Shop / Mithai
  ○ Temple / Community Kitchen
  ○ Other
```

---

### 26.5 The "Cloud Kitchen Identification Problem"

**India-specific challenge:** Many food safety violations come from cloud kitchens — physical kitchens operating under 5–15 different brand names on delivery apps. The FSSAI license belongs to the kitchen address, not the brand name.

**Example:**
```
Physical address: 12, Koramangala 5th Block, Bengaluru
FSSAI License:    11223344556677
Brands on Zomato: "Biryani by Kilo", "Wow! Momo", "Faasos", 
                  "Box8", "The Good Bowl" — all the same kitchen

A user orders from "Biryani by Kilo" and finds a cockroach.
They report "Biryani by Kilo" — but we need to surface this against 
the PHYSICAL KITCHEN's FSSAI license, not the brand name.
```

**Solution:**
1. When user types a restaurant name in Step 2, we try to match against Zomato/Swiggy's public menu pages via fuzzy matching on our local cached database.
2. If matched, we surface: "Did you mean: Kitchen at 12, Koramangala 5th Block? This location also operates as Wow! Momo, Faasos, Box8. FSSAI: 11223344556677."
3. The report is filed against the physical FSSAI license + the brand name separately.
4. Restaurant profile page for a shared kitchen shows all brand names operating there, with per-brand incident counts AND the shared physical kitchen count.

**Profile page for a shared kitchen location:**
```
┌──────────────────────────────────────────┐
│  📍 12, Koramangala 5th Block, Bengaluru │
│  FSSAI: 11223344556677                   │
│  This location operates as:              │
│    • Biryani by Kilo  (3 reports)        │
│    • Wow! Momo        (1 report)         │
│    • The Good Bowl    (0 reports)        │
│  ────────────────────────────────────── │
│  TOTAL: 4 reports against this kitchen  │
└──────────────────────────────────────────┘
```

---

### 26.6 India Trust Architecture: Why Users Must Believe It Works

**The core user fear:** "Maine report kiya, kuch nahi hua." (I reported, nothing happened.)

This is India's default expectation of any complaint portal. Suraksha.fyi must aggressively counter this default.

**Trust mechanisms to build:**

#### 1. Impact Counter on Every Page
```
┌─────────────────────────────────────────────────┐
│ 🎯 Suraksha.fyi Impact Since Launch             │
│                                                 │
│  ✅ 47   FSO inspections triggered              │
│  ✅ 12   Restaurants improved rating after      │
│          reports (refunded + acknowledged)      │
│  ✅  3   FSSAI licenses suspended               │
│  ✅ 892  Reports submitted this month           │
│                                                 │
│ [See all verified actions →]                    │
└─────────────────────────────────────────────────┘
```
This counter must be prominently placed on the home page and updated in real-time (or daily). Users who see "47 inspections triggered" believe the platform works.

#### 2. "Your Report Had Impact" Notification
When a report from a specific user contributes to a cluster that triggers an FSO inspection:
```
WhatsApp/Push:
  🎉 Your report made a difference!
  
  You reported a foreign object at Zomato Cloud Kitchen 
  on Aug 18. Since then, 2 more people reported issues.
  
  An FSSAI inspection has been scheduled at this 
  restaurant for Sep 5.
  
  Thank you for making India's food safer. 🇮🇳
  
  View update: suraksha.fyi/r/SRK-2026-88392
```

#### 3. "Resolution Wall" on Dashboard
```
  ✅ RECENTLY RESOLVED
  ┌──────────────────────────────────────────┐
  │ Cafe Coffee Day, Andheri, Mumbai         │
  │ 4 reports (Foreign Object + Expired)     │
  │ 📋 FSO Inspection: Sep 3, 2026           │
  │ 🔧 Outcome: Kitchen equipment replaced,  │
  │    new hygiene staff training ordered    │
  └──────────────────────────────────────────┘
```

#### 4. Media Coverage Section
India's users trust what they see in the news. A section on the landing page:
```
📰 Suraksha.fyi in the News
  "How a student app is cleaning up India's food safety" — The Hindu
  "400 reports, 12 inspections in 3 months" — Economic Times
  "FSSAI credits crowdsourcing app" — Hindustan Times
```
Even 2–3 articles dramatically increase trust and submission rates.

---

### 26.7 The WhatsApp-First Strategy for Bharat

WhatsApp has 500+ million users in India. For Tier C/D users (Section 26.1), WhatsApp is the primary internet experience. For many rural users, WhatsApp IS the internet.

**WhatsApp must be a first-class reporting channel, not a Phase 2 afterthought.**

**Full WhatsApp Bot Flow:**

```
USER sends photo to Suraksha Bot number (+91 XXXXXXXXXX)

BOT: "धन्यवाद! 🙏
      क्या समस्या थी? (What was the problem?)
      
      1️⃣ कीड़ा / बाल मिला (Foreign object found)
      2️⃣ खाना खराब था (Spoiled/expired food)
      3️⃣ खाना खाने से बीमार पड़ा (Got sick after eating)
      4️⃣ पैकेट खुला था / तारीख पुरानी थी (Damaged/expired packaging)
      5️⃣ शाकाहारी में मांस मिला (Meat in veg food)
      6️⃣ मिलावट / खराब घटक (Adulteration)
      
      नंबर भेजें / Send a number."

USER: "1"

BOT: "ठीक है। 
      रेस्तरां का नाम क्या था?
      (What was the restaurant name?)
      
      या अपनी location share करें 📍"

USER: [Location shared]

BOT: "आपकी location मिल गई: 
      Koramangala, Bengaluru ✅
      
      रेस्तरां का नाम टाइप करें:
      (Type the restaurant/outlet name)"

USER: "Zomato cloud kitchen"

BOT: "आपकी report submit हो गई! ✅
      Report ID: SRK-2026-88392
      
      📍 देखें map पर: suraksha.fyi/r/SRK-2026-88392
      
      अगर FSO inspection होगी, हम आपको यहीं बताएंगे।
      
      *भारत का खाना सुरक्षित बनाने में शुक्रिया।*"
```

**WhatsApp Bot Additional Features:**
- `STATUS <report_id>` → returns current status of a previously submitted report
- `NEAR ME` + location → returns 3 most recent reports within 5km
- `SCORE <restaurant name>` → returns safety score and report count for a restaurant
- `REPORT` → initiates a new report flow
- `HELP` → returns menu of options in Hindi + English

**Technical:** Twilio WhatsApp API + serverless function. Each message costs ~$0.005. 1,000 reports/month = ~$5 in WhatsApp costs.

---

### 26.8 User Acquisition Strategy: India-First Distribution

**Where Priya (urban diner) discovers Suraksha.fyi:**
1. Twitter/X: one viral tweet with a photo of contaminated food + "Just reported on @surakshadotfyi — took 20 seconds"
2. Instagram food safety creators / influencers (growing segment)
3. Google Play Store — "food safety India" query (no iOS App Store needed — PWA installs directly)
4. Browser extension prompt on Zomato/Swiggy (most powerful organic channel)

**Where Ravi (street food patron) discovers Suraksha.fyi:**
1. WhatsApp forward — viral message with the bot number
2. RWA (Resident Welfare Association) WhatsApp group — secretary posts the number
3. Local news article (Dainik Bhaskar, regional language papers) — after first FSO action story
4. NGO / consumer rights organization promotion

**Grassroots partnerships (Phase 2):**
- Consumer Forum networks (each district has one)
- CGSI (Consumer Guidance Society of India)
- ASHA workers (community health workers who interact with food vendors directly)
- Food aggregator delivery partners (drivers who see the kitchen)

---

### 26.9 Unique Indian UI/UX Patterns to Adopt

#### 9.1 The "Number Typing" Problem
Indian users on feature-phone keypads or Indian language keyboards often struggle with typing long text. The entire submission flow must be completable with number selections (1, 2, 3) or taps on visual chips — no mandatory typing.

Only two inputs require typing:
1. Restaurant name (with autocomplete search to reduce typing)
2. Optional description (truly optional — can be empty)

#### 9.2 Hindi Numbers vs English Numbers
When displaying statistics to Hindi users, display in Hindi number format:
```
English: 1,247 reports
Hindi:   १,२४७ रिपोर्ट (Devanagari numerals)
```
But in form inputs and IDs, always use ASCII digits (international standard).

#### 9.3 The Trust-Generating "Share" CTA
In India, sharing content on WhatsApp is more natural than liking or upvoting. Every report confirmation screen must have:
```
"अपने WhatsApp Group में share करें" 
(Share in your WhatsApp Group)
```
This is the single most powerful user acquisition mechanic available.

#### 9.4 India's Color Psychology
- **Saffron/Amber:** Associated with India, spirituality, auspiciousness — correct choice as our primary brand color
- **Green:** Associated with purity (Pure Veg symbol), safety, trust — correct for "Resolved" status
- **Red:** Universal danger in India — correct for critical hazards
- **Blue:** Government, institution, formal — avoid for consumer-facing UI (creates "official portal" association, which is distrusted)

#### 9.5 Handling Transliteration
Many Indian users type in Roman script transliteration:
- "khana kharab tha" instead of "खाना खराब था"
- "cockroach mila biryani mein" instead of a formal description

The description field should accept and display Romanized Hindi/regional language text as-is. Never force Devanagari input — it's slower and unfamiliar for many users.

---

### 26.10 Ola Maps as Primary Mapping Provider (India-Specific)

**Replace MapLibre + OSM tiles with Ola Maps for India deployment.**

| Factor | Google Maps | OpenStreetMap (Nominatim) | Ola Maps |
|---|---|---|---|
| India street coverage | Excellent | Good (gaps in rural) | Excellent (built for India) |
| Tier 2/3 city detail | Good | Fair | Good-Excellent |
| Reverse geocoding | Excellent | Fair | Good (India-tuned) |
| Cost (100K requests) | ~$700 | Free (but rate-limited) | ~₹500 (very cheap for India) |
| Privacy | Google logs IPs | Open, no logging | Indian company, DPDP-compliant |
| Offline tiles | Via Maps SDK | Via self-hosting | Via Maps SDK |
| Language | All languages | English + some Indian | Hindi + English first |
| FSSAI jurisdiction data | Not available | Partial | Not available (custom layer needed) |

**Recommendation:** Ola Maps as base layer + custom PostGIS GeoJSON overlay for FSSAI jurisdictions.

**India-specific geocoding quirks to handle:**
- Many Indian addresses use landmark-based navigation: "Near Ganesh Temple, opposite Big Bazaar" — must support landmark-based address confirmation
- Hindi pin codes: always 6 digits, can be used as a location fallback
- "Sector 14, Block C" addresses (Delhi / Noida / Gurugram) need structured parsing
- Some rural areas have no street names — GPS coordinates are the only valid anchor

---

### 26.11 India-Specific Legal Hooks (Full Map)

The original document mentions "Section 31 of FSS Act" but the full picture is:

```
FOOD SAFETY AND STANDARDS ACT, 2006:
  Sec 3(1)(zz):  Definition of unsafe food
  Sec 26:        Responsibilities of food business operator
  Sec 31:        License mandatory for all FBOs
  Sec 40:        Purchaser may have food analysed
  Sec 54:        Penalty for unsafe food (up to ₹2 lakh)
  Sec 55:        Penalty for sub-standard food (up to ₹5 lakh)
  Sec 59:        Penalty for adulterated food (up to ₹10 lakh + prison)
  Sec 59(2):     If person dies from adulterated food: life imprisonment
  Sec 63:        Operating without license: ₹5 lakh penalty

CONSUMER PROTECTION ACT, 2019:
  Sec 2(9):      Deficiency of service — restaurants are service providers
  Sec 47:        Consumer Disputes Redressal Commission (District level)
  Sec 86:        Product liability — manufacturer liable for defective product
  
  → Users can file a Consumer Forum case AND Suraksha.fyi can generate 
    a pre-filled Consumer Forum complaint template (alongside the RTI template)

PREVENTION OF FOOD ADULTERATION ACT, 1954 (still applicable in some states):
  → Older law, still cited in some state courts
  → Specifically covers synthetic milk, adulterated ghee, artificial colors

LEGAL METROLOGY ACT, 2009:
  Sec 18:        Short quantity/weight offence
  → Applies to PDS/ration shops weighing less than declared
  → Dispatch to Legal Metrology Controller, not FSSAI
```

**For each dispatch email, auto-populate the relevant statutory sections** based on hazard type:

```python
DISPATCH_LEGAL_SECTIONS = {
    "FOREIGN_OBJECT":         ["FSS Act Sec 3(1)(zz)", "Sec 54", "Sec 59"],
    "ADULTERATION":           ["FSS Act Sec 59", "Sec 59(2) if mass illness"],
    "EXPIRED_PRODUCT":        ["FSS Act Sec 3(1)(zz)", "Legal Metrology Act"],
    "VEG_NONVEG":             ["FSS Act Sec 26", "Consumer Protection Act Sec 86"],
    "FOOD_POISONING":         ["FSS Act Sec 59", "Consumer Protection Act Sec 47"],
    "PDS_ADULTERATION":       ["Essential Commodities Act", "Legal Metrology Act Sec 18"],
}
```

---

### 26.12 RWA (Resident Welfare Association) as a Power User Segment

**What is an RWA?**
In Indian housing societies (gated communities, apartment complexes), the Resident Welfare Association is a formal body of elected residents that manages common area services. Every major Indian city has thousands of RWAs.

**Why RWAs matter for Suraksha.fyi:**
- An RWA secretary managing 500 flats may submit 20–50 reports collectively on behalf of residents
- They already manage WhatsApp groups of 500+ members — mass distribution channel
- They have relationships with local corporators and municipal bodies — can amplify FSO action requests
- "Report it on Suraksha.fyi" can become a standard item in the RWA complaint response playbook

**RWA Secretary Persona (Persona 5):**
```
Name:        Sunita Kapoor
Age:         55
City:        Gurugram (Sector 14 apartment complex)
Role:        RWA Secretary, 480 flats
Tech comfort: Medium — uses laptop for emails, WhatsApp on phone
Pain point:  "Our dhoodh wala (milkman) is selling adulterated milk.
              7 children have had stomach issues. I've complained to 
              the municipal body twice. Nothing happened."
Goal:        Submit one report that covers 7 incidents collectively,
             name all affected families, and get an official response.

Unique need: Ability to submit a "bulk report" with multiple witnesses.
```

**Bulk Report Feature (Phase 2 — for RWA/Community leaders):**
```
+  Report on behalf of multiple people?

   [  ] Yes, I am reporting for a group
        Number of people affected: [7]
        Community type: 
          ○ Housing society / RWA
          ○ School / College
          ○ Workplace
          ○ Temple / Religious gathering
          ○ Other event/gathering

   When selected, the cluster threshold for dispatch drops to 1 report
   (because the single report represents multiple witnesses).
   The dispatch email says "7 residents of [society name] report..."
```

---

### 26.13 Delivery Partner as a Reporter (Underutilized Channel)

**India-specific insight:** Zomato and Swiggy delivery partners visit hundreds of restaurants per month. They see the kitchens, the packaging, the handling. They are the most frequent witnesses to food safety violations — and they currently have no reporting channel.

**Why they don't report today:**
- Fear of losing delivery assignments from the restaurant
- No anonymous channel exists for them
- They don't know they can report

**Suraksha.fyi as a delivery partner safety tool:**
- A dedicated flow for "Reported by: Delivery Partner"
- Extra anonymization: even the city is rounded to nearest major zone (not specific GPS)
- The report is tagged `source: delivery_partner` and given higher credibility weight (because they have direct kitchen access)
- Delivery partner reports that match with customer reports on the same restaurant in the same week get auto-escalated

**UI addition in Step 2:**
```
Who are you?  (helps us weight the report appropriately)

  ○ I'm a customer (diner / delivery app user)
  ○ I'm a delivery partner (Zomato / Swiggy / Blinkit driver)
  ○ I'm a kitchen staff member (witnessing from inside)
  ○ I'm a food safety professional / public health worker
  ○ Prefer not to say
```
This one field dramatically changes how the report is weighted, dispatched, and described in cluster alerts.

---

### 26.14 Missing Technical Architecture Decisions (India-Specific)

#### 14.1 Data Residency (DPDP Act 2023)

India's Digital Personal Data Protection Act 2023 mandates that personal data of Indian citizens may be subject to data localization requirements. Even though Suraksha.fyi stores hashed (not plain) personal data:

```
Architecture recommendation:
  - Supabase hosted in ap-south-1 (Mumbai) region
  - Cloudflare R2 with India-edge storage bucket
  - Redis (Upstash) in ap-south-1
  - All APIs resolve via Cloudflare India edge (fastest RTT for Indian users)
  - No personal data (even hashed) stored outside India
```

#### 14.2 UPI for Optional Donations / Tips

Suraksha.fyi doesn't need to monetize directly, but many Indian users want to "do something" after using the platform. A "donate ₹10 to keep Suraksha.fyi running" UPI QR code on the confirmation screen captures this.

```
[QR code for UPI payment]
upi://pay?pa=suraksha@ybl&pn=Suraksha+Civic+Trust&am=10&cu=INR

"Donate ₹10 to keep this free. 
 We have no ads, no corporate funding. 
 Only people like you."
```

#### 14.3 ONDC Integration

The Open Network for Digital Commerce (ONDC) is India's government-backed interoperable food delivery network. As ONDC adoption grows among restaurants:

- Suraksha.fyi can integrate with ONDC's Grievance Register API to surface safety scores directly within ONDC buyer apps
- Safety data from Suraksha.fyi can inform ONDC's seller quality scoring
- This is a significant distribution channel as ONDC competes with Swiggy/Zomato

#### 14.4 Aadhaar-Optional Verification (for High-Stakes Reports)

For P0 Critical reports that will trigger immediate dispatch, optionally allowing Aadhaar-based identity verification (through DigiLocker — no data stored by us) adds credibility:

```
For this critical report, would you like to add verified identity? 
(Increases legal weight of the complaint)

[Verify with DigiLocker — no ID stored by us]
[Submit anonymously — equally valid]
```

This is strictly optional and never required. It gives high-credibility reporters a choice to make their report "legally stronger."

---

### 26.15 The Network Effect Flywheel

Suraksha.fyi's value compounds with scale. Here is the flywheel:

```
                    ┌─────────────────────────┐
                    │   More Reports Submitted │
                    └──────────┬──────────────┘
                               │
              ┌────────────────▼────────────────┐
              │  Better Data = More Accurate     │
              │  Safety Scores per Restaurant    │
              └────────────────┬────────────────┘
                               │
    ┌──────────────────────────▼──────────────────────────┐
    │  Swiggy/Zomato Embed or Browser Extension Shows     │
    │  Safety Scores → Users Check Before Ordering        │
    └──────────────────────────┬──────────────────────────┘
                               │
              ┌────────────────▼────────────────┐
              │  Restaurants With Bad Scores     │
              │  Lose Customers → Fix Hygiene   │
              └────────────────┬────────────────┘
                               │
    ┌──────────────────────────▼──────────────────────────┐
    │  Fewer Violations → Platform Shows "Impact"         │
    │  → More Users Trust & Submit Reports                │
    └──────────────────────────┬──────────────────────────┘
                               │
                    ┌──────────▼──────────────┐
                    │  Virtuous Cycle Repeats  │
                    └─────────────────────────┘
```

**Network effect threshold to target:** 1,000 restaurants profiled across 5 cities with ≥ 3 reports each. Below this, the "Hall of Shame" is too sparse to be credible. Above this, the data self-reinforces.

---

### 26.16 Minimal Viable vs. Maximum Quality Roadmap

**The Minimal Viable Suraksha.fyi** (can be built in 2 weeks by 2 engineers):
- Photo upload form with GPS tag
- Hazard chip selection (8 categories)
- Supabase backend, S3 storage
- MapLibre map showing pins
- Manual moderation via a shared Google Sheet
- Weekly CSV dump via cron

**This is already better than anything that exists in India today.** Ship it.

**The Maximum Quality Suraksha.fyi** (full document above):
Build incrementally. Each section of this document is one sprint.

**Never let "perfect" delay the MVP.** The value of early reports is that they train the team on what real Indian food safety incidents look like before building complex features around assumptions.

---

## 27. Final Checklist: Is This Ready to Build?

### Product Completeness
- [x] Core user flows documented (5-step submission)
- [x] All screen states defined (success, error, empty, offline)
- [x] India-specific hazard taxonomy (10 categories vs. original 6)
- [x] Regulatory dispatch routing (8 authority types)
- [x] WhatsApp bot as primary channel for Bharat users
- [x] RWA / delivery partner power user flows
- [x] Trust architecture (impact counter, resolution wall, media section)

### Technical Readiness
- [x] Stack decided (Next.js 15, Supabase+PostGIS, Ola Maps, Cloudflare R2)
- [x] Data residency addressed (India-first, DPDP compliant)
- [x] Offline/PWA architecture (Service Worker, IndexedDB, Background Sync)
- [x] Device tier strategy (Tier A–D, KaiOS via WhatsApp only)
- [x] Network resilience (2G/3G/offline handling)
- [x] Image pipeline (WebP, < 200KB, pHash dedup)

### Business Readiness
- [x] Monetization path (API licensing, brand dashboard, government SLA)
- [x] Sustainability model (grant + CSR + B2B API)
- [x] Legal risk mitigated (defamation strategy, DPDP compliance, RTI vs. direct filing)
- [x] Network effect flywheel defined (threshold: 1,000 restaurants, 5 cities)

### What Still Needs Research (Open Questions)
- [ ] FSSAI DDO email database (need to compile or file RTI for this list)
- [ ] ONDC API access (pending partnership discussion)
- [ ] Ola Maps API commercial terms for civic tech projects (may get discounted)
- [ ] KaiOS / JioPhone browser capability testing
- [ ] Dialect variation in UI copy (e.g., Hindi in UP vs. Bihar vs. Delhi differs significantly)
- [ ] Whether DigiLocker allows third-party identity verification for civic apps
- [ ] Legal opinion on automated dispatch email's status (complaint vs. legal notice)

---

*Document prepared for Suraksha.fyi — Open Food Safety Registry, India.*
*Version 3.0 — August 2026 (India-First Edition)*
*Previous version: V2.0 (UI/UX + PRD), V1.0 (Platform Vision & Inspiration)*
*Total scope: 27 sections, full screen specs, design system, India-specific first-principles analysis*
