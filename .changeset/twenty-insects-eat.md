---
"@refinedev/inferencer": patch
---

fix(inferencer): broken lodash import in bundle

ESM bundle of `@refinedev/inferencer` was broken due to incorrect lodash import. Import has been replaced with subdirectory import to get handled properly in the bundling process.
