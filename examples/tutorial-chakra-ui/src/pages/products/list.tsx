import React from "react";
import {
    IResourceComponentsProps,
    GetManyResponse,
    useMany,
} from "@pankod/refine-core";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import {
    List,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    HStack,
    Button,
    IconButton,
    usePagination,
    Box,
    EditButton,
    ShowButton,
    MarkdownField,
} from "@pankod/refine-chakra-ui";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons";

import { ColumnSorter } from "../../components/table/ColumnSorter";
import { ColumnFilter } from "../../components/table/ColumnFilter";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
                id: "id",
                accessorKey: "id",
                header: "Id",
                enableColumnFilter: false,
            },
            {
                id: "name",
                accessorKey: "name",
                header: "Name",
            },
            {
                id: "material",
                accessorKey: "material",
                header: "Material",
            },
            {
                id: "description",
                accessorKey: "description",
                header: "Description",
                meta: {
                    filterOperator: "contains",
                },
                cell: function render({ getValue }) {
                    return (
                        <MarkdownField
                            value={getValue<string>()?.slice(0, 80) + "..."}
                        />
                    );
                },
            },
            {
                id: "price",
                accessorKey: "price",
                header: "Price",
                enableColumnFilter: false,
            },
            {
                id: "category",
                header: "Category",
                accessorKey: "category.id",
                enableSorting: false,
                enableColumnFilter: false,
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        categoryData: GetManyResponse;
                    };

                    const category = meta.categoryData?.data?.find(
                        (item) => item.id === getValue<any>(),
                    );

                    return category?.title ?? "Loading...";
                },
            },
            {
                id: "actions",
                accessorKey: "id",
                header: "Actions",
                enableSorting: false,
                enableColumnFilter: false,
                cell: function render({ getValue }) {
                    return (
                        <HStack>
                            <ShowButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                            <EditButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                        </HStack>
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
            tableQueryResult: { data: tableData },
        },
    } = useTable({
        columns,
    });

    const { data: categoryData } = useMany({
        resource: "categories",
        ids: tableData?.data?.map((item) => item?.category?.id) ?? [],
        queryOptions: {
            enabled: !!tableData?.data,
        },
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
            categoryData,
        },
    }));

    return (
        <List>
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {!header.isPlaceholder &&
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                        <ColumnSorter column={header.column} />
                                        <ColumnFilter column={header.column} />
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
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Pagination
                current={current}
                pageCount={pageCount}
                setCurrent={setCurrent}
            />
        </List>
    );
};

type PaginationProps = {
    current: number;
    pageCount: number;
    setCurrent: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
    current,
    pageCount,
    setCurrent,
}) => {
    const pagination = usePagination({
        current,
        pageCount,
    });

    return (
        <Box display="flex" justifyContent="flex-end">
            <HStack my="3" spacing="1">
                {pagination?.prev && (
                    <IconButton
                        aria-label="previous page"
                        onClick={() => setCurrent(current - 1)}
                        disabled={!pagination?.prev}
                        variant="outline"
                    >
                        <IconChevronLeft size="18" />
                    </IconButton>
                )}

                {pagination?.items.map((page) => {
                    if (typeof page === "string")
                        return <span key={page}>...</span>;

                    return (
                        <Button
                            key={page}
                            onClick={() => setCurrent(page)}
                            variant={page === current ? "solid" : "outline"}
                        >
                            {page}
                        </Button>
                    );
                })}
                {pagination?.next && (
                    <IconButton
                        aria-label="next page"
                        onClick={() => setCurrent(current + 1)}
                        variant="outline"
                    >
                        <IconChevronRight size="18" />
                    </IconButton>
                )}
            </HStack>
        </Box>
    );
};
