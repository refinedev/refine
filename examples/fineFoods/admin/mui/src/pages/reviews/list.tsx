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
    Avatar,
    Rating,
    Stack,
    Toolbar,
    Button,
} from "@pankod/refine-mui";
import { Check, Clear } from "@mui/icons-material";

import { IReview } from "interfaces";

export const ReviewsList: React.FC<IResourceComponentsProps> = () => {
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>(
        [],
    );

    const t = useTranslate();
    const { show } = useNavigation();

    const { mutate, isLoading } = useUpdateMany<IReview>();

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

    const columns: GridColumns<IReview> = [
        {
            field: "avatar",
            headerName: "Avatar",
            renderCell: ({ row }) => (
                <Avatar>{row.user.firstName.charAt(0)}</Avatar>
            ),
        },
        {
            field: "user",
            headerName: t("reviews.fields.user"),
            valueGetter: ({ row }) => row.user.fullName,
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
            width: 150,
        },
        {
            field: "comment",
            headerName: t("reviews.fields.review"),
            renderCell: ({ row }) => (
                <Typography style={{ whiteSpace: "pre-line" }}>
                    {row.comment[0]}
                </Typography>
            ),
            flex: 1,
        },
        {
            field: "review",
            headerName: t("reviews.fields.rating"),
            headerAlign: "center",
            renderCell: ({ row }) => (
                <Stack alignItems="center">
                    <Typography variant="h5" fontWeight="bold">
                        {row.star}
                    </Typography>
                    <Rating name="rating" defaultValue={row.star} readOnly />
                </Stack>
            ),
            width: 150,
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
    ];

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

    const EnhancedTableToolbar = (props: { numSelected: React.Key[] }) => {
        const { numSelected } = props;
        return (
            <Toolbar>
                {numSelected.length > 0 && (
                    <Stack direction="row" pt={2}>
                        <Typography
                            color="inherit"
                            variant="subtitle1"
                            component="div"
                            style={{ flex: 1 }}
                        >
                            Reviews
                        </Typography>
                        <Button
                            startIcon={<Check color="success" />}
                            sx={{ display: "flex", width: "100%" }}
                            onClick={() => updateSelectedItems("approved")}
                        >
                            {t("buttons.acceptAll")}
                        </Button>
                        <Button
                            startIcon={<Clear color="error" />}
                            sx={{ display: "flex", width: "100%" }}
                            onClick={() => updateSelectedItems("rejected")}
                        >
                            {t("buttons.rejectAll")}
                        </Button>
                    </Stack>
                )}
            </Toolbar>
        );
    };

    return (
        <div style={{ display: "flex", height: 700, width: "100%" }}>
            <DataGrid
                {...dataGridProps}
                checkboxSelection
                density="comfortable"
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectedRowKeys(newSelectionModel as React.Key[]);
                }}
                selectionModel={selectedRowKeys}
                components={{
                    Toolbar: () => (
                        <EnhancedTableToolbar numSelected={selectedRowKeys} />
                    ),
                }}
            />
        </div>
    );
};
