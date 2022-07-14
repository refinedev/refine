import { FC, useState } from "react";
import cn from "clsx";
import Link from "next/link";
import Image from "next/image";
import s from "./WishlistCard.module.css";
import { Trash } from "@components/icons";
import { Button, Text } from "@components/ui";

import { useUI } from "@components/ui/context";
// import type { Product } from "@commerce/types/product";
// import usePrice from "@framework/product/use-price";
// import useAddItem from "@framework/cart/use-add-item";
// import useRemoveItem from "@framework/wishlist/use-remove-item";
// import type { Wishlist } from "@commerce/types/wishlist";

const placeholderImg = "/product-img-placeholder.svg";

const WishlistCard: React.FC<{
    item: any; // WishlistItem
}> = ({ item }) => {
    const product: any = item.product; // Product
    // const { price } = usePrice({
    //     amount: product.price?.value,
    //     baseAmount: product.price?.retailPrice,
    //     currencyCode: product.price?.currencyCode!,
    // });
    const price = product.price?.value; // temporary solution
    // const removeItem = useRemoveItem({ wishlist: { includeProducts: true } });
    const [loading, setLoading] = useState(false);
    const [removing, setRemoving] = useState(false);

    // TODO: fix this missing argument issue
    // const addItem = useAddItem();
    const { openSidebar } = useUI();

    // const handleRemove = async () => {
    //     setRemoving(true);

    //     try {
    //         // If this action succeeds then there's no need to do `setRemoving(true)`
    //         // because the component will be removed from the view
    //         await removeItem({ id: item.id! });
    //     } catch (error) {
    //         setRemoving(false);
    //     }
    // };
    // const addToCart = async () => {
    //     setLoading(true);
    //     try {
    //         await addItem({
    //             productId: String(product.id),
    //             variantId: String(product.variants[0].id),
    //         });
    //         openSidebar();
    //         setLoading(false);
    //     } catch (err) {
    //         setLoading(false);
    //     }
    // };

    return (
        <div
            className={cn(s.root, {
                "opacity-75 pointer-events-none": removing,
            })}
        >
            <div className={s.imageWrapper}>
                <Image
                    width={230}
                    height={230}
                    src={product.images[0]?.url || placeholderImg}
                    alt={product.images[0]?.alt || "Product Image"}
                />
            </div>

            <div className={s.description}>
                <div className="flex-1 mb-6">
                    <h3 className="text-2xl mb-2 -mt-1">
                        <Link href={`/product${product.path}`}>
                            <a>{product.name}</a>
                        </Link>
                    </h3>
                    <div className="mb-4">
                        <Text html={product.description} />
                    </div>
                </div>
                <div>
                    <Button
                        width={260}
                        aria-label="Add to Cart"
                        type="button"
                        onClick={() => undefined} //addToCart function
                        loading={loading}
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
            <div className={s.actions}>
                <div className="flex justify-end font-bold">{price}</div>
                <div className="flex justify-end mt-4 lg:mt-0">
                    <button onClick={() => undefined}>
                        {/* handleRemove function */}
                        <Trash />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WishlistCard;
