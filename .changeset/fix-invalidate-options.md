---
"@refinedev/core": patch
---

fix: pass `useInvalidate` invalidation options as the second argument to `invalidateQueries`, so `cancelRefetch` is respected for every invalidation key.

Fixes [#7656](https://github.com/refinedev/refine/issues/7656).
