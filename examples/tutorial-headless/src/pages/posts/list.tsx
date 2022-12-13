import React from "react";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";

import {
    GetManyResponse,
    useDelete,
    useMany,
    useNavigation,
} from "@pankod/refine-core";

import { ICategory, IPost } from "interfaces";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
    CreateIcon,
    DeleteIcon,
    EditIcon,
    ShowIcon,
} from "icons";

export const PostList: React.FC = () => {
    const { edit, create, show } = useNavigation();
    const { mutate } = useDelete();

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
            },
            {
                id: "createdAt",
                header: "CreatedAt",
                accessorKey: "createdAt",
            },
            {
                id: "category.id",
                header: "Category",
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
                id: "action",
                header: "Action",
                accessorKey: "id",
                cell: function render({ getValue }) {
                    return (
                        <div className="flex gap-2">
                            <button
                                className="rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white"
                                onClick={() =>
                                    edit("posts", getValue() as number)
                                }
                            >
                                {EditIcon}
                            </button>
                            <button
                                className="rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white"
                                onClick={() =>
                                    show("posts", getValue() as number)
                                }
                            >
                                {ShowIcon}
                            </button>
                            <button
                                className="rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-red-500 hover:text-white"
                                onClick={() =>
                                    mutate({
                                        id: getValue() as number,
                                        resource: "posts",
                                    })
                                }
                            >
                                {DeleteIcon}
                            </button>
                        </div>
                    );
                },
            },
        ],
        [],
    );

    const {
        setOptions,
        getHeaderGroups,
        getRowModel,
        getState,
        setPageIndex,
        getCanPreviousPage,
        getPageCount,
        getCanNextPage,
        nextPage,
        previousPage,
        setPageSize,
        getColumn,
        refineCore: {
            tableQueryResult: { data: tableData },
        },
    } = useTable<IPost>({
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

    const titleColumn = getColumn("title");

    return (
        <div className="container mx-auto pb-4">
            <div className="mb-3 mt-1 flex items-center justify-between">
                <div>
                    <label className="mr-1" htmlFor="title">
                        Title:
                    </label>
                    <input
                        id="title"
                        type="text"
                        className="rounded border border-gray-200 p-1 text-gray-700"
                        placeholder="Filter by title"
                        value={(titleColumn.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            titleColumn.setFilterValue(event.target.value)
                        }
                    />
                </div>
                <button
                    className="flex items-center justify-between gap-1 rounded border border-gray-200 bg-indigo-500 p-2 text-xs font-medium leading-tight text-white transition duration-150 ease-in-out hover:bg-indigo-600"
                    onClick={() => create("posts")}
                >
                    {CreateIcon}
                    <span>Create Post</span>
                </button>
            </div>

            <table className="min-w-full table-fixed divide-y divide-gray-200 border">
                <thead className="bg-gray-100">
                    {getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 "
                                >
                                    <div
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                        {{
                                            asc: " 🔼",
                                            desc: " 🔽",
                                        }[
                                            header.column.getIsSorted() as string
                                        ] ?? null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {getRowModel().rows.map((row) => {
                        return (
                            <tr
                                key={row.id}
                                className="transition hover:bg-gray-100"
                            >
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td
                                            key={cell.id}
                                            className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="mt-2 flex items-center justify-end gap-4">
                <div className="flex gap-1">
                    <button
                        onClick={() => setPageIndex(0)}
                        disabled={!getCanPreviousPage()}
                        className="flex items-center justify-between gap-1 rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white disabled:bg-gray-200 hover:disabled:text-black"
                    >
                        {ChevronsLeftIcon}
                    </button>
                    <button
                        onClick={() => previousPage()}
                        disabled={!getCanPreviousPage()}
                        className="flex items-center justify-between gap-1 rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white disabled:bg-gray-200 hover:disabled:text-black"
                    >
                        {ChevronLeftIcon}
                    </button>
                    <button
                        onClick={() => nextPage()}
                        disabled={!getCanNextPage()}
                        className="flex items-center justify-between gap-1 rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white disabled:bg-gray-200 hover:disabled:text-black"
                    >
                        {ChevronRightIcon}
                    </button>
                    <button
                        onClick={() => setPageIndex(getPageCount() - 1)}
                        disabled={!getCanNextPage()}
                        className="flex items-center justify-between gap-1 rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white disabled:bg-gray-200 hover:disabled:text-black"
                    >
                        {ChevronsRightIcon}
                    </button>
                </div>
                <span>
                    Page
                    <strong>
                        {getState().pagination.pageIndex + 1} of{" "}
                        {getPageCount()}
                    </strong>
                </span>
                <span>
                    Go to page:
                    <input
                        type="number"
                        defaultValue={getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            setPageIndex(page);
                        }}
                        className="w-12 rounded border border-gray-200 p-1 text-gray-700"
                    />
                </span>
                <select
                    value={getState().pagination.pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                    className="rounded border border-gray-200 p-1 text-gray-700"
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
