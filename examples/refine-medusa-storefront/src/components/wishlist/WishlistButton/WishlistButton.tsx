import React, { FC, useState } from "react";
import cn from "clsx";
import { useUI } from "@components/ui";
import { Heart } from "@components/icons";
// import useAddItem from "@framework/wishlist/use-add-item";
// import useCustomer from "@framework/customer/use-customer";
// import useWishlist from "@framework/wishlist/use-wishlist";
// import useRemoveItem from "@framework/wishlist/use-remove-item";
import s from "./WishlistButton.module.css";
// import type { Product, ProductVariant } from "@commerce/types/product";

type Props = {
    productId: any["id"]; // Product["id"]
    variant: any; //ProductVariant
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const WishlistButton: FC<Props> = ({
    productId,
    variant,
    className,
    ...props
}) => {
    // const { data } = useWishlist();
    // const addItem = useAddItem();
    // const removeItem = useRemoveItem();
    // const { data: customer } = useCustomer();
    const { openModal, setModalView } = useUI();
    const [loading, setLoading] = useState(false);

    // const itemInWishlist = data?.items?.find(
    //     (item) =>
    //         item.product_id === Number(productId) &&
    //         item.variant_id === Number(variant.id),
    // );

    // const handleWishlistChange = async (e: any) => {
    //     e.preventDefault();

    //     if (loading) return;

    //     // A login is required before adding an item to the wishlist
    //     if (!customer) {
    //         setModalView("LOGIN_VIEW");
    //         return openModal();
    //     }

    //     setLoading(true);

    //     try {
    //         if (itemInWishlist) {
    //             await removeItem({ id: itemInWishlist.id! });
    //         } else {
    //             await addItem({
    //                 productId,
    //                 variantId: variant?.id!,
    //             });
    //         }

    //         setLoading(false);
    //     } catch (err) {
    //         setLoading(false);
    //     }
    // };

    return (
        <button
            aria-label="Add to wishlist"
            className={cn(s.root, className)}
            onClick={() => undefined} //handleWishlistChange
            {...props}
        >
            <Heart
                className={cn(s.icon, {
                    [s.loading]: loading,
                    [s.inWishlist]: [], //itemInWishlist
                })}
            />
        </button>
    );
};

export default WishlistButton;
