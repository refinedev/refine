import { GetServerSideProps } from "next";
import dataProvider from "@refinedev/simple-rest";

import { Promotional, CategoryCard, ProductCard } from "@components";
import { ICategory, IProduct } from "@interfaces";
import { API_URL } from "src/constants";

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
        <div className="container">
            <Promotional />
            <div className="rounded-lg bg-white p-4 md:p-8">
                <div className="flex flex-wrap justify-center md:justify-between">
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
                <h1 className="text-3xl font-extrabold uppercase text-gray-800">
                    Deals of the day
                </h1>
                <br />
                <div className="flex flex-wrap">
                    {dealsOfDayProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className={
                                index === 2
                                    ? "w-full lg:w-1/3"
                                    : "w-full md:w-1/2 lg:w-1/3"
                            }
                        >
                            <ProductCard
                                productImg={product.images[0].url}
                                title={product.name}
                                description={product.description}
                                price={product.price}
                                productId={product.id}
                                {...getBadgeProps(index)}
                            />
                        </div>
                    ))}
                </div>
                <br />
                <h1 className="text-3xl font-extrabold uppercase text-gray-800">
                    Fast & delicious
                </h1>
                <br />
                <div className="flex flex-wrap">
                    {fastAndDeliciousProducts.map((product) => (
                        <div key={product.id} className="w-full md:w-1/2">
                            <ProductCard
                                productImg={product.images[0].url}
                                title={product.name}
                                description={product.description}
                                price={product.price}
                                badgeTitle="taste in less than 30 minutes"
                                productId={product.id}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
    const { data: categoryData } = (await dataProvider(API_URL).getMany?.({
        resource: "categories",
        ids: ["1", "2", "3"],
    })) ?? { data: [] };

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
