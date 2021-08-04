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
} from "@pankod/refine";

const { Text, Paragraph } = Typography;

import { IStore, IProduct, ICategory } from "interfaces";

type Props = {
    record?: IStore;
};

export const ProductEdit: React.FC<Props> = ({ record }) => {
    const t = useTranslate();

    const { listProps } = useSimpleList<IProduct>({
        resource: "products",
    });

    const { data: categoryData, isLoading: categoryIsLoading } =
        useList<ICategory>("categories", {
            pagination: { pageSize: 30 },
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
                    <Input
                        size="large"
                        style={{ width: "300px" }}
                        placeholder="Product Search"
                    />
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
                <Spin spinning={categoryIsLoading}>
                    <Space wrap>
                        {categoryData?.data.map((category) => (
                            <Button
                                key={category.id}
                                shape="round"
                                type={
                                    category.id == "1" ? "primary" : "default"
                                }
                            >
                                {category.title}
                            </Button>
                        ))}
                    </Space>
                </Spin>
            </Col>
        </Row>
    );
};
