import { useOne } from "@refinedev/core";
import { Cart, StoreCartsRes } from "@medusajs/medusa";

interface useCartProps {
    id?: string;
}

export const useCart = ({
    id,
}: useCartProps): {
    cart: Omit<Cart, "refundable_amount" | "refunded_total"> | undefined;
    isFetching: boolean;
} => {
    const { data, isFetching } = useOne<StoreCartsRes>({
        resource: "carts",
        // eslint-disable-next-line
        id: id!,
        queryOptions: {
            enabled: !!id,
        },
    });

    const cart = data?.data.cart;
    return { cart, isFetching };
};
