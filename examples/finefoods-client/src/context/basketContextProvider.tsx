import React, { createContext, PropsWithChildren, useReducer } from "react";
import { useMany } from "@refinedev/core";

import { IBasketOrder, IProduct } from "../interfaces";
import { OrdersModalContextProvider } from "@context";

export const BasketContext = createContext<{
    orders: IBasketOrder[];
    dispatch: Function;
    totalPrice: number;
    products: IProduct[];
}>({ orders: [], dispatch: () => null, totalPrice: 0, products: [] });

const initialBasket: IBasketOrder[] = [];

const basketReducer = (
    state: IBasketOrder[],
    action: {
        payload: IBasketOrder;
        type: string;
    },
): IBasketOrder[] => {
    switch (action.type) {
        case "addProduct":
            return [...state, { ...action.payload }];
        case "resetBasket":
            return [];
        default:
            return [];
    }
};
export const BasketContextProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const [orders, dispatch] = useReducer(basketReducer, initialBasket);
    const isBasketHaveOrders = orders.length > 0;

    const productIds = orders
        .map((o) => o.productId)
        .filter((value, index, array) => array.indexOf(value) === index);

    const { data: productsData } = useMany<IProduct>({
        resource: "products",
        ids: productIds,
        queryOptions: {
            enabled: isBasketHaveOrders,
        },
    });

    const totalPrice = orders.reduce((total, currentValue) => {
        const product = productsData?.data.find(
            (value) => value.id === currentValue.productId,
        );

        return total + currentValue.amount * (product?.price ?? 0);
    }, 0);

    return (
        <BasketContext.Provider
            value={{
                orders,
                dispatch,
                totalPrice,
                products: productsData?.data ?? [],
            }}
        >
            <OrdersModalContextProvider>{children}</OrdersModalContextProvider>
        </BasketContext.Provider>
    );
};
