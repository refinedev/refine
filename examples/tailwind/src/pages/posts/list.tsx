/* eslint-disable react/jsx-key */
import React from "react";
import { useSelect, useOne, useImport } from "@pankod/refine-core";
import {
    useTable,
    Column,
    useFilters,
    useSortBy,
    usePagination,
} from "@pankod/refine-react-table";
import {
    DeleteButton,
    EditButton,
    List,
    ShowButton,
    CreateButton,
} from "@pankod/refine-antd";

import { IPost, ICategory } from "interfaces";
import { Space } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    const columns: Array<Column> = React.useMemo(
        () => [
            {
                id: "id",
                Header: "ID",
                accessor: "id",
            },
            {
                id: "title",
                Header: "Title",
                accessor: "title",
                filter: "contains",
            },
            {
                id: "category.id",
                Header: "Category",
                accessor: "category.id",
                Cell: ({ value }) => {
                    const { data } = useOne({
                        resource: "categories",
                        id: value,
                    });
                    return data?.data.title || "loading";
                },
                filter: "eq",
            },
            {
                id: "status",
                Header: "Status",
                accessor: "status",
            },
            {
                id: "actions",
                Header: "Actions",
                accessor: "id",
                //eslint-disable-next-line react/display-name
                Cell: ({ value }) => (
                    <div className="flex gap-2">
                        <EditButton
                            hideText
                            size="small"
                            recordItemId={value}
                        />
                        <ShowButton
                            hideText
                            size="small"
                            recordItemId={value}
                        />
                        <DeleteButton
                            hideText
                            size="small"
                            recordItemId={value}
                        />
                    </div>
                ),
            },
        ],
        [],
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setFilter,
        state: { pageIndex, pageSize, filters },
    } = useTable<IPost>({ columns }, useFilters, useSortBy, usePagination);

    const { options } = useSelect<ICategory>({
        resource: "categories",
    });

    const { handleChange } = useImport({
        mapData: (item) => {
            return {
                title: item.title,
                content: item.content,
                status: item.status,
                category: {
                    id: item.categoryId,
                },
                user: {
                    id: item.userId,
                },
            };
        },
        onProgress: ({ processedAmount, totalAmount }) => {
            console.log({ processedAmount, totalAmount });
        },
        batchSize: 1,
    });

    return (
        <List
            pageHeaderProps={{
                extra: (
                    <Space>
                        <input
                            type="file"
                            onChange={(event) => {
                                console.log({ event: event.target.files });
                                if (event.target.files) {
                                    handleChange({
                                        file: event.target.files[0],
                                    });
                                }
                            }}
                        />
                        <CreateButton />
                    </Space>
                ),
            }}
        >
            <div className="flex">
                <div className="w-1/4 pr-8">
                    <label
                        htmlFor="title"
                        className="mb-2 inline-block font-bold text-gray-700"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        value={
                            filters.find((filter) => filter.id === "title")
                                ?.value
                        }
                        onChange={(event) =>
                            setFilter("title", event.target.value)
                        }
                        className="w-full rounded border border-solid border-gray-300 bg-white px-3 py-1.5 text-gray-700 transition ease-in-out focus:border-green-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                    />
                    <label
                        htmlFor="Category"
                        className="my-2 inline-block font-bold text-gray-700"
                    >
                        Category
                    </label>
                    <select
                        id="category"
                        className="w-full appearance-none rounded border border-solid border-gray-300 bg-white px-3 py-1.5 text-gray-700 transition ease-in-out focus:border-green-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                        aria-label="Category select"
                        onChange={(event) => {
                            setFilter("category.id", event.target.value);
                        }}
                        value={
                            filters.find(
                                (filter) => filter.id === "category.id",
                            )?.value
                        }
                    >
                        <option value={[]}>All Categories</option>
                        {options?.map((category) => (
                            <option
                                key={category.value}
                                value={category.value || undefined}
                            >
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-3/4 overflow-x-auto">
                    <table {...getTableProps()}>
                        <thead className="border-b bg-white ">
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            {...column.getHeaderProps(
                                                column.getSortByToggleProps(),
                                            )}
                                            className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                                        >
                                            {column.render("Header")}
                                            <span>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? " 🔽"
                                                        : " 🔼"
                                                    : ""}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr
                                        {...row.getRowProps()}
                                        className="border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100"
                                    >
                                        {row.cells.map((cell) => {
                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900"
                                                >
                                                    {cell.render("Cell")}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="mt-4">
                        <button
                            onClick={() => {
                                gotoPage(0);
                            }}
                            disabled={!canPreviousPage}
                            className="rounded bg-transparent px-2.5 py-2.5 text-xs font-medium uppercase leading-tight text-blue-600 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-blue-700 focus:bg-gray-200 focus:outline-none focus:ring-0 active:bg-gray-300 disabled:cursor-default disabled:opacity-60"
                        >
                            {"<<"}
                        </button>{" "}
                        <button
                            onClick={() => {
                                previousPage();
                            }}
                            disabled={!canPreviousPage}
                            className="rounded bg-transparent px-2.5 py-2.5 text-xs font-medium uppercase leading-tight text-blue-600 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-blue-700 focus:bg-gray-200 focus:outline-none focus:ring-0 active:bg-gray-300 disabled:cursor-default disabled:opacity-60"
                        >
                            {"<"}
                        </button>{" "}
                        <button
                            onClick={() => {
                                nextPage();
                            }}
                            disabled={!canNextPage}
                            className="rounded bg-transparent px-2.5 py-2.5 text-xs font-medium uppercase leading-tight text-blue-600 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-blue-700 focus:bg-gray-200 focus:outline-none focus:ring-0 active:bg-gray-300 disabled:cursor-default disabled:opacity-60"
                        >
                            {">"}
                        </button>{" "}
                        <button
                            onClick={() => {
                                gotoPage(pageCount - 1);
                            }}
                            disabled={!canNextPage}
                            className="rounded bg-transparent px-2.5 py-2.5 text-xs font-medium uppercase leading-tight text-blue-600 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-blue-700 focus:bg-gray-200 focus:outline-none focus:ring-0 active:bg-gray-300 disabled:cursor-default disabled:opacity-60"
                        >
                            {">>"}
                        </button>{" "}
                        <span>
                            Page{" "}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{" "}
                        </span>
                        <span>
                            | Go to page:{" "}
                            <input
                                type="number"
                                defaultValue={pageIndex + 1}
                                onChange={(e) => {
                                    const page = e.target.value
                                        ? Number(e.target.value) - 1
                                        : 0;
                                    gotoPage(page);
                                }}
                                className="m-0 w-16 rounded border border-solid border-gray-300 bg-white bg-clip-padding px-2 py-1 text-sm font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                            />
                        </span>{" "}
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                            }}
                            className="m-0 rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-2 py-1 text-sm font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
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
        </List>
    );
};
