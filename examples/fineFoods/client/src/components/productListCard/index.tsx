import {
    Avatar,
    Typography,
    NumberField,
    InputNumber,
    Button,
    Icons,
} from "@pankod/refine";

import { IProduct } from "@interfaces";
import { useState } from "react";
import { useBasketContext } from "@hooks";

require("./style.less");

const { Title, Text } = Typography;
const { PlusCircleOutlined } = Icons;

type ProductListCardProps = {
    product: IProduct;
};

export const ProductListCard: React.FC<ProductListCardProps> = ({
    product,
}) => {
    const [amount, setAmount] = useState(1);
    const { dispatch } = useBasketContext();

    const { name, images, description, price, id: productId } = product;

    return (
        <div className="product-list-container">
            <Avatar
                className="avatar"
                src={images[0].url}
                alt={name}
                size={128}
            />
            <div className="info-container">
                <Title className="title" level={4}>
                    {name}
                </Title>
                <Text className="description">{description}</Text>
            </div>
            <NumberField
                className="price"
                options={{
                    currency: "USD",
                    style: "currency",
                }}
                value={price / 100}
            />
            <div className="input-container">
                <InputNumber
                    className="add-input"
                    min={1}
                    defaultValue={1}
                    value={amount}
                    onChange={(value) => setAmount(value)}
                />
                <Button
                    className="add-button"
                    shape="round"
                    onClick={() => {
                        dispatch({
                            type: "addProduct",
                            payload: { productId, amount },
                        });
                    }}
                >
                    <PlusCircleOutlined />
                    Add to cart
                </Button>
            </div>
        </div>
    );
};
