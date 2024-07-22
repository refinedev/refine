---
"@refinedev/core": minor
---

feat: [`useForm`](https://refine.dev/docs/data/hooks/use-form/)'s `mutationResult` is deprecated, use `mutation` instead

```diff
import { useForm } from '@refinedev/core';

- const { mutationResult } = useForm();
+ const { mutation } = useForm();
```

feat: [`useForm`](https://refine.dev/docs/data/hooks/use-form/)'s `queryResult` is deprecated, use `query` instead

```diff
import { useForm } from '@refinedev/core';

- const { queryResult } = useForm();
+ const { query } = useForm();
```
