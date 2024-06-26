---
"@refinedev/core": patch
---

fix(core): add unexported types in `index.tsx`

The `refinedev/core` package has many unexported types that are not accessible for use outside the package. This change aims to address this limitation by exporting those missing types.

Resolves [#6041](https://github.com/refinedev/refine/issues/6041)
