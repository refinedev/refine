---
"@pankod/refine-mantine": minor
---

-   `sort` props of `useSelect` hook is deprecated. Use `sorters` prop instead.

```diff
useSelect({
-    sort,
+    sorters,
})
```
