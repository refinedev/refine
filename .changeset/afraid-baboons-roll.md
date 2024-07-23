---
"@refinedev/mui": minor
---

feat: [`useAutocomplete`](https://refine.dev/docs/ui-integrations/material-ui/hooks/use-auto-complete/)'s `queryResult` and `defaultValueQueryResult` is deprecated, use `query` and `defaultValueQuery` instead. #6179

```diff
import { useAutocomplete } from '@refinedev/mui';

- const { queryResult, defaultValueQueryResult } = useAutocomplete();
+ const { query, defaultValueQuery } = useAutocomplete();
```
