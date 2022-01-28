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
                    <div>
                        <button type="button">edit</button>
                        <button type="button">show</button>
                        <button type="button">delete</button>
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
        <div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps(),
                                    )}
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
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div>
                <button
                    onClick={() => {
                        gotoPage(0);
                    }}
                    disabled={!canPreviousPage}
                >
                    {"<<"}
                </button>{" "}
                <button
                    onClick={() => {
                        previousPage();
                    }}
                    disabled={!canPreviousPage}
                >
                    {"<"}
                </button>{" "}
                <button
                    onClick={() => {
                        nextPage();
                    }}
                    disabled={!canNextPage}
                >
                    {">"}
                </button>{" "}
                <button
                    onClick={() => {
                        gotoPage(pageCount - 1);
                    }}
                    disabled={!canNextPage}
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
                    />
                </span>{" "}
                <select
                    value={pageSize}
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
