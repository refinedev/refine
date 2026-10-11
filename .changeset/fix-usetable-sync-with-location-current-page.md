---
"@refinedev/core": patch
---

fix(core): strip both `currentPage` and legacy `current` in `useTable`'s `getCurrentQueryParams` so `createLinkForSyncWithLocation` properly handles modern and legacy URL pagination parameters without overwriting target page links.
