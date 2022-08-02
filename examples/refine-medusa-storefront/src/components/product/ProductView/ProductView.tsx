import cn from "clsx";
import Image from "next/image";
import s from "./ProductView.module.css";
import { FC } from "react";
// import type { Product } from "@commerce/types/product";
// import usePrice from "@framework/product/use-price";
import { ProductSlider, ProductCard } from "@components/product";
import { Container, Text } from "@components/ui";
import SEO from "@components/common/SEO";
import ProductSidebar from "../ProductSidebar";
import ProductTag from "../ProductTag";
import { currencySymbolFromCode, MedusaProduct } from "../helpers";
interface ProductViewProps {
    product: MedusaProduct; //Product
    relatedProducts: MedusaProduct[]; // Product[]
}

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts }) => {
    const price = product?.variants?.[0].prices?.[1]?.amount; // temporary solution

    return (
        <>
            <Container className="max-w-none w-full" clean>
                <div className={cn(s.root, "fit")}>
                    <div className={cn(s.main, "fit")}>
                        <ProductTag
                            name={product.title}
                            price={`${price} ${currencySymbolFromCode(
                                product?.variants[0].prices[1].currency_code,
                            )}`}
                            fontSize={32}
                        />
                        <div className={s.sliderContainer}>
                            <ProductSlider key={product.id}>
                                {product.images.map((image: any, i: any) => (
                                    <div
                                        key={image.url}
                                        className={s.imageContainer}
                                    >
                                        <Image
                                            className={s.img}
                                            src={image.url!}
                                            alt={image.alt || "Product Image"}
                                            width={600}
                                            height={600}
                                            priority={i === 0}
                                            quality="85"
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
                    />
                </div>
                <hr className="mt-7 border-accent-2" />
                <section className="py-12 px-6 mb-10">
                    <Text variant="sectionHeading">Related Products</Text>
                    <div className={s.relatedProductsGrid}>
                        {relatedProducts
                            .filter((relProd) => relProd.id !== product.id)
                            .map((p: any) => (
                                <div
                                    key={p.id}
                                    className="animated fadeIn bg-accent-0 border border-accent-2"
                                >
                                    <ProductCard
                                        noNameTag
                                        product={p}
                                        key={p.path}
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

export default ProductView;
