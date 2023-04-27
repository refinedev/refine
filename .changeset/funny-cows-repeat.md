---
"@refinedev/antd": patch
"@refinedev/core": patch
"@refinedev/mantine": patch
"@refinedev/react-hook-form": patch
---

Added new generic types to the `useForm` hooks. Now you can pass the query types and the mutation types to the hook.

```ts
import { useForm } from "@refinedev/core";

useForm<TQueryFnData, TError, TVariables, TData, TResponse, TResponseError>();
```