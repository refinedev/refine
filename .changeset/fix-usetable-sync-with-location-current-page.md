---
"@refinedev/core": patch
---

fix(core): strip `currentPage` instead of legacy `current` in `useTable`'s `getCurrentQueryParams` so `createLinkForSyncWithLocation` does not overwrite `currentPage` with the existing URL parameter.
