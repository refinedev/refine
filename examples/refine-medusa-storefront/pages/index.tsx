import { GetServerSideProps } from "next";
export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";
import { dataProvider } from "@pankod/refine-medusa";
import { Product } from "@medusajs/medusa";
import nookies from "nookies";

import { getSearchStaticProps } from "@lib/search-props";
import { API_URL } from "@lib/constants";
import { CART_KEY } from "@lib/context";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = nookies.get(context);

    try {
        const searchProps = await getSearchStaticProps();
        const medusaDataProvider = dataProvider(API_URL);

        const products = await medusaDataProvider.getList<Product>({
            resource: "products",
            filters: [
                {
                    field: "cart_id",
                    value: cookies[CART_KEY],
                    operator: "eq",
                },
            ],
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
