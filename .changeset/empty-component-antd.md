---
"@refinedev/antd": minor
---

feat: add `<Empty>` component for customizable empty states in tables and lists

Added a presentational `<Empty>` component that can be rendered in place of an empty table, list, or grid. It accepts `title`, `description`, `action`, and `icon` so you can show a message and an action (e.g. a "Create" button) that fits your context - whether the resource has no records at all, a search returned no results, or filters have hidden every record.

`<Empty>` does not try to detect _why_ the data is empty - you decide what to show based on state you already have.

```tsx
import { useTable, List, CreateButton, Empty } from "@refinedev/antd";
import { Table } from "antd";

const PostList = () => {
  const { tableProps } = useTable();

  return (
    <List>
      <Table
        {...tableProps}
        rowKey="id"
        locale={{
          emptyText: (
            <Empty
              title="No posts yet"
              description="Create your first post to get started."
              action={<CreateButton />}
            />
          ),
        }}
      >
        <Table.Column dataIndex="title" title="Title" />
      </Table>
    </List>
  );
};
```

[Resolves #7638](https://github.com/refinedev/refine/issues/7638)
