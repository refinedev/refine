import cn from "clsx";
import Link from "next/link";
import Image, { ImageProps } from "next/legacy/image";
import { Product } from "@medusajs/medusa";

import { currencySymbolFromCode } from "@components/product/helpers";
import { ProductTag } from "../ProductTag";

import s from "./ProductCard.module.css";

interface ProductCardProps {
    className?: string;
    product: Product;
    noNameTag?: boolean;
    imgProps?: Omit<
        ImageProps,
        "src" | "layout" | "placeholder" | "blurDataURL" | "alt"
    >;
    variant?: "default" | "slim" | "simple";
}

const placeholderImg = "/product-img-placeholder.svg";

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    imgProps,
    className,
    noNameTag = false,
    variant = "default",
}) => {
    const { amount, currency_code } = product?.variants?.[0].prices?.[0];

    const rootClassName = cn(
        s.root,
        { [s.slim]: variant === "slim", [s.simple]: variant === "simple" },
        className,
    );

    return (
        <Link
            href={{
                pathname: "/product/[handle]",
                query: { handle: product.handle },
            }}
            prefetch
            className={rootClassName}
            aria-label={product.title}
        >
            {variant === "slim" && (
                <>
                    <div className={s.header}>
                        <span>{product.title}</span>
                    </div>
                    {product?.images && (
                        <div>
                            <Image
                                quality="100"
                                src={
                                    product.images[0]?.url.replace(
                                        "https://refine-store.fra1.cdn.digitaloceanspaces.com/",
                                        "",
                                    ) || placeholderImg
                                }
                                alt={product.title || "Product Image"}
                                height={320}
                                width={320}
                                layout="fixed"
                                {...imgProps}
                            />
                        </div>
                    )}
                </>
            )}

            {variant === "simple" && (
                <>
                    {!noNameTag && (
                        <div className={s.header}>
                            <h3 className={s.name}>
                                <span>{product.title}</span>
                            </h3>
                            <div className={s.price}>
                                {`${currencySymbolFromCode(
                                    currency_code ?? "USD",
                                )}${amount / 100}`}
                            </div>
                        </div>
                    )}
                    <div className={s.imageContainer}>
                        {product?.images && (
                            <div>
                                <Image
                                    alt={product.title || "Product Image"}
                                    className={s.productImage}
                                    src={
                                        product.images[0]?.url.replace(
                                            "https://refine-store.fra1.cdn.digitaloceanspaces.com/",
                                            "",
                                        ) || placeholderImg
                                    }
                                    height={540}
                                    width={540}
                                    quality="100"
                                    layout="responsive"
                                    {...imgProps}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}

            {variant === "default" && (
                <>
                    <ProductTag
                        name={product.title}
                        price={`${currencySymbolFromCode(
                            currency_code ?? "USD",
                        )}${amount / 100}`}
                    />
                    <div className={s.imageContainer}>
                        {product?.images && (
                            <div>
                                <Image
                                    alt={product.title || "Product Image"}
                                    className={s.productImage}
                                    src={
                                        product.images[0]?.url.replace(
                                            "https://refine-store.fra1.cdn.digitaloceanspaces.com/",
                                            "",
                                        ) || placeholderImg
                                    }
                                    height={540}
                                    width={540}
                                    quality="100"
                                    layout="responsive"
                                    {...imgProps}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </Link>
    );
};
