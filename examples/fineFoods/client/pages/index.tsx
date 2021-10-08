import { GetServerSideProps } from "next";
import { checkAuthentication } from "@pankod/refine-nextjs-router";
import { Row, Col, LayoutWrapper, Card } from "@pankod/refine";

import { authProvider } from "../src/authProvider";
import { CategoryCard } from "@components";

export const HomePage = () => {
    return (
        <LayoutWrapper>
            <Card style={{ borderRadius: "48px", padding: "50px" }}>
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
