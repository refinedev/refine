---
"@pankod/refine-core": minor
---

-   `congig` prop of `useList` and `useInfiniteList` hooks are deprecated. Use `sorters`, `filters`, `pagination` and `hasPagination` props instead.

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

useInfiniteList({
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

-   `resourceName` prop of `useImport` and `useExport` hooks are deprecated. Use `resource` prop instead.

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

-   `sorter` props of `useExport` hook is deprecated. Use `sorters` prop instead.

```diff
useExport({
-    sorter,
+    sorters,
})
```

-   `sort` prop of `useSelect` hook is deprecated. Use `sorters` prop instead.

```diff
useSelect({
-    sort,
+    sorters,
})
```

-   `config.sort` prop of `useCustom` hook is deprecated. Use `config.sorters` prop instead.

```diff
useCustom({
    config: {
-       sort,
+       sorters,
    }
})
```
