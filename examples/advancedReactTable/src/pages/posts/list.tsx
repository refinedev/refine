/* eslint-disable react/jsx-key */
import React from "react";
import { useOne } from "@pankod/refine-core";
import {} from "@pankod/refine-react-hook-form";
import {
    useTable,
    Column,
    usePagination,
    useExpanded,
    useRowSelect,
} from "@pankod/refine-react-table";
import ReactMarkdown from "react-markdown";

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
                    const { data } = useOne<ICategory>({
                        resource: "categories",
                        id: value,
                    });
                    return data?.data.title || "loading";
                },
                filter: "eq",
            },
            {
                id: "actions",
                Header: "Actions",
                accessor: "id",
                //eslint-disable-next-line react/display-name
                Cell: () => (
                    <div className="flex gap-2">
                        <button>Edit</button>
                        <button>Show</button>
                        <button>Delete</button>
                    </div>
                ),
            },
        ],
        [],
    );

    // eslint-disable-next-line react/display-name
    const IndeterminateCheckbox = React.forwardRef<HTMLInputElement, any>(
        ({ indeterminate, ...rest }, ref) => {
            const defaultRef = React.useRef();
            const resolvedRef: any = ref || defaultRef;

            React.useEffect(() => {
                if (resolvedRef.current) {
                    resolvedRef.current.indeterminate = indeterminate;
                }
            }, [resolvedRef, indeterminate]);

            return <input type="checkbox" ref={ref} {...rest} />;
        },
    );

    const {
        page,
        headerGroups,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        visibleColumns,
        getTableProps,
        getTableBodyProps,
        prepareRow,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable<IPost>(
        { columns },
        useExpanded,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: "selection",
                    // eslint-disable-next-line react/display-name
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox
                                {...getToggleAllPageRowsSelectedProps()}
                            />
                        </div>
                    ),
                    // eslint-disable-next-line react/display-name
                    Cell: ({ row }: any) => (
                        <div>
                            <IndeterminateCheckbox
                                {...row.getToggleRowSelectedProps()}
                            />
                            <span {...row.getToggleRowExpandedProps()}>
                                {row.isExpanded ? "👇" : "👉"}
                            </span>
                        </div>
                    ),
                },
                ...columns,
            ]);
        },
    );

    const renderRowSubComponent = React.useCallback(
        ({ row }) => <ReactMarkdown>{row.original.content}</ReactMarkdown>,
        [],
    );

    return (
        <div>
            <table
                {...getTableProps()}
                style={{
                    border: "1px solid black",
                }}
            >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
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
                            <React.Fragment {...row.getRowProps()}>
                                <tr>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                </tr>

                                {row.isExpanded ? (
                                    <tr>
                                        <td colSpan={visibleColumns.length}>
                                            {renderRowSubComponent({ row })}
                                        </td>
                                    </tr>
                                ) : null}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {"<<"}
                </button>{" "}
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    {"<"}
                </button>{" "}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {">"}
                </button>{" "}
                <button
                    onClick={() => gotoPage(pageCount - 1)}
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
        </div>
    );
};
