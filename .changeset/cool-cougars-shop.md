---
"@refinedev/core": minor
---

feat: [`useSelect`](https://refine.dev/docs/data/hooks/use-select/)'s `queryResult` and `defaultValueQueryResult` is deprecated, use `query` and `defaultValueQuery` instead. #6179

```diff
import { useSelect } from '@refinedev/core';

- const { queryResult, defaultValueQueryResult } = useSelect();
+ const { query, defaultValueQuery } = useSelect();
```

> ✨ You can use `@refinedev/codemod` to automatically migrate your codebase. Simply run the following command in your project's root directory:
>
> ```bash
> npx @refinedev/codemod@latest rename-query-and-mutation-result
> ```
