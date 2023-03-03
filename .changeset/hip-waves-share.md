---
"@pankod/refine-antd": minor
---

-   `useCheckboxGroup`'s `sort` prop is now deprecated. Use `sorters` prop instead.

```diff
useCheckboxGroup({
-    sort,
+    sorters,
})
```

-   `useSelect`'s `sort` prop is now deprecated. Use `sorters` prop instead.

```diff
useSelect({
-    sort,
+    sorters,
})
```

-   `useRadioGroup`'s `sort` prop is now deprecated. Use `sorters` prop instead.

```diff
useRadioGroup({
-    sort,
+    sorters,
})
```

-   `useImport`'s `resourceName` prop is now deprecated. Use `resource` prop instead.

```diff
useImport({
-    resourceName,
+    resource,
})
```
