import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { ICategory, IPost } from "../../interfaces/post";
import {
    useNavigation,
    useDelete,
    GetManyResponse,
    useMany,
} from "@refinedev/core";

export const PostList: React.FC = () => {
    const { show, edit, create } = useNavigation();
    const { mutate } = useDelete();

    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
            },
            {
                id: "Name",
                header: "Name",
                accessorKey: "Name",
            },
            {
                id: "category",
                header: "Category",
                accessorKey: "category",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        categoriesData: GetManyResponse<ICategory>;
                    };
                    const singleValue: string[] | any = getValue();
                    const category = meta.categoriesData?.data?.find(
                        (item) => item.id === singleValue[0],
                    );
                    return category?.name ?? "Loading...";
                },
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "Status",
            },
            {
                id: "action",
                header: "Action",
                accessorKey: "id",
                cell: function render({ getValue }) {
                    return (
                        <>
                            <button
                                className="rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white"
                                onClick={() =>
                                    show("posts", getValue() as number)
                                }
                            >
                                View
                            </button>

                            <button
                                className="rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white"
                                onClick={() =>
                                    edit("posts", getValue() as number)
                                }
                            >
                                Edit
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
                                Delete
                            </button>
                        </>
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
    } = useTable<IPost>({ columns });

    const categoryIds = tableData?.data?.map((item) => item.category[0]) ?? [];

    const { data: categoriesData } = useMany<ICategory>({
        resource: "category",
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

    return (
        <div className="mx-auto pb-4">
            <div className="mb-3 mt-1 flex items-center justify-end">
                <button
                    className="flex items-center justify-between gap-1 rounded border border-gray-200 bg-indigo-500 p-2 text-xs font-medium leading-tight text-white transition duration-150 ease-in-out hover:bg-indigo-600"
                    onClick={() => create("posts")}
                >
                    <span>Create Post</span>
                </button>
            </div>

            <table className="min-w-full table-fixed divide-y divide-gray-200 border">
                <thead className="bg-gray-100">
                    {getHeaderGroups().map((headerGroup, idx) => (
                        <tr key={idx}>
                            {headerGroup.headers.map((header, idx) => (
                                <th
                                    key={idx}
                                    colSpan={header.colSpan}
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 "
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {getRowModel().rows.map((row, idx) => {
                        return (
                            <tr
                                key={idx}
                                className="transition hover:bg-gray-100"
                            >
                                {row.getVisibleCells().map((cell, idx) => {
                                    return (
                                        <td
                                            key={idx}
                                            className="whitespace-nowrap px-6 py-2 text-sm font-medium text-gray-900"
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

            <div className="mx-auto mt-12 flex items-center justify-between">
                <div className="mx-auto flex items-center justify-between md:w-7/12">
                    <button
                        className="rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white"
                        onClick={() => setPageIndex(0)}
                        disabled={!getCanPreviousPage()}
                    >
                        {"<<"}
                    </button>
                    <button
                        className="rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white"
                        onClick={() => previousPage()}
                        disabled={!getCanPreviousPage()}
                    >
                        {"<"}
                    </button>
                    <button
                        className="rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white"
                        onClick={() => nextPage()}
                        disabled={!getCanNextPage()}
                    >
                        {">"}
                    </button>
                    <button
                        className="rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white"
                        onClick={() => setPageIndex(getPageCount() - 1)}
                        disabled={!getCanNextPage()}
                    >
                        {">>"}
                    </button>
                    <div className="w-[40%] px-5">
                        Page
                        <strong>
                            &nbsp; {getState().pagination.pageIndex + 1} of{" "}
                            {getPageCount()}
                        </strong>
                    </div>
                    <div className="px-5">
                        Go to page:
                        <input
                            className="block rounded-[8px] border p-2"
                            type="number"
                            defaultValue={getState().pagination.pageIndex + 1}
                            onChange={(e) => {
                                const page = e.target.value
                                    ? Number(e.target.value) - 1
                                    : 0;
                                setPageIndex(page);
                            }}
                        />
                    </div>{" "}
                    <select
                        className="w-[50%] border px-5"
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
        </div>
    );
};
