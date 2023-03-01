---
"@pankod/refine-antd": minor
---

-   `sort` props of `useCheckboxGroup` hook is deprecated. Use `sorters` prop instead.

```diff
useCheckboxGroup({
-    sort,
+    sorters,
})
```

-   `sort` props of `useSelect` hook is deprecated. Use `sorters` prop instead.

```diff
useSelect({
-    sort,
+    sorters,
})
```

-   `sort` props of `useRadioGroup` hook is deprecated. Use `sorters` prop instead.

```diff
useRadioGroup({
-    sort,
+    sorters,
})
```

-   `resourceName` props of `useImport` hook is deprecated. Use `resource` prop instead.

```diff
useImport({
-    resourceName,
+    resource,
})
```
