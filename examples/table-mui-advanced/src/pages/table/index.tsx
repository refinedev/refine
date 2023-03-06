import React, { useEffect, useCallback } from "react";
import {
    GetManyResponse,
    useDeleteMany,
    useMany,
    useSelect,
} from "@refinedev/core";
import { alpha } from "@mui/material/styles";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender, Row } from "@tanstack/react-table";
import { DeleteButton, EditButton, SaveButton, List } from "@refinedev/mui";

import {
    Button,
    TextField,
    Stack,
    Toolbar,
    Typography,
    MenuItem,
    Box,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Checkbox,
    CheckboxProps,
    TableBody,
    TableSortLabel,
    TablePagination,
} from "@mui/material";

import { useForm } from "@refinedev/react-hook-form";

import { Controller } from "react-hook-form";

import MDEditor from "@uiw/react-md-editor";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
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

    const deleteSelectedItems = (ids: number[]) => {
        mutate(
            {
                resource: "posts",
                ids,
            },
            {
                onSuccess: () => {
                    resetRowSelection();
                },
            },
        );
    };

    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
            {
                id: "selection",
                header: function render({ table }) {
                    return (
                        <IndeterminateCheckbox
                            {...{
                                checked: table.getIsAllRowsSelected(),
                                indeterminate: table.getIsSomeRowsSelected(),
                                onChange:
                                    table.getToggleAllRowsSelectedHandler(),
                            }}
                        />
                    );
                },
                cell: function render({ row }) {
                    return (
                        <Stack
                            direction="row"
                            alignItems="center"
                            flexWrap="nowrap"
                        >
                            <IndeterminateCheckbox
                                {...{
                                    checked: row.getIsSelected(),
                                    indeterminate: row.getIsSomeSelected(),
                                    onChange: row.getToggleSelectedHandler(),
                                }}
                            />
                            <span onClick={() => row.toggleExpanded()}>
                                {row.getIsExpanded() ? "👇" : "👉"}
                            </span>
                        </Stack>
                    );
                },
            },
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
                meta: {
                    filterOperator: "contains",
                },
            },
            {
                id: "category.id",
                header: "Category",
                accessorKey: "category.id",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        categoriesData: GetManyResponse<ICategory>;
                    };
                    const category = meta.categoriesData?.data.find(
                        (item) => item.id === getValue(),
                    );
                    return category?.title ?? "Loading...";
                },
                meta: {
                    filterOperator: "eq",
                },
            },
            {
                id: "actions",
                header: "Actions",
                accessorKey: "id",
                cell: function render({ getValue }) {
                    return (
                        <Stack direction="row">
                            <EditButton
                                onClick={() => {
                                    handleEditButtonClick(getValue() as number);
                                }}
                            >
                                Edit
                            </EditButton>
                            <DeleteButton recordItemId={getValue() as number}>
                                Delete
                            </DeleteButton>
                        </Stack>
                    );
                },
            },
        ],
        [],
    );

    function IndeterminateCheckbox({
        indeterminate,
        ...rest
    }: { indeterminate?: boolean } & Omit<CheckboxProps, "inputRef">) {
        const ref = React.useRef<HTMLInputElement>(null);

        useEffect(() => {
            if (typeof indeterminate === "boolean" && ref.current) {
                ref.current.indeterminate = !rest.checked && indeterminate;
            }
        }, [ref, indeterminate]);

        return <Checkbox {...rest} inputRef={ref} />;
    }

    const {
        options: {
            state: { pagination, rowSelection },
            pageCount,
        },
        setOptions,
        getColumn,
        getAllColumns,
        getHeaderGroups,
        getRowModel,
        setPageIndex,
        setPageSize,
        getSelectedRowModel,
        resetRowSelection,
        refineCore: {
            tableQueryResult: { data: tableData },
        },
    } = useTable<IPost>({
        columns,
        getRowId: (originalRow) => originalRow.id.toString(),
    });

    const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];
    const { data: categoriesData } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
            categoriesData,
        },
    }));

    const { options } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: categoryIds,
    });

    const renderRowSubComponent = useCallback(
        ({ row }: { row: Row<IPost> }) => (
            <div data-color-mode="light" style={{ padding: "16px" }}>
                <MDEditor.Markdown
                    source={row.original.content}
                    style={{ whiteSpace: "pre-wrap" }}
                />
            </div>
        ),
        [],
    );

    const handleEditButtonClick = (editId: number) => {
        setId(editId);
    };

    const renderEditRow = useCallback(
        (row: Row<IPost>) => {
            const { id, title, content } = row.original;

            return (
                <>
                    <TableRow key={`edit-${id}-inputs`}>
                        <TableCell>
                            <span>{row.getIsExpanded() ? "👇" : "👉"}</span>
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
                        <td colSpan={getAllColumns().length}>
                            <Controller
                                defaultValue={content}
                                control={control}
                                name="content"
                                rules={{ required: "Content is required" }}
                                render={({ field: { onChange, value } }) => (
                                    <MDEditor
                                        value={value}
                                        onChange={onChange}
                                        data-color-mode="light"
                                    />
                                )}
                            />
                        </td>
                    </TableRow>
                </>
            );
        },
        [options],
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
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected > 0
                        ? `${numSelected} selected`
                        : "Not selected any row"}
                </Typography>
                {numSelected > 0 && <DeleteButton onClick={() => onDelete()} />}
            </Toolbar>
        );
    };

    const titleColumn = getColumn("title");
    const categoryColumn = getColumn("category.id");

    return (
        <List
            title="React Table Usage"
            breadcrumb={false}
            headerButtons={
                <Stack direction="row" spacing={2}>
                    <TextField
                        label="Search by title"
                        id="title"
                        type="search"
                        value={(titleColumn?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            titleColumn?.setFilterValue(event.target.value)
                        }
                    />

                    <TextField
                        select
                        id="category"
                        label="Category Select"
                        defaultValue={"0"}
                        onChange={(event) => {
                            categoryColumn?.setFilterValue(
                                event.target.value === "0"
                                    ? undefined
                                    : event.target.value.toString(),
                            );
                        }}
                        sx={{ minWidth: 200 }}
                    >
                        <MenuItem key="All Categories" value={"0"}>
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
            }
        >
            <form onSubmit={handleSubmit(onFinish)}>
                <EnhancedTableToolbar
                    numSelected={Object.keys(rowSelection ?? {}).length}
                    onDelete={() => {
                        deleteSelectedItems(
                            getSelectedRowModel().flatRows.map(
                                (row) => row.original.id,
                            ),
                        );
                    }}
                />
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            {getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableCell
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                            {header.column.id !==
                                            "selection" ? (
                                                <TableSortLabel
                                                    active={
                                                        header.column.getIsSorted() !==
                                                        false
                                                    }
                                                    direction={
                                                        header.column.getIsSorted() ===
                                                        false
                                                            ? undefined
                                                            : (header.column.getIsSorted() as
                                                                  | "asc"
                                                                  | "desc")
                                                    }
                                                />
                                            ) : null}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody>
                            {getRowModel().rows.map((row) => {
                                if (id === row.original.id) {
                                    return renderEditRow(row);
                                } else
                                    return (
                                        <React.Fragment key={row.id}>
                                            <TableRow>
                                                {row
                                                    .getAllCells()
                                                    .map((cell) => {
                                                        return (
                                                            <TableCell
                                                                key={cell.id}
                                                            >
                                                                {flexRender(
                                                                    cell.column
                                                                        .columnDef
                                                                        .cell,
                                                                    cell.getContext(),
                                                                )}
                                                            </TableCell>
                                                        );
                                                    })}
                                            </TableRow>

                                            {row.getIsExpanded() ? (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={
                                                            row.getVisibleCells()
                                                                .length
                                                        }
                                                    >
                                                        {renderRowSubComponent({
                                                            row,
                                                        })}
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
                        {
                            label: "All",
                            value: tableData?.total ?? 100,
                        },
                    ]}
                    showFirstButton
                    showLastButton
                    count={pageCount || 0}
                    rowsPerPage={pagination?.pageSize || 10}
                    page={pagination?.pageIndex || 0}
                    onPageChange={(_, newPage: number) => setPageIndex(newPage)}
                    onRowsPerPageChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                    ) => {
                        setPageSize(parseInt(event.target.value, 10));
                        setPageIndex(0);
                    }}
                />
            </form>
        </List>
    );
};
