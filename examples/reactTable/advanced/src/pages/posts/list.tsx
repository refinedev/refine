/* eslint-disable react/jsx-key */
import React, { useState, useCallback } from "react";
import { useDeleteMany, useOne, useSelect } from "@pankod/refine-core";
import { useForm, Controller } from "@pankod/refine-react-hook-form";
import "react-mde/lib/styles/css/react-mde-all.css";

import {
    useTable,
    Column,
    usePagination,
    useExpanded,
    useRowSelect,
    useSortBy,
    useFilters,
} from "@pankod/refine-react-table";
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
    const [selectedTab, setSelectedTab] =
        useState<"write" | "preview">("write");

    const {
        refineCore: { onFinish, id, setId },
        register,
        handleSubmit,
        control,
    } = useForm<IPost>({
        refineCoreProps: {
            redirect: false,
            action: "edit",
        },
    });

    const { mutate } = useDeleteMany<IPost>();

    const deleteSelectedItems = (ids: string[]) => {
        mutate({
            resource: "posts",
            ids,
        });
    };

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
                Cell: ({ value, row }) => {
                    return (
                        <div>
                            <button
                                type="button"
                                onClick={() => {
                                    handleEditButtonClick(value);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                onClick={() => deleteSelectedItems([value])}
                            >
                                Delete
                            </button>
                        </div>
                    );
                },
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
        setFilter,
        state: { pageIndex, pageSize, filters },
        refineCore: {
            tableQueryResult: { data: tableData },
        },
    } = useTable<IPost>(
        {
            columns,
        },
        useFilters,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: "selection",
                    // eslint-disable-next-line react/display-name
                    Header: ({
                        getToggleAllPageRowsSelectedProps,
                        selectedFlatRows,
                    }) => (
                        <div>
                            <IndeterminateCheckbox
                                {...getToggleAllPageRowsSelectedProps()}
                            />

                            {selectedFlatRows.length > 0 && (
                                <button
                                    onClick={() =>
                                        deleteSelectedItems(
                                            selectedFlatRows.map(
                                                ({ original }: any) =>
                                                    original.id,
                                            ),
                                        )
                                    }
                                >
                                    Delete
                                </button>
                            )}
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

    const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];

    const { options } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: categoryIds,
    });
    const renderRowSubComponent = useCallback(
        ({ row }) => <ReactMarkdown>{row.original.content}</ReactMarkdown>,
        [],
    );

    const handleEditButtonClick = (editId: string) => {
        setId(editId);
    };

    const renderEditRow = useCallback(
        (row) => {
            const { id, title, content } = row.original;

            return (
                <>
                    <tr key={`edit-${id}-inputs`}>
                        <td>
                            <div>
                                <span {...row.getToggleRowExpandedProps()}>
                                    {row.isExpanded ? "👇" : "👉"}
                                </span>
                            </div>
                        </td>
                        <td>
                            <span>{id}</span>
                        </td>
                        <td>
                            <input
                                id="title"
                                type="text"
                                defaultValue={title}
                                {...register("title", {
                                    required: "Title is required",
                                })}
                            />
                        </td>
                        <td>
                            <select
                                id="category.id"
                                {...register("category.id", {
                                    required: "Category title is required",
                                })}
                            >
                                {options?.map((category) => (
                                    <option
                                        defaultValue={row.original.category.id}
                                        key={category.value}
                                        value={category.value}
                                    >
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </td>

                        <td>
                            <button type="submit">Save</button>
                            <button onClick={() => setId(undefined)}>
                                Cancel
                            </button>
                        </td>
                    </tr>
                    <tr key={`edit-${id}-mde`}>
                        <td colSpan={visibleColumns.length}>
                            <Controller
                                defaultValue={content}
                                control={control}
                                name="content"
                                rules={{ required: "Content is required" }}
                                render={({
                                    field: { onChange, ref, value },
                                }) => (
                                    <ReactMde
                                        ref={ref}
                                        value={value}
                                        onChange={onChange}
                                        selectedTab={selectedTab}
                                        onTabChange={setSelectedTab}
                                        generateMarkdownPreview={(markdown) =>
                                            Promise.resolve(
                                                <ReactMarkdown>
                                                    {markdown}
                                                </ReactMarkdown>,
                                            )
                                        }
                                    />
                                )}
                            />
                        </td>
                    </tr>
                </>
            );
        },
        [options, selectedTab],
    );

    return (
        <>
            <div>
                <label htmlFor="title">Title: </label>
                <input
                    id="title"
                    type="text"
                    value={
                        filters.find((filter) => filter.id === "title")?.value
                    }
                    onChange={(event) => setFilter("title", event.target.value)}
                />
                <label htmlFor="Category">Category</label>
                <select
                    id="category"
                    aria-label="Category select"
                    onChange={(event) => {
                        setFilter("category.id", event.target.value);
                    }}
                    value={
                        filters.find((filter) => filter.id === "category.id")
                            ?.value
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
            <form onSubmit={handleSubmit(onFinish)}>
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
                            if (id === (row.original as any).id) {
                                return renderEditRow(row);
                            } else
                                return (
                                    <React.Fragment key={row.getRowProps().key}>
                                        <tr>
                                            {row.cells.map((cell) => {
                                                return (
                                                    <td
                                                        {...cell.getCellProps()}
                                                    >
                                                        {cell.render("Cell")}
                                                    </td>
                                                );
                                            })}
                                        </tr>

                                        {row.isExpanded ? (
                                            <tr>
                                                <td
                                                    colSpan={
                                                        visibleColumns.length
                                                    }
                                                >
                                                    {renderRowSubComponent({
                                                        row,
                                                    })}
                                                </td>
                                            </tr>
                                        ) : null}
                                    </React.Fragment>
                                );
                        })}
                    </tbody>
                </table>

                <div className="pagination">
                    <button
                        type="button"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    >
                        {"<<"}
                    </button>{" "}
                    <button
                        type="button"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    >
                        {"<"}
                    </button>{" "}
                    <button
                        type="button"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    >
                        {">"}
                    </button>{" "}
                    <button
                        type="button"
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
            </form>
        </>
    );
};
