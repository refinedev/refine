---
"@refinedev/core": minor
---

Added new generic types to the `useForm` hooks. Now you can pass the query types and the mutation types to the hook.

```ts
import { useForm } from "@refinedev/core";

useForm<TQueryFnData, TError, TVariables, TData, TResponse, TResponseError>();
```
