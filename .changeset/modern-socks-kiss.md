---
"@pankod/refine-mantine": minor
---

-   `useSelect`'s `sort` prop is now deprecated. Use `sorters` prop instead.

```diff
useSelect({
-    sort,
+    sorters,
})
```
