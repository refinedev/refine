import {
    Card,
    Typography,
    Avatar,
    Space,
    InputNumber,
    Icons,
    NumberField,
} from "@pankod/refine";

import { useBasketContext } from "@hooks";
import { useState } from "react";

require("./style.less");

const { Title, Text } = Typography;
const { PlusCircleOutlined } = Icons;

export type ProductCardProps = {
    productImg: string;
    badgeTitle: string;
    title: string;
    description: string;
    price: number;
    badgeBgColor?: string;
    productId?: string;
};

export const ProductCard: React.FC<ProductCardProps> = ({
    productImg,
    badgeTitle,
    title,
    description,
    price,
    badgeBgColor,
    productId,
}) => {
    const { dispatch } = useBasketContext();
    const [amount, setAmount] = useState(1);

    return (
        <Card className="product-card">
            <span className="badge" style={{ backgroundColor: badgeBgColor }}>
                {badgeTitle}
            </span>
            <Space>
                <Avatar src={productImg} size={140} />
                <div className="info-container">
                    <Title className="title" level={4}>
                        {title}
                    </Title>
                    <Text className="description">{description}</Text>
                    <NumberField
                        className="price"
                        options={{
                            currency: "USD",
                            style: "currency",
                        }}
                        value={price / 100}
                    />
                </div>
            </Space>
            <div className="input-container">
                <InputNumber
                    className="add-input"
                    value={amount}
                    onChange={(value) => setAmount(value)}
                    defaultValue={1}
                    min={1}
                />
                <PlusCircleOutlined
                    onClick={() => {
                        if (amount > 0) {
                            dispatch({
                                type: "addProduct",
                                payload: { productId, amount },
                            });
                        }
                    }}
                />
            </div>
        </Card>
    );
};
