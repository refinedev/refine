import { GetServerSideProps } from "next";
export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";
import { dataProvider } from "@pankod/refine-medusa";

import { getSearchStaticProps } from "@lib/search-props";
import { MedusaProduct } from "@interfaces";

const API_URL = "https://refine-example-storefront.herokuapp.com/store";
export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const searchProps = await getSearchStaticProps();
        const medusaDataProvider = dataProvider(API_URL);

        const products = await medusaDataProvider.getList<MedusaProduct>({
            resource: "products",
        });

        return {
            props: {
                initialData: products,
                ...searchProps.props,
            },
        };
    } catch (error) {
        return { props: {} };
    }
};
