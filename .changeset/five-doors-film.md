---
"@refinedev/core": patch
---

feat(core): deprecate `result` property in favor of `query.data`

The `result.data` property in `useCustom` hook has been deprecated. This property always returns an empty object during loading state, which could lead to runtime errors when accessing nested properties without proper null checks.

**Migration Guide:**

Instead of using `result.data`, use `query.data.data` to access your custom response data:

```diff
const { result, query } = useCustom({
  url: "https://api.example.com/endpoint",
  method: "get",
});

- const data = result.data;
+ const data = query.data?.data;
```

This change provides better type safety and aligns with the underlying React Query behavior, ensuring TypeScript can properly catch potential runtime errors.

Resolves #7088
