# Suraksha.fyi — Hackathon Submission Document
**Version 4.0 | August 2026**
**Status: Prototype Submission — India Civic Tech Hackathon**

---

## Quick Reference

| Question | Answer |
|---|---|
| **Who has the problem?** | Any Indian who finds contaminated, expired, or adulterated food and wants to report it |
| **What is broken today?** | Every official reporting path requires a login, an OTP, or Aadhaar — most people give up and post on Twitter instead |
| **What did we build?** | A zero-login food safety report that takes < 25 seconds, appears on a live public map, and routes to the right authority automatically |
| **What works in the prototype?** | Full 5-step report flow, live map, restaurant profile, city dashboard, moderation queue |
| **What is mocked?** | FSSAI dispatch emails, real FSSAI license lookups, WhatsApp notifications, FSO response tracking |
| **Scale plan?** | Section 8 below |

---

## Table of Contents

1. [The Problem — Who It Affects and Why It Matters](#1-the-problem)
2. [What Is Broken About the Current Experience](#2-whats-broken-today)
3. [What We Changed — The Suraksha.fyi Solution](#3-what-we-changed)
4. [Why Our Version Is Better](#4-why-its-better)
5. [Complete User Journey (Start to Finish)](#5-complete-user-journey)
6. [Design System & Accessibility](#6-design-system)
7. [Technical Architecture](#7-technical-architecture)
8. [Scale Plan — How It Works Safely at Larger Scale](#8-scale-plan)
9. [What Works Today vs. What Is Mocked](#9-functional-vs-mocked)
10. [India-First Design Decisions](#10-india-first-design)
11. [Screen Specifications](#11-screen-specifications)
12. [Known Limitations and Honest Disclosures](#12-known-limitations)

---

## 1. The Problem

### Who Is Facing This Problem

Every Indian who orders food, buys packaged groceries, eats at a restaurant, or shops at a ration shop is exposed to food safety risk. The problem is most acute for:

- **Urban delivery app users** (Priya, 28, Bengaluru, orders 4x/week) — finds a cockroach in her biryani, gets a ₹150 refund, the restaurant stays live with a 4.1-star rating
- **Street food patrons in Tier 2/3 cities** (Ravi, 42, Patna, a school teacher) — falls sick from a chaat stall, doesn't know how to complain, doesn't know what FSSAI is
- **Community leaders managing group incidents** (Sunita, 55, RWA Secretary, Gurugram) — 7 children in her building got sick from adulterated milk, filed two municipal complaints, nothing happened

### Why It Is a Real and Important Problem

| Fact | Basis |
|---|---|
| ~7.6 crore Indians experience foodborne illness annually | WHO India estimates |
| Only ~2% of food safety violations are ever formally reported | FSSAI Annual Report 2024 |
| Average time from complaint to FSO inspection: 45–90 days | RTI data, citizen surveys |
| Most government complaint portals require Aadhaar OTP or account login | Direct observation |
| Delivery app complaints end in refunds — not enforcement | Platform policy review |

The problem is not that Indians don't care about food safety. The problem is that every reporting path is broken before they get to Step 2. **95% of food safety incidents go unreported because reporting is harder than doing nothing.**

---

## 2. What's Broken Today

### The Current Reporting Experience (Step by Step)

```
User finds contaminated food
      ↓
Searches "how to report food safety India" → 47 results, none clearly correct
      ↓
Lands on FSSAI portal → "Create account / Login with Aadhaar / OTP"
      ↓
Tries PG Portal → requires registration, selects "Ministry of Health"
      ↓
Tries Swiggy/Zomato "Report Issue" → offered a refund, complaint goes nowhere
      ↓
Gives up. Posts angry tweet. → No enforcement. Restaurant stays open.
```

### Specific Problems with Each Existing Path

**FSSAI Consumer Portal (fssai.gov.in)**
- Requires account creation with OTP before seeing any form
- No public visibility — every complaint is invisible to other citizens
- No map — impossible to see patterns or clusters
- Average resolution feedback: never

**PG Portal (pgportal.gov.in)**
- Multi-page form with fields irrelevant to food safety
- Routed to ministries, not local FSOs who can inspect
- No acknowledgement timeline

**Delivery App "Report Issue" Flow**
- Optimized for refunds, not enforcement
- Data is private — a restaurant with 500 complaint-refunds is invisible to the next customer
- No regulatory action taken as a result

**Twitter / Social Media**
- Unstructured — no location, no license number, no follow-up
- Platform removes content; no persistence
- No routing to anyone who can act

---

## 3. What We Changed

### The Suraksha.fyi Approach

```
User finds contaminated food
      ↓
Opens suraksha.fyi on phone (PWA — no app install, no login)
      ↓
Takes photo → GPS auto-tags → taps hazard type → 25 seconds → LIVE on map
      ↓
3 reports at the same restaurant in 7 days →
automated structured alert drafted for District Food Safety Officer
      ↓
Public map shows the cluster → reputational pressure before government acts
```

### The Three Changes That Matter

**1. Zero login wall**
No account. No Aadhaar. No OTP. A user submits a report the same way they send a WhatsApp message — by taking a photo.

**2. Immediate public visibility**
Every approved report is live on a public map within 5 seconds. This creates reputational pressure on restaurants before any government action. A restaurant with 7 reports and no FSO action is visibly failing.

**3. Structured signal to the right authority**
The platform automatically determines which authority is responsible (FSSAI District Officer, Municipal Corporation, State Civil Supplies, etc.) based on the type of outlet, and generates a structured alert — not a raw complaint dump.

---

## 4. Why It Is Better

| Dimension | Current FSSAI Portal | Delivery App Flow | Suraksha.fyi |
|---|---|---|---|
| Time to submit | 5–15 minutes | 2 minutes (refund only) | < 25 seconds |
| Login required | Yes (Aadhaar OTP) | Yes (app account) | No |
| Public visibility | None | None | Immediate (live map) |
| Regulatory action | Manual, 45–90 days | None | Automated alert at threshold |
| Works offline | No | No | Yes (queued, submits on reconnect) |
| Works on budget Android | Poor | OK | Yes (designed for Tier C devices) |
| Works via WhatsApp | No | No | Yes (bot flow in Hindi) |
| Data available to journalists | No | No | Open API + CSV download |

### What Makes This Defensible

The moat is the **combination**:
1. Zero-friction submission (faster than tweeting)
2. Immediate public visibility (reputational pressure without waiting for government)
3. Structured authority routing (not just data aggregation)

No existing Indian platform has all three.

---

## 5. Complete User Journey

### Persona: Priya — Urban Delivery App User

**Scenario:** Priya orders biryani on Zomato, finds an insect inside. She wants to report it without creating an account, and wants to know it had some impact.

**Journey:**

| Step | What Priya Does | What the System Does | Time |
|---|---|---|---|
| Discovery | Opens suraksha.fyi on her phone | Loads PWA (no install), auto-locates her city | 0s |
| Step 1 | Takes a photo of the contaminated food | Stores photo, runs background OCR for FSSAI license | 8s |
| Step 2 | Confirms GPS location (auto-detected), types restaurant name | Reverse geocodes to her ward; fuzzy-matches restaurant against local DB | 5s |
| Step 3 | Taps "Foreign Object — Insect" chip | Sets hazard severity to P0 Critical | 3s |
| Step 4 | Selects "They refunded me but didn't acknowledge the problem" | Records resolution outcome | 4s |
| Step 5 | Sees confirmation: "Your report is live!" with map pin | Report is published; cluster monitor checks for threshold | 5s |
| Later | Receives push notification: "2 more reports at this restaurant. Automated alert prepared for FSO." | Cluster threshold triggered; structured alert drafted | async |

**Total submission time: ~25 seconds.**

---

### Persona: Ravi — Street Food Patron, Patna (Hindi, Low-Data Device)

**Scenario:** Ravi's WhatsApp-first. He got sick from a chaat stall and doesn't know any official terminology.

**Journey via WhatsApp Bot:**

```
Ravi sends a photo to the Suraksha.fyi WhatsApp number

BOT (Hindi): "धन्यवाद! 🙏
              क्या समस्या थी?
              1️⃣ कीड़ा / बाल मिला (Foreign object)
              2️⃣ खाना खाने से बीमार पड़ा (Got sick)
              3️⃣ खाना खराब था (Spoiled food)
              4️⃣ पैकेट पुरानी तारीख (Expired product)
              5️⃣ शाकाहारी में मांस मिला (Meat in veg food)
              नंबर भेजें"

Ravi: "2"

BOT: "रेस्तरां का नाम बताएं या location share करें 📍"

Ravi: [shares WhatsApp location]

BOT: "आपकी report submit हो गई! ✅
      Report ID: SRK-2026-88392
      देखें: suraksha.fyi/r/SRK-2026-88392
      अगर कोई action होगा, हम बताएंगे।"
```

**No browser. No form. No English required.**

---

## 6. Design System

### Core Design Decisions for Indian Users

**Color — Safety Amber:**
Primary brand color is `#F59E0B` (amber/saffron). Chosen because:
- Culturally resonant in India (national color, auspiciousness, food culture)
- Not government portal blue (which carries distrust associations)
- Not alarming red (which feels punitive, not civic)

```
--color-primary:       #F59E0B  (Amber 500)  — CTAs, active states
--color-primary-dark:  #D97706  (Amber 600)  — Hover states
--color-primary-light: #FEF3C7  (Amber 50)   — Backgrounds
--color-critical:      #DC2626  (Red 600)    — P0 hazard pins
--color-resolved:      #16A34A  (Green 600)  — Resolved pins (green = safe/veg)
--color-neutral-900:   #111827              — Primary text
--color-neutral-50:    #F9FAFB              — Page background
```

**Hazard Pin Severity Colors on Map:**
```
🔴 P0 Critical (Glass, Metal, Chemical, Veg/Non-Veg mix): #DC2626
🟡 P1 Moderate (Insect, Expired, Spoilage, Adulteration): #F59E0B
🔵 P2 Advisory (Unhygienic handling, pest, unverified):   #3B82F6
🟢 Resolved (Merchant acknowledged or FSO inspected):     #16A34A
⚫ Under Review (Moderation pending):                     #6B7280
🟣 Veg/Non-Veg Contamination (India-specific):           #7C3AED
```

**Typography:**
```
Font: Inter (primary), system fallback
Scale: 12px (labels) → 16px (body) → 24px (headings) → 36px (hero stats)
Hindi/Devanagari: +1px size, +0.2 line-height (descenders need more space)
```

**Touch Targets:**
Minimum 48×48px for all interactive elements. Hazard chips are 72px tall.
Designed for right-thumb reach zone on a 375px mobile viewport.

### Accessibility

- WCAG 2.1 AA color contrast on all text
- All images have `alt` text; map pins have ARIA labels
- Every input has an associated `<label>` (no placeholder-only labels)
- `prefers-reduced-motion` respected — animations disabled when set
- Large icons (32px) lead every hazard chip for low-literacy users

---

## 7. Technical Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER (PWA)                         │
│  Next.js 15 / React / Tailwind CSS / Lucide icons              │
│  Service Worker (Workbox) — offline queue + tile cache          │
│  Tesseract.js OCR (Web Worker — no UI blocking)                 │
│  MapLibre GL JS + Ola Maps tiles (India-optimised)              │
│  Geolocation API + OSM Nominatim reverse geocoding              │
│  IndexedDB — offline submission queue                            │
│  Web Push API (VAPID) — status notifications                    │
│  Web Share Target API — share photo from camera roll → report   │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTPS / WebSocket
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   API & MODERATION LAYER                        │
│  Vercel Edge Functions (serverless, < 50ms globally)            │
│  Rate limiter: 5 submissions/device/hour (Upstash Redis)        │
│  Anonymisation: SHA-256(IP + daily_salt), timestamp → hour      │
│  Auto-moderation: pHash dedup, NSFW check, cluster detection    │
│  Jurisdiction resolver: PostGIS point-in-polygon               │
│  Cluster engine: 3 reports / 500m / 7 days → alert drafted     │
│  WebSocket live feed: Supabase Realtime                         │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                  PERSISTENCE & DATA LAYER                       │
│  Supabase / PostgreSQL + PostGIS (spatial indexing)             │
│   ├── incidents       — core reports                            │
│   ├── fbo_metadata    — restaurant/license records              │
│   ├── jurisdictions   — authority zones as GeoJSON              │
│   ├── dispatch_log    — structured alerts prepared              │
│   └── moderation_queue                                          │
│  Cloudflare R2 — WebP image storage (India edge bucket)         │
│  Upstash Redis — rate limiting, session tokens                  │
│  Daily CSV export cron — open dataset                           │
└─────────────────────────────────────────────────────────────────┘
```

### Key Engineering Decisions

**Offline-first (Service Worker):**
```
PRECACHE (install-time):
  - /report page shell, hazard icons, translation strings
  
RUNTIME (network-first, cached fallback):
  - Map tiles (30 min TTL)
  - Recent reports feed (30 min TTL)

BACKGROUND SYNC:
  - Queued submissions → auto-sync when connection returns
  - Tag: 'submit-report'
```

**Adaptive image quality for Indian networks:**
```javascript
const connection = navigator.connection;
const targetSizeKB = connection?.effectiveType === '4g' ? 500
  : connection?.effectiveType === '3g' ? 200 : 100;
// 100KB minimum is sufficient for moderation
```

**Data residency (DPDP Act 2023):**
- Supabase hosted in `ap-south-1` (Mumbai)
- Cloudflare R2 India-edge storage bucket
- Redis in `ap-south-1`
- No personal data (even hashed) stored outside India

**Anonymisation:**
```
Reporter identity = SHA-256(IP + daily_rotating_salt)
Timestamp truncated to nearest hour
WhatsApp number hashed after first message sent
No persistent user identity stored anywhere
```

---

## 8. Scale Plan

### How This Works Safely at Larger Scale

**Data integrity as volume grows:**

| Threat | Current Mitigation | At Scale |
|---|---|---|
| Spam / coordinated false reports | Rate limit 5/device/hour + pHash dedup | ML classifier trained on rejected reports; known-spam device hash blocklist |
| Defamation risk (false restaurant reports) | "User submitted — unverified" label; restaurant dispute email | Human moderation SLA (< 24hr review on P0 reports); legal notice policy |
| FSSAI alert overload (too many auto-alerts) | Threshold: 3 distinct verified reports in 7 days | Adaptive thresholds per city density; FSSAI API integration for two-way status |
| Privacy at scale | SHA-256 IP hash, daily salt rotation | Periodic hash-chain reset so old hashes cannot be cross-linked |

**Infrastructure scaling path:**
- Phase 1 (prototype): Vercel hobby + Supabase free tier — handles ~50 req/min
- Phase 2 (10K reports/month): Vercel Pro + Supabase Pro + Upstash Redis — ~₹8,000/month
- Phase 3 (national): Supabase dedicated instance in Mumbai + Cloudflare for edge — ~₹40,000/month
- No single point of failure: all writes go through edge functions; DB is replicated

**Regulatory process at scale:**

Suraksha.fyi does not replace official complaint systems — it feeds them. The scale model:

1. **Structured alerts (not automated filings):** The platform drafts a structured alert email when a cluster threshold is hit. A human moderator reviews and sends it. At scale, this moderator pool grows; the drafting is automated, the sending is supervised.

2. **FSSAI partnership (Phase 3):** Once the platform has demonstrated data quality, an MOU with FSSAI allows cluster alerts to flow via API into their case management system, and inspection status to flow back, closing the feedback loop without requiring email parsing.

3. **RTI as a fallback:** When an alert goes unacknowledged for 30 days, the system generates a pre-filled RTI template for the user to download and file manually. The RTI is filed by the citizen — not by the platform — preserving the legal distinction between "informing" and "filing."

**Trust architecture as the platform grows:**

The biggest scale risk is "Maine report kiya, kuch nahi hua" (I reported, nothing happened) becoming the dominant user perception. Prevention:
- Impact counter on every page (FSO inspections triggered, restaurants improved)
- "Your report had impact" push notification when a cluster leads to action
- Resolution Wall on dashboard (verified outcomes only)
- Open dataset: if journalists and researchers cite Suraksha.fyi data, the platform's credibility is validated by third parties

---

## 9. What Works Today vs. What Is Mocked

This section is the most important disclosure. Everything listed as "mocked" uses synthetic data and does not touch any live government system.

### Fully Functional in the Prototype

| Feature | Status | Notes |
|---|---|---|
| 5-step report submission flow | ✅ Works | Photo, GPS, hazard type, outcome, confirmation |
| GPS auto-location | ✅ Works | `navigator.geolocation`; fallback to manual pin |
| Photo capture & gallery upload | ✅ Works | WebRTC camera API; gallery file picker |
| Tesseract.js OCR (FSSAI license detection) | ✅ Works | Runs in Web Worker; detects 14-digit strings |
| Offline queue (Service Worker) | ✅ Works | IndexedDB + Background Sync |
| MapLibre GL live hazard map | ✅ Works | Pins, clusters, severity colors |
| Restaurant profile page | ✅ Works | Safety score, incident history |
| City dashboard | ✅ Works | Hall of shame, hazard breakdown, trend chart |
| Search by restaurant / FSSAI | ✅ Works | Full-text search against local dataset |
| My Reports (device-local) | ✅ Works | localStorage, status polling |
| Moderation admin panel | ✅ Works | Approve / reject / edit queue |
| Hindi UI strings | ✅ Works | All primary submission screens |
| Duplicate detection (pHash) | ✅ Works | Client-side image hash comparison |
| Rate limiting (5/device/hr) | ✅ Works | Upstash Redis |
| CSV export (open dataset) | ✅ Works | Filtered, paginated |

### Mocked with Synthetic Data

| Feature | Status | What Is Mocked |
|---|---|---|
| FSSAI license verification | ⚠ Mocked | OCR extracts the number; validation is a regex check (`^\d{14}$`) only. We do NOT query any FSSAI registry or government database. The license field is always labeled "user-entered, unverified." |
| District Food Safety Officer email dispatch | ⚠ Mocked | When a cluster threshold is hit, the system drafts a structured alert and logs it to `dispatch_log`. It does NOT send any email to any real government address. In the demo, a test inbox receives the draft for review. |
| WhatsApp bot | ⚠ Mocked | The bot flow is shown as a UI walkthrough. In production it would use Twilio's WhatsApp Business API; in the prototype, it is a simulated conversation screen. |
| FSO response / inspection status | ⚠ Mocked | Status updates shown on the map (e.g., "Inspected — Sep 5") are synthetic. In production, these would come from email reply parsing or an FSSAI API. |
| Push notifications (status updates) | ⚠ Mocked | The notification system is wired (Service Worker + VAPID); the triggers for FSO action updates use synthetic events in the demo. |
| FSSAI DDO jurisdiction map | ⚠ Mocked | GeoJSON polygons for 5 major cities are approximated from public FSSAI district office information. They have not been formally verified with FSSAI. |
| Restaurant database | ⚠ Mocked | ~500 restaurant records loaded from a synthetic dataset. No data was scraped from Zomato, Swiggy, or any private system. |
| ONDC / delivery app integration | ⚠ Not built | Shown as a roadmap item only |
| DigiLocker identity verification | ⚠ Not built | Described in PRD as optional Phase 3 feature; no integration exists |

### What We Explicitly Do Not Do

- We do not access, test, or send requests to any live government system (FSSAI portal, PG Portal, DigiLocker, Aadhaar).
- We do not scrape Zomato, Swiggy, or any private platform.
- We do not use real Aadhaar numbers, PAN details, phone numbers, or payment information anywhere in the prototype.
- We do not present the prototype as an official FSSAI or government product.
- We do not use government logos in any way that implies official approval or partnership.
- We do not send emails to real FSSAI District Officers.

All data visible in the demo is either user-generated during testing or synthetic.

---

## 10. India-First Design Decisions

These are design choices made specifically for Indian users that a generic product spec would miss.

### Device Reality: Designed for Tier C Phones

Most Indian food safety incidents will be reported from a ₹5,000–8,000 Android phone with 2GB RAM, 32GB storage, Android 10–12. Not an iPhone.

| Constraint | Our Response |
|---|---|
| < 5MB PWA storage budget | Assets compressed; MapLibre lazy-loaded after first paint |
| 2GB RAM (15 apps running) | MapLibre only loads on /map; landing page uses static PNG map snapshot |
| Budget camera (720p, compressed JPEG) | OCR accuracy on FSSAI license treated as bonus, not requirement |
| CPU thermal throttling | Static preview shown during GPS resolution — camera stream not held open |
| KaiOS / JioPhone (~12% of users) | WhatsApp bot is the primary submission path for this segment |

### Connectivity Reality: Designed for Patchwork 4G

```
4G/5G urban coverage: ~95% — Design for this
4G rural coverage:    ~60% — Handle interruption gracefully
3G/2G zones:          ~15% — Service Worker + offline queue critical
Peak congestion (8–10pm): network speed drops 40–60% — this is when food delivery happens
```

All form data is persisted to IndexedDB before each network request. A dropped connection mid-submission does not lose the report.

### India-Specific Hazard Taxonomy

The original FSSAI hazard categories miss three India-specific types that are common and serious:

**1. Veg/Non-Veg Contamination (P0 Critical)**
Finding meat in a vegetarian order is a religious, cultural, and legal issue in India — not just a preference issue. Affects Jain, Hindu, and Buddhist vegetarians. Shown with a distinct purple pin (🟣) to prevent confusion with other P0 hazards.

**2. Systemic Adulteration (P1 Moderate)**
India has a documented adulteration problem: chalk in turmeric, synthetic milk, banned dyes in spices, industrial salt in food. This category covers systemic chemical substitution, distinct from physical contamination.

**3. PDS / Ration Shop Adulteration (P2 Advisory)**
The Public Distribution System serves 800 million Indians. Weevil-infested grain, tampered expiry dates, and short-weighting at ration shops affect the most economically vulnerable. Complaints route to State Civil Supplies (not FSSAI), requiring a different dispatch target.

**Full Updated Hazard Taxonomy:**
```
P0 CRITICAL (immediate alert, single report):
  🔴 Foreign Object — Metal, Glass, Wire
  🔴 Chemical Contamination
  🟣 Veg/Non-Veg Contamination (India-specific)
  🔴 Mass Food Poisoning (3+ people sick)
  🔴 Festival / Community Kitchen incident

P1 MODERATE (alert at ≥3 reports / 7 days):
  🟡 Foreign Object — Insect, Hair (biological)
  🟡 Adulteration — Synthetic/Chemical (systemic)
  🟡 Expired / Mislabeled Product
  🟡 Spoilage / Mold / Foul Odor
  🟡 Individual Food Poisoning (1–2 people)

P2 ADVISORY (alert at ≥5 reports / 14 days):
  🔵 Unhygienic Kitchen / Handling
  🔵 Pest / Rodent Infestation (evidence)
  🔵 Missing / Expired FSSAI License
  🔵 Mislabeled Allergen
  🔵 PDS / Ration Shop Adulteration
  🔵 Water Quality Issue
```

### Regulatory Routing (Not a Single Authority)

India's food safety enforcement is fragmented. The correct dispatch target depends on outlet type:

```
OUTLET TYPE                   DISPATCH TARGET (MOCKED IN PROTOTYPE)
──────────────────────────────────────────────────────────────────
Restaurant / Hotel            FSSAI District DDO (FSS Act Sec 31)
Cloud Kitchen (delivery only) FSSAI DDO + DPIIT for startups
Street Vendor (licensed)      FSSAI DDO
Street Vendor (unlicensed)    Municipal Corporation / Health Dept.
Packaged Food (brand)         FSSAI Headquarters
PDS / Ration Shop             State Civil Supplies Dept.
Temple / Community Kitchen    State Food Safety Dept.
National Chain (50+ outlets)  FSSAI Headquarters, not district DDO
```

**Step 2 of the submission form includes:**
```
What type of outlet is this?
  ○ Restaurant / Dhaba / Café
  ○ Cloud Kitchen / Delivery Only
  ○ Street Vendor / Stall
  ○ Packaged Food (supermarket)
  ○ PDS / Ration Shop
  ○ Sweet Shop / Mithai
  ○ Temple / Community Kitchen
  ○ Other
```
This single field determines the dispatch routing logic.

### WhatsApp-First for Bharat

For Tier D users (Jio Phone, KaiOS), the PWA is inaccessible. WhatsApp IS the internet. The bot:
- Requires no browser
- Works entirely in Hindi
- Takes a photo and a location share — that is the entire submission
- Costs ~₹0.40/report in Twilio WhatsApp API fees

The bot is mocked in the prototype but the conversation design is production-ready.

### Trust Architecture

India's default expectation of any complaint portal is "I reported, nothing happened." Suraksha.fyi fights this with:

1. **Impact counter on every page:** "47 FSO inspections triggered / 12 restaurants improved rating" — updated daily, sourced from the dispatch log

2. **"Your report had impact" notification:** When a cluster triggers an alert, every contributor to that cluster gets a WhatsApp or push: "Your report helped. 2 more people reported the same issue. A food safety alert has been prepared for this restaurant."

3. **Resolution Wall on dashboard:** Only verified FSO outcomes displayed — not self-reported

4. **Open dataset:** Journalists who cite Suraksha.fyi data build platform credibility faster than any marketing can

---

## 11. Screen Specifications

### Landing Page (suraksha.fyi/)

```
MOBILE LAYOUT (375px):
┌──────────────────────────────────┐
│  ≡  Suraksha.fyi         🔍 📊  │  ← Navbar 56px
│                                  │
│ ┌──────────────────────────────┐ │
│ │    [LIVE HAZARD MAP]         │ │  ← 55% viewport
│ │    Amber/Red/Green pins      │ │    auto-centers on user city
│ │    ●3  ●  ●12  ●             │ │    static PNG fallback on slow conn.
│ └──────────────────────────────┘ │
│                                  │
│  📊 1,247 reports · 84 flagged   │  ← Horizontal stat strip
│                                  │
│  ⚡ Latest Reports               │
│  ┌────────────────────────────┐  │
│  │ 🐛 Foreign Object · P0     │  │  ← Live feed card
│  │ Zomato Cloud Kitchen        │  │    polled every 30s
│  │ Koramangala · 2 min ago    │  │
│  └────────────────────────────┘  │
│                                  │
│       ╔══════════════════╗       │
│       ║  📷 Report Now  ║       │  ← FAB: amber, fixed bottom-right
│       ╚══════════════════╝       │    pulsing ring on idle
│                                  │
│  First visit: bottom-sheet intro │
│  "Found bad food? Report in      │
│   25 seconds. No login needed."  │
│  [Got it] [Report Now →]         │
└──────────────────────────────────┘
```

---

### Report Flow — Step 1: Media Capture

```
┌──────────────────────────────────┐
│  ←  Report a Hazard       1 of 5 │
│  ●───────○───────○───────○───────○│
├──────────────────────────────────┤
│  📷  Add Photo                   │
│  (required for moderation)       │
│                                  │
│  ┌────────────────────────────┐  │
│  │                            │  │
│  │    [ CAMERA VIEWFINDER ]   │  │  ← Live back camera
│  │                            │  │    static preview after capture
│  │        [  SNAP  ]          │  │
│  └────────────────────────────┘  │
│                                  │
│  or  [  Upload from Gallery  ]   │
│                                  │
│  Tips (collapsible):             │
│  • Show the food / packaging     │
│  • Include FSSAI sticker if seen │
│  • Show the receipt / bill       │
│                                  │
│          [   NEXT   →]           │  ← Disabled until photo taken
└──────────────────────────────────┘
```

After photo taken: camera replaced by thumbnail + "✅ Photo added" + [Retake] button.

OCR runs in background. If FSSAI license detected: "📋 FSSAI license detected: 11223344556677. Tap to confirm." If not: no disruption.

---

### Report Flow — Step 2: Location Confirm

```
┌──────────────────────────────────┐
│  ←  Report a Hazard       2 of 5 │
│  ●───────●───────○───────○───────○│
├──────────────────────────────────┤
│  📍  Confirm Location            │
│                                  │
│  ┌────────────────────────────┐  │
│  │  [MAP SNIPPET — drag pin]  │  │
│  └────────────────────────────┘  │
│  Auto-detected:                  │
│  Koramangala 5th Block,          │
│  Bengaluru, Karnataka            │
│  [Use This] [Edit manually]      │
│                                  │
│  Outlet type:                    │
│  ○ Restaurant / Café             │
│  ○ Cloud Kitchen                 │
│  ○ Street Vendor / Stall         │
│  ○ Packaged Food / Supermarket   │
│  ○ PDS / Ration Shop             │
│  ○ Other                         │
│                                  │
│  Restaurant / Outlet Name        │
│  [ Search or type name... ]      │  ← Search (autocomplete from local DB)
│                                  │
│  FSSAI License # (optional)      │
│  [ 11223344556677          ]     │  ← Pre-filled if OCR found it
│                                  │
│          [   NEXT   →]           │
└──────────────────────────────────┘
```

GPS failure fallback: manual text search by area name or pincode. Manual pins marked with 📍? until a GPS-verified report confirms the same location.

---

### Report Flow — Step 3: Hazard Type

```
┌──────────────────────────────────┐
│  ←  Report a Hazard       3 of 5 │
│  ●───────●───────●───────○───────○│
├──────────────────────────────────┤
│  ⚠️  What did you find?          │
│  (tap one or more)               │
│                                  │
│  ┌──────────────┐ ┌────────────┐ │
│  │ 🐛 Foreign   │ │ 🤢 Food    │ │
│  │    Object    │ │    Illness │ │
│  └──────────────┘ └────────────┘ │
│  ┌──────────────┐ ┌────────────┐ │
│  │ 🦠 Spoilage  │ │ 📅 Expired │ │
│  │    / Mold    │ │    / Label │ │
│  └──────────────┘ └────────────┘ │
│  ┌──────────────┐ ┌────────────┐ │
│  │ 🧪 Chemical  │ │ 🟣 Veg in  │ │
│  │    Adulter.  │ │  Non-Veg   │ │
│  └──────────────┘ └────────────┘ │
│  ┌──────────────┐ ┌────────────┐ │
│  │ 🐀 Pest /    │ │ 🏪 PDS /   │ │
│  │    Rodent    │ │  Ration    │ │
│  └──────────────┘ └────────────┘ │
│                                  │
│  Describe (optional, < 200 chars)│
│  ┌────────────────────────────┐  │
│  │ Found a caterpillar in...  │  │  ← Optional; Romanized Hindi accepted
│  └────────────────────────────┘  │
│                                  │
│          [   NEXT   →]           │  ← Enabled after one chip tapped
└──────────────────────────────────┘
```

Selected chip: amber 2px border + amber tint + checkmark. Touch target: 48×72px minimum.

---

### Report Flow — Step 4: Resolution Outcome

```
┌──────────────────────────────────┐
│  ←  Report a Hazard       4 of 5 │
│  ●───────●───────●───────●───────○│
├──────────────────────────────────┤
│  What happened when you told     │
│  the merchant?                   │
│                                  │
│  ○  Haven't told them yet        │
│  ○  They replaced / refunded     │
│  ○  Acknowledged but didn't fix  │
│  ○  They denied the problem      │
│  ○  They ignored me              │
│                                  │
│  Did you receive a refund?       │
│  [Yes]  [No]  [Voucher offered]  │
│                                  │
│  What action are you requesting? │
│  ○  Public awareness only        │
│  ○  FSO inspection               │
│  ○  Formal FSSAI complaint       │
│                                  │
│  ─────────────────────────────── │
│  All responses are anonymous.    │
│  Your IP is hashed. No personal  │
│  data is stored.                 │
│                                  │
│          [   NEXT   →]           │
└──────────────────────────────────┘
```

---

### Report Flow — Step 5: Confirmation

```
┌──────────────────────────────────┐
│                                  │
│           ✅                     │  ← Large animated checkmark
│                                  │
│   Your report is live!           │
│   Report ID: SRK-2026-88392      │  ← Copyable
│                                  │
│   ┌────────────────────────────┐ │
│   │  [MAP SNIPPET — your pin]  │ │  ← Centered on submitted location
│   │  🔴 Your report            │ │
│   └────────────────────────────┘ │
│                                  │
│   ℹ  2 other reports near this   │
│      location this week          │
│                                  │
│   Share:                         │
│   [📲 WhatsApp] [🐦 X] [🔗 Link] │  ← WhatsApp share is highest-CTR
│                                  │
│   Get updates:                   │
│   [Enable Push Notifications]    │
│   [Get WhatsApp updates]         │
│   [Skip — I'm done]              │
│                                  │
└──────────────────────────────────┘
```

WhatsApp share message: "I just reported a food safety issue at [Restaurant], Bengaluru in 25 seconds — no login needed. See it on the map: suraksha.fyi/r/SRK-2026-88392"

---

### Live Hazard Map (/map)

```
DESKTOP LAYOUT:
┌───────────────────────────────────────────────────┬──────────┐
│                                                   │ FILTERS  │
│       [MAPLIBRE GL — FULL VIEWPORT]               │          │
│                                                   │ ○ All    │
│  Legend (bottom-left):                            │ ○ P0     │
│  🔴 Critical 🟡 Moderate 🟢 Resolved             │ ○ P1     │
│  ⚫ Pending  🔵 Advisory  🟣 Veg/Non-Veg         │ ○ Resolved│
│                                                   │          │
│  Active pin popup (on click):                     │ Date:    │
│  ┌─────────────────────────────────┐              │ [7d ▾]   │
│  │ Zomato Cloud Kitchen            │              │          │
│  │ Koramangala, Bengaluru          │              │ Category:│
│  │ ─────────────────────────────  │              │ [All ▾]  │
│  │ 🔴 3 reports · Foreign Object  │              │          │
│  │ 🟡 1 report  · Spoilage        │              │          │
│  │ Last report: 2 hours ago        │              │ [Pins]   │
│  │ [View Full Profile →]           │              │ [Heatmap]│
│  └─────────────────────────────────┘              │          │
│                                                   │          │
│  Jurisdiction overlay toggle: [Off | On]          │          │
│  When ON: colored GeoJSON polygons showing        │          │
│  FSSAI district boundaries (approximated,         │          │
│  not official — labeled as such)                  │          │
└───────────────────────────────────────────────────┴──────────┘
```

---

### Restaurant Profile (/restaurant/[slug])

```
┌──────────────────────────────────┐
│  ←  Suraksha.fyi                 │
├──────────────────────────────────┤
│  🍛 Zomato Cloud Kitchen         │
│  Koramangala 5th Block, Bengaluru│
│                                  │
│  FSSAI: 11223344556677  [📋 Copy]│
│  Type: Central License           │
│  Status: User-entered, unverified│  ← Honest disclosure
│                                  │
│  ─────────────────────────────── │
│  SAFETY SCORE                    │
│  ┌─────────────────────────────┐ │
│  │ 🔴 HIGH RISK                │ │
│  │ 7 reports in 90 days        │ │
│  │ 3 different hazard types    │ │
│  │ 0 merchant acknowledgements │ │
│  │ 0 FSO actions recorded      │ │
│  │ [How is this calculated? ℹ] │ │
│  └─────────────────────────────┘ │
│                                  │
│  INCIDENT HISTORY                │
│  ┌─────────────────────────────┐ │
│  │ 🔴 Foreign Object — Aug 18  │ │
│  │ "Found caterpillar in salad" │ │
│  │ Status: Live · Unresolved   │ │
│  │ [View on Map] [Share]       │ │
│  └─────────────────────────────┘ │
│                                  │
│  [Download report CSV]           │
│  [Embed on article]              │
│  [Dispute this report (email)]   │  ← Merchant dispute path
└──────────────────────────────────┘
```

Safety score is based on: report count (40%), severity (30%), merchant response rate (20%), recurrence (10%).

---

### City Dashboard (/dashboard)

```
┌───────────────────────────────────────────────────────────┐
│  Suraksha.fyi · Showing: [Bengaluru ▾] · Past [90d ▾]   │
├───────────────────────────────────────────────────────────┤
│  OVERVIEW (scroll horizontal on mobile)                   │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐            │
│  │ 1,247  │ │  84    │ │  12    │ │  67%   │            │
│  │Reports │ │Flagged │ │Inspected│ │Merchant│            │
│  │this mo.│ │restaur.│ │by FSO  │ │ignored │            │
│  └────────┘ └────────┘ └────────┘ └────────┘            │
│                                                           │
│  🏆 HALL OF SHAME (Most Reports — 90d)                   │
│  1. Zomato Cloud Kitchen, Koram.   ████████  7          │
│  2. Biryani House, Whitefield      ██████    5          │
│  3. Fresh Farm Dairy, Jayanagar    █████     4          │
│                                                           │
│  HAZARD BREAKDOWN                                         │
│  Foreign Object   ████████████  38%                       │
│  Expired Product  ████████      27%                       │
│  Spoilage/Mold    ██████        19%                       │
│  Food Poisoning   ████          12%                       │
│  Pest/Infestation ██             4%                       │
│                                                           │
│  MONTHLY TREND CHART                                      │
│  [Line chart: Jan–Aug 2026]                               │
│                                                           │
│  CITY LEAGUE TABLE                                        │
│  Rank  City        Reports  Resolved  FSO Actions         │
│  1     Mumbai      3,412    18%       47                  │
│  2     Delhi       2,987    12%       31                  │
│  3     Bengaluru   1,247    21%       12                  │
│                                                           │
│  [Download full dataset CSV]                              │
└───────────────────────────────────────────────────────────┘
```

All data shown in the demo is synthetic and labeled as such in the footer: "Demo data — synthetic dataset for prototype. Not sourced from live reports."

---

## 12. Known Limitations and Honest Disclosures

### Technical Limitations

| Limitation | Impact | Plan |
|---|---|---|
| FSSAI license lookup is format-check only | Cannot verify if a license is real or current | Phase 3: FSSAI partnership or scraped public registry |
| Jurisdiction polygons are approximated | District boundaries may not match FSSAI actual zones | File RTI for official GeoJSON; partnership for official data |
| Ola Maps API commercial terms for civic projects | Unknown — prototype uses free tier | Reach out for civic discount; OSM fallback ready |
| WhatsApp bot is mocked | Ravi's journey (Tier D user) not accessible in live demo | Twilio WhatsApp Business API integration is designed; pending number provisioning |
| Push notifications require HTTPS | Works only on deployed Vercel URL, not localhost | Non-issue in production |

### Process Limitations

| Limitation | Impact | Plan |
|---|---|---|
| Human moderation required for all P0 Critical reports | Doesn't scale past ~50 reports/day without paid moderators | ML-assisted moderation in Phase 2; community moderator program |
| Automated alert drafts require human review before send | Alert is not truly automated until a trust relationship with FSSAI is established | Phase 3: FSSAI API integration removes this gate |
| No formal FSSAI DDO email database | Cannot route to the correct officer for most jurisdictions | File RTI for this list; interim: route to generic FSSAI state office |
| Restaurant name matching is fuzzy, not authoritative | Cloud kitchen multi-brand disambiguation is incomplete | Phase 2: ONDC or delivery platform API partnership |

### Data and Legal Disclosures

- All reports are labeled "User submitted — unverified" until moderation clears them
- Terms of Service state reports are crowdsourced and not verified by Suraksha.fyi
- Suraksha.fyi is not affiliated with FSSAI or any government body
- Restaurants can dispute any report via email
- The RTI templates generated are templates only — they are not filed by the platform; the user must file them manually

---

*Suraksha.fyi — Open Food Safety Registry Prototype*
*Version 4.0 — August 2026 | Hackathon Submission Edition*
*Built on: Next.js 15 · Supabase + PostGIS · Ola Maps · Cloudflare R2 · Upstash Redis · Vercel*
*Contribution: Codex assisted with architecture design, India-specific regulatory mapping, hazard taxonomy, and screen specification drafting.*
