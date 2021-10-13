import { useBasketContext } from "@hooks/useBasketContext";
import { IOrder } from "@interfaces";
import { Avatar, NumberField, Row, Typography } from "@pankod/refine";

const { Text } = Typography;

export const OrderModalProductItem: React.FC<{ order: IOrder }> = ({
    order,
}) => {
    const { products } = useBasketContext();
    const { amount, productId } = order;
    const product = products.find((p) => p.id === productId);

    return (
        <Row align="middle" justify="space-between">
            <div>
                <Avatar src={product?.images[0].url} />
                <Text style={{ fontWeight: 600, marginLeft: 12 }}>
                    {product?.name}
                </Text>
            </div>
            <div>
                <NumberField
                    style={{ fontWeight: 800, marginRight: 4 }}
                    options={{
                        currency: "USD",
                        style: "currency",
                    }}
                    value={(product?.price ?? 0) / 100}
                />
                <Text style={{ fontWeight: 500 }}>x{amount}</Text>
            </div>
        </Row>
    );
};
