---
"@refinedev/core": major
---

-   `options` prop of resource is now deprecated. Use `meta` prop instead.
-   To ensure backward compatibility, `options` prop will be used if `meta` prop is not provided.

```diff
<Refine
    resources={[
        {
            name: "posts",
-           options: {},
+           meta: {},
        },
    ]}
/>
```
