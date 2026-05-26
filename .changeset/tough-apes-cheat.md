---
"@refinedev/graphql": minor
---

feat: add cursor-based pagination support

Added `getCursor` option to `GraphQLDataProviderOptions.getList` for cursor-based pagination support. When `pagination.mode` is `"cursor"`, the data provider includes the `cursor` response from `getCursor` in the `getList` return value.

**New option:**

- `getList.getCursor(response, params)` — Extract cursor values (`next`, `prev`) from the GraphQL response. Returns `CursorResponse | undefined`.

**Other changes:**

- `getList.getTotalCount` return type updated to `number | undefined` to support cursor-based APIs that may not return a total count.
- Exported utilities from `utils/index.ts`.
