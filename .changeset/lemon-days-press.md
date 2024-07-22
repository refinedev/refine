---
"@refinedev/core": minor
---

feat: [`useForm`](https://refine.dev/docs/data/hooks/use-form/)'s `queryResult` is deprecated, use `query` instead. #6163

```diff
import { useForm } from '@refinedev/core';

- const { queryResult } = useForm();
+ const { query } = useForm();
```
