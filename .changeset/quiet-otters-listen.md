---
"@refinedev/mui": patch
---

feat: add `filters.syncFilterModel` option to `useDataGrid`

`useDataGrid` controls `dataGridProps.filterModel` from an internal state that
was only updated by the DataGrid's own filter panel and by `search()`. As a
result, calls to the returned `setFilters` (or filter changes synced from the
URL via `syncWithLocation`) updated `filters` but left `filterModel` stale, so
external filter UIs could not drive the grid's visible filter state.

Add an opt-in `filters.syncFilterModel` flag. When `true`, the hook reflects
`filters` changes in `dataGridProps.filterModel`. The default is `false` to
preserve compatibility with apps that mix column-header filtering and
external filter inputs — see #5860 for the original reasoning behind the
controlled-but-unsynced behavior.

```tsx
const { dataGridProps } = useDataGrid({
  resource: "posts",
  filters: {
    syncFilterModel: true,
  },
});
```
