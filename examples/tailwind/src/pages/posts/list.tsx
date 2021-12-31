/* eslint-disable react/jsx-key */
import React from "react";
import {
    List,
    ShowButton,
    EditButton,
    useSelect,
    useOne,
} from "@pankod/refine-core";
import {
    useTable,
    Column,
    useFilters,
    useSortBy,
    usePagination,
} from "@pankod/refine-react-table";

import { IPost, ICategory } from "interfaces";

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
                filter: "in",
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

    return (
        <List>
            <div className="flex">
                <div className="w-1/4 pr-8">
                    <label
                        htmlFor="title"
                        className="inline-block mb-2 text-gray-700 font-bold"
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
                        className="w-full px-3 py-1.5 text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                    />
                    <label
                        htmlFor="Category"
                        className="inline-block my-2 text-gray-700 font-bold"
                    >
                        Category
                    </label>
                    <select
                        id="category"
                        className="appearance-none w-full px-3 py-1.5 text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                        aria-label="Category select"
                        onChange={(event) =>
                            setFilter("category.id", event.target.value)
                        }
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
                        <thead className="bg-white border-b ">
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            {...column.getHeaderProps(
                                                column.getSortByToggleProps(),
                                            )}
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
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
                                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                    >
                                        {row.cells.map((cell) => {
                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
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
                            className="px-2.5 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-0 active:bg-gray-300 transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-default"
                        >
                            {"<<"}
                        </button>{" "}
                        <button
                            onClick={() => {
                                previousPage();
                            }}
                            disabled={!canPreviousPage}
                            className="px-2.5 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-0 active:bg-gray-300 transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-default"
                        >
                            {"<"}
                        </button>{" "}
                        <button
                            onClick={() => {
                                nextPage();
                            }}
                            disabled={!canNextPage}
                            className="px-2.5 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-0 active:bg-gray-300 transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-default"
                        >
                            {">"}
                        </button>{" "}
                        <button
                            onClick={() => {
                                gotoPage(pageCount - 1);
                            }}
                            disabled={!canNextPage}
                            className="px-2.5 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-0 active:bg-gray-300 transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-default"
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
                                className="w-16 px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            />
                        </span>{" "}
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                            }}
                            className="px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
