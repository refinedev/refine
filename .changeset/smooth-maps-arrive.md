---
"@refinedev/hasura": patch
---

fix(hasura): broken lodash import in bundle

ESM bundle of `@refinedev/hasura` was broken due to incorrect lodash import. Import has been replaced with subdirectory import to get handled properly in the bundling process.

Fixes [#6044](https://github.com/refinedev/refine/issues/6044)
