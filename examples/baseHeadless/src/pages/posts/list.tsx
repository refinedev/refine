/* eslint-disable react/jsx-key */
import React from "react";
import {
    useTable,
    Column,
    usePagination,
    useSortBy,
    useFilters,
} from "@pankod/refine-react-table";
import { useNavigation } from "@pankod/refine-core";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { edit, create } = useNavigation();

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
                id: "status",
                Header: "Status",
                accessor: "status",
            },
            {
                id: "createdAt",
                Header: "CreatedAt",
                accessor: "createdAt",
            },
            {
                id: "action",
                Header: "Action",
                accessor: "id",
                // eslint-disable-next-line react/display-name
                Cell: ({ value }) => (
                    <button onClick={() => edit("posts", value)}>Edit</button>
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

    return (
        <>
            <div>
                <button onClick={() => create("posts")}>Create Post</button>
                <br />
                <br />
                <label htmlFor="title">Title: </label>
                <input
                    id="title"
                    type="text"
                    value={
                        filters.find((filter) => filter.id === "title")?.value
                    }
                    onChange={(event) => setFilter("title", event.target.value)}
                />
            </div>
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
                    {page.map((row, i) => {
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

            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {"<<"}
                </button>
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    {"<"}
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {">"}
                </button>
                <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                >
                    {">>"}
                </button>
                <span>
                    Page
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
                <span>
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            gotoPage(page);
                        }}
                        style={{ width: "100px" }}
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
        </>
    );
};
