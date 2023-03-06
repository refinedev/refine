import React from "react";
import {
    useTranslate,
    IResourceComponentsProps,
    useTable,
    getDefaultFilter,
    HttpError,
} from "@refinedev/core";
import { useModalForm } from "@refinedev/react-hook-form";
import { CreateButton } from "@refinedev/mui";
import {
    Grid,
    Paper,
    Typography,
    InputBase,
    IconButton,
    Stack,
    Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import {
    CategoryFilter,
    ProductItem,
    CreateProduct,
    EditProduct,
} from "components";
import { IProduct } from "interfaces";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();

    const { tableQueryResult, setFilters, setCurrent, filters, pageCount } =
        useTable<IProduct>({
            resource: "products",
            initialPageSize: 12,
        });

    const createDrawerFormProps = useModalForm<IProduct, HttpError, IProduct>({
        refineCoreProps: { action: "create" },
    });

    const {
        modal: { show: showCreateDrawer },
    } = createDrawerFormProps;

    const editDrawerFormProps = useModalForm<IProduct, HttpError, IProduct>({
        refineCoreProps: { action: "edit" },
    });

    const {
        modal: { show: showEditDrawer },
    } = editDrawerFormProps;

    const products: IProduct[] = tableQueryResult.data?.data || [];

    return (
        <>
            <CreateProduct {...createDrawerFormProps} />
            <EditProduct {...editDrawerFormProps} />
            <Paper
                sx={{
                    paddingX: { xs: 3, md: 2 },
                    paddingY: { xs: 2, md: 3 },
                    my: 0.5,
                }}
            >
                <Grid container columns={16}>
                    <Grid item xs={16} md={12}>
                        <Stack
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            flexWrap="wrap"
                            padding={1}
                            direction="row"
                            gap={2}
                        >
                            <Typography variant="h5">
                                {t("products.products")}
                            </Typography>
                            <Paper
                                component="form"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: 400,
                                }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder={t("stores.productSearch")}
                                    inputProps={{
                                        "aria-label": "product search",
                                    }}
                                    value={getDefaultFilter(
                                        "name",
                                        filters,
                                        "contains",
                                    )}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => {
                                        setFilters([
                                            {
                                                field: "name",
                                                operator: "contains",
                                                value:
                                                    e.target.value !== ""
                                                        ? e.target.value
                                                        : undefined,
                                            },
                                        ]);
                                    }}
                                />
                                <IconButton
                                    type="submit"
                                    sx={{ p: "10px" }}
                                    aria-label="search"
                                >
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                            <CreateButton
                                onClick={() => showCreateDrawer()}
                                variant="outlined"
                                sx={{ marginBottom: "5px" }}
                            >
                                {t("stores.buttons.addProduct")}
                            </CreateButton>
                        </Stack>
                        <Grid container>
                            {products.length > 0 ? (
                                products.map((product: IProduct) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        lg={4}
                                        xl={3}
                                        key={product.id}
                                        sx={{ padding: "8px" }}
                                    >
                                        <ProductItem
                                            product={product}
                                            show={showEditDrawer}
                                        />
                                    </Grid>
                                ))
                            ) : (
                                <Grid
                                    container
                                    justifyContent="center"
                                    padding={3}
                                >
                                    <Typography variant="body2">
                                        {t("products.noProducts")}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                        <Pagination
                            count={pageCount}
                            variant="outlined"
                            color="primary"
                            shape="rounded"
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                paddingY: "20px",
                            }}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                page: number,
                            ) => {
                                event.preventDefault();
                                setCurrent(page);
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        sm={0}
                        md={4}
                        sx={{
                            display: {
                                xs: "none",
                                md: "block",
                            },
                        }}
                    >
                        <Stack padding="8px">
                            <Typography variant="subtitle1">
                                {t("stores.tagFilterDescription")}
                            </Typography>
                            <CategoryFilter
                                setFilters={setFilters}
                                filters={filters}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};
