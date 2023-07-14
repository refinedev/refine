import React from "react";
import { useTranslate, useTable, useUpdate, HttpError } from "@refinedev/core";
import { useModalForm } from "@refinedev/react-hook-form";
import { CreateButton } from "@refinedev/mui";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import SearchOutlined from "@mui/icons-material/SearchOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";

import {
    CategoryFilter,
    ProductItem,
    CreateProduct,
    EditProduct,
} from "../../components";
import { IStore, IProduct, Nullable } from "../../interfaces";

type StoreProductsProps = {
    record: IStore;
    close: () => void;
    visible: boolean;
};

export const StoreProducts: React.FC<StoreProductsProps> = ({
    record,
    close: modalClose,
    visible: modalVisible,
}) => {
    const t = useTranslate();

    const { tableQueryResult, setFilters, setCurrent, filters, pageCount } =
        useTable<IProduct>({
            resource: "products",
            initialPageSize: 12,
            syncWithLocation: false,
        });

    const createDrawerFormProps = useModalForm<
        IProduct,
        HttpError,
        Nullable<IProduct>
    >({
        refineCoreProps: {
            action: "create",
            resource: "products",
            redirect: false,
        },
    });

    const {
        modal: { show: showCreateDrawer },
    } = createDrawerFormProps;

    const editDrawerFormProps = useModalForm<
        IProduct,
        HttpError,
        Nullable<IProduct>
    >({
        refineCoreProps: {
            action: "edit",
            resource: "products",
            redirect: false,
        },
    });

    const {
        modal: { show: showEditDrawer },
    } = editDrawerFormProps;

    const { data: productData } = tableQueryResult;

    const mergedData =
        productData?.data.map((product) => ({
            ...record?.products.find(
                (storeProduct) => storeProduct.id === product.id,
            ),
            ...product,
        })) || [];

    const { mutate } = useUpdate<IStore>();

    const updateStock = (changedValue: number, clickedProduct: IProduct) => {
        const shopProduct = record.products.find(
            (p) => p.id === clickedProduct.id,
        );

        if (shopProduct) {
            shopProduct.stock = changedValue;

            mutate({
                id: record.id,
                resource: "stores",
                values: {
                    products: record.products,
                },
                successNotification: false,
                mutationMode: "optimistic",
            });
        }
    };

    const style = {
        width: "100%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: { xs: 380, sm: 580, md: 880, lg: 1000 },
        heigth: 650,
        bgcolor: "background.paper",
        p: 2,
        my: 2,
        borderRadius: "8px",
    };

    return (
        <Modal closeAfterTransition open={modalVisible} onClose={modalClose}>
            <Fade in={modalVisible}>
                <Box sx={style}>
                    <CreateProduct {...createDrawerFormProps} />
                    <EditProduct {...editDrawerFormProps} />
                    <Stack
                        position="absolute"
                        top={12}
                        right={12}
                        justifyContent="center"
                        padding={0}
                    >
                        <IconButton onClick={() => modalClose()}>
                            <CloseOutlined />
                        </IconButton>
                    </Stack>
                    <Box component="div">
                        <Grid container columns={16}>
                            <Grid item xs={16} sm={12}>
                                <Stack
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    flexWrap="wrap"
                                    direction="row"
                                    gap="10px"
                                >
                                    <Typography variant="h5">
                                        {t("products.products")}
                                    </Typography>
                                    <Paper
                                        component="form"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            height: "30px",
                                        }}
                                    >
                                        <InputBase
                                            size="small"
                                            sx={{
                                                ml: 1,
                                                flex: 1,
                                            }}
                                            placeholder={t(
                                                "stores.productSearch",
                                            )}
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
                                            <SearchOutlined />
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
                                <Stack
                                    maxHeight={{
                                        xs: 500,
                                        lg: 580,
                                    }}
                                    overflow="scroll"
                                >
                                    <Grid container>
                                        {mergedData.length > 0 ? (
                                            mergedData.map(
                                                (product: IProduct) => (
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        sm={6}
                                                        md={4}
                                                        key={product.id}
                                                        sx={{ padding: "8px" }}
                                                    >
                                                        <ProductItem
                                                            updateStock={
                                                                updateStock
                                                            }
                                                            product={product}
                                                            show={
                                                                showEditDrawer
                                                            }
                                                        />
                                                    </Grid>
                                                ),
                                            )
                                        ) : (
                                            <Grid
                                                container
                                                justifyContent="center"
                                                padding={3}
                                                minHeight={200}
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
                                            marginTop: "10px",
                                        }}
                                        onChange={(
                                            event: React.ChangeEvent<unknown>,
                                            page: number,
                                        ) => {
                                            event.preventDefault();
                                            setCurrent(page);
                                        }}
                                    />
                                </Stack>
                            </Grid>
                            <Grid
                                item
                                xs={0}
                                sm={4}
                                sx={{ display: { xs: "none", sm: "block" } }}
                            >
                                <Stack paddingX="8px">
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
                </Box>
            </Fade>
        </Modal>
    );
};
