---
title: "Material UI Empty Component | UI Component in Refine v5"
display_title: "<Empty />"
sidebar_label: "<Empty />"
description: "Explore how to show a reusable, customizable empty state for tables and data grids in Refine v5 with Material UI. Learn with code examples."
source: packages/mui/src/components/empty/index.tsx
---

`<Empty>` is a presentational component from **Refine**'s Material UI integration you can render in place of an empty table, list, or data grid.

:::simple Good to know

`<Empty>` does **not** detect _why_ a table or grid has no rows - whether that's because the resource has no records at all, a search returned no results, or filters have hidden every record. It only renders the `title`, `description`, and `action` you give it. You decide what to show based on the state you already have (e.g. your search input's value, your active filters), and pass the right content.

:::

## Usage

### With `<DataGrid>`

Plug `<Empty>` into MUI X Data Grid's `slots.noRowsOverlay`:

```tsx
import { useDataGrid, List, CreateButton, Empty } from "@refinedev/mui";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", flex: 1 },
];

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

### With a plain `<Table>`

If you render a plain `<Table>` with [`@refinedev/react-table`](/docs/packages/tanstack-table/use-table/), render `<Empty>` in its place once the query has finished loading and returned no rows:

```tsx
import React from "react";
import { List, CreateButton, Empty } from "@refinedev/mui";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

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
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
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
        <TableHead>
          {getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </List>
  );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/mui/Empty" />
