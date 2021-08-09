import {
    Avatar,
    Card,
    Divider,
    InputNumber,
    Icons,
    Dropdown,
    Menu,
    NumberField,
    Typography,
    useTranslate,
} from "@pankod/refine";

const { Text, Paragraph } = Typography;
const { CloseCircleOutlined, FormOutlined } = Icons;

import { IProduct } from "interfaces";

type Props = {
    item: IProduct;
    updateStock?: (changedValue: number, clickedProduct: IProduct) => void;
    editShow: (id?: string | undefined) => void;
};

export const ProductItem: React.FC<Props> = ({
    item,
    updateStock,
    editShow,
}) => {
    const t = useTranslate();

    return (
        <Card
            style={{
                margin: "8px",
                opacity: item.stock <= 0 ? 0.5 : 1,
            }}
            bodyStyle={{ height: "500px" }}
        >
            <div className="card-dropwdown">
                <Dropdown
                    overlay={
                        <Menu mode="vertical">
                            {updateStock && (
                                <Menu.Item
                                    key="1"
                                    disabled={item.stock <= 0}
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
                            )}
                            <Menu.Item
                                key="2"
                                style={{
                                    fontWeight: 500,
                                }}
                                icon={
                                    <FormOutlined
                                        style={{
                                            color: "green",
                                        }}
                                    />
                                }
                                onClick={() => editShow(item.id)}
                            >
                                {t("stores:buttons.editProduct")}
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
            <div className="store-card-body">
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
                    className="item-name"
                >
                    {item.name}
                </Paragraph>
                <Paragraph
                    ellipsis={{ rows: 3, tooltip: true }}
                    style={{ marginBottom: "8px" }}
                >
                    {item.description}
                </Paragraph>
                <Text className="item-id">#{item.id}</Text>
                <NumberField
                    className="item-price"
                    options={{
                        currency: "USD",
                        style: "currency",
                    }}
                    value={item.price / 100}
                />
                {updateStock && (
                    <div id="stock-number">
                        <InputNumber
                            size="large"
                            keyboard
                            min={0}
                            value={item.stock || 0}
                            onChange={(value: number) =>
                                updateStock(value, item)
                            }
                            style={{ width: "100%" }}
                        />
                    </div>
                )}
            </div>
        </Card>
    );
};
