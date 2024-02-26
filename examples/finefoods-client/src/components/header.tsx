import React from "react";
import Link from "next/link";

import { MotorcycleIcon, FinefoodsIcon, BasketIcon } from "@components";
import { useBasketContext, useOrdesModalContext } from "@hooks";

export const Header: React.FC = () => {
  const { setOrdersModalVisible } = useOrdesModalContext();
  const { orders, totalPrice } = useBasketContext();
  const isBasketHaveOrders = orders.length > 0;

  return (
    <header className="bg-primary sticky top-0 z-50 shadow-md">
      <div className="container flex h-full items-center justify-between px-2 md:px-0">
        <Link href="/" className="flex gap-4">
          <MotorcycleIcon className="hidden md:block" />
          <FinefoodsIcon className="w-32 md:w-48" />
        </Link>
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => setOrdersModalVisible((prev: boolean) => !prev)}
        >
          {isBasketHaveOrders && (
            <div className="text-lg font-semibold text-white">
              {isBasketHaveOrders && `${orders.length} items /`}{" "}
              <span className="text-xl font-extrabold">
                ${totalPrice / 100}
              </span>
            </div>
          )}
          <BasketIcon className="h-6 w-6" />
        </div>
      </div>
    </header>
  );
};
