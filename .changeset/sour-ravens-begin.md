---
"@refinedev/core": patch
---

fix: `invalidates` prop of `useUpdateMany` doesn't work. #6209

From now on, the `invalidates` prop of the `useUpdateMany` hook will work as expected.

```tsx
const { mutate } = useUpdateMany({
  resource: "posts",
  invalidates: ["all"], // invalidates all queries of the "posts" resource
});

mutate({ ids: [1, 2, 3], values: { title: "new title" } });
```
