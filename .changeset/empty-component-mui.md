---
"@refinedev/mui": minor
---

feat: add `<Empty>` component for customizable empty states in tables and data grids

Added a presentational `<Empty>` component that can be rendered in place of an empty table or data grid. It accepts `title`, `description`, `action`, and `icon` so you can show a message and an action (e.g. a "Create" button) that fits your context - whether the resource has no records at all, a search returned no results, or filters have hidden every record.

`<Empty>` does not try to detect _why_ the data is empty - you decide what to show based on state you already have.

```tsx
import { useDataGrid, List, CreateButton, Empty } from "@refinedev/mui";
import { DataGrid } from "@mui/x-data-grid";

const PostList = () => {
  const { dataGridProps } = useDataGrid();

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        slots={{
          noRowsOverlay: () => (
            <Empty
              title="No posts yet"
              description="Create your first post to get started."
              action={<CreateButton />}
            />
          ),
        }}
      />
    </List>
  );
};
```

[Resolves #7638](https://github.com/refinedev/refine/issues/7638)
