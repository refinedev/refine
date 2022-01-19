import React from "react";

import { MotorcycleIcon, FinefoodsIcon, BasketIcon } from "../components/icons";
import { useBasketContext, useOrdesModalContext } from "../hooks";

export const Header: React.FC = () => {
    const { setOrdersModalVisible } = useOrdesModalContext();
    const { orders, totalPrice } = useBasketContext();
    const isBasketHaveOrders = orders.length > 0;

    return (
        <header className="sticky top-0 bg-primary shadow-md z-50">
            <div className="container flex justify-between items-center h-full mx-auto px-2 md:px-0">
                <div className="flex gap-4">
                    <MotorcycleIcon />
                    <FinefoodsIcon width={200} />
                </div>
                <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() =>
                        setOrdersModalVisible((prev: boolean) => !prev)
                    }
                >
                    {isBasketHaveOrders && (
                        <div className="text-white font-semibold text-lg">
                            {isBasketHaveOrders && `${orders.length} items /`}{" "}
                            <span className="font-extrabold text-xl">
                                ${totalPrice / 100}
                            </span>
                        </div>
                    )}
                    <BasketIcon />
                </div>
            </div>
        </header>
    );
};
