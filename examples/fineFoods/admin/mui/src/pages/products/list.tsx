import React from "react";
import {
    useTranslate,
    IResourceComponentsProps,
    useTable,
} from "@pankod/refine-core";
import { useModalForm } from "@pankod/refine-react-hook-form";
import {
    Grid,
    Paper,
    Typography,
    Box,
    InputBase,
    IconButton,
    Stack,
    Pagination,
    CreateButton,
} from "@pankod/refine-mui";
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

    const createDrawerFormProps = useModalForm<IProduct>({
        refineCoreProps: { action: "create" },
    });

    const {
        modal: { show: showCreateDrawer },
    } = createDrawerFormProps;

    const editDrawerFormProps = useModalForm<IProduct>({
        refineCoreProps: { action: "edit" },
    });

    const {
        modal: { show: showEditDrawer },
    } = editDrawerFormProps;

    return (
        <>
            <CreateProduct {...createDrawerFormProps} />
            <EditProduct {...editDrawerFormProps} />
            <Box
                component="div"
                sx={{
                    padding: "20px",

                    width: "100%",
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
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => {
                                        setFilters([
                                            {
                                                field: "name",
                                                operator: "contains",
                                                value: e.target.value,
                                            },
                                            ...filters,
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
                            {tableQueryResult.data?.data.map(
                                (product: IProduct) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={4}
                                        lg={3}
                                        key={product.id}
                                        sx={{ padding: "8px" }}
                                    >
                                        <ProductItem
                                            product={product}
                                            show={showEditDrawer}
                                        />
                                    </Grid>
                                ),
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
                    <Grid item md={4}>
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
            </Box>
        </>
    );
};
