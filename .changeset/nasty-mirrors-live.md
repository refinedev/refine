---
"@refinedev/react-table": patch
"@refinedev/antd": patch
"@refinedev/core": patch
"@refinedev/mui": patch
---

feat: Added `result` field to the return value of `useTable`, `useSimpleList`, and `useDataGrid`. It holds the last resolved value from the [`getList`](/docs/data/data-provider/#getlist-) method, same as `tableQueryResult.data`, allowing direct data access without destructuring `tableQueryResult`.

```tsx
const { result } = useTable();

const data = result?.data; // identical to tableQueryResult.data.data
const total = result?.total; // identical to tableQueryResult.data.total
```
