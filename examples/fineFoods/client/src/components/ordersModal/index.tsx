import { useBasketContext } from "@hooks/useBasketContext";
import { useOrdesModalContext } from "@hooks/useOrdersModalContext";
import { useCreate, useNavigation } from "@pankod/refine-core";

import {
    AntdList as List,
    Col,
    Row,
    Modal,
    Typography,
    NumberField,
    Button,
} from "@pankod/refine-antd";

import { OrderIcon, OrderModalProductItem } from "@components";
import { IOrder } from "@interfaces";

const { Text } = Typography;

require("./style.less");

export const OrdersModal = () => {
    const { replace } = useNavigation();
    const { ordersModalVisible, setOrdersModalVisible } =
        useOrdesModalContext();
    const { orders, totalPrice, products, dispatch } = useBasketContext();
    const { mutate, isLoading } = useCreate<IOrder>();

    return (
        <Modal
            title={<OrderIcon />}
            visible={ordersModalVisible}
            onCancel={() => setOrdersModalVisible(false)}
            bodyStyle={{ paddingBottom: 0 }}
            footer={
                <Row justify="end">
                    <Col span={24}>
                        <Text style={{ fontWeight: 500, marginRight: 2 }}>
                            Total:
                        </Text>
                        <Text style={{ fontWeight: 700, marginRight: 6 }}>
                            {orders.length} Items /
                        </Text>
                        <NumberField
                            style={{ fontWeight: 800 }}
                            value={totalPrice / 100}
                            options={{
                                currency: "USD",
                                style: "currency",
                            }}
                        />
                    </Col>
                    <Col span={24}>
                        <Button
                            loading={isLoading}
                            onClick={() =>
                                mutate(
                                    {
                                        resource: "orders",
                                        values: {
                                            products,
                                            amount: totalPrice,
                                        },
                                        successNotification: false,
                                    },
                                    {
                                        onSuccess: (data) => {
                                            replace(
                                                "/order/[id]",
                                                `/order/${data.data.id}`,
                                            );
                                            setOrdersModalVisible(false);
                                            dispatch({ type: "resetBasket" });
                                        },
                                    },
                                )
                            }
                            className="order-button"
                        >
                            Order
                        </Button>
                    </Col>
                </Row>
            }
        >
            <List
                dataSource={orders}
                renderItem={(item) => (
                    <List.Item>
                        <OrderModalProductItem order={item} />
                    </List.Item>
                )}
            />
        </Modal>
    );
};
