import {
    useTranslate,
    IResourceComponentsProps,
    CrudFilters,
    HttpError,
    getDefaultFilter,
} from "@refinedev/core";

import { useSimpleList, CreateButton, useDrawerForm } from "@refinedev/antd";

import { SearchOutlined } from "@ant-design/icons";
import { Row, List as AntdList, Col, Form, Input, Typography } from "antd";

const { Text } = Typography;

import {
    ProductItem,
    ProductCategoryFilter,
    CreateProduct,
    EditProduct,
} from "components/product";

import { IProduct } from "interfaces";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();

    const { listProps, searchFormProps, filters } = useSimpleList<
        IProduct,
        HttpError,
        { name: string; categories: string[] }
    >({
        pagination: { pageSize: 12, current: 1 },
        onSearch: ({ name, categories }) => {
            const productFilters: CrudFilters = [];

            productFilters.push({
                field: "category.id",
                operator: "in",
                value: categories?.length > 0 ? categories : undefined,
            });

            productFilters.push({
                field: "name",
                operator: "contains",
                value: name ? name : undefined,
            });

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
        id: editId,
    } = useDrawerForm<IProduct>({
        action: "edit",
        resource: "products",
        redirect: false,
    });

    return (
        <div>
            <Form
                {...searchFormProps}
                onValuesChange={() => {
                    searchFormProps.form?.submit();
                }}
                initialValues={{
                    name: getDefaultFilter("name", filters, "contains"),
                    categories: getDefaultFilter("category.id", filters, "in"),
                }}
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={18}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                gap: "8px",
                                marginBottom: "16px",
                            }}
                        >
                            <Text style={{ fontSize: "24px" }} strong>
                                {t("products.products")}
                            </Text>
                            <Form.Item name="name" noStyle>
                                <Input
                                    style={{
                                        width: "400px",
                                    }}
                                    placeholder={t("stores.productSearch")}
                                    suffix={<SearchOutlined />}
                                />
                            </Form.Item>
                            <CreateButton onClick={() => createShow()}>
                                {t("stores.buttons.addProduct")}
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
                                {t("stores.tagFilterDescription")}
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
                editId={editId}
            />
        </div>
    );
};
