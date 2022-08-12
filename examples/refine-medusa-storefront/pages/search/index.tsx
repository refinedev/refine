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

import Search from "@components/search";
import { getSearchStaticProps } from "@lib/search-props";

const SearchPage: React.FC<IResourceComponentsProps<GetListResponse<Product>>> =
    ({ initialData }) => {
        const router = useRouter();
        const { q } = router.query;

        const { tableQueryResult } = useTable<Product>({
            resource: "products",
            queryOptions: {
                initialData,
            },
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

const API_URL = "https://refine-example-storefront.herokuapp.com/store";
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
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
