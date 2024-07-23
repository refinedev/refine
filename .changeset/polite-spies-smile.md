---
"@refinedev/core": minor
---

feat: [`useShow`](https://refine.dev/docs/data/hooks/use-show/)'s `queryResult` is deprecated, use `query` instead. #6173

```diff
import { useShow } from '@refinedev/core';

- const { queryResult } = useShow();
+ const { query } = useShow();
```
