import React from "react";
import {
    useTranslate,
    IResourceComponentsProps,
    useTable,
    useList,
} from "@pankod/refine-core";
import {
    Grid,
    Paper,
    Typography,
    Box,
    InputBase,
    IconButton,
    Stack,
    Pagination,
    Button,
} from "@pankod/refine-mui";

import SearchIcon from "@mui/icons-material/Search";

import { CategoryFilter, ProductItem, CreateProduct } from "components";

import { ICategory, IProduct } from "interfaces";
import { useModalForm } from "@pankod/refine-react-hook-form";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();

    const { data: categories, isLoading } = useList<ICategory>({
        resource: "categories",
    });

    const {
        modal: { visible, close, show },
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useModalForm<IProduct>({
        refineCoreProps: { action: "create" },
    });

    const { tableQueryResult, setFilters, setCurrent, filters } =
        useTable<IProduct>({
            resource: "products",
            initialPageSize: 12,
            initialFilter: [
                { field: "name", operator: "contains", value: "" },
                { field: "category.id", operator: "contains", value: "" },
            ],
        });

    const paginationCount =
        tableQueryResult.data && Math.ceil(tableQueryResult.data?.total / 12);

    return (
        <>
            {categories?.data && (
                <CreateProduct
                    register={register}
                    close={close}
                    visible={visible}
                    handleSubmit={handleSubmit}
                    categoryData={categories.data}
                    setValue={setValue}
                />
            )}
            <Box
                component="div"
                sx={{
                    backgroundColor: "common.white",
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
                            <Typography
                                sx={{
                                    fontWeight: 800,
                                    fontSize: "24px",
                                    lineHeight: "32px",
                                    color: "#626262",
                                    marginBottom: "5px",
                                }}
                            >
                                {t("products.products")}
                            </Typography>
                            <Paper
                                component="form"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: 400,
                                    boxShadow: "none",
                                    border: "1px solid #e0e0e0",
                                    marginBottom: "5px",
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
                                            { ...filters[1] },
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
                            <Button
                                onClick={() => show()}
                                variant="outlined"
                                sx={{ marginBottom: "5px" }}
                            >
                                {t("stores.buttons.addProduct")}
                            </Button>
                        </Stack>
                        <Grid container>
                            {tableQueryResult.data?.data.map((i: IProduct) => (
                                <Grid
                                    item
                                    xs={12}
                                    md={4}
                                    lg={3}
                                    key={i.id}
                                    sx={{ padding: "8px" }}
                                >
                                    <ProductItem
                                        name={i.name}
                                        key={i.id}
                                        images={i.images}
                                        price={i.price}
                                        id={i.id}
                                        description={i.description}
                                        isActive={i.isActive}
                                        createdAt={i.createdAt}
                                        category={i.category}
                                        stock={i.stock}
                                        show={show}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Pagination
                            count={paginationCount}
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
                            <Typography sx={{ fontWeight: 500 }}>
                                {t("stores.tagFilterDescription")}
                            </Typography>
                            {categories?.data && (
                                <CategoryFilter
                                    setFilters={setFilters}
                                    filters={filters}
                                    categoryData={categories.data}
                                    isLoading={isLoading}
                                />
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};
