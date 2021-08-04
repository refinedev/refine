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
} from "@pankod/refine";

const { Text, Paragraph } = Typography;

import { IStore, IProduct, ICategory } from "interfaces";
import { useEffect, useState } from "react";

type Props = {
    record?: IStore;
};

export const ProductEdit: React.FC<Props> = ({ record }) => {
    const t = useTranslate();

    const { listProps, searchFormProps } = useSimpleList<
        IProduct,
        { name: string; categories: string[] }
    >({
        resource: "products",
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

    const renderItem = (item: IProduct) => {
        return (
            <Card style={{ margin: "8px" }}>
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
                        style={{ width: "100%" }}
                        placeholder="Stock Count"
                    />
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
                            Store Products
                        </Text>
                        <Form.Item name="name" noStyle>
                            <Input
                                size="large"
                                style={{ width: "300px" }}
                                placeholder="Product Search"
                            />
                        </Form.Item>
                        <CreateButton>Add Product</CreateButton>
                    </div>
                    <AntdList
                        grid={{ gutter: 8, column: 3 }}
                        style={{
                            maxHeight: "548px",
                            overflow: "auto",
                            paddingRight: "4px",
                        }}
                        {...listProps}
                        renderItem={renderItem}
                        pagination={{
                            ...listProps.pagination,
                            size: "small",
                            simple: true,
                        }}
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
                            Use tags to filter your search
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
                    All
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
