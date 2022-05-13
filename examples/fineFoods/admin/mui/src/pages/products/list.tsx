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
    Button,
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

    return (
        <>
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
                            <Button
                                onClick={() => show()}
                                variant="outlined"
                                sx={{ marginBottom: "5px" }}
                            >
                                {t("stores.buttons.addProduct")}
                            </Button>
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
