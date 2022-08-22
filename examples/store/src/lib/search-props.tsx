import type { InferGetStaticPropsType } from "next";
import { dataProvider } from "@pankod/refine-medusa";

const API_URL = "https://refine-example-storefront.herokuapp.com/store";

export async function getSearchStaticProps() {
    const medusaDataProvider = dataProvider(API_URL);

    const categories = await medusaDataProvider.getList({
        resource: "collections",
    });

    return {
        props: {
            categories,
        },
        revalidate: 200,
    };
}

export type SearchPropsType = InferGetStaticPropsType<
    typeof getSearchStaticProps
>;
