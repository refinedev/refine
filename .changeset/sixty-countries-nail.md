---
"@refinedev/antd": minor
---

feat: [`useTable`](https://refine.dev/docs/ui-integrations/ant-design/hooks/use-table/)'s `tableQueryResult` is deprecated, use `tableQuery` instead. #6169

```diff
import { useTable } from '@refinedev/core';

- const { tableQueryResult } = useTable();
+ const { tableQuery } = useTable();
```

feat: [`useSimpleList`](https://refine.dev/docs/ui-integrations/ant-design/hooks/use-simple-list/)'s `queryResult` is deprecated, use `query` instead. #6169

```diff
import { useSimpleList } from '@refinedev/antd';

- const { queryResult } = useSimpleList();
+ const { query } = useSimpleList();
```

> ✨ You can use `@refinedev/codemod` to automatically migrate your codebase. Simply run the following command in your project's root directory:
>
> ```bash
> npx @refinedev/codemod@latest rename-query-and-mutation-result
> ```
