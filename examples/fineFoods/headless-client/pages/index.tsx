import { GetServerSideProps } from "next";
import { LayoutWrapper } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";

import { Promotional, CategoryCard, ProductCard } from "../components";
import { API_URL } from "../constants";
import { ICategory, IProduct } from "../interfaces";

type HomePageProps = {
    categories: ICategory[];
    products: IProduct[];
};

export const Home: React.FC<HomePageProps> = ({ categories, products }) => {
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
            <div className="container mx-auto">
                <Promotional />
                <div className="bg-white p-8 rounded-lg">
                    <div className="grid grid-cols-3 gap-10">
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                id={category.id}
                                title={category.title}
                                backgroundImg={category.cover}
                            />
                        ))}
                    </div>
                    <br />
                    <h1 className="font-extrabold text-gray-800 text-3xl uppercase">
                        Deals of the day
                    </h1>
                    <br />
                    <div className="grid grid-cols-2 gap-4">
                        {dealsOfDayProducts.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                productImg={product.images[0].url}
                                title={product.name}
                                description={product.description}
                                price={product.price}
                                productId={product.id}
                                {...getBadgeProps(index)}
                            />
                        ))}
                    </div>
                    <br />
                    <h1 className="font-extrabold text-gray-800 text-3xl uppercase">
                        Fast & delicious
                    </h1>
                    <br />
                    <div className="grid grid-cols-2 gap-4">
                        {fastAndDeliciousProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                productImg={product.images[0].url}
                                title={product.name}
                                description={product.description}
                                price={product.price}
                                badgeTitle="taste in less than 30 minutes"
                                productId={product.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default Home;

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
