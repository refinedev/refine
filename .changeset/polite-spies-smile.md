---
"@refinedev/core": minor
---

feat: [`useShow`](https://refine.dev/docs/data/hooks/use-show/)'s `queryResult` is deprecated, use `query` instead. #6173

```diff
import { useShow } from '@refinedev/core';

- const { queryResult } = useShow();
+ const { query } = useShow();
```

> ✨ You can use `@refinedev/codemod` to automatically migrate your codebase. Simply run the following command in your project's root directory:
>
> ```bash
> npx @refinedev/codemod@latest use-show-query-result
> ```
