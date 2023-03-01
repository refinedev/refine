---
"@pankod/refine-core": minor
---

`options` prop of resource is deprecated. Use `meta` prop instead. To ensure backward compatibility, `options` prop will be used if `meta` prop is not provided.

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
