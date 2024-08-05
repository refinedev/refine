---
"@refinedev/core": minor
---

feat: [`useForm`](https://refine.dev/docs/data/hooks/use-form/)'s `queryResult` is deprecated, use `query` instead. #6163

```diff
import { useForm } from '@refinedev/core';

- const { queryResult } = useForm();
+ const { query } = useForm();
```

> ✨ You can use `@refinedev/codemod` to automatically migrate your codebase. Simply run the following command in your project's root directory:
>
> ```bash
> npx @refinedev/codemod@latest rename-query-and-mutation-result
> ```
