---
"@refinedev/mui": minor
---

feat: [`useDataGrid`](https://refine.dev/docs/ui-integrations/material-ui/hooks/use-data-grid/)'s `tableQueryResult` is deprecated, use `tableQuery` instead. #6169

```diff
import { useDataGrid } from '@refinedev/mui';

- const { tableQueryResult } = useDataGrid();
+ const { tableQuery } = useDataGrid();
```

> ✨ You can use `@refinedev/codemod` to automatically migrate your codebase. Simply run the following command in your project's root directory:
>
> ```bash
> npx @refinedev/codemod@latest use-table-query-result
> ```
