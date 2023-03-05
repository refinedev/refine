---
"@refinedev/mui": minor
---

-   `useAutocomplete`'s sort prop is now deprecated. Use `sorters` prop instead.

```diff
useAutocomplete({
-    sort,
+    sorters,
})
```
