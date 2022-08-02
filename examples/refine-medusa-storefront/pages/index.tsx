export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";
import { dataProvider } from "@pankod/refine-medusa";
import { GetServerSideProps } from "next";

const API_URL = "https://refine-example-storefront.herokuapp.com/store";
export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const medusaDataProvider = dataProvider(API_URL);

        const products = await medusaDataProvider.getList({
            resource: "products",
        });

        const categories = await medusaDataProvider.getList({
            resource: "collections",
        });

        return {
            props: {
                initialData: products,
                categories,
            },
        };
    } catch (error) {
        console.log(error);
        return { props: {} };
    }
};
