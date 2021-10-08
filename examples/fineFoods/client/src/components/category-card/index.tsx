import { Card, Typography } from "@pankod/refine";

const { Title } = Typography;

require("./style.less");

export type CategoryCardProps = {
    backgroundImg: string;
    title: string;
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
    backgroundImg,
    title,
}) => {
    return (
        <Card
            className="category-card"
            style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${backgroundImg})`,
            }}
            hoverable
        >
            <Title>{title}</Title>
        </Card>
    );
};
