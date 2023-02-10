---
"@pankod/refine-core": minor
---

-   Deprecated `congig` props of `useList` and `useInfiniteList` hooks. Use `sorters`, `filters`, `pagination`, and `hasPagination` props instead.

```diff
useList({
-    config: {
-        sort,
-        filters,
-        pagination,
-        hasPagination,
-    },
+    sorters,
+    filters,
+    pagination,
+    hasPagination,
})

useInfinite({
-    config: {
-        sort,
-        filters,
-        pagination,
-        hasPagination,
-    },
+    sorters,
+    filters,
+    pagination,
+    hasPagination,
})
```

-   Deprecated `resourceName` props of `useImport` and `useExport` hooks. Use `resource` prop instead.

```diff
useImport({
-    resourceName,
+    resource,
})

useExport({
-    resourceName,
+    resource,
})
```

-   Deprecated `sorter` props of `useExport` hook. Use `sorters` prop instead.

```diff
useExport({
-    sorter,
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

- Deprecated `config.sort` props of `useCustom` hook. Use `config.sorters` prop instead.

```diff
useCustom({
    config: {
-       sort,
+       sorters,
    }
})
```
