import {
    IResourceComponentsProps,
    GetListResponse,
    useList,
    useTable,
} from "@pankod/refine-core";

import { ProductCard } from "@components/product";
import { Grid, Marquee, Hero } from "@components/ui";

export const ProductList: React.FC<IResourceComponentsProps<GetListResponse>> =
    () => {
        const { data } = useList<any, any, { melih: number }>({
            resource: "products",
        });

        const dataProducts = useList({
            resource: "products",
            metaData: {
                tags: ["ptag_01G7CDNGXSDSDNNEMCRDEXBDXG"],
            },
        });

        useTable({
            resource: "products",
            initialFilter: [
                {
                    field: "tags",
                    value: ["ptag_01G7CDNGXSDSDNNEMCRDEXBDXG"],
                    operator: "eq",
                },
            ],
        });

        return (
            <>
                <button
                    onClick={() => {
                        undefined;
                    }}
                >
                    create melih customer
                </button>
                <Grid variant="filled">
                    {data?.data.slice(0, 3).map((product: any, i: number) => (
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
                    {data?.data.slice(0, 3).map((product: any, i: number) => (
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
                    {data?.data.slice(0, 3).map((product: any, i: number) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            imgProps={{
                                width: i === 0 ? 1080 : 540,
                                height: i === 0 ? 1080 : 540,
                            }}
                        />
                    ))}
                </Grid>
                <Marquee>
                    {data?.data.slice(3).map((product: any, i: number) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            variant="slim"
                        />
                    ))}
                </Marquee>
                {/* <HomeAllProductsGrid
          newestProducts={data.data}
          categories={categories}
          brands={brands}
        /> */}
            </>
        );
    };
