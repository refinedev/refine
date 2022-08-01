import { LayoutWrapper, useTable } from "@pankod/refine-core";
import { GetServerSideProps } from "next";
import { dataProvider } from "@pankod/refine-medusa";

import Search from "@components/search";

// TODO: fix me
const API_URL = "https://refine-example-storefront.herokuapp.com/store";
const SearchPage: React.FC<{
    handle: string;
    initialData: any;
    collection: any;
}> = ({ initialData, collection }) => {
    const { tableQueryResult } = useTable({
        resource: "products",
        permanentFilter: [
            {
                field: "collection_id",
                operator: "eq",
                value: [collection.id],
            },
        ],
        queryOptions: {
            initialData,
        },
    });

    return (
        <LayoutWrapper>
            <Search products={tableQueryResult?.data?.data} />
        </LayoutWrapper>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;

    const handle = query?.["handle"] as string;

    try {
        const medusaDataProvider = dataProvider(API_URL);
        const collections = await medusaDataProvider.getList({
            resource: "collections",
        });

        const collection = collections.data.find(
            (collection) => collection.handle === handle,
        );
        const data = await medusaDataProvider.getList({
            resource: "products",
            filters: [
                {
                    field: "collection_id",
                    operator: "eq",
                    value: [collection?.id],
                },
            ],
        });

        return {
            props: {
                initialData: data,
                collection: collection,
                handle: handle,
            },
        };
    } catch (error) {
        return { props: { handle } };
    }
};

export default SearchPage;
