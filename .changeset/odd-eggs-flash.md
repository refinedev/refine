---
"@refinedev/react-table": patch
---

chore: update `@refinedev/core` usage to reflect latest renamings.

> These changes applied on internal usage of `@refinedev/core` in `@refinedev/react-table` package.

```diff
import { useTable } from '@refinedev/core';

- const { tableQueryResult} = useTable();
+ const { tableQuery } = useTable();
```
