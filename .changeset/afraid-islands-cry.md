---
"@refinedev/nextjs-router": patch
---

fix: fixed `currentPage` URL parameter not loading correctly on page refresh #7042

Now the `currentPage` parameter is properly read from URL search params, ensuring pagination state persists across page refreshes.

Resolves #7042
