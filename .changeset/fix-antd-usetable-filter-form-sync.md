---
"@refinedev/antd": patch
---

Fixed `useTable`'s search-form sync (`syncWithLocation`) only ever running once on mount, so a later change to `filters` (e.g. a deep link that resolves after mount, or an external `setFilters` call) never reached the search form.

Also added an optional `onParse` prop — the reverse of `onSearch` — for reconstructing form values that a filter's raw value can't be assigned to as-is, such as restoring a date-range-picker tuple from two separate `gte`/`lte` filters, or coercing a URL-stringified value back to a number:

```ts
const { searchFormProps } = useTable({
  syncWithLocation: true,
  onSearch: (values) => [
    { field: "category.id", operator: "eq", value: values.category },
    { field: "createdAt", operator: "gte", value: values.createdAt?.[0] },
    { field: "createdAt", operator: "lte", value: values.createdAt?.[1] },
  ],
  onParse: (filters) => ({
    category: Number(filters.find((f) => f.field === "category.id")?.value),
    createdAt: [gteValue, lteValue],
  }),
});
```

`onParse` is read through a ref rather than the sync effect's dependency array, so passing an inline function doesn't cause the search form to resync (and clobber in-progress user input) on every unrelated re-render — only an actual change to `filters` triggers a resync.

Originally proposed in #7338, with an earlier incomplete attempt in #7385.

Fixes #7685
