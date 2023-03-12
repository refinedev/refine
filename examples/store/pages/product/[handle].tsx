import {
    useList,
    IResourceComponentsProps,
    GetListResponse,
} from "@refinedev/core";
import { GetServerSideProps } from "next";
import { dataProvider } from "@refinedev/medusa";
import { Product } from "@medusajs/medusa";

import { ProductView } from "@components/product";
import { API_URL } from "@lib/constants";
import { getSearchStaticProps } from "@lib/search-props";
import { MedusaProduct } from "@components/product/helpers";

const ProductShow: React.FC<
    IResourceComponentsProps<GetListResponse<MedusaProduct>> & {
        handle: string;
    }
> = ({ initialData, handle }) => {
    const { data } = useList<MedusaProduct>({
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

    const { data: relatedProducts } = useList<Product>({
        resource: "products",
    });

    return (
        <>
            {record ? (
                <ProductView
                    product={record}
                    relatedProducts={relatedProducts?.data ?? []}
                />
            ) : null}
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;

    const handle = query?.["handle"] as string;

    try {
        const searchStaticProps = await getSearchStaticProps();

        const medusaDataProvider = dataProvider(API_URL);

        const data = await medusaDataProvider.getList<MedusaProduct[]>({
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
