import { useContext, useEffect } from "react";
import {
    useList,
    useCreate,
    LayoutWrapper,
    IResourceComponentsProps,
    GetListResponse,
} from "@pankod/refine-core";
import { GetServerSideProps } from "next";
import { dataProvider } from "@pankod/refine-medusa";

import { CartContext } from "@lib/context";
import { ProductView } from "@components/product";
import { getSearchStaticProps } from "@lib/search-props";

const API_URL = "https://refine-example-storefront.herokuapp.com/store";
const ProductShow: React.FC<
    IResourceComponentsProps<GetListResponse> & { handle: string }
> = ({ initialData, handle }) => {
    const { data } = useList({
        resource: "products",
        queryOptions: {
            initialData,
        },
        config: {
            filters: [
                {
                    field: "handle",
                    operator: "eq",
                    value: handle,
                },
            ],
        },
    });

    const record = data?.data?.[0];

    const { data: relatedProducts } = useList({
        resource: "products",
    });

    const { cartId, setCartId, isCartIdLoading } = useContext(CartContext);
    const { mutate, data: cartData } = useCreate();

    useEffect(() => {
        if (!isCartIdLoading && cartId === "") {
            mutate(
                {
                    resource: "carts",
                    values: {},
                },
                {
                    onSuccess: () => {
                        if (cartData) {
                            setCartId(cartData?.data.cart?.id);
                        }
                    },
                },
            );
        }
    }, []);

    return (
        <LayoutWrapper>
            {record ? (
                <ProductView
                    product={record as any}
                    relatedProducts={relatedProducts?.data ?? ([] as any)}
                />
            ) : null}
        </LayoutWrapper>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;

    const handle = query?.["handle"] as string;

    try {
        const searchStaticProps = await getSearchStaticProps();

        const medusaDataProvider = dataProvider(API_URL);

        const data = await medusaDataProvider.getList({
            resource: "products",
            filters: [
                {
                    field: "handle",
                    operator: "eq",
                    value: handle,
                },
            ],
        });

        return {
            props: {
                initialData: data,
                handle: handle,
                ...searchStaticProps.props,
            },
        };
    } catch (error) {
        return { props: { handle } };
    }
};

export default ProductShow;
