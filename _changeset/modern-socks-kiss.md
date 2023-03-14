---
"@refinedev/mantine": major
---

-   `useSelect`'s `sort` prop is now deprecated. Use `sorters` prop instead.

```diff
useSelect({
-    sort,
+    sorters,
})
```
