---
"@refinedev/mui": patch
---

fix(mui): pass `meta` to `useUpdate` in `useDataGrid` hook for editable data grid.

```tsx
import { useDataGrid } from "@refinedev/mui";

const { dataGridProps } = useDataGrid({
  resource: "posts",
  editable: true,
  updateMutationOptions: {
    meta: { foo: "bar" },
  },
});
```
