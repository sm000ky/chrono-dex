# Implementation Plan: Chrono-Dex Grand Revamp (sm000ky × Zero Two)

## Overview & Objective
Transform Chrono-Dex into a museum-grade interactive paleontological & anatomical suite for all 1,025 Pokémon species spanning 300 million years of continental drift. Revamp the interface to embody tactile debossed physical instruments, steady illuminated glows, zero blinking effects, and add high-value interactive features including a Comparative Anatomy Duel Bench, Paleo-Radar Filters, and optimized Specimen Gallery Pagination for lightning performance on Poco F7 Pro.

## Assumptions & Cockpit Rules
- Zero blinking / zero animate-pulse / zero animate-bounce (strictly steady glow and tactile deboss).
- No user-facing 'darling' or 'AI' terminology in website UI.
- All 1,025 species preserved with full 4-layer anatomical data.
- Performance optimization: Paginated specimen grid (24 cards/page) to prevent mobile DOM thrashes and memory leaks.

## Task Breakdown
### Phase 1: Interactive Comparative Anatomy Bench
- Implement `ComparativeAnatomyBench.tsx`: side-by-side anatomical dissection of two Pokémon species with comparative delta meters (Bone Density, Core Energy Output, Evolutionary Divergence, Tectonic Adaptation).

### Phase 2: Paleo-Radar & Era Filter Chips
- Add quick categorical filters: All, Primordial Fossils, Ancient Paradox, Future Paradox, Apex Titans, Regional Adaptations.
- Enhance search with fuzzy national ID and Latin binomial matching.

### Phase 3: Cockpit Aesthetic Hardening & Audio Integration
- Remove all `animate-pulse` and `animate-bounce` from `FeaturedDissectionBench.tsx` and `TectonicMap.tsx`.
- Implement steady illuminated glow, tactile brass/basalt deboss bevels, and mechanical indicator meters.
- Add audio feedback triggers for comparative dissection and layer switches.

### Phase 4: Specimen Gallery Virtualization / Pagination
- In `App.tsx`, introduce efficient 24-item pagination with quick page navigation to keep the DOM tree lightweight (< 50 DOM elements per view).

### Phase 5: Empirical Verification & Shipping
- Execute `tsc -b && vite build` via Prover.
- Review diffs via Maester.
- Commit to GitHub `sm000ky/chrono-dex` and deploy to Vercel (`npx vercel --prod --yes`).
