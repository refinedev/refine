import Link from "next/link";
import { Card, Typography } from "@pankod/refine";

const { Title } = Typography;

require("./style.less");

export type CategoryCardProps = {
    id: string;
    title: string;
    backgroundImg?: string;
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
    id,
    title,
    backgroundImg = "https://images.unsplash.com/photo-1595475207225-428b62bda831?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
}) => {
    return (
        <Link
            href={{
                pathname: `/[id]/[category]`,
                query: { id, category: encodeURIComponent(title) },
            }}
        >
            <a>
                <Card
                    className="category-card"
                    style={{
                        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${backgroundImg})`,
                    }}
                    hoverable
                >
                    <Title>{title}</Title>
                </Card>
            </a>
        </Link>
    );
};
