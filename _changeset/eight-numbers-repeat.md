---
"@refinedev/react-table": minor
---

All `@tanstack/react-table` imports re-exported from `@refinedev/react-table` have been removed. You should import them from the `@tanstack/react-table` package directly.

If the package is not installed, you can install it with your package manager:

```bash
npm install @tanstack/react-table
# or
pnpm add @tanstack/react-table
# or
yarn add @tanstack/react-table
```

After that, you can import them from `@tanstack/react-table` package directly.

```diff
- import { useTable, ColumnDef, flexRender } from "@refinedev/react-table";

+ import { useTable } from "@refinedev/react-table";
+ import { ColumnDef, flexRender } from "@tanstack/react-table";
```
