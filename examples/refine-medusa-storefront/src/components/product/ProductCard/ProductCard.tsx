import { FC } from "react";
import { useNavigation } from "@pankod/refine-core";
import cn from "clsx";
import Link from "next/link";
// import type { Product } from "@commerce/types/product";
import s from "./ProductCard.module.css";
import Image, { ImageProps } from "next/image";
import WishlistButton from "@components/wishlist/WishlistButton";
// import usePrice from "@framework/product/use-price";
import ProductTag from "../ProductTag";

interface Props {
    className?: string;
    product: any; // Product
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
    const { showUrl } = useNavigation();
    // const { price } = usePrice({
    //     amount: product.price.value,
    //     baseAmount: product.price.retailPrice,
    //     currencyCode: product.price.currencyCode!,
    // });

    const price = product?.variants[0].prices[1].amount; // temporary solution

    const rootClassName = cn(
        s.root,
        { [s.slim]: variant === "slim", [s.simple]: variant === "simple" },
        className,
    );

    return (
        <Link href={showUrl("products", product.id)}>
            <a className={rootClassName} aria-label={product.name}>
                {variant === "slim" && (
                    <>
                        <div className={s.header}>
                            <span>{product.name}</span>
                        </div>
                        {product?.images && (
                            <div>
                                <Image
                                    quality="85"
                                    src={
                                        product.images[0]?.url || placeholderImg
                                    }
                                    alt={product.name || "Product Image"}
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
                        {process.env.COMMERCE_WISHLIST_ENABLED && (
                            <WishlistButton
                                className={s.wishlistButton}
                                productId={product.id}
                                variant={product.variants[0]}
                            />
                        )}
                        {!noNameTag && (
                            <div className={s.header}>
                                <h3 className={s.name}>
                                    <span>{product.name}</span>
                                </h3>
                                <div className={s.price}>
                                    {`${price} ${product.price?.currencyCode}`}
                                </div>
                            </div>
                        )}
                        <div className={s.imageContainer}>
                            {product?.images && (
                                <div>
                                    <Image
                                        alt={product.name || "Product Image"}
                                        className={s.productImage}
                                        src={
                                            product.images[0]?.url ||
                                            placeholderImg
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
                        {process.env.COMMERCE_WISHLIST_ENABLED && (
                            <WishlistButton
                                className={s.wishlistButton}
                                productId={product.id}
                                variant={product.variants[0] as any}
                            />
                        )}
                        <ProductTag
                            name={product.name}
                            price={`${price} ${product.price?.currencyCode}`}
                        />
                        <div className={s.imageContainer}>
                            {product?.images && (
                                <div>
                                    <Image
                                        alt={product.name || "Product Image"}
                                        className={s.productImage}
                                        src={
                                            product.images[0]?.url ||
                                            placeholderImg
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
            </a>
        </Link>
    );
};

export default ProductCard;
