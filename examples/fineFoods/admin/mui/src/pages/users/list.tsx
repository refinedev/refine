/* eslint-disable react/display-name */
import React from "react";
import { CrudFilters, HttpError, useTranslate } from "@pankod/refine-core";
import {
    DataGrid,
    Grid,
    GridColumns,
    Avatar,
    useDataGrid,
    BooleanField,
    DateField,
    ShowButton,
    Button,
    TextField,
    Box,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CardHeader,
    Card,
    CardContent,
    List,
} from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { IUser, IUserFilterVariables } from "interfaces";

export const UserList: React.FC = () => {
    const t = useTranslate();

    const { register, handleSubmit } =
        useForm<IUser, HttpError, IUserFilterVariables>();

    const columns = React.useMemo<GridColumns<IUser>>(
        () => [
            {
                field: "gsm",
                headerName: t("users.fields.gsm"),
                width: 150,
            },
            {
                field: "avatar",
                headerName: t("users.fields.avatar.label"),
                renderCell: ({ row }) => <Avatar src={row.avatar[0].url} />,
                width: 100,
            },
            {
                field: "firstName",
                headerName: t("users.fields.firstName"),
                width: 150,
            },
            {
                field: "lastName",
                headerName: t("users.fields.lastName"),
                width: 150,
            },
            {
                field: "gender",
                headerName: t("users.fields.gender.label"),
                valueGetter: ({ row }) =>
                    t(`users.fields.gender.${row.gender}`),
            },
            {
                field: "isActive",
                headerName: t("users.fields.isActive.label"),
                renderCell: ({ row }) => <BooleanField value={row.isActive} />,
            },
            {
                field: "createdAt",
                headerName: t("users.fields.createdAt"),
                renderCell: ({ row }) => (
                    <DateField value={row.createdAt} format="LLL" />
                ),
                width: 200,
            },
            {
                field: "actions",
                headerName: t("table.actions"),
                renderCell: ({ row }) => (
                    <ShowButton
                        variant="outlined"
                        size="small"
                        hideText
                        recordItemId={row.id}
                    />
                ),
                align: "center",
                headerAlign: "center",
                flex: 1,
            },
        ],
        [],
    );

    const { dataGridProps, onSearch } = useDataGrid<
        IUser,
        HttpError,
        IUserFilterVariables
    >({
        columns,
        initialPageSize: 10,
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { q, gender, isActive } = params;

            filters.push({
                field: "q",
                operator: "eq",
                value: q !== "" ? q : undefined,
            });

            filters.push({
                field: "gender",
                operator: "eq",
                value: gender !== "" ? gender : undefined,
            });

            filters.push({
                field: "isActive",
                operator: "eq",
                value: isActive !== "" ? isActive : undefined,
            });

            return filters;
        },
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
                <Card>
                    <CardHeader title="Filters" />
                    <CardContent sx={{ pt: 0 }}>
                        <Box
                            component="form"
                            sx={{ display: "flex", flexDirection: "column" }}
                            autoComplete="off"
                            onSubmit={handleSubmit(onSearch)}
                        >
                            <TextField
                                {...register("q")}
                                label={t("users.filter.search.label")}
                                placeholder={t(
                                    "users.filter.search.placeholder",
                                )}
                                margin="normal"
                                fullWidth
                                autoFocus
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchOutlinedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <FormControl margin="normal" size="small">
                                <InputLabel id="gender-select">
                                    {t("users.filter.gender.label")}
                                </InputLabel>
                                <Select
                                    {...register("gender")}
                                    labelId="gender-select"
                                    label={t("users.filter.gender.label")}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Male">
                                        {t("users.filter.gender.male")}
                                    </MenuItem>
                                    <MenuItem value="Female">
                                        {t("users.filter.gender.female")}
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl margin="normal" size="small">
                                <InputLabel id="isActive-select">
                                    {t("users.filter.isActive.label")}
                                </InputLabel>
                                <Select
                                    {...register("isActive")}
                                    labelId="isActive-select"
                                    label={t("users.filter.isActive.label")}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="true">
                                        {t("users.filter.isActive.true")}
                                    </MenuItem>
                                    <MenuItem value="false">
                                        {t("users.filter.isActive.false")}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <br />
                            <Button type="submit" variant="contained">
                                {t("orders.filter.submit")}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} lg={9}>
                <List>
                    <DataGrid
                        {...dataGridProps}
                        filterModel={undefined}
                        autoHeight
                        rowsPerPageOptions={[10, 20, 50, 100]}
                    />
                </List>
            </Grid>
        </Grid>
    );
};
