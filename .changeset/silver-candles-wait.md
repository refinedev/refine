---
"@refinedev/react-hook-form": patch
---

chore: update `@refinedev/core` usage to reflect latest renamings.

> These changes applied on internal usage of `@refinedev/core` in `@refinedev/react-hook-form` package.

```diff
import { useForm } from '@refinedev/core';

- const { queryResult, mutationResult } = useForm();
+ const { query, mutation} = useForm();
```
