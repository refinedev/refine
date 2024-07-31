---
"@refinedev/codemod": minor
---

feat: added `npx @refinedev/codemod@latest use-table-query-result` to automatically refactor `useTable`'s `tableQueryResult` to `tableQuery` #6163

```diff
- const { tableQueryResult } = useTable(); // or useDataGrid
+ const { tableQuery } = useTable();
```

feat: added `npx @refinedev/codemod@latest use-simple-list-query-result` to automatically refactor `useSimpleList`'s `queryResult` to `query` #6163

```diff
- const { queryResult } = useSimpleList();
+ const { query } = useSimpleList()
```
