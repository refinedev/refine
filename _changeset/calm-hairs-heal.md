---
"@pankod/refine-codemod": minor
---

Add Codemod support for changed `columns` usage of `useDataGrid` hook. [#2072](https://github.com/pankod/refine/pull/2072).

```diff
export const PostsList: React.FC = () => {
-    const { dataGridProps } = useDataGrid<IPost>({
-        columns,
-    });
+    const { dataGridProps } = useDataGrid<IPost>();
    return (
        <List>
-            <DataGrid {...dataGridProps} autoHeight />
+            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
```