import { useRouter } from "next/router";
import { Product } from "@medusajs/medusa";
import { useEffect } from "react";
import {
    IResourceComponentsProps,
    GetListResponse,
    useTable,
} from "@refinedev/core";

import { ProductCard } from "@components/product";
import { Grid, Marquee, Hero } from "@components/ui";
import { useCartContext } from "@lib/context";

export const Dashboard: React.FC<
    IResourceComponentsProps<GetListResponse<Product>>
> = ({ initialData }) => {
    const router = useRouter();
    const { q } = router.query;
    const { cartId } = useCartContext();

    const {
        tableQueryResult: { data },
        setFilters,
    } = useTable({
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
            {
                field: "tags",
                value: ["ptag_01GCBDFH0EV71KPH85EHWE5EWR"], //homepage tag
                operator: "eq",
            },
        ],
    });

    useEffect(() => {
        setFilters([
            {
                field: "q",
                operator: "eq",
                value: q,
            },
        ]);
    }, [q]);

    return (
        <>
            <Grid variant="filled">
                {data?.data.slice(0, 3).map((product, i: number) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        imgProps={{
                            width: i === 0 ? 1080 : 540,
                            height: i === 0 ? 1080 : 540,
                            priority: true,
                        }}
                    />
                ))}
            </Grid>
            <Marquee variant="secondary">
                {data?.data.slice(0, 10).map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        variant="slim"
                    />
                ))}
            </Marquee>
            <Hero description="Official swag store to buy refine branded t-shirt's, mugs and other merchandise." />
            <Grid layout="B" variant="filled">
                {data?.data.slice(3, 6).map((product, i: number) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        imgProps={{
                            width: i === 0 ? 1080 : 540,
                            height: i === 0 ? 1080 : 540,
                            priority: true,
                        }}
                    />
                ))}
            </Grid>
            <Marquee>
                {data?.data.slice(0, 10).map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        variant="slim"
                    />
                ))}
            </Marquee>
        </>
    );
};
