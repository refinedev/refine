import React, { useCallback } from "react";
import { useTranslate, IResourceComponentsProps } from "@pankod/refine-core";
import { ICategory } from "interfaces";

import { useForm, Controller } from "@pankod/refine-react-hook-form";

import {
    useTable,
    Column,
    usePagination,
    useExpanded,
} from "@pankod/refine-react-table";
import {
    Edit,
    AddCircleOutline,
    RemoveCircleOutline,
} from "@mui/icons-material";

import {
    List,
    BooleanField,
    Checkbox,
    TableContainer,
    Table,
    Stack,
    EditButton,
    TableBody,
    TableRow,
    Button,
    SaveButton,
    TableCell,
    TextField,
    TableHead,
    IconButton,
    Typography,
    TablePagination,
} from "@pankod/refine-mui";

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
    const {
        refineCore: { onFinish, id, setId },
        register,
        handleSubmit,
        control,
    } = useForm<ICategory>({
        refineCoreProps: {
            redirect: false,
            action: "edit",
        },
    });

    const t = useTranslate();
    const columns: Array<Column> = React.useMemo(
        () => [
            {
                id: "title",
                Header: t("categories.fields.title"),
                accessor: "title",
                // eslint-disable-next-line react/display-name
                Cell: ({ row }: any) => {
                    return (
                        <Stack direction="row" spacing={3}>
                            <span {...row.getToggleRowExpandedProps()}>
                                {row.isExpanded ? (
                                    <RemoveCircleOutline fontSize="small" />
                                ) : (
                                    <AddCircleOutline fontSize="small" />
                                )}
                            </span>
                            <Typography>{row.original.title}</Typography>
                        </Stack>
                    );
                },
            },
            {
                id: "isActive",
                Header: t("categories.fields.isActive"),
                accessor: "isActive",
                // eslint-disable-next-line react/display-name
                Cell: ({ value }: any) => <BooleanField value={value} />,
            },
            {
                id: "actions",
                Header: "Actions",
                accessor: "id",
                //eslint-disable-next-line react/display-name
                Cell: ({ value }: any) => {
                    return (
                        <Stack direction="row">
                            {id ? (
                                <>
                                    <EditButton
                                        onClick={() => {
                                            handleEditButtonClick(value);
                                        }}
                                    >
                                        Edit
                                    </EditButton>
                                    <div>Cancel</div>
                                </>
                            ) : (
                                <IconButton
                                    onClick={() => {
                                        setId(value);
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
        [],
    );
    const {
        rows,
        headerGroups,
        pageOptions,
        pageCount,
        visibleColumns,
        getTableProps,
        getTableBodyProps,
        gotoPage,
        setPageSize,
        prepareRow,
        state: { pageIndex, pageSize, filters },
    } = useTable<ICategory>({ columns }, useExpanded);

    const renderRowSubComponent = useCallback(
        ({ row }) => <div>EXPANDED</div>,
        [],
    );

    const handleEditButtonClick = (editId: string) => {
        setId(editId);
    };

    const renderEditRow = useCallback(
        (row) => {
            const { id, title, isActive } = row.original;

            return (
                <>
                    <TableRow key={`edit-${id}-inputs`}>
                        <TableCell>
                            <Stack
                                direction="row"
                                spacing={3}
                                alignContent="center"
                                alignItems="center"
                            >
                                <span {...row.getToggleRowExpandedProps()}>
                                    {row.isExpanded ? (
                                        <RemoveCircleOutline />
                                    ) : (
                                        <AddCircleOutline />
                                    )}
                                </span>
                                <TextField
                                    fullWidth
                                    id="title"
                                    type="text"
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

                        <TableCell>
                            <SaveButton type="submit">
                                {t("buttons.save")}
                            </SaveButton>
                            <Button onClick={() => setId(undefined)}>
                                {t("buttons.cancel")}
                            </Button>
                        </TableCell>
                    </TableRow>
                </>
            );
        },
        [register("isActive")],
    );

    return (
        <List>
            <form onSubmit={handleSubmit(onFinish)}>
                <TableContainer>
                    <Table {...getTableProps()} size="small">
                        <TableHead>
                            {headerGroups.map(
                                (headerGroup: {
                                    getHeaderGroupProps: () => any;
                                    headers: any[];
                                }) => (
                                    <TableRow
                                        key={`header-group-${headerGroup.headers[0].id}`}
                                        {...headerGroup.getHeaderGroupProps()}
                                    >
                                        {headerGroup.headers.map((column) => (
                                            <TableCell
                                                key={`header-group-cell-${column.id}`}
                                                {...column.getHeaderProps()}
                                            >
                                                {column.render("Header")}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ),
                            )}
                        </TableHead>
                        <TableBody {...getTableBodyProps()}>
                            {rows.map((row: any) => {
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
                                                                key={
                                                                    cell.getCellProps()
                                                                        .key
                                                                }
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
                        { label: "All", value: pageOptions?.length },
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
            </form>
        </List>
    );
};
