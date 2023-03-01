---
"@pankod/refine-mui": minor
---

-   `sort` prop of `useAutocomplete` hook is deprecated. Use `sorters` prop instead.

```diff
useAutocomplete({
-    sort,
+    sorters,
})
```
