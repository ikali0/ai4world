

# Plan: Smooth Scroll Navigation + Four-Layer Mode Switcher

## Overview

Two features will be added: (1) smooth scroll-to-section links in the mobile hamburger menu, and (2) a four-layer view mode switcher that reframes dashboard data with different weightings and UI emphasis per audience.

---

## Feature 1: Smooth Scroll-to-Section Navigation

### What changes

**`src/pages/Index.tsx`**
- Add `id` attributes to each major section wrapper: `id="sectors"`, `id="regions"`, `id="opportunities"`, `id="risks"`
- Create a `scrollToSection` helper function that calls `document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })` and closes the mobile menu
- Add section navigation links in the mobile Sheet menu: Sectors, Regions, Opportunities, Risks -- each calling `scrollToSection`
- Add corresponding desktop nav links (hidden on mobile) for consistency

### Sections mapped

| Menu Label | Target ID | Component |
|---|---|---|
| Sectors | `sectors` | SectorGrid |
| Regions | `regions` | RegionalFilter |
| Opportunities | `opportunities` | QuadrantMatrix + OpportunityHeatmap |
| Risks | `risks` | RiskGapIndex |

---

## Feature 2: Four-Layer Mode Switcher

### Architecture

A `ViewMode` state (`'public' | 'insights' | 'opportunity' | 'policy'`) will be added to the Index page. A sticky mode switcher bar sits below the navigation. Each mode changes:

- **Hero subtitle/description text** to match the audience tone
- **Counter metrics** displayed in the hero (different KPIs per mode)
- **Which sections are visible** (show/hide or reorder based on mode)
- **Section headings and badge labels** to reflect the framing

### New files

**`src/types/view-modes.ts`** -- Type definitions and configuration for each mode, including:
- Mode ID, label, icon, description
- Scoring weight configuration (deployment, unmetNeed, maturity, capital, talent, regulatory, policy, confidence)
- UI emphasis config (which metrics to highlight, visualization types, tone)

**`src/components/ViewModeSwitcher.tsx`** -- A horizontal pill-style switcher with four buttons (Globe icon for Public, BarChart3 for Insights, TrendingUp for Opportunity, Building2 for Policy). Uses framer-motion `layoutId` for animated active indicator. Responsive: horizontal scroll on mobile with smaller text.

### Section visibility per mode

| Section | Public | Insights | Opportunity | Policy |
|---|---|---|---|---|
| Hero + Globe | Yes | Yes | Yes | Yes |
| Sector Grid | Yes | Yes | Yes | Yes |
| Regional Filter | Yes | Yes | Hidden | Yes |
| Quadrant Matrix | Hidden | Yes | Yes | Hidden |
| Opportunity Heatmap | Hidden | Hidden | Yes | Hidden |
| Risk & Gap Index | Yes | Hidden | Hidden | Yes |
| Footer | Yes | Yes | Yes | Yes |

### Hero metrics per mode

- **Public**: Global Readiness Score, Countries Tracked, Sector Stability, AI Systems Indexed
- **Insights**: AI Adoption Rate, Infrastructure Gap, Workforce Readiness, Digital Equity Index
- **Opportunity**: High-Grade Opportunities, Unmet Need Index, Addressable Capital, Market Gaps
- **Policy**: Policy Readiness, Workforce Impact Risk, Regulatory Clarity, Infrastructure Investment

### Mode switcher placement
- Rendered as a sticky bar below the main navigation
- On mobile: horizontally scrollable with compact labels
- Subtle background blur with border-bottom separator

### Changes to existing files

**`src/pages/Index.tsx`**
- Import `ViewModeSwitcher` and `ViewMode` type
- Add `viewMode` state, default to `'public'`
- Place `ViewModeSwitcher` between nav and hero
- Pass `viewMode` to `HeroSection` (for metric swapping)
- Conditionally render sections based on mode visibility map
- Add `id` attributes to section wrappers

**`src/components/HeroSection.tsx`**
- Accept optional `viewMode` prop
- Switch hero counter metrics based on active mode
- Adjust subtitle text per mode

---

## Technical Details

- No database changes required
- No new dependencies needed (framer-motion, lucide-react already installed)
- All state is client-side (URL persistence not needed for MVP)
- `scroll-mt-20` utility will be added to section wrappers to offset for the sticky nav + mode switcher

