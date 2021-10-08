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
            <span className="badge">{badgeTitle}</span>
            <Space>
                <Avatar src={productImg} size={140} />
                <div className="info-container">
                    <Title className="title" level={4}>
                        {title}
                    </Title>
                    <Text className="description">{description}</Text>
                    <Text className="price">{price}</Text>
                </div>
            </Space>
            <div className="input-container">
                <Input defaultValue={0} />
                <PlusCircleOutlined />
            </div>
        </Card>
    );
};
