---
"@refinedev/core": patch
---

fix: `useInfiniteList` pagination not work #7034

Now `useInfiniteList` correctly advances server-side pages when loading more results. This bug was caused by [this commit](https://github.com/refinedev/refine/commit/1a02f020fdc2030e7c7a702e3bd9bfddae2fe1c8).

Resolves #7034
