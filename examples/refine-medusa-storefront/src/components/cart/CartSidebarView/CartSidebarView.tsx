import { FC } from "react";
import cn from "clsx";
import Link from "next/link";

import { CartItem } from "@components";
import { Button, Text } from "@components/ui";
import { useUI } from "@components/ui/context";
import { Bag, Cross } from "@components/icons";
import { SidebarLayout } from "@components/common";
import { currencySymbolFromCode } from "@components/product/helpers";
import { useCartContext } from "@lib/context/";

import s from "./CartSidebarView.module.css";
import SkeletonCartSidebar from "@components/skeletons/SkeletonCartSidebar";

export const CartSidebarView: FC = () => {
    const { closeSidebar, setSidebarView } = useUI();

    const { cart, cartIsFetching } = useCartContext();

    const currencyCode = currencySymbolFromCode(
        cart?.region["currency_code"] ?? "",
    );

    const isEmpty = cart?.items.length === 0;
    const total = cart?.total;
    const subTotal = cart?.subtotal;

    const handleClose = () => closeSidebar();
    const goToCheckout = () => setSidebarView("CHECKOUT_VIEW");

    return (
        <SidebarLayout
            className={cn({
                [s.empty]: isEmpty,
            })}
            handleClose={handleClose}
        >
            {isEmpty && cartIsFetching ? (
                <SkeletonCartSidebar />
            ) : isEmpty ? (
                <div className="flex flex-1 flex-col items-center justify-center px-4">
                    <span className="border-primary bg-secondary text-secondary flex h-16 w-16 items-center justify-center rounded-full border border-dashed p-12">
                        <Bag className="absolute" />
                    </span>
                    <h2 className="pt-6 text-center text-2xl font-bold tracking-wide">
                        Your cart is empty
                    </h2>
                    <p className="text-accent-3 px-10 pt-2 text-center">
                        Biscuit oat cake wafer icing ice cream tiramisu pudding
                        cupcake.
                    </p>
                </div>
            ) : (
                <>
                    <div className="flex-1 px-4 sm:px-6">
                        <Link href="/cart">
                            <Text
                                variant="sectionHeading"
                                onClick={handleClose}
                            >
                                My Cart
                            </Text>
                        </Link>
                        <ul className={s.lineItemsList}>
                            {cart?.items.map((item: any) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    currencyCode={currencyCode}
                                />
                            ))}
                        </ul>
                    </div>

                    <div className="bg-accent-0 sticky bottom-0 right-0 left-0 z-20 w-full flex-shrink-0 border-t px-6 py-6 text-sm sm:px-6">
                        <ul className="pb-2">
                            <li className="flex justify-between py-1">
                                <span>Subtotal</span>
                                <span>
                                    {currencyCode}
                                    {subTotal}
                                </span>
                            </li>
                            <li className="flex justify-between py-1">
                                <span>Taxes</span>
                                <span>Calculated at checkout</span>
                            </li>
                            <li className="flex justify-between py-1">
                                <span>Shipping</span>
                                <span className="font-bold tracking-wide">
                                    FREE
                                </span>
                            </li>
                        </ul>
                        <div className="border-accent-2 mb-2 flex justify-between border-t py-3 font-bold">
                            <span>Total</span>
                            <span>
                                {currencyCode}
                                {total}
                            </span>
                        </div>
                        <div>
                            <Button
                                Component="a"
                                width="100%"
                                onClick={goToCheckout}
                            >
                                Proceed to Checkout ({total})
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </SidebarLayout>
    );
};
