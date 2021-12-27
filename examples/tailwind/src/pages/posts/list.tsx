/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import {
    List,
    useTable as useTableCore,
    useMany,
    ShowButton,
    EditButton,
    CrudOperators,
} from "@pankod/refine-core";
import {
    useTable,
    usePagination,
    useSortBy,
    Column,
    useFilters,
    FilterProps,
} from "react-table";

import { IPost, ICategory } from "interfaces";

const TextInput: React.FC<FilterProps<{}>> = ({
    column: { filterValue, preFilteredRows, setFilter },
}) => {
    return (
        <input
            value={filterValue || ""}
            onChange={(event) => setFilter(event.target.value || undefined)}
            id="title"
            type="text"
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
        />
    );
};

export const PostList: React.FC = () => {
    const {
        tableQueryResult,
        current,
        setCurrent,
        pageSize: pageSizeCore,
        setPageSize: setPageSizeCore,
        sorter,
        setSorter,
        filters: filtersCore,
        setFilters,
    } = useTableCore<IPost>({
        syncWithLocation: true,
    });

    const { data } = tableQueryResult;

    const categoryIds = data?.data.map((item) => item.category.id) ?? [];
    const { data: categoryData } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const columns: Array<Column> = React.useMemo(
        () => [
            {
                id: "id",
                Header: "ID",
                accessor: "id",
                Filter: TextInput,
            },
            {
                id: "title",
                Header: "Title",
                accessor: "title",
                Filter: TextInput,
                filter: "contains",
            },
            {
                id: "categoryId",
                Header: "Category",
                accessor: "category.id",
                Cell: ({ value }) =>
                    categoryData?.data.find((category) => category.id === value)
                        ?.title || "loading",
                Filter: TextInput,
            },
            {
                id: "status",
                Header: "Status",
                accessor: "status",
                Filter: TextInput,
            },
            {
                id: "actions",
                Header: "Actions",
                accessor: "id",
                // eslint-disable-next-line react/display-name
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
                Filter: TextInput,
            },
        ],
        [categoryData],
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
        columns: columnsTable,
        state: { pageIndex, pageSize, sortBy, filters },
    } = useTable(
        {
            columns,
            data: tableQueryResult.data?.data || [],
            initialState: {
                pageIndex: current - 1,
                pageSize: pageSizeCore,
                sortBy: sorter.map((sorting) => ({
                    id: sorting.field,
                    desc: sorting.order === "desc",
                })),
                filters: filtersCore.map((filter) => ({
                    id: filter.field,
                    value: filter.value,
                })),
            },
            pageCount: Math.ceil((data?.total || 0) / pageSizeCore),
            manualPagination: true,
            manualSortBy: true,
            manualFilters: true,
        },
        useFilters,
        useSortBy,
        usePagination,
    );

    useEffect(() => {
        setSorter(
            sortBy.map((sorting) => ({
                field: sorting.id,
                order: sorting.desc ? "desc" : "asc",
            })),
        );
    }, [sortBy]);

    useEffect(() => {
        // console.log({ filters });
        setFilters(
            filters.map((filter) => {
                const operator = columns.find((c) => c.id === filter.id)
                    ?.filter as CrudOperators;

                console.log({ operator, filter });
                return {
                    field: filter.id,
                    value: filter.value,
                    operator,
                };
            }),
        );
    }, [filters]);

    return (
        <List>
            <table {...getTableProps()} className="overflow-x-auto">
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
                                    <div>
                                        {column.canFilter
                                            ? column.render("Filter")
                                            : null}
                                    </div>
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
                        setCurrent(1);
                    }}
                    disabled={!canPreviousPage}
                    className="px-2.5 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-0 active:bg-gray-300 transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-default"
                >
                    {"<<"}
                </button>{" "}
                <button
                    onClick={() => {
                        previousPage();
                        setCurrent((prev) => prev - 1);
                    }}
                    disabled={!canPreviousPage}
                    className="px-2.5 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-0 active:bg-gray-300 transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-default"
                >
                    {"<"}
                </button>{" "}
                <button
                    onClick={() => {
                        nextPage();
                        setCurrent((prev) => prev + 1);
                    }}
                    disabled={!canNextPage}
                    className="px-2.5 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-0 active:bg-gray-300 transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-default"
                >
                    {">"}
                </button>{" "}
                <button
                    onClick={() => {
                        gotoPage(pageCount - 1);
                        setCurrent(pageCount);
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
                            setCurrent(page);
                        }}
                        className="w-16 px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                </span>{" "}
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPageSizeCore(Number(e.target.value));
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

            {/* <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="Category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    data?.data.find((item) => item.id === value)
                                        ?.title
                                }
                            />
                        );
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...categorySelectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    dataIndex="status"
                    title="Status"
                    render={(value: string) => <TagField value={value} />}
                    filterDropdown={(props: any) => (
                        <FilterDropdown {...props}>
                            <Radio.Group>
                                <Radio value="published">Published</Radio>
                                <Radio value="draft">Draft</Radio>
                                <Radio value="rejected">Rejected</Radio>
                            </Radio.Group>
                        </FilterDropdown>
                    )}
                />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table> */}
        </List>
    );
};
