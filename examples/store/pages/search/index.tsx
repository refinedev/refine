import {
    GetListResponse,
    IResourceComponentsProps,
    useTable,
} from "@refinedev/core";
import { dataProvider } from "@refinedev/medusa";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Product, StoreCartsRes } from "@medusajs/medusa";
import nookies from "nookies";

import Search from "@components/search";
import { getSearchStaticProps } from "@lib/search-props";
import { CART_KEY, useCartContext } from "@lib/context";
import { API_URL } from "@lib/constants";

const SearchPage: React.FC<
    IResourceComponentsProps<GetListResponse<Product>>
> = ({ initialData }) => {
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
        hasPagination: false,
    });

    return <Search products={tableQueryResult?.data?.data} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = nookies.get(context);
    const { query } = context;

    const medusaDataProvider = dataProvider(API_URL);

    const getRegion = () => {
        const region = cookies["medusa_region"];

        if (region) {
            return JSON.parse(region) as {
                regionId: string;
                countryCode: string;
            };
        }
        return null;
    };

    const createNewCart = async () => {
        const region = getRegion();

        const { data } = await medusaDataProvider.create<StoreCartsRes>({
            resource: "carts",
            variables: {
                region_id: region?.regionId,
            },
        });

        nookies.set(context, CART_KEY, data.cart.id, {
            path: "/",
        });
        nookies.set(
            context,
            "medusa_region",
            JSON.stringify({
                regionId: data.cart.region.id,
                countryCode:
                    region?.countryCode ?? data.cart.region.countries[0].iso_2,
            }),
            {
                path: "/",
            },
        );

        return data.cart.id;
    };

    try {
        const searchStaticProps = await getSearchStaticProps();

        const { q } = query;
        let cartId = cookies[CART_KEY];

        if (!cartId) {
            cartId = await createNewCart();
        }
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
                    value: cartId,
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
