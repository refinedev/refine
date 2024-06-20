---
"@refinedev/nestjs-query": patch
---

fix: can specify 0 as filter value

The following values do not apply to the filter.

- null
- undefined
- NaN
- Infinity / -Infinity

The following values can apply to the filter.

- 0
- ""

Resolves #6022
