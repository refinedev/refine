import {
    useTranslate,
    IResourceComponentsProps,
    useTable,
} from "@pankod/refine-core";
import {
    Grid,
    Paper,
    Typography,
    Box,
    CreateButton,
    InputBase,
    IconButton,
    Stack,
    Pagination,
} from "@pankod/refine-mui";

import SearchIcon from "@mui/icons-material/Search";

import { ProductItem } from "components";

import { IProduct } from "interfaces";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();

    const { tableQueryResult, setFilters, setCurrent, current } =
        useTable<IProduct>({
            resource: "products",
            initialPageSize: 12,
        });

    const paginationCount =
        tableQueryResult.data && Math.ceil(tableQueryResult.data?.total / 12);

    return (
        <Box
            component="div"
            sx={{ backgroundColor: "common.white", padding: "20px" }}
        >
            <Grid container columns={16}>
                <Grid item xs={12}>
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
                                onChange={(e) => {
                                    setFilters([
                                        {
                                            field: "name",
                                            operator: "contains",
                                            value: e.target.value,
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
                            variant="outlined"
                            sx={{ marginBottom: "5px" }}
                        >
                            {t("stores.buttons.addProduct")}
                        </CreateButton>
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
                        onChange={(event, page: number) => {
                            event.preventDefault();
                            setCurrent(page);
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    fillter wrapper
                </Grid>
            </Grid>
        </Box>
    );
};
