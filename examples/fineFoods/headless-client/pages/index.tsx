import { GetServerSideProps } from "next";
import { LayoutWrapper } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";

import { Promotional, CategoryCard } from "../components";
import { API_URL } from "../constants";
import { ICategory, IProduct } from "../interfaces";

type HomePageProps = {
    categories: ICategory[];
    products: IProduct[];
};

export const Home: React.FC<HomePageProps> = ({ categories }) => {
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
