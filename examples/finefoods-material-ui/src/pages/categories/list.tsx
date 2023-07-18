import React, { useCallback } from "react";
import {
    HttpError,
    IResourceComponentsProps,
    useTranslate,
} from "@refinedev/core";
import {
    BooleanField,
    DateField,
    EditButton,
    List,
    NumberField,
    SaveButton,
    useDataGrid,
} from "@refinedev/mui";
import { useForm, useModalForm } from "@refinedev/react-hook-form";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender, Row } from "@tanstack/react-table";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import Edit from "@mui/icons-material/Edit";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";

import { EditProduct } from "../../components";
import { ICategory, IProduct, Nullable } from "../../interfaces";

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
    const {
        refineCore: { onFinish, id, setId },
        register,
        handleSubmit,
    } = useForm<ICategory>({
        refineCoreProps: {
            redirect: false,
            action: "edit",
        },
    });

    const t = useTranslate();

    const columns = React.useMemo<ColumnDef<ICategory>[]>(
        () => [
            {
                id: "title",
                accessorKey: "title",
                header: t("categories.fields.title"),
                cell: function render({ row, getValue }) {
                    return (
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <IconButton onClick={() => row.toggleExpanded()}>
                                {row.getIsExpanded() ? (
                                    <RemoveCircleOutline fontSize="small" />
                                ) : (
                                    <AddCircleOutline fontSize="small" />
                                )}
                            </IconButton>
                            <Typography>{getValue() as string}</Typography>
                        </Stack>
                    );
                },
            },
            {
                id: "isActive",
                header: t("categories.fields.isActive"),
                accessorKey: "isActive",
                cell: function render({ getValue }) {
                    return <BooleanField value={getValue()} />;
                },
            },
            {
                id: "actions",
                header: t("table.actions"),
                accessorKey: "id",
                cell: function render({ getValue }) {
                    return (
                        <Stack direction="row">
                            {id ? (
                                <>
                                    <EditButton
                                        onClick={() => {
                                            handleEditButtonClick(
                                                getValue() as string,
                                            );
                                        }}
                                    >
                                        Edit
                                    </EditButton>
                                    <div>Cancel</div>
                                </>
                            ) : (
                                <IconButton
                                    onClick={() => {
                                        setId(getValue() as string);
                                    }}
                                >
                                    <Edit fontSize="small" />
                                </IconButton>
                            )}
                        </Stack>
                    );
                },
            },
        ],
        [t],
    );

    const {
        options: {
            state: { pagination },
            pageCount,
        },
        getHeaderGroups,
        getRowModel,
        setPageIndex,
        setPageSize,
        refineCore: { tableQueryResult },
    } = useTable<ICategory>({
        columns,
        initialState: {
            sorting: [{ id: "title", desc: false }],
        },
    });

    const renderRowSubComponent = useCallback(
        ({ row }: { row: Row<ICategory> }) => (
            <CategoryProductsTable record={row.original} />
        ),
        [],
    );

    const handleEditButtonClick = (editId: string) => {
        setId(editId);
    };

    const renderEditRow = useCallback((row: Row<ICategory>) => {
        const { id, title, isActive } = row.original;

        return (
            <TableRow key={`edit-${id}-inputs`}>
                <TableCell
                    sx={{
                        flex: "1",
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={3}
                        alignContent="center"
                        alignItems="center"
                    >
                        <IconButton onClick={() => row.toggleExpanded()}>
                            {row.getIsExpanded() ? (
                                <RemoveCircleOutline fontSize="small" />
                            ) : (
                                <AddCircleOutline fontSize="small" />
                            )}
                        </IconButton>

                        <TextField
                            fullWidth
                            id="title"
                            type="text"
                            size="small"
                            defaultValue={title}
                            {...register("title", {
                                required: t("errors.required.field", {
                                    field: "Title",
                                }),
                            })}
                        />
                    </Stack>
                </TableCell>
                <TableCell>
                    <Checkbox
                        id="isActive"
                        defaultChecked={isActive}
                        {...register("isActive")}
                    />
                </TableCell>
                <TableCell
                    sx={{
                        maxWidth: "150px",
                    }}
                >
                    <SaveButton type="submit">{t("buttons.save")}</SaveButton>
                    <Button onClick={() => setId(undefined)}>
                        {t("buttons.cancel")}
                    </Button>
                </TableCell>
            </TableRow>
        );
    }, []);

    return (
        <List wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}>
            <form onSubmit={handleSubmit(onFinish)}>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            {getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={`header-group-${headerGroup.id}`}
                                >
                                    {headerGroup.headers.map((header) => (
                                        <TableCell
                                            key={`header-group-cell-${header.id}`}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody>
                            {getRowModel().rows.map((row) => {
                                return (
                                    <React.Fragment key={row.id}>
                                        {id ===
                                        (row.original as ICategory).id ? (
                                            renderEditRow(row)
                                        ) : (
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
                                        )}
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
                            value: tableQueryResult.data?.total ?? 100,
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

const CategoryProductsTable: React.FC<{ record: ICategory }> = ({ record }) => {
    const t = useTranslate();

    const { dataGridProps } = useDataGrid<IProduct>({
        resource: "products",
        initialPageSize: 5,
        permanentFilter: [
            {
                field: "category.id",
                operator: "eq",
                value: record.id,
            },
        ],
        syncWithLocation: false,
    });

    const columns = React.useMemo<GridColDef<IProduct>[]>(
        () => [
            {
                field: "image",
                renderHeader: function render() {
                    return <></>;
                },
                filterable: false,
                filterOperators: undefined,
                disableColumnMenu: true,
                hideSortIcons: true,
                renderCell: function render({ row }) {
                    return (
                        <Avatar
                            alt={`${row.name}`}
                            src={row.images[0]?.url}
                            sx={{ width: 74, height: 74 }}
                        />
                    );
                },
                flex: 1,
                minWidth: 100,
            },
            {
                field: "name",
                headerName: t("products.fields.name"),
                flex: 1,
                minWidth: 180,
            },
            {
                field: "price",
                headerName: t("products.fields.price"),
                renderCell: function render({ value }) {
                    return (
                        <NumberField
                            options={{
                                currency: "USD",
                                style: "currency",
                                notation: "compact",
                            }}
                            value={value / 100}
                        />
                    );
                },
                flex: 1,
                minWidth: 100,
            },
            {
                field: "isActive",

                headerName: t("products.fields.isActive"),
                renderCell: function render({ row }) {
                    return <BooleanField value={row.isActive} />;
                },
                flex: 0.5,
                minWidth: 100,
            },
            {
                field: "createdAt",
                headerName: t("products.fields.createdAt"),
                renderCell: function render({ row }) {
                    return <DateField value={row.createdAt} format="LLL" />;
                },
                flex: 1,
                minWidth: 200,
            },

            {
                field: "actions",
                headerName: t("table.actions"),
                type: "actions",
                getActions: function render({ row }) {
                    return [
                        <GridActionsCellItem
                            key={1}
                            label={t("buttons.edit")}
                            icon={<Edit />}
                            onClick={() => showEditDrawer(row.id)}
                            showInMenu
                        />,
                    ];
                },
                flex: 0.5,
                minWidth: 100,
            },
        ],
        [t],
    );

    const editDrawerFormProps = useModalForm<
        IProduct,
        HttpError,
        Nullable<IProduct>
    >({
        refineCoreProps: {
            action: "edit",
            resource: "products",
            redirect: false,
        },
    });

    const {
        modal: { show: showEditDrawer },
    } = editDrawerFormProps;

    return (
        <List
            headerProps={{
                title: t("products.products"),
            }}
        >
            <DataGrid
                {...dataGridProps}
                columns={columns}
                rowHeight={80}
                autoHeight
                density="comfortable"
                pageSizeOptions={[5, 10, 25, 50, 100]}
            />
            <EditProduct {...editDrawerFormProps} />
        </List>
    );
};
