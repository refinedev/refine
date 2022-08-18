import { GetServerSideProps } from "next";
export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";
import { dataProvider } from "@pankod/refine-medusa";
import { Product } from "@medusajs/medusa";

import { getSearchStaticProps } from "@lib/search-props";
import { API_URL } from "@lib/constants";

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const searchProps = await getSearchStaticProps();
        const medusaDataProvider = dataProvider(API_URL);

        const products = await medusaDataProvider.getList<Product>({
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
