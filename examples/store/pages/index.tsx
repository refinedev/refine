import { GetServerSideProps } from "next";
export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";
import { dataProvider } from "@pankod/refine-medusa";
import { Product, StoreCartsRes } from "@medusajs/medusa";
import nookies from "nookies";

import { getSearchStaticProps } from "@lib/search-props";
import { API_URL } from "@lib/constants";
import { CART_KEY } from "@lib/context";

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

        nookies.set(context, CART_KEY, data.cart.id);
        nookies.set(
            context,
            "medusa_region",
            JSON.stringify({
                regionId: data.cart.region.id,
                countryCode:
                    region?.countryCode ?? data.cart.region.countries[0].iso_2,
            }),
        );

        return data.cart;
    };

    try {
        const searchProps = await getSearchStaticProps();

        const cartId = cookies[CART_KEY];

        if (!cartId) {
            const cart = await createNewCart();

            const products = await medusaDataProvider.getList<Product>({
                resource: "products",
                filters: [
                    {
                        field: "cart_id",
                        value: cart.id,
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
        }

        return { props: {} };
    } catch (error) {
        return { props: {} };
    }
};
