---
"@refinedev/core": minor
---

feat: [`useTable`](https://refine.dev/docs/data/hooks/use-table/)'s `tableQueryResult` is deprecated, use `tableQuery` instead. #6169

```diff
import { useTable } from '@refinedev/core';

- const { tableQueryResult } = useTable();
+ const { tableQuery } = useTable();
```
