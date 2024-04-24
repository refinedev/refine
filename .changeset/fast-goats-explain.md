---
"@refinedev/nextjs-router": patch
---

fix: `/parse-table-params` export in node10 module resolutions

`/parse-table-params` subpath export is not correctly resolved by `node10` module resolutions.
