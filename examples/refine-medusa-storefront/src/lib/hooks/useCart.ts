import { useOne } from "@pankod/refine-core";
import { Cart, StoreCartsRes } from "@medusajs/medusa";

interface useCartProps {
    id?: string;
}

const useCart = ({
    id,
}: useCartProps): {
    cart: Omit<Cart, "refundable_amount" | "refunded_total"> | undefined;
} => {
    const { data } = useOne<StoreCartsRes>({
        resource: "carts",
        id: id!,
        queryOptions: {
            enabled: !!id,
        },
    });

    const cart = data?.data.cart;
    return { cart };
};

export default useCart;
