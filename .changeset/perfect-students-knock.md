---
"@refinedev/core": patch
---

fixed: `useExport`'s `resource` props is not working.
With this fix, `useExport` will now work with `resource` props.

```ts
useExport({
    resource: "users",
});
```
