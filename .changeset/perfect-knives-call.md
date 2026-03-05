---
"@refinedev/core": patch
"@refinedev/nextjs-router": patch
"@refinedev/remix-router": patch
"@refinedev/react-router": patch
---

fix: correctly parse deeply nested conditional filters from URL with syncWithLocation

Increased `qs.parse` depth from default 5 to 10 to support deeply nested conditional filters (e.g., `or -> and -> {field, operator, value}`). Previously, nested filter properties were incorrectly parsed as bracket notation keys (`[field]`, `[operator]`, `[value]`) after page reload when using `syncWithLocation: true`.
