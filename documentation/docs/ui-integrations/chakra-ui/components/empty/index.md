---
title: "Chakra UI Empty Component | UI Component in Refine v5"
display_title: "<Empty />"
sidebar_label: "<Empty />"
description: "Explore how to show a reusable, customizable empty state for tables and lists in Refine v5 with Chakra UI. Learn with code examples."
source: packages/chakra-ui/src/components/empty/index.tsx
---

`<Empty>` is a presentational component from **Refine**'s Chakra UI integration you can render in place of an empty table or list.

:::simple Good to know

`<Empty>` does **not** detect _why_ a table or list has no rows - whether that's because the resource has no records at all, a search returned no results, or filters have hidden every record. It only renders the `title`, `description`, and `action` you give it. You decide what to show based on the state you already have (e.g. your search input's value, your active filters), and pass the right content.

:::

## Usage

Chakra UI's `<Table>` renders whatever rows you give it, so render `<Empty>` in its place once the query has finished loading and returned no rows:

```tsx
import React from "react";
import { List, CreateButton, Empty } from "@refinedev/chakra-ui";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
import {
  Center,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

interface IPost {
  id: number;
  title: string;
}

const PostList = () => {
  const columns = React.useMemo<ColumnDef<IPost>[]>(
    () => [{ id: "title", header: "Title", accessorKey: "title" }],
    [],
  );

  const {
    reactTable: { getHeaderGroups, getRowModel },
    refineCore: {
      tableQuery: { isLoading },
    },
  } = useTable<IPost>({ columns });

  if (isLoading) {
    return (
      <List>
        <Center py={10}>
          <Spinner />
        </Center>
      </List>
    );
  }

  if (getRowModel().rows.length === 0) {
    return (
      <List>
        <Empty
          title="No posts yet"
          description="Create your first post to get started."
          action={<CreateButton />}
        />
      </List>
    );
  }

  return (
    <List>
      <Table>
        <Thead>
          {getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </List>
  );
};
```

### Customizing the icon

```tsx
import { Empty } from "@refinedev/chakra-ui";
import { IconSearchOff } from "@tabler/icons-react";

<Empty
  icon={<IconSearchOff size={48} stroke={1.5} />}
  title="No results found"
  description="Try adjusting your search."
/>;
```

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/Empty" />
