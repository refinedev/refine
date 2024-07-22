---
"@refinedev/core": minor
---

feat: [`useForm`](https://refine.dev/docs/data/hooks/use-form/)'s `mutationResult` is deprecated, use `mutation` instead. #6163

```diff
import { useForm } from '@refinedev/core';

- const { mutationResult } = useForm();
+ const { mutation } = useForm();
```
