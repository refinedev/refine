---
title: "Ant Design Empty Component | UI Component in Refine v5"
display_title: "<Empty />"
sidebar_label: "<Empty />"
description: "Explore how to show a reusable, customizable empty state for tables and lists in Refine v5 with Ant Design. Learn with code examples."
source: packages/antd/src/components/empty/index.tsx
---

`<Empty>` is a presentational component from **Refine**'s Ant Design integration you can render in place of an empty table, list, or grid.

:::simple Good to know

`<Empty>` does **not** detect _why_ a table or list has no rows - whether that's because the resource has no records at all, a search returned no results, or filters have hidden every record. It only renders the `title`, `description`, and `action` you give it. You decide what to show based on the state you already have (e.g. your search input's value, your active filters), and pass the right content.

:::

## Usage

`<Empty>` doesn't render a `<Table>` on its own - plug it into Ant Design's native `locale.emptyText` prop:

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

### Customizing the icon

Pass your own `icon` to replace the default illustration:

```tsx
import { Empty } from "@refinedev/antd";
import { SearchOutlined } from "@ant-design/icons";

<Empty
  icon={<SearchOutlined style={{ fontSize: 32 }} />}
  title="No results found"
  description="Try adjusting your search."
/>;
```

## API Reference

### Properties

<PropsTable module="@refinedev/antd/Empty" />
