import cn from "clsx";
import Image from "next/legacy/image";
import { FC, useMemo, useState } from "react";
import { Product, ProductVariant } from "@medusajs/medusa";

import { ProductSlider, ProductCard } from "@components/product";
import { Container, Text } from "@components/ui";
import { SEO } from "@components/common";
import { ProductSidebar } from "../ProductSidebar";
import { ProductTag } from "../ProductTag";
import { getProductVariant, SelectedOptions } from "../helpers";
import { useProductPrice } from "@lib/hooks/useProductPrice";

import s from "./ProductView.module.css";

interface ProductViewProps {
    product: Product;
    relatedProducts: Product[];
}

export const ProductView: FC<ProductViewProps> = ({
    product,
    relatedProducts,
}) => {
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

    const variant: ProductVariant | undefined = getProductVariant(
        product,
        selectedOptions,
    );
    const price = useProductPrice({ id: product.id, variantId: variant?.id });

    const selectedPrice = useMemo(() => {
        const { variantPrice, cheapestPrice } = price;

        return variantPrice || cheapestPrice || null;
    }, [price]);

    return (
        <>
            <Container className="w-full max-w-none" clean>
                <div className={cn(s.root, "fit")}>
                    <div className={cn(s.main, "fit")}>
                        <ProductTag
                            name={product.title}
                            price={selectedPrice?.calculated_price}
                            fontSize={32}
                        />
                        <div className={s.sliderContainer}>
                            <ProductSlider key={product.id}>
                                {product.images.map((image, i: number) => (
                                    <div
                                        key={image.url}
                                        className={s.imageContainer}
                                    >
                                        <Image
                                            className={s.img}
                                            src={image.url?.replace(
                                                "https://refine-store.fra1.cdn.digitaloceanspaces.com/",
                                                "",
                                            )}
                                            alt={"Product Image"}
                                            width={600}
                                            height={600}
                                            priority={i === 0}
                                            quality="100"
                                        />
                                    </div>
                                ))}
                            </ProductSlider>
                        </div>
                    </div>

                    <ProductSidebar
                        key={product.id}
                        product={product}
                        className={s.sidebar}
                        selectedOptions={selectedOptions}
                        setSelectedOptions={setSelectedOptions}
                        variant={variant}
                    />
                </div>
                <hr className="border-accent-2 mt-7" />
                <section className="mb-10 px-6 py-12">
                    <Text variant="sectionHeading">Related Products</Text>
                    <div className={s.relatedProductsGrid}>
                        {relatedProducts
                            .filter((relProd) => relProd.id !== product.id)
                            .map((p) => (
                                <div
                                    key={p.id}
                                    className="animated fadeIn bg-accent-0 border-accent-2 border"
                                >
                                    <ProductCard
                                        noNameTag
                                        product={p}
                                        key={p.id}
                                        variant="simple"
                                        className="animated fadeIn"
                                        imgProps={{
                                            width: 300,
                                            height: 300,
                                        }}
                                    />
                                </div>
                            ))}
                    </div>
                </section>
            </Container>
            <SEO
                title={product.title}
                description={product.description || ""}
                openGraph={{
                    type: "website",
                    title: product.title,
                    description: product.description || "",
                    images: [
                        {
                            url: product.images[0]?.url,
                            width: "800",
                            height: "600",
                            alt: product.title,
                        },
                    ],
                }}
            />
        </>
    );
};
