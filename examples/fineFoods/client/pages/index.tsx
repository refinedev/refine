import { GetServerSideProps } from "next";
import { Row, Col, LayoutWrapper, Card, Typography } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";

import { API_URL } from "../src/constants";
import { CategoryCard, ProductCard, Promotional } from "@components";

import { ICategory, IProduct } from "@interfaces";

const { Title } = Typography;

type HomePageProps = {
    categories: ICategory[];
    products: IProduct[];
};

export const HomePage: React.FC<HomePageProps> = ({ categories, products }) => {
    const dealsOfDayProducts = products.slice(0, 3);
    const fastAndDeliciousProducts = products.slice(3);

    const getBadgeProps = (index: number) => {
        switch (index) {
            case 0:
                return {
                    badgeTitle: "25%",
                };
            case 1:
                return {
                    badgeTitle: "1+1",
                    badgeBgColor: "#67BE23",
                };
            case 2:
                return {
                    badgeTitle: "FREE BEVERAGE",
                    badgeBgColor: "#0CCEE9",
                };
            default:
                return {
                    badgeTitle: "25%",
                };
        }
    };

    return (
        <LayoutWrapper>
            <Promotional />
            <Card className="main-card" bodyStyle={{ padding: "0px" }}>
                <Row gutter={[24, 24]}>
                    {categories.map((category, index) => (
                        <Col
                            xs={24}
                            sm={24}
                            md={index === 2 ? 24 : 12}
                            lg={8}
                            xl={8}
                            key={category.id}
                        >
                            <CategoryCard
                                id={category.id}
                                title={category.title}
                                backgroundImg={category.cover}
                            />
                        </Col>
                    ))}
                </Row>
                <br />
                <br />
                <Title level={2} style={{ fontWeight: 800 }}>
                    DEALS OF THE DAY
                </Title>
                <Row gutter={[24, 24]}>
                    {dealsOfDayProducts.map((product, index) => (
                        <Col
                            xs={24}
                            sm={24}
                            md={12}
                            lg={8}
                            xl={8}
                            key={product.id}
                        >
                            <ProductCard
                                productImg={product.images[0].url}
                                title={product.name}
                                description={product.description}
                                price={product.price}
                                productId={product.id}
                                {...getBadgeProps(index)}
                            />
                        </Col>
                    ))}
                </Row>
                <br />
                <br />
                <Title level={2} style={{ fontWeight: 800 }}>
                    FAST & DELICIOUS
                </Title>
                <Row gutter={[24, 24]}>
                    {fastAndDeliciousProducts.map((product) => (
                        <Col
                            xs={24}
                            sm={24}
                            md={12}
                            lg={12}
                            xl={12}
                            key={product.id}
                        >
                            <ProductCard
                                productImg={product.images[0].url}
                                title={product.name}
                                description={product.description}
                                price={product.price}
                                badgeTitle="taste in less than 30 minutes"
                                productId={product.id}
                            />
                        </Col>
                    ))}
                </Row>
            </Card>
        </LayoutWrapper>
    );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
    const { data: categoryData } = await dataProvider(API_URL).getMany({
        resource: "categories",
        ids: ["1", "2", "3"],
    });

    const { data: productData } = await dataProvider(API_URL).getList({
        resource: "products",
        pagination: {
            pageSize: 5,
        },
    });

    return {
        props: { categories: categoryData, products: productData },
    };
};
