---
"@pankod/refine-react-table": major
---

All `@tanstack/react-table` components re-exported by `refine` are removed. You should import them from `@tanstack/react-table` directly.

Before:

```tsx
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
```

After:

```tsx
import { useTable } from "@pankod/refine-react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
```
