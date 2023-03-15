import { GetListResponse, useTable } from "@refinedev/core";
import { GetServerSideProps } from "next";
import { dataProvider } from "@refinedev/medusa";
import { Product, ProductCollection } from "@medusajs/medusa";
import nookies from "nookies";

import Search from "@components/search";
import { getSearchStaticProps } from "@lib/search-props";
import { CART_KEY, useCartContext } from "@lib/context";
import { API_URL } from "@lib/constants";

const SearchPage: React.FC<{
    handle: string;
    initialData: GetListResponse<Product>;
    collection: ProductCollection;
}> = ({ initialData, collection }) => {
    const { cartId } = useCartContext();

    const { tableQueryResult } = useTable<Product>({
        resource: "products",
        initialFilter: [
            {
                field: "cart_id",
                value: cartId,
                operator: "eq",
            },
        ],
        permanentFilter: [
            {
                field: "collection_id",
                operator: "eq",
                value: [collection.id],
            },
        ],
        queryOptions: {
            initialData,
            keepPreviousData: false,
        },
        hasPagination: false,
    });

    return <Search products={tableQueryResult?.data?.data} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = nookies.get(context);
    const { query } = context;

    const handle = query?.["handle"] as string;

    try {
        const searchStaticProps = await getSearchStaticProps();

        const medusaDataProvider = dataProvider(API_URL);
        const collections = await medusaDataProvider.getList<ProductCollection>(
            {
                resource: "collections",
            },
        );

        const collection = collections.data.find(
            (collection) => collection.handle === handle,
        );
        const data = await medusaDataProvider.getList<Product[]>({
            resource: "products",
            filters: [
                {
                    field: "collection_id",
                    operator: "eq",
                    value: [collection?.id],
                },
                {
                    field: "cart_id",
                    value: cookies[CART_KEY],
                    operator: "eq",
                },
            ],
        });

        return {
            props: {
                initialData: data,
                collection: collection,
                handle: handle,
                ...searchStaticProps.props,
            },
        };
    } catch (error) {
        return { props: { handle } };
    }
};

export default SearchPage;
