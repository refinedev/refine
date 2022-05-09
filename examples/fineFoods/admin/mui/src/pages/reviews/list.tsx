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
    List,
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
        },
        {
            field: "comment",
            headerName: t("reviews.fields.review"),
            valueGetter: ({ row }) => row.comment[0],
            flex: 1,
        },
        {
            field: "review",
            headerName: t("reviews.fields.rating"),
            headerAlign: "center",
            flex: 1,
            align: "center",
            renderCell: ({ row }) => (
                <Stack alignItems="center">
                    <Typography variant="h5" fontWeight="bold">
                        {row.star}
                    </Typography>
                    <Rating name="rating" defaultValue={row.star} readOnly />
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
    ];

    const { dataGridProps } = useDataGrid<IReview>({
        columns,
        // permanentFilter: [
        //     {
        //         field: "status",
        //         operator: "eq",
        //         value: "pending",
        //     },
        // ],
    });

    const EnhancedTableToolbar = (props: { numSelected: React.Key[] }) => {
        const { numSelected } = props;
        return (
            <Toolbar>
                {numSelected.length > 0 && (
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
                )}
            </Toolbar>
        );
    };

    return (
        <List>
            <div style={{ display: "flex", height: 700, width: "100%" }}>
                <DataGrid
                    {...dataGridProps}
                    autoHeight
                    checkboxSelection
                    density="comfortable"
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectedRowKeys(newSelectionModel as React.Key[]);
                    }}
                    selectionModel={selectedRowKeys}
                    components={{
                        Header: () => (
                            <EnhancedTableToolbar
                                numSelected={selectedRowKeys}
                            />
                        ),
                    }}
                />
            </div>
        </List>
    );
};
