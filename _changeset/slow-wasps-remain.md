---
"@refinedev/core": major
---

-   `useList` and `useInfiniteList`'s `config` prop is now deprecated. Use `sorters`, `filters`, `pagination` and `hasPagination` props instead.

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

-   `useImport` and `useExport`'s `resourceName` prop is now deprecated. Use `resource` prop instead.

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

-   `useExport`'s `sorter` prop is now deprecated. Use `sorters` prop instead.

```diff
useExport({
-    sorter,
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

-   `useSelect`'s `config.sort` prop is now deprecated. Use `config.sorters` prop instead.

```diff
useCustom({
    config: {
-       sort,
+       sorters,
    }
})
```
