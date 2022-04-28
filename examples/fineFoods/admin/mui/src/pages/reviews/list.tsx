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
} from "@pankod/refine-mui";

import { IReview } from "interfaces";

export const ReviewsList: React.FC<IResourceComponentsProps> = () => {
    const [checkboxSelection, setCheckboxSelection] = React.useState(true);

    const t = useTranslate();

    const columns: GridColumns = [
        {
            field: "avatar",
            headerName: "Avatar",
            renderCell: (param) => (
                <Avatar
                    alt={param.row.user.firstName}
                    src={param.row.user.avatar[0].url}
                />
            ),
        },
        {
            field: "user",
            headerName: t("reviews.fields.user"),
            renderCell: (param) => (
                <Typography>{param.row.user.fullName}</Typography>
            ),
            flex: 1,
        },
        {
            field: "orderId",
            headerName: t("reviews.fields.orderId"),
            renderCell: (param) => (
                <Typography>{`#${param.row.order.id}`}</Typography>
            ),
        },
        {
            field: "comment",
            headerName: t("reviews.fields.review"),
            renderCell: (param) => (
                <Typography>{`${param.row.comment[0]}`}</Typography>
            ),
            flex: 1,
        },
        {
            field: "review",
            headerName: t("reviews.fields.rating"),
            renderCell: (param) => (
                <Rating
                    name="rating"
                    defaultValue={param.row.star}
                    precision={0.5}
                    readOnly
                />
            ),
            flex: 1,
        },
        {
            field: "actions",
            headerName: t("table.actions"),
            type: "actions",
            getActions: () => [
                <GridActionsCellItem
                    key={1}
                    label={t("buttons.acceptAll")}
                    showInMenu
                />,
                <GridActionsCellItem
                    key={2}
                    label={t("buttons.rejectAll")}
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
                components={{
                    Toolbar: GridToolbar,
                }}
            />
        </div>
    );
};
