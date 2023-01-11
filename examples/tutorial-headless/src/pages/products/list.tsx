import React from "react";
import {
    IResourceComponentsProps,
    useNavigation,
    GetManyResponse,
    useMany,
} from "@pankod/refine-core";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
                id: "id",
                accessorKey: "id",
                header: "Id",
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
            },
            {
                id: "price",
                accessorKey: "price",
                header: "Price",
            },
            {
                id: "category",
                header: "Category",
                accessorKey: "category.id",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        categoryData: GetManyResponse;
                    };

                    try {
                        const category = meta.categoryData?.data?.find(
                            (item) => item.id === getValue<any>(),
                        );

                        return category?.title ?? "Loading...";
                    } catch (error) {
                        return null;
                    }
                },
            },
            {
                id: "actions",
                accessorKey: "id",
                header: "Actions",
                cell: function render({ getValue }) {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                gap: "4px",
                            }}
                        >
                            <button
                                onClick={() => {
                                    show("products", getValue() as string);
                                }}
                            >
                                Show
                            </button>
                            <button
                                onClick={() => {
                                    edit("products", getValue() as string);
                                }}
                            >
                                Edit
                            </button>
                        </div>
                    );
                },
            },
        ],
        [],
    );

    const { edit, show, create } = useNavigation();

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            tableQueryResult: { data: tableData },
        },
        getState,
        setPageIndex,
        getCanPreviousPage,
        getPageCount,
        getCanNextPage,
        nextPage,
        previousPage,
        setPageSize,
        getColumn,
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
        <div style={{ padding: "16px" }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <h1>Products</h1>
                <button onClick={() => create("products")}>Create</button>
            </div>
            <div style={{ maxWidth: "100%", overflowY: "scroll" }}>
                <table>
                    <thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        {!header.isPlaceholder &&
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ marginTop: "12px" }}>
                <button
                    onClick={() => setPageIndex(0)}
                    disabled={!getCanPreviousPage()}
                >
                    {"<<"}
                </button>
                <button
                    onClick={() => previousPage()}
                    disabled={!getCanPreviousPage()}
                >
                    {"<"}
                </button>
                <button onClick={() => nextPage()} disabled={!getCanNextPage()}>
                    {">"}
                </button>
                <button
                    onClick={() => setPageIndex(getPageCount() - 1)}
                    disabled={!getCanNextPage()}
                >
                    {">>"}
                </button>
                <span>
                    Page
                    <strong>
                        {getState().pagination.pageIndex + 1} of{" "}
                        {getPageCount()}
                    </strong>
                </span>
                <span>
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            setPageIndex(page);
                        }}
                    />
                </span>{" "}
                <select
                    value={getState().pagination.pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
