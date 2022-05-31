/* eslint-disable react/display-name */
import React from "react";
import {
    useTranslate,
    useUpdateMany,
    useNavigation,
    IResourceComponentsProps,
} from "@pankod/refine-core";

import {
    Typography,
    DataGrid,
    useDataGrid,
    GridColumns,
    GridActionsCellItem,
    Tooltip,
    Avatar,
    Rating,
    Stack,
    Button,
    List,
} from "@pankod/refine-mui";
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

    const handleUpdate = (id: string, status: IReview["status"]) => {
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
                renderCell: ({ row }) => (
                    <Avatar src={row.user.avatar[0].url} />
                ),
            },
            {
                field: "user",
                headerName: t("reviews.fields.user"),
                valueGetter: ({ row }) => row.user.fullName,
                minWidth: 200,
                flex: 1,
            },
            {
                field: "order",
                headerName: t("reviews.fields.orderId"),
                renderCell: ({ row }) => (
                    <Button
                        onClick={() => {
                            show("orders", row.order.id);
                        }}
                        variant="text"
                    >
                        #{row.order.id}
                    </Button>
                ),
                minWidth: 100,
                flex: 0.5,
            },
            {
                field: "comment",
                headerName: t("reviews.fields.review"),
                renderCell: ({ row }) => (
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
                ),
                minWidth: 200,
                flex: 1,
            },
            {
                field: "review",
                headerName: t("reviews.fields.rating"),
                headerAlign: "center",
                flex: 1,
                minWidth: 250,
                align: "center",
                renderCell: ({ row }) => (
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
                ),
            },
            {
                field: "actions",
                headerName: t("table.actions"),
                type: "actions",
                getActions: ({ row }) => [
                    <GridActionsCellItem
                        key={1}
                        label={t("buttons.accept")}
                        icon={<Check color="success" />}
                        onClick={() => handleUpdate(row.id, "approved")}
                        showInMenu
                    />,
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
        [],
    );

    const { dataGridProps } = useDataGrid<IReview>({
        columns,
        permanentFilter: [
            {
                field: "status",
                operator: "eq",
                value: "pending",
            },
        ],
    });

    return (
        <List
            cardProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}
            cardHeaderProps={{
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
                autoHeight
                checkboxSelection
                density="comfortable"
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectedRowKeys(newSelectionModel as React.Key[]);
                }}
                rowsPerPageOptions={[10]}
                selectionModel={selectedRowKeys}
            />
        </List>
    );
};
