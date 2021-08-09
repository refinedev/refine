import {
    useTranslate,
    IResourceComponentsProps,
    useSimpleList,
    CrudFilters,
    Row,
    AntdList,
    Col,
    CreateButton,
    Form,
    Input,
    Icons,
    Typography,
    useDrawerForm,
} from "@pankod/refine";

const { Text } = Typography;
const { SearchOutlined } = Icons;

import {
    ProductItem,
    ProductCategoryFilter,
    CreateProduct,
    EditProduct,
} from "components/product";

import { IProduct } from "interfaces";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();

    const { listProps, searchFormProps } = useSimpleList<
        IProduct,
        { name: string; categories: string[] }
    >({
        resource: "products",
        pagination: { pageSize: 12 },
        onSearch: ({ name, categories }) => {
            const productFilters: CrudFilters = [];

            if (categories.length > 0) {
                productFilters.push({
                    field: "category.id",
                    operator: "in",
                    value: categories,
                });
            }

            if (name) {
                productFilters.push({
                    field: "name",
                    operator: "contains",
                    value: name,
                });
            }

            return productFilters;
        },
    });

    const {
        drawerProps: createDrawerProps,
        formProps: createFormProps,
        saveButtonProps: createSaveButtonProps,
        show: createShow,
    } = useDrawerForm<IProduct>({
        action: "create",
        resource: "products",
        redirect: false,
    });

    const {
        drawerProps: editDrawerProps,
        formProps: editFormProps,
        saveButtonProps: editSaveButtonProps,
        show: editShow,
    } = useDrawerForm<IProduct>({
        action: "edit",
        resource: "products",
        redirect: false,
    });

    return (
        <>
            <Form
                {...searchFormProps}
                onValuesChange={() => searchFormProps.form?.submit()}
            >
                <Row
                    gutter={[16, 16]}
                    style={{ background: "#fff", padding: "16px 24px" }}
                >
                    <Col xs={24} sm={18}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                marginBottom: "16px",
                            }}
                        >
                            <Text style={{ fontSize: "24px" }} strong>
                                {t("products:title")}
                            </Text>
                            <Form.Item name="name" noStyle>
                                <Input
                                    style={{ width: "400px" }}
                                    placeholder={t("stores:productSearch")}
                                    suffix={<SearchOutlined />}
                                />
                            </Form.Item>
                            <CreateButton onClick={() => createShow()}>
                                {t("stores:buttons.addProduct")}
                            </CreateButton>
                        </div>
                        <AntdList
                            grid={{
                                gutter: 8,
                                xs: 1,
                                sm: 1,
                                md: 2,
                                lg: 3,
                                xl: 4,
                                xxl: 4,
                            }}
                            style={{
                                height: "100%",
                                overflow: "auto",
                                paddingRight: "4px",
                            }}
                            {...listProps}
                            renderItem={(item) => (
                                <ProductItem item={item} editShow={editShow} />
                            )}
                        />
                    </Col>
                    <Col xs={0} sm={6}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                height: "40px",
                                marginBottom: "16px",
                            }}
                        >
                            <Text style={{ fontWeight: 500 }}>
                                {t("stores:tagFilterDescription")}
                            </Text>
                        </div>
                        <Form.Item name="categories">
                            <ProductCategoryFilter />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <CreateProduct
                drawerProps={createDrawerProps}
                formProps={createFormProps}
                saveButtonProps={createSaveButtonProps}
            />
            <EditProduct
                drawerProps={editDrawerProps}
                formProps={editFormProps}
                saveButtonProps={editSaveButtonProps}
            />
        </>
    );
};
