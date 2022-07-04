---
"@pankod/refine-mui": minor
---

The `useDataGrid` hook required the `columns` property. Therefore, the `queryResult` could not be used in the `columns`. Now, we can define the `columns` property wherever we want since the `useDataGrid` hook does not take the `column` property.

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
