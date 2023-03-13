import React from "react";
import {
    useTranslate,
    useUpdateMany,
    useNavigation,
    IResourceComponentsProps,
    BaseKey,
} from "@refinedev/core";

import { useDataGrid, List } from "@refinedev/mui";
import { DataGrid, GridColumns, GridActionsCellItem } from "@mui/x-data-grid";
import {
    Typography,
    Tooltip,
    Avatar,
    Rating,
    Stack,
    Button,
} from "@mui/material";
import { Check, Clear } from "@mui/icons-material";

import { IReview } from "interfaces";

export const ReviewsList: React.FC<IResourceComponentsProps> = () => {
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>(
        [],
    );
    const hasSelected = selectedRowKeys.length > 0;

    const t = useTranslate();
    const { show } = useNavigation();

    const { mutate } = useUpdateMany<IReview>();

    const { dataGridProps } = useDataGrid<IReview>({
        initialPageSize: 10,
        permanentFilter: [
            {
                field: "status",
                operator: "eq",
                value: "pending",
            },
        ],
    });

    const handleUpdate = (id: BaseKey, status: IReview["status"]) => {
        mutate({
            resource: "reviews",
            ids: [id],
            values: { status },
            mutationMode: "undoable",
        });
    };

    const updateSelectedItems = (status: "approved" | "rejected") => {
        mutate(
            {
                resource: "reviews",
                ids: selectedRowKeys.map(String),
                values: {
                    status,
                },
                mutationMode: "undoable",
            },
            {
                onSuccess: () => {
                    setSelectedRowKeys([]);
                },
            },
        );
    };

    const columns = React.useMemo<GridColumns<IReview>>(
        () => [
            {
                field: "avatar",
                headerName: "Avatar",
                renderCell: function render({ row }) {
                    return <Avatar src={row.user.avatar[0].url} />;
                },
                sortable: false,
            },
            {
                field: "user",
                headerName: t("reviews.fields.user"),
                valueGetter: ({ row }) => row.user.fullName,
                minWidth: 200,
                flex: 1,
                sortable: false,
            },
            {
                field: "order.id",
                headerName: t("reviews.fields.orderId"),
                renderCell: function render({ row }) {
                    return (
                        <Button
                            onClick={() => {
                                show("orders", row.order.id);
                            }}
                            variant="text"
                        >
                            #{row.order.id}
                        </Button>
                    );
                },
                minWidth: 100,
                flex: 0.5,
            },
            {
                field: "comment",
                headerName: t("reviews.fields.review"),
                renderCell: function render({ row }) {
                    return (
                        <Tooltip title={row.comment[0]}>
                            <Typography
                                variant="body2"
                                sx={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                }}
                            >
                                {row.comment[0]}
                            </Typography>
                        </Tooltip>
                    );
                },
                minWidth: 200,
                flex: 1,
            },
            {
                field: "star",
                headerName: t("reviews.fields.rating"),
                headerAlign: "center",
                flex: 1,
                minWidth: 250,
                align: "center",
                renderCell: function render({ row }) {
                    return (
                        <Stack
                            alignItems="center"
                            sx={{ whiteSpace: "break-spaces" }}
                        >
                            <Typography variant="h5">{row.star}</Typography>
                            <Rating
                                name="rating"
                                defaultValue={row.star}
                                readOnly
                            />
                        </Stack>
                    );
                },
            },
            {
                field: "actions",
                headerName: t("table.actions"),
                type: "actions",
                getActions: ({ row }) => [
                    // @ts-expect-error `@mui/x-data-grid@5.17.12` broke the props of `GridActionsCellItem` and requires `onResize` and `onResizeCapture` props which should be optional.
                    <GridActionsCellItem
                        key={1}
                        label={t("buttons.accept")}
                        icon={<Check color="success" />}
                        onClick={() => handleUpdate(row.id, "approved")}
                        showInMenu
                    />,
                    // @ts-expect-error `@mui/x-data-grid@5.17.12` broke the props of `GridActionsCellItem` and requires `onResize` and `onResizeCapture` props which should be optional.
                    <GridActionsCellItem
                        key={2}
                        label={t("buttons.reject")}
                        icon={<Clear color="error" />}
                        onClick={() => handleUpdate(row.id, "rejected")}
                        showInMenu
                    />,
                ],
            },
        ],
        [t],
    );

    return (
        <List
            wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}
            headerProps={{
                subheader: hasSelected && (
                    <Stack direction="row">
                        <Button
                            startIcon={<Check color="success" />}
                            onClick={() => updateSelectedItems("approved")}
                        >
                            {t("buttons.acceptAll")}
                        </Button>
                        <Button
                            startIcon={<Clear color="error" />}
                            onClick={() => updateSelectedItems("rejected")}
                        >
                            {t("buttons.rejectAll")}
                        </Button>
                    </Stack>
                ),
            }}
        >
            <DataGrid
                {...dataGridProps}
                columns={columns}
                autoHeight
                checkboxSelection
                density="comfortable"
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectedRowKeys(newSelectionModel as React.Key[]);
                }}
                rowsPerPageOptions={[10, 20, 50, 100]}
                selectionModel={selectedRowKeys}
            />
        </List>
    );
};
