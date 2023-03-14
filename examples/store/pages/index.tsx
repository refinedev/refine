import { GetServerSideProps } from "next";
import { GetListResponse } from "@refinedev/core";
import { dataProvider } from "@refinedev/medusa";
import { Product, StoreCartsRes } from "@medusajs/medusa";
import nookies from "nookies";

import { Dashboard } from "@components";
import { getSearchStaticProps } from "@lib/search-props";
import { API_URL } from "@lib/constants";
import { CART_KEY } from "@lib/context";

const Home: React.FC<{ initialData: GetListResponse<Product> }> = ({
    initialData,
}) => <Dashboard initialData={initialData} />;

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = nookies.get(context);

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
        const searchProps = await getSearchStaticProps();

        let cartId = cookies[CART_KEY];

        if (!cartId) {
            cartId = await createNewCart();
        }

        const products = await medusaDataProvider.getList<Product>({
            resource: "products",
            filters: [
                {
                    field: "cart_id",
                    value: cartId,
                    operator: "eq",
                },
                {
                    field: "tags",
                    value: ["ptag_01GCBDFH0EV71KPH85EHWE5EWR"], //homepage tag
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
