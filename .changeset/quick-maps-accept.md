---
"@refinedev/core": patch
---

fix(core): preserve custom `getList` response fields in `useList` and `useTable` results.

We had an edge case where custom fields returned from `getList` were available on `query.data` but dropped from `result`. Now those extra fields are preserved in both `useList` and `useTable`.
