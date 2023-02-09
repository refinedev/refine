---
"@pankod/refine-mui": minor
---

-   Deprecated `sort` props of `useAutocomplete` hook. Use `sorters` prop instead.

```diff
useSelect({
-    sort,
+    sorters,
})
```
