---
"@pankod/refine-antd": minor
---

-   Deprecated `sort` props of `useCheckboxGroup` hook. Use `sorters` prop instead.

```diff
useCheckboxGroup({
-    sort,
+    sorters,
})
```

-   Deprecated `sort` props of `useSelect` hook. Use `sorters` prop instead.

```diff
useSelect({
-    sort,
+    sorters,
})
```

-   Deprecated `sort` props of `useRadioGroup` hook. Use `sorters` prop instead.

```diff
useRadioGroup({
-    sort,
+    sorters,
})
```

-   Deprecated `resourceName` props of `useImport`hook. Use `resource` prop instead.

```diff
useImport({
-    resourceName,
+    resource,
})
```
