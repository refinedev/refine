---
"@refinedev/codemod": minor
---

feat: added `npx @refinedev/codemod@latest use-table-query-result` to automatically refactor `useTable`'s `tableQueryResult` to `tableQuery` #6163

```diff
- const { tableQueryResult } = useTable(); // or useDataGrid
+ const { tableQuery } = useTable();
```
