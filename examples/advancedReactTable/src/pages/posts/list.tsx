/* eslint-disable react/jsx-key */
import React, { useState, useCallback } from "react";
import { useDeleteMany, useOne, useSelect } from "@pankod/refine-core";
import { useForm, Controller } from "@pankod/refine-react-hook-form";
import {
    useTable,
    Column,
    usePagination,
    useExpanded,
    useRowSelect,
} from "@pankod/refine-react-table";
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>(
        [],
    );
    const [selectedTab, setSelectedTab] =
        useState<"write" | "preview">("write");

    const {
        useFormCore: { onFinish, id, setId },
        register,
        handleSubmit,
        reset,
        control,
    } = useForm<IPost>({
        useFormCoreProps: {
            redirect: false,
            action: "edit",
        },
    });

    const { options } = useSelect<ICategory>({
        resource: "categories",
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
                Cell: ({ value }) => {
                    return (
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEditButtonClick(value)}
                            >
                                Edit
                            </button>
                            <button
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

    const renderRowSubComponent = useCallback(
        ({ row }) => <ReactMarkdown>{row.original.content}</ReactMarkdown>,
        [],
    );

    const handleEditButtonClick = (editId: string) => {
        setId(editId);
        reset();
    };

    const editRow = useCallback(
        (row) => {
            const { id, title, content } = row.original;

            return (
                <>
                    <tr>
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
                                {options?.map((category) => {
                                    console.log("category", category);

                                    return (
                                        <option
                                            defaultValue={
                                                row.original.category.id
                                            }
                                            key={category.value}
                                            value={category.value}
                                        >
                                            {category.label}
                                        </option>
                                    );
                                })}
                            </select>
                        </td>

                        <td>
                            <button type="submit">Save</button>
                            <button onClick={() => setId(undefined)}>
                                Cancel
                            </button>
                        </td>
                    </tr>
                    {row.isExpanded && (
                        <tr>
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
                                            generateMarkdownPreview={(
                                                markdown,
                                            ) =>
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
                    )}
                </>
            );
        },
        [options],
    );

    return (
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
                        if (id === (row.original as any).id) {
                            return editRow(row);
                        } else
                            return (
                                <React.Fragment key={row.getRowProps().key}>
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
        </form>
    );
};
