/* eslint-disable react/display-name */
import React from "react";
import {
    useTranslate,
    useNavigation,
    IResourceComponentsProps,
} from "@pankod/refine-core";

import {
    Typography,
    DataGrid,
    useDataGrid,
    GridColumns,
    GridActionsCellItem,
    GridToolbar,
    Avatar,
    Rating,
    Stack,
} from "@pankod/refine-mui";
import { Check, Clear } from "@mui/icons-material";

import { IReview } from "interfaces";

export const ReviewsList: React.FC<IResourceComponentsProps> = () => {
    const [checkboxSelection, setCheckboxSelection] = React.useState(true);

    const t = useTranslate();

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
            valueGetter: ({ row }) => `#${row.order.id}`,
            width: 150,
        },
        {
            field: "comment",
            headerName: t("reviews.fields.review"),
            valueGetter: ({ row }) => (
                <Typography
                    style={{ whiteSpace: "pre-line" }}
                >{`${row.comment[0]}`}</Typography>
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
            getActions: () => [
                <GridActionsCellItem
                    key={1}
                    label={t("buttons.accept")}
                    icon={<Check color="success" />}
                    showInMenu
                />,
                <GridActionsCellItem
                    key={2}
                    label={t("buttons.reject")}
                    icon={<Clear color="error" />}
                    showInMenu
                />,
            ],
        },
    ];

    const { dataGridProps } = useDataGrid<IReview>({
        columns,
    });

    return (
        <div style={{ display: "flex", height: 700, width: "100%" }}>
            <DataGrid
                {...dataGridProps}
                checkboxSelection={checkboxSelection}
                density="comfortable"
                components={{
                    Toolbar: GridToolbar,
                }}
            />
        </div>
    );
};
