import { useEffect, useState } from "react";
import {
    Typography,
    Avatar,
    Row,
    Col,
    AntdList,
    useSimpleList,
    useList,
    useTranslate,
    Card,
    Input,
    CreateButton,
    Divider,
    InputNumber,
    Button,
    Space,
    Spin,
    Form,
    CrudFilters,
    useUpdate,
    Icons,
    Dropdown,
    Menu,
} from "@pankod/refine";
import debounce from "lodash/debounce";

const { Text, Paragraph } = Typography;
const { SearchOutlined, CloseCircleOutlined } = Icons;

import { IStore, IProduct, ICategory } from "interfaces";

type Props = {
    record: IStore;
};

export const ProductEdit: React.FC<Props> = ({ record }) => {
    const t = useTranslate();

    const { listProps, searchFormProps, queryResult } = useSimpleList<
        IProduct,
        { name: string; categories: string[] }
    >({
        resource: "products",
        pagination: { pageSize: 9 },
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
    const { data: productData } = queryResult;

    const mergedData = productData?.data.map((product) => ({
        ...product,
        ...record?.products.find(
            (storeProduct) => storeProduct.id === product.id,
        ),
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
            });
        }
    };

    const renderItem = (item: IProduct) => {
        return (
            <Card
                style={{
                    margin: "8px",
                    opacity: item.stock <= 0 ? 0.5 : 1,
                }}
                bodyStyle={{ height: "500px" }}
            >
                <div
                    style={{ position: "absolute", top: "10px", right: "5px" }}
                >
                    <Dropdown
                        disabled={item.stock <= 0}
                        overlay={
                            <Menu mode="vertical">
                                <Menu.Item
                                    key="1"
                                    style={{
                                        fontWeight: 500,
                                    }}
                                    icon={
                                        <CloseCircleOutlined
                                            style={{
                                                color: "red",
                                            }}
                                        />
                                    }
                                    onClick={() => updateStock(0, item)}
                                >
                                    {t("stores:buttons.outOfStock")}
                                </Menu.Item>
                            </Menu>
                        }
                        trigger={["click"]}
                    >
                        <Icons.MoreOutlined
                            style={{
                                fontSize: 24,
                            }}
                        />
                    </Dropdown>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                    }}
                >
                    <div style={{ textAlign: "center" }}>
                        <Avatar
                            size={128}
                            src={item.images[0].url}
                            alt={item.name}
                        />
                    </div>
                    <Divider />
                    <Paragraph
                        ellipsis={{ rows: 2, tooltip: true }}
                        style={{
                            fontSize: "18px",
                            fontWeight: 800,
                            marginBottom: "8px",
                        }}
                    >
                        {item.name}
                    </Paragraph>
                    <Paragraph
                        ellipsis={{ rows: 3, tooltip: true }}
                        style={{ marginBottom: "8px" }}
                    >
                        {item.description}
                    </Paragraph>
                    <Paragraph
                        style={{
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "#999999",
                            marginBottom: "8px",
                        }}
                    >
                        #{item.id}
                    </Paragraph>
                    <Paragraph
                        style={{
                            fontSize: "24px",
                            fontWeight: 500,
                        }}
                    >
                        {item.price}$
                    </Paragraph>
                    <div id="stock-number">
                        <InputNumber
                            size="large"
                            keyboard
                            min={0}
                            value={item.stock || 0}
                            onChange={debounce(
                                (value: number) => updateStock(value, item),
                                500,
                            )}
                            style={{ width: "100%" }}
                        />
                    </div>
                </div>
            </Card>
        );
    };

    return (
        <Form
            {...searchFormProps}
            onValuesChange={() => searchFormProps.form?.submit()}
        >
            <Row gutter={[16, 16]}>
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
                            {t("stores:storeProducts")}
                        </Text>
                        <Form.Item name="name" noStyle>
                            <Input
                                style={{ width: "300px" }}
                                placeholder={t("stores:productSearch")}
                                suffix={<SearchOutlined />}
                            />
                        </Form.Item>
                        <CreateButton resourceName="products">
                            {t("stores:buttons.addProduct")}
                        </CreateButton>
                    </div>
                    <AntdList
                        grid={{ gutter: 8, column: 3 }}
                        style={{
                            maxHeight: "548px",
                            overflow: "auto",
                            paddingRight: "4px",
                        }}
                        {...listProps}
                        dataSource={mergedData}
                        renderItem={renderItem}
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
    );
};

const ProductCategoryFilter: React.FC<{
    value?: string[];
    onChange?: (value: string[]) => void;
}> = ({ onChange, value }) => {
    const t = useTranslate();

    const [filterCategories, setFilterCategories] = useState<string[]>(
        value ?? [],
    );

    useEffect(() => {
        onChange?.(filterCategories);
    }, [filterCategories]);

    const { data: categoryData, isLoading: categoryIsLoading } =
        useList<ICategory>("categories", {
            pagination: { pageSize: 30 },
        });

    const toggleFilterCategory = (clickedCategory: string) => {
        const target = filterCategories.findIndex(
            (category) => category === clickedCategory,
        );

        if (target < 0) {
            setFilterCategories((prevCategories) => {
                return [...prevCategories, clickedCategory];
            });
        } else {
            const copyFilterCategories = [...filterCategories];

            copyFilterCategories.splice(target, 1);

            setFilterCategories(copyFilterCategories);
        }
    };

    return (
        <Spin spinning={categoryIsLoading}>
            <Space wrap>
                <Button
                    shape="round"
                    type={filterCategories.length === 0 ? "primary" : "default"}
                    onClick={() => setFilterCategories([])}
                >
                    {t("stores:all")}
                </Button>
                {categoryData?.data.map((category) => (
                    <Button
                        key={category.id}
                        shape="round"
                        type={
                            filterCategories.includes(category.id)
                                ? "primary"
                                : "default"
                        }
                        onClick={() => toggleFilterCategory(category.id)}
                    >
                        {category.title}
                    </Button>
                ))}
            </Space>
        </Spin>
    );
};
