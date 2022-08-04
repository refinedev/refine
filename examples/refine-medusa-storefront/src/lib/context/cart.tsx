import { BaseRecord, CreateResponse, useCreate } from "@pankod/refine-core";
import React, { createContext } from "react";

type CartProviderProps = {
    children: React.ReactNode;
};

type CartContextType = {
    addToCart?: (payload: AddToCartType) => Promise<CreateResponse<BaseRecord>>;
    isLoading?: boolean;
    cartId?: string;
};

type AddToCartType = {
    variantId: string;
    quantity?: number;
};
export const CartContext = createContext<CartContextType>({});

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    let cartId: string | undefined =
        typeof window !== "undefined"
            ? localStorage.getItem("cartId") ?? undefined
            : undefined;

    const { mutateAsync, isLoading } = useCreate();

    const addToCart = async ({ variantId, quantity = 1 }: AddToCartType) => {
        if (cartId === undefined) {
            // create cart

            const data = await mutateAsync({
                resource: "carts",
                values: {},
            });

            if (data?.data.cart?.id !== undefined) {
                cartId = data?.data.cart?.id;
                localStorage?.setItem("cartId", cartId!);
            }
        }

        return await mutateAsync({
            resource: `carts/${cartId}/line-items`,
            values: {
                variant_id: variantId,
                quantity: quantity,
            },
        });
    };

    return (
        <CartContext.Provider value={{ addToCart, isLoading, cartId }}>
            {children}
        </CartContext.Provider>
    );
};
