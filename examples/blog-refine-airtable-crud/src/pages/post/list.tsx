import React from "react";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import { IPost } from "../../interfaces/post";
import { useNavigation, useDelete } from "@pankod/refine-core";

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
                id: "title",
                header: "Title",
                accessorKey: "title",
            },
            {
                id: "content",
                header: "Content",
                accessorKey: "content",
            },
            {
                id: "category",
                header: "Category",
                accessorKey: "category",
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "Status",
            },
            {
                id: "createdAt",
                header: "CreatedAt",
                accessorKey: "createdAt",
            },
            {
                id: "action",
                header: "Action",
                accessorKey: "id",
                cell: function render({ getValue }) {
                    return (
                        <button
                            className="rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white"
                            onClick={() => show("posts", getValue() as number)}
                        >
                            View
                        </button>
                    );
                },
            },
            {
                id: "action",
                header: "Action",
                accessorKey: "id",
                cell: function render({ getValue }) {
                    return (
                        <button
                            className="rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white"
                            onClick={() => edit("posts", getValue() as number)}
                        >
                            Edit
                        </button>
                    );
                },
            },

            {
                id: "action",
                header: "Action",
                accessorKey: "id",
                cell: function render({ getValue }) {
                    return (
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
                    );
                },
            },
        ],
        [],
    );

    const { getHeaderGroups, getRowModel } = useTable<IPost>({
        columns,
    });

    return (
        <div className="container mx-auto pb-4">
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
                    {getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 "
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
        </div>
    );
};
