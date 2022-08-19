import {
    GetListResponse,
    IResourceComponentsProps,
    LayoutWrapper,
    useTable,
} from "@pankod/refine-core";
import { dataProvider } from "@pankod/refine-medusa";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Product } from "@medusajs/medusa";
import nookies from "nookies";

import Search from "@components/search";
import { getSearchStaticProps } from "@lib/search-props";
import { CART_KEY, useCartContext } from "@lib/context";
import { API_URL } from "@lib/constants";

const SearchPage: React.FC<IResourceComponentsProps<GetListResponse<Product>>> =
    ({ initialData }) => {
        const router = useRouter();
        const { q } = router.query;
        const { cartId } = useCartContext();

        const { tableQueryResult } = useTable<Product>({
            resource: "products",
            queryOptions: {
                initialData,
            },
            initialFilter: [
                {
                    field: "cart_id",
                    value: cartId,
                    operator: "eq",
                },
            ],
            permanentFilter: [
                {
                    field: "q",
                    operator: "eq",
                    value: q,
                },
            ],
        });

        return (
            <LayoutWrapper>
                <Search products={tableQueryResult?.data?.data} />
            </LayoutWrapper>
        );
    };

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = nookies.get(context);
    const { query } = context;

    try {
        const searchStaticProps = await getSearchStaticProps();

        const { q } = query;

        const medusaDataProvider = dataProvider(API_URL);

        const data = await medusaDataProvider.getList<Product>({
            resource: "products",
            filters: [
                {
                    field: "q",
                    operator: "eq",
                    value: q,
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
                ...searchStaticProps.props,
            },
        };
    } catch (error) {
        return { props: {} };
    }
};

export default SearchPage;
