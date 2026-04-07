---
"@refinedev/react-table": patch
---

feat: add cursor-based pagination support

Added cursor-based pagination support to `useTable`. When `pagination.mode` is `"cursor"`, page index based operations (page reset on sort/filter changes, `setCurrentPage` on `pageIndex` change) are skipped since cursor pagination does not use numeric page indices.
