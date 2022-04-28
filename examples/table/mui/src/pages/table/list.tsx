/* eslint-disable react/jsx-key */
import React, { useState, useCallback } from "react";
import { useDeleteMany, useOne, useSelect } from "@pankod/refine-core";
import { alpha } from "@mui/material/styles";
import {
    DeleteButton,
    EditButton,
    SaveButton,
    Button,
    TextField,
    Stack,
    Toolbar,
    Typography,
    MenuItem,
    Tooltip,
    Box,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Checkbox,
    Paper,
    TableBody,
    TableSortLabel,
    TablePagination,
} from "@pankod/refine-mui";

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
            resource: "posts",
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
                Cell: ({ value }: any) => {
                    return (
                        <Stack direction="row">
                            <EditButton
                                onClick={() => {
                                    handleEditButtonClick(value);
                                }}
                            >
                                Edit
                            </EditButton>
                            <DeleteButton
                                onClick={() => deleteSelectedItems([value])}
                            >
                                Delete
                            </DeleteButton>
                        </Stack>
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

            return <Checkbox type="checkbox" ref={ref} {...rest} />;
        },
    );

    const {
        page,
        headerGroups,
        pageOptions,
        pageCount,
        visibleColumns,
        getTableProps,
        getTableBodyProps,
        prepareRow,
        gotoPage,
        setPageSize,
        setFilter,
        state: { pageIndex, pageSize, filters, selectedRowIds },
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
        (hooks: { visibleColumns: any }) => {
            hooks.visibleColumns.push((columns: any) => [
                {
                    id: "selection",
                    // eslint-disable-next-line react/display-name
                    Header: ({ getToggleAllPageRowsSelectedProps }: any) => (
                        <>
                            <IndeterminateCheckbox
                                {...getToggleAllPageRowsSelectedProps()}
                            />
                        </>
                    ),
                    // eslint-disable-next-line react/display-name
                    Cell: ({ row }: any) => (
                        <>
                            <IndeterminateCheckbox
                                {...row.getToggleRowSelectedProps()}
                            />
                            <span {...row.getToggleRowExpandedProps()}>
                                {row.isExpanded ? "👇" : "👉"}
                            </span>
                        </>
                    ),
                },
                ...columns,
            ]);
        },
    );

    const categoryIds =
        tableData?.data?.map(
            (item: { category: { id: any } }) => item.category.id,
        ) ?? [];

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
                    <TableRow key={`edit-${id}-inputs`}>
                        <TableCell>
                            <span {...row.getToggleRowExpandedProps()}>
                                {row.isExpanded ? "👇" : "👉"}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span>{id}</span>
                        </TableCell>
                        <TableCell>
                            <TextField
                                fullWidth
                                id="title"
                                type="text"
                                defaultValue={title}
                                {...register("title", {
                                    required: "Title is required",
                                })}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                select
                                id="category.id"
                                defaultValue={row.original.category.id}
                                {...register("category.id", {
                                    required: "Category title is required",
                                })}
                            >
                                {options?.map((category) => (
                                    <MenuItem
                                        defaultValue={row.original.category.id}
                                        key={category.value}
                                        value={category.value}
                                    >
                                        {category.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </TableCell>

                        <TableCell>
                            <SaveButton type="submit">Save</SaveButton>
                            <Button onClick={() => setId(undefined)}>
                                Cancel
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow key={`edit-${id}-mde`}>
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
                    </TableRow>
                </>
            );
        },
        [options, selectedTab],
    );

    const EnhancedTableToolbar = (props: {
        numSelected: number;
        onDelete: () => void;
    }) => {
        const { numSelected, onDelete } = props;

        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(
                                theme.palette.primary.main,
                                theme.palette.action.activatedOpacity,
                            ),
                    }),
                }}
            >
                {numSelected > 0 && (
                    <Typography
                        sx={{ flex: "1 1 100%" }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                )}
                {numSelected > 0 && (
                    <Tooltip title="Delete">
                        <DeleteButton onClick={() => onDelete()} />
                    </Tooltip>
                )}
            </Toolbar>
        );
    };

    return (
        <>
            <Box sx={{ width: "100%" }}>
                <form onSubmit={handleSubmit(onFinish)}>
                    <Paper sx={{ width: "100%", mb: 2 }}>
                        <Box p={1}>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    label="Search by title"
                                    id="title"
                                    type="search"
                                    value={
                                        filters.find(
                                            (filter: { id: string }) =>
                                                filter.id === "title",
                                        )?.value
                                    }
                                    onChange={(event) =>
                                        setFilter("title", event.target.value)
                                    }
                                />

                                <TextField
                                    select
                                    id="category"
                                    label="Category Select"
                                    defaultValue={0}
                                    onChange={(event) => {
                                        setFilter(
                                            "category.id",
                                            event.target.value,
                                        );
                                    }}
                                    sx={{ minWidth: 200 }}
                                >
                                    <MenuItem key="All Categories" value={0}>
                                        All Categories
                                    </MenuItem>
                                    {options?.map((category) => (
                                        <MenuItem
                                            key={category.value}
                                            value={category.value}
                                        >
                                            {category.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>
                        </Box>
                        <EnhancedTableToolbar
                            numSelected={Object.keys(selectedRowIds).length}
                            onDelete={() =>
                                deleteSelectedItems(Object.keys(selectedRowIds))
                            }
                        />
                        <TableContainer>
                            <Table {...getTableProps()} size="small">
                                <TableHead>
                                    {headerGroups.map(
                                        (headerGroup: {
                                            getHeaderGroupProps: () => any;
                                            headers: any[];
                                        }) => (
                                            <TableRow
                                                {...headerGroup.getHeaderGroupProps()}
                                            >
                                                {headerGroup.headers.map(
                                                    (column) => (
                                                        <TableCell
                                                            {...(column.id ===
                                                            "selection"
                                                                ? column.getHeaderProps()
                                                                : column.getHeaderProps(
                                                                      column.getSortByToggleProps(),
                                                                  ))}
                                                        >
                                                            {column.render(
                                                                "Header",
                                                            )}
                                                            {column.id !==
                                                            "selection" ? (
                                                                <TableSortLabel
                                                                    active={
                                                                        column.isSorted
                                                                    }
                                                                    direction={
                                                                        column.isSortedDesc
                                                                            ? "desc"
                                                                            : "asc"
                                                                    }
                                                                />
                                                            ) : null}
                                                        </TableCell>
                                                    ),
                                                )}
                                            </TableRow>
                                        ),
                                    )}
                                </TableHead>
                                <TableBody {...getTableBodyProps()}>
                                    {page.map((row: any) => {
                                        prepareRow(row);
                                        if (id === (row.original as any).id) {
                                            return renderEditRow(row);
                                        } else
                                            return (
                                                <React.Fragment
                                                    key={row.getRowProps().key}
                                                >
                                                    <TableRow>
                                                        {row.cells.map(
                                                            (cell: {
                                                                getCellProps: () => any;
                                                                render: (
                                                                    arg0: string,
                                                                ) =>
                                                                    | boolean
                                                                    | React.ReactChild
                                                                    | React.ReactFragment
                                                                    | React.ReactPortal
                                                                    | null
                                                                    | undefined;
                                                            }) => {
                                                                return (
                                                                    <TableCell
                                                                        {...cell.getCellProps()}
                                                                    >
                                                                        {cell.render(
                                                                            "Cell",
                                                                        )}
                                                                    </TableCell>
                                                                );
                                                            },
                                                        )}
                                                    </TableRow>

                                                    {row.isExpanded ? (
                                                        <TableRow>
                                                            <TableCell
                                                                colSpan={
                                                                    visibleColumns.length
                                                                }
                                                            >
                                                                {renderRowSubComponent(
                                                                    {
                                                                        row,
                                                                    },
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ) : null}
                                                </React.Fragment>
                                            );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            component="div"
                            rowsPerPageOptions={[
                                5,
                                10,
                                25,
                                { label: "All", value: pageOptions.length },
                            ]}
                            showFirstButton
                            showLastButton
                            count={pageCount}
                            rowsPerPage={pageSize}
                            page={pageIndex}
                            onPageChange={(event: unknown, newPage: number) =>
                                gotoPage(newPage)
                            }
                            onRowsPerPageChange={(
                                event: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                                setPageSize(parseInt(event.target.value, 10));
                                gotoPage(0);
                            }}
                        />
                    </Paper>
                </form>
            </Box>
        </>
    );
};
