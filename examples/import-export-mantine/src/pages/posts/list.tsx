import React from "react";
import {
  type GetManyResponse,
  useExport,
  useImport,
  useMany,
  useNotification,
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
import {
  List,
  DeleteButton,
  ImportButton,
  ExportButton,
  DateField,
} from "@refinedev/mantine";

import {
  Box,
  Group,
  ScrollArea,
  Table,
  Pagination,
  Select,
} from "@mantine/core";

import { ColumnFilter, ColumnSorter } from "../../components/table";
import type { FilterElementProps, ICategory, IPost } from "../../interfaces";

export const PostList: React.FC = () => {
  const columns = React.useMemo<ColumnDef<IPost>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
      {
        id: "title",
        header: "Title",
        accessorKey: "title",
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        meta: {
          filterElement: function render(props: FilterElementProps) {
            return (
              <Select
                defaultValue="published"
                data={[
                  { label: "Published", value: "published" },
                  { label: "Draft", value: "draft" },
                  { label: "Rejected", value: "rejected" },
                ]}
                {...props}
              />
            );
          },
          filterOperator: "eq",
        },
      },
      {
        id: "category.id",
        header: "Category",
        enableColumnFilter: false,
        accessorKey: "category.id",
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as {
            categoriesData: GetManyResponse<ICategory>;
          };
          const category = meta.categoriesData?.data.find(
            (item) => item.id === getValue(),
          );
          return category?.title ?? "Loading...";
        },
      },
      {
        id: "createdAt",
        header: "Created At",
        accessorKey: "createdAt",
        cell: function render({ getValue }) {
          return <DateField value={getValue() as string} format="LLL" />;
        },
        enableColumnFilter: false,
      },
      {
        id: "actions",
        header: "Actions",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
        cell: function render({ getValue }) {
          return (
            <Group gap="xs" wrap="nowrap">
              <DeleteButton hideText recordItemId={getValue() as number} />
            </Group>
          );
        },
      },
    ],
    [],
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQuery: { data: tableData },
    },
  } = useTable({
    columns,
  });

  const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];
  const { data: categoriesData } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      categoriesData,
    },
  }));

  const { open } = useNotification();

  const { inputProps, isLoading } = useImport({
    onFinish: () => {
      open?.({
        message: "Import successfully completed",
        type: "success",
      });
    },
  });

  const { triggerExport, isLoading: exportLoading } = useExport<IPost>({
    mapData: (item) => {
      return {
        title: item.title,
        content: item.content,
        status: item.status,
        categoryId: item.category.id,
      };
    },
    maxItemCount: 50,
  });

  return (
    <ScrollArea>
      <List
        headerButtons={
          <>
            <ImportButton loading={isLoading} inputProps={inputProps} />
            <ExportButton loading={exportLoading} onClick={triggerExport} />
          </>
        }
      >
        <Table highlightOnHover>
          <Table.Thead>
            {getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Table.Th key={header.id}>
                      {!header.isPlaceholder && (
                        <Group gap="xs" wrap="nowrap">
                          <Box>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </Box>
                          <Group gap="xs" wrap="nowrap">
                            <ColumnSorter column={header.column} />
                            <ColumnFilter column={header.column} />
                          </Group>
                        </Group>
                      )}
                    </Table.Th>
                  );
                })}
              </Table.Tr>
            ))}
          </Table.Thead>
          <Table.Tbody>
            {getRowModel().rows.map((row) => {
              return (
                <Table.Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>

        <Group mt="md" justify="right">
          <Pagination total={pageCount} value={current} onChange={setCurrent} />
        </Group>
      </List>
    </ScrollArea>
  );
};
