import React from "react";
import { useTranslate, useTable, useUpdate } from "@pankod/refine-core";
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
    Button,
    Modal,
    Fade,
} from "@pankod/refine-mui";
import { SearchOutlined, CloseOutlined } from "@mui/icons-material";

import {
    CategoryFilter,
    ProductItem,
    CreateProduct,
    EditProduct,
} from "components";
import { IStore, IProduct } from "interfaces";

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

    const {
        modal: { visible, close, show, saveButtonProps },
        register,
        refineCore: { onFinish },
        formState: { errors },
        handleSubmit,
        watch,
        setValue,
        control,
    } = useModalForm<IProduct>({
        refineCoreProps: { action: "create" },
    });

    const {
        modal: {
            visible: visibleEditDrawer,
            close: closeEditDrawer,
            show: showEditDrawer,
            saveButtonProps: editSaveButtonProps,
        },
        refineCore: { onFinish: editOnFinish },
        register: editRegister,
        formState: { errors: editErrors },
        handleSubmit: editHandleSubmit,
        watch: editWatch,
        setValue: editSetValue,
        control: editControl,
    } = useModalForm<IProduct>({
        refineCoreProps: { action: "edit" },
    });

    const { tableQueryResult, setFilters, setCurrent, filters, pageCount } =
        useTable<IProduct>({
            resource: "products",
            initialPageSize: 12,
        });

    const { data: productData } = tableQueryResult;

    const mergedData = productData?.data.map((product) => ({
        ...record?.products.find(
            (storeProduct) => storeProduct.id === product.id,
        ),
        ...product,
    }));

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
        maxHeight: 650,
        bgcolor: "background.paper",
        p: 2,
        my: 2,
        borderRadius: "8px",
    };

    return (
        <Modal closeAfterTransition open={modalVisible} onClose={modalClose}>
            <Fade in={modalVisible}>
                <Box sx={style}>
                    <CreateProduct
                        register={register}
                        close={close}
                        visible={visible}
                        handleSubmit={handleSubmit}
                        setValue={setValue}
                        errors={errors}
                        watch={watch}
                        onFinish={onFinish}
                        control={control}
                        saveButtonProps={saveButtonProps}
                    />
                    <EditProduct
                        register={editRegister}
                        close={closeEditDrawer}
                        visible={visibleEditDrawer}
                        handleSubmit={editHandleSubmit}
                        setValue={editSetValue}
                        errors={editErrors}
                        watch={editWatch}
                        onFinish={editOnFinish}
                        control={editControl}
                        saveButtonProps={editSaveButtonProps}
                    />
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
                    <Box
                        component="div"
                        sx={{
                            backgroundColor: "common.white",
                        }}
                    >
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
                                    <Button
                                        onClick={() => show()}
                                        variant="outlined"
                                        sx={{ marginBottom: "5px" }}
                                    >
                                        {t("stores.buttons.addProduct")}
                                    </Button>
                                </Stack>
                                <Stack
                                    maxHeight={{
                                        xs: 500,
                                        lg: 580,
                                    }}
                                    overflow="scroll"
                                >
                                    <Grid container>
                                        {mergedData?.map(
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
