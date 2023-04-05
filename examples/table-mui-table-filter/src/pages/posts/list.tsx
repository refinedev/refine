import React, { ComponentProps, useMemo } from "react";
import {
    useMany,
    HttpError,
    CrudFilters,
    getDefaultFilter,
} from "@refinedev/core";
import { useDataGrid, TagField, List, useAutocomplete } from "@refinedev/mui";

import {
    Grid,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    InputAdornment,
    TextField,
    Autocomplete,
} from "@mui/material";

import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { SearchOutlined } from "@mui/icons-material";
import { useForm } from "@refinedev/react-hook-form";

import { Controller } from "react-hook-form";

import { ICategory, IPost, IPostFilterVariables } from "interfaces";

export const PostList: React.FC = () => {
    const { dataGridProps, filters, search } = useDataGrid<
        IPost,
        HttpError,
        IPostFilterVariables
    >({
        initialPageSize: 10,
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { q, category, status } = params;

            filters.push(
                {
                    field: "q",
                    operator: "eq",
                    value: q,
                },
                {
                    field: "category.id",
                    operator: "eq",
                    value: category !== "" ? category : undefined,
                },
                {
                    field: "status",
                    operator: "eq",
                    value: status !== "" ? status : undefined,
                },
            );

            return filters;
        },
    });

    const categoryIds = dataGridProps.rows.map((item) => item.category.id);
    const { data: categoriesData, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const columns = useMemo<GridColumns<IPost>>(
        () => [
            {
                field: "id",
                headerName: "ID",
                type: "number",
                width: 50,
            },
            { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
            {
                field: "status",
                headerName: "Status",
                renderCell: function render({ row }) {
                    let color: ComponentProps<typeof TagField>["color"];
                    switch (row.status) {
                        case "published":
                            color = "success";
                            break;
                        case "rejected":
                            color = "error";
                            break;
                        case "draft":
                            color = "info";
                            break;
                        default:
                            color = "default";
                            break;
                    }
                    return <TagField value={row.status} color={color} />;
                },
                minWidth: 120,
                flex: 0.3,
            },
            {
                field: "category.id",
                headerName: "Category",
                type: "number",
                headerAlign: "left",
                align: "left",
                minWidth: 250,
                flex: 0.5,
                renderCell: function render({ row }) {
                    if (isLoading) {
                        return "Loading...";
                    }

                    const category = categoriesData?.data.find(
                        (item) => item.id === row.category.id,
                    );
                    return category?.title;
                },
            },
        ],
        [categoriesData, isLoading],
    );

    const { control, register, handleSubmit } = useForm<
        IPost,
        HttpError,
        IPostFilterVariables
    >({
        defaultValues: {
            q: getDefaultFilter("q", filters, "eq"),
            status: getDefaultFilter("status", filters, "eq"),
            category: getDefaultFilter("category.id", filters, "eq"),
        },
    });

    const { autocompleteProps } = useAutocomplete({
        resource: "categories",
        defaultValue: getDefaultFilter("category.id", filters, "eq"),
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
                <Card sx={{ paddingX: { xs: 2, md: 0 } }}>
                    <CardHeader title="Filters" />
                    <CardContent sx={{ pt: 0 }}>
                        <Box
                            component="form"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                            autoComplete="off"
                            onSubmit={handleSubmit(search)}
                        >
                            <TextField
                                {...register("q")}
                                label="Search"
                                placeholder="ID, Title, Content, etc."
                                margin="normal"
                                fullWidth
                                autoFocus
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchOutlined />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Controller
                                control={control}
                                name="status"
                                render={({ field }) => (
                                    <Autocomplete
                                        options={[
                                            "published",
                                            "draft",
                                            "rejected",
                                        ]}
                                        {...field}
                                        onChange={(_, value) => {
                                            field.onChange(value);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Status"
                                                placeholder="Post Status"
                                                margin="normal"
                                                variant="outlined"
                                                size="small"
                                            />
                                        )}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="category"
                                render={({ field }) => (
                                    <Autocomplete
                                        {...autocompleteProps}
                                        {...field}
                                        onChange={(_, value) => {
                                            field.onChange(value?.id ?? value);
                                        }}
                                        getOptionLabel={(item) => {
                                            return item.title
                                                ? item.title
                                                : autocompleteProps?.options?.find(
                                                      (p) =>
                                                          p.id.toString() ===
                                                          item.toString(),
                                                  )?.title ?? "";
                                        }}
                                        isOptionEqualToValue={(option, value) =>
                                            value === undefined ||
                                            option?.id?.toString() ===
                                                (value?.id ?? value)?.toString()
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Category"
                                                placeholder="Search Categories"
                                                margin="normal"
                                                variant="outlined"
                                                size="small"
                                            />
                                        )}
                                    />
                                )}
                            />
                            <br />
                            <Button type="submit" variant="contained">
                                Submit
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} lg={9}>
                <List>
                    <DataGrid
                        {...dataGridProps}
                        columns={columns}
                        disableColumnFilter={true}
                        filterModel={undefined}
                        autoHeight
                        rowsPerPageOptions={[10, 20, 50, 100]}
                    />
                </List>
            </Grid>
        </Grid>
    );
};
