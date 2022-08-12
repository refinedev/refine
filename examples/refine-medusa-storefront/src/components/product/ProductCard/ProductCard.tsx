import { FC } from "react";
import cn from "clsx";
import Link from "next/link";
import Image, { ImageProps } from "next/image";
import { Product } from "@medusajs/medusa";

import { currencySymbolFromCode } from "@components/product/helpers";
import ProductTag from "../ProductTag";
import s from "./ProductCard.module.css";

interface Props {
    className?: string;
    product: Product;
    noNameTag?: boolean;
    imgProps?: Omit<
        ImageProps,
        "src" | "layout" | "placeholder" | "blurDataURL"
    >;
    variant?: "default" | "slim" | "simple";
}

const placeholderImg = "/product-img-placeholder.svg";

const ProductCard: FC<Props> = ({
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
            href={`/product/${product.handle}`}
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
                                quality="85"
                                src={product.images[0]?.url || placeholderImg}
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
                                {`${amount / 100} ${currencySymbolFromCode(
                                    currency_code ?? "USD",
                                )}`}
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
                                        product.images[0]?.url || placeholderImg
                                    }
                                    height={540}
                                    width={540}
                                    quality="85"
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
                        price={`${amount / 100} ${currencySymbolFromCode(
                            currency_code ?? "USD",
                        )}`}
                    />
                    <div className={s.imageContainer}>
                        {product?.images && (
                            <div>
                                <Image
                                    alt={product.title || "Product Image"}
                                    className={s.productImage}
                                    src={
                                        product.images[0]?.url || placeholderImg
                                    }
                                    height={540}
                                    width={540}
                                    quality="85"
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

export default ProductCard;
