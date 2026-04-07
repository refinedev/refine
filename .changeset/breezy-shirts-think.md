---
"@refinedev/nextjs-router": patch
"@refinedev/react-router": patch
"@refinedev/remix-router": patch
---

feat: encode cursor pagination URL params

Added `encodeURIComponent` encoding for `after` and `before` query parameters in router bindings. This ensures cursor values containing special characters are properly encoded when synced to the URL via `syncWithLocation`.
