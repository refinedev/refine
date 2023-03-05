import type { InferGetStaticPropsType } from "next";
import { dataProvider } from "@refinedev/medusa";

import { API_URL } from "./constants";

export const getSearchStaticProps = async () => {
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
};

export type SearchPropsType = InferGetStaticPropsType<
    typeof getSearchStaticProps
>;
