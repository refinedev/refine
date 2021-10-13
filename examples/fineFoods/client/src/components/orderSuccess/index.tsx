import {
    LayoutWrapper,
    Card,
    Space,
    DateField,
    NumberField,
    Divider,
    Avatar,
    Typography,
} from "@pankod/refine";
require("./style.less");

import { TRANSLATIONS_BON_APPETIT } from "src/constants";
import { OrderIcon, FastMotoCycleIcon } from "@components/icons";
import { IOrder } from "@interfaces";
const { Title, Text } = Typography;

type OrderPageProps = {
    order: IOrder;
};

export const OrderSuccess: React.FC<OrderPageProps> = ({ order }) => {
    return (
        <LayoutWrapper>
            <Card
                className="image-card order-success"
                bordered={false}
                headStyle={{
                    backgroundColor: "#67BE23",
                }}
                title={
                    <div className="card-header">
                        <OrderIcon />
                        <Title className="head-title">ORDER RECEIVED</Title>
                    </div>
                }
            >
                <Title className="main-title">Order Summary</Title>
                <Space wrap size={[128, 8]}>
                    <Space direction="vertical">
                        <Space>
                            <Text className="title">Order Number:</Text>
                            <Text>#{order.orderNumber}</Text>
                        </Space>
                        <Space>
                            <Text className="title">Order Date:</Text>
                            <DateField value={order.createdAt} format="lll" />
                        </Space>
                        <Space>
                            <Text className="title">Order Number:</Text>
                            <NumberField
                                options={{
                                    currency: "USD",
                                    style: "currency",
                                }}
                                value={
                                    order.products.reduce(
                                        (a, b) => a + b.price,
                                        0,
                                    ) / 100
                                }
                            />
                        </Space>
                    </Space>
                    <Space direction="vertical">
                        <Text className="title">Order Details</Text>
                        {order.products.map((product, index) => (
                            <Text key={product.id}>
                                <strong>{index + 1}. </strong>
                                {product.name}
                            </Text>
                        ))}
                    </Space>
                </Space>
                <Divider />
                <Title className="main-title">Delivery Details</Title>
                <Space wrap size={[128, 16]}>
                    <Space direction="vertical">
                        <Text className="title">Address</Text>
                        <Text>{order.adress.text}</Text>
                        <Text className="title">Estimated Delivery Time</Text>
                        <Text>12:55</Text>
                    </Space>
                    <Space align="center">
                        <Avatar
                            size={128}
                            src={order.courier.avatar[0].url}
                            alt={order.courier.name}
                        />
                        <Space direction="vertical">
                            <FastMotoCycleIcon />
                            <p>
                                <strong>{order.courier.name}</strong> will
                                deliver your order in 30 minutes.
                            </p>
                        </Space>
                    </Space>
                </Space>
                <Divider />
                <div className="card-footer">
                    {TRANSLATIONS_BON_APPETIT.map((text, index) => (
                        <Text
                            key={text}
                            style={{
                                fontSize: "24px",
                                fontWeight: index % 2 === 0 ? 800 : 500,
                            }}
                        >
                            {text}
                        </Text>
                    ))}
                </div>
            </Card>
        </LayoutWrapper>
    );
};
