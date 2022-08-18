import { useRouter } from "next/router";
import { Product } from "@medusajs/medusa";
import { useEffect } from "react";
import {
    IResourceComponentsProps,
    GetListResponse,
    useTable,
} from "@pankod/refine-core";

import { ProductCard } from "@components/product";
import { Grid, Marquee, Hero } from "@components/ui";

export const Dashboard: React.FC<
    IResourceComponentsProps<GetListResponse<Product>>
> = ({ initialData }) => {
    const router = useRouter();
    const { q } = router.query;

    const {
        tableQueryResult: { data },
        setFilters,
    } = useTable({
        resource: "products",
        queryOptions: {
            initialData,
        },
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
                {data?.data.slice(0, 3).map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        variant="slim"
                    />
                ))}
            </Marquee>
            <Hero
                headline=" Dessert dragée halvah croissant."
                description="Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake. "
            />
            <Grid layout="B" variant="filled">
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
            <Marquee>
                {data?.data.slice(3).map((product) => (
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
