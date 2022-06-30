---
"@pankod/refine-codemod": minor
---

Create codemod wizard fixing changes made in [#2072](https://github.com/pankod/refine/pull/2072).

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