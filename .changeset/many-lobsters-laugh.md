---
"@pankod/refine-core": minor
---

`options` property of `resources` is deprecated. Added `meta` property instead. To provide backward compatibility, `options` property is still supported. But it will be removed in the next major version.

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
