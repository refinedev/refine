---
"@refinedev/core": minor
---

feat: [`useForm`](https://refine.dev/docs/data/hooks/use-form/)'s `mutationResult` is deprecated, use `mutation` instead. #6163

```diff
import { useForm } from '@refinedev/core';

- const { mutationResult } = useForm();
+ const { mutation } = useForm();
```

> ✨ You can use `@refinedev/codemod` to automatically migrate your codebase. Simply run the following command in your project's root directory:
>
> ```bash
> npx @refinedev/codemod@latest use-form-query-and-mutation-result
> ```
