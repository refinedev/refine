import { Card, Typography, Avatar, Space, Input, Icons } from "@pankod/refine";

require("./style.less");

const { Title, Text } = Typography;
const { PlusCircleOutlined } = Icons;

export type ProductCardProps = {
    productImg: string;
    badgeTitle: string;
    title: string;
    description: string;
    price: string;
};

export const ProductCard: React.FC<ProductCardProps> = ({
    productImg,
    badgeTitle,
    title,
    description,
    price,
}) => {
    return (
        <Card className="product-card">
            <span className="product-badge">{badgeTitle}</span>
            <Space>
                <Avatar src={productImg} size={140} />
                <div className="product-info-container">
                    <Title className="product-title" level={4}>
                        {title}
                    </Title>
                    <Text className="product-description">{description}</Text>
                    <Text className="product-price">{price}</Text>
                </div>
            </Space>
            <div className="product-input-container">
                <Input defaultValue={0} />
                <PlusCircleOutlined />
            </div>
        </Card>
    );
};
