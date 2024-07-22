---
"@refinedev/mui": minor
---

feat: [`useDataGrid`](https://refine.dev/docs/ui-integrations/material-ui/hooks/use-data-grid/)'s `tableQueryResult` is deprecated, use `tableQuery` instead. #6169

```diff
import { useDataGrid } from '@refinedev/mui';

- const { tableQueryResult } = useDataGrid();
+ const { tableQuery } = useDataGrid();
```
