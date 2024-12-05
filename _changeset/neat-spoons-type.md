---
"@refinedev/react-table": patch
---

fix(react-table): add equality checks before setting filters and sorters

When setting the filters and sorters received from the `useTable` of `@tanstack/react-table` to Refine's table state, it was causing unnecessary updates. Those updates sometimes caused queries to stuck in loading state. Adding deep equality checks before setting the filters and sorters solves the issue.

[Resolves #6265](https://github.com/refinedev/refine/issues/6265)
