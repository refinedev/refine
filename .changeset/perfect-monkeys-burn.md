---
"@refinedev/mantine": minor
---

feat: [`useSelect`](https://refine.dev/docs/ui-integrations/mantine/hooks/use-select/)'s `queryResult` and `defaultValueQueryResult` is deprecated, use `query` and `defaultValueQuery` instead. #6179

```diff
import { useSelect } from '@refinedev/mantine';

- const { queryResult, defaultValueQueryResult } = useSelect();
+ const { query, defaultValueQuery } = useSelect();
```
