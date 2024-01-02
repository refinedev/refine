---
"@refinedev/core": patch
---

fix: `queryKey` is not overrideable. To fix this, `useQuery` overloads refactored with single argument objects.

```diff
- useQuery(queryKey, queryFn, options);
+ useQuery({ queryKey, queryFn, ...options });
```

From now on, you can pass `queryKey` as an object property.

```tsx
// all data hooks can be used with this syntax.
useList({
  queryOptions: {
    queryKey: ["my-query-key"],
  },
});
```
