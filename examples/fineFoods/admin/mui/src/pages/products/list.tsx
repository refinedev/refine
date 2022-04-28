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
} from "@pankod/refine-mui";

import SearchIcon from "@mui/icons-material/Search";

import { ProductItem } from "components";

import { IProduct } from "interfaces";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();

    const { tableQueryResult, setPageSize } = useTable<IProduct>({
        resource: "products",
    });

    return (
        <Box component="div" sx={{ backgroundColor: "common.white" }}>
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
                            Product
                        </Typography>
                        <Paper
                            component="form"
                            sx={{
                                p: "2px 4px",
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
                                placeholder="Product Search"
                                inputProps={{
                                    "aria-label": "product search",
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
                            variant="contained"
                            sx={{ marginBottom: "5px" }}
                        >
                            ADD PRODUCT
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
                </Grid>
                <Grid item xs={4}>
                    fillter wrapper
                </Grid>
            </Grid>
        </Box>
    );
};
