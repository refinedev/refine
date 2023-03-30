---
"@refinedev/core": patch
---

Refactored `useForm` hook to improve props typing.

Now, if `resource` is provided, `id` is required.

```ts
useForm(); // If `resource` is not provided, types work as expected

useForm({ resource: "posts" }); // If only `resource` is provided, types throw an error (as expected) because `id` is required

useForm({ resource: "posts", id: 1 }); // If `resource` and `id` are provided, types work as expected
```
