---
"@refinedev/core": minor
"@refinedev/antd": minor
"@refinedev/mui": minor
---

feat: add cursor-based pagination support

Added cursor-based pagination support to `useTable` hook. Set `pagination.mode: "cursor"` to enable cursor pagination.

**New return values from useTable:**

- `cursor` - current cursor state with `next` and `prev` values
- `hasNextPage` / `hasPreviousPage` - boolean flags for navigation availability
- `goToNextPage` / `goToPreviousPage` - navigation functions

**Data provider integration:**
Data providers can return `cursor: { next, prev }` from `getList` to enable cursor pagination. The cursor value is passed to subsequent requests via `pagination.cursor`.

**URL sync:**
When `syncWithLocation: true`, cursor state is synced to URL params (`?after=<cursor>` or `?before=<cursor>`).
