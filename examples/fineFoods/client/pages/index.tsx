import { GetServerSideProps } from "next";
import { checkAuthentication } from "@pankod/refine-nextjs-router";
import { Row, Col, LayoutWrapper, Card, Typography } from "@pankod/refine";

import { authProvider } from "../src/authProvider";
import { CategoryCard, ProductCard } from "@components";

const { Title } = Typography;

export const HomePage: React.FC = () => {
    return (
        <LayoutWrapper>
            <Card className="main-card" bodyStyle={{ padding: "0px" }}>
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <CategoryCard
                            title="Staters"
                            backgroundImg="https://food-images.files.bbci.co.uk/food/recipes/dirty_veggie_starter_89235_16x9.jpg"
                        />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <CategoryCard
                            title="Pastas"
                            backgroundImg="https://post.healthline.com/wp-content/uploads/2020/09/variety-of-pasta-1296x728-1-1200x628.jpg"
                        />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                        <CategoryCard
                            title="Pizzas"
                            backgroundImg="https://www.oggusto.com/uploads/images/custom/14175-kategori.jpg"
                        />
                    </Col>
                </Row>
                <br />
                <br />
                <Title level={2} style={{ fontWeight: 800 }}>
                    DEALS OF THE DAY
                </Title>
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <ProductCard
                            productImg="https://food-images.files.bbci.co.uk/food/recipes/dirty_veggie_starter_89235_16x9.jpg"
                            title="Cheese and Tomato"
                            badgeTitle="1+1"
                            description="based on the “Pines of Rome” classic"
                            price="10.95$"
                        />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <ProductCard
                            productImg="https://post.healthline.com/wp-content/uploads/2020/09/variety-of-pasta-1296x728-1-1200x628.jpg"
                            title="Fettuccine Alfredo"
                            badgeTitle="25%"
                            description="Egg Noodles in Cream Sauce and Parmesan Cheese"
                            price="10.95$"
                        />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                        <ProductCard
                            productImg="https://www.oggusto.com/uploads/images/custom/14175-kategori.jpg"
                            title="Black Forest Ham"
                            badgeTitle="FREE BEVERAGE"
                            description="Egg Noodles in Cream Sauce and Parmesan Cheese"
                            price="10.95$"
                        />
                    </Col>
                </Row>
                <br />
                <br />
                <Title level={2} style={{ fontWeight: 800 }}>
                    FAST & DELICIOUS
                </Title>
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <ProductCard
                            productImg="https://www.oggusto.com/uploads/images/custom/14175-kategori.jpg"
                            title="Cheese and Tomato"
                            badgeTitle="taste in less than 30 minutes"
                            description="based on the “Pines of Rome” classic"
                            price="10.95$"
                        />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <ProductCard
                            productImg="https://food-images.files.bbci.co.uk/food/recipes/dirty_veggie_starter_89235_16x9.jpg"
                            title="Cheese and Tomato"
                            badgeTitle="taste in less than 30 minutes"
                            description="based on the “Pines of Rome” classic"
                            price="10.95$"
                        />
                    </Col>
                </Row>
            </Card>
        </LayoutWrapper>
    );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { isAuthenticated, redirect } = await checkAuthentication(
        authProvider,
        context,
    );

    if (!isAuthenticated) {
        return { redirect };
    }

    return {
        props: {},
    };
};
