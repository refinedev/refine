---
"@pankod/refine-mantine": minor
---

-   Deprecated `sort` props of `useSelect` hook. Use `sorters` prop instead.

```diff
useSelect({
-    sort,
+    sorters,
})
```
