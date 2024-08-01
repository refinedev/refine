---
"@refinedev/mui": minor
---

feat: [`useAutocomplete`](https://refine.dev/docs/ui-integrations/material-ui/hooks/use-auto-complete/)'s `queryResult` and `defaultValueQueryResult` is deprecated, use `query` and `defaultValueQuery` instead. #6179

```diff
import { useAutocomplete } from '@refinedev/mui';

- const { queryResult, defaultValueQueryResult } = useAutocomplete();
+ const { query, defaultValueQuery } = useAutocomplete();
```

> ✨ You can use `@refinedev/codemod` to automatically migrate your codebase. Simply run the following command in your project's root directory:
>
> ```bash
> npx @refinedev/codemod@latest rename-query-and-mutation-result
> ```
