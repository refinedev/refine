import { FC, useState } from "react";
import Link from "next/link";
import { useOne } from "@pankod/refine-core";

import { CartItem, ShippingWidget, PaymentWidget } from "@components";
import { Button, Text } from "@components/ui";
import { useUI } from "@components/ui/context";
import { SidebarLayout } from "@components/common";
import { useCheckoutContext } from "../context";
import { useCartContext } from "@lib/context";
import { currencySymbolFromCode } from "@components/product/helpers";
import s from "./CheckoutSidebarView.module.css";

export const CheckoutSidebarView: FC = () => {
    // TODO: check component usage for remove
    const { cart } = useCartContext();

    const { data, isLoading } = useOne({
        resource: `carts`,
        id: cart?.id ?? "",
    });

    const currencyCode = currencySymbolFromCode(
        cart?.region["currency_code"] ?? "",
    );

    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const { setSidebarView, closeSidebar } = useUI();
    const { clearCheckoutFields } = useCheckoutContext();

    const subTotal = 0;
    const total = 0;

    return (
        <SidebarLayout
            className={s.root}
            handleBack={() => setSidebarView("CART_VIEW")}
        >
            <div className="flex-1 px-4 sm:px-6">
                <Link href="/cart">
                    <Text variant="sectionHeading">Checkout</Text>
                </Link>

                <PaymentWidget
                    isValid={false}
                    onClick={() => setSidebarView("PAYMENT_VIEW")}
                />
                <ShippingWidget
                    isValid={false}
                    onClick={() => setSidebarView("SHIPPING_VIEW")}
                />

                <ul className={s.lineItemsList}>
                    {cart?.items.map((item: any) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            currencyCode={currencyCode}
                            variant="display"
                        />
                    ))}
                </ul>
            </div>

            <form
                onSubmit={() => undefined} // handleSubmit
                className="bg-accent-0 sticky bottom-0 right-0 left-0 z-20 w-full flex-shrink-0 border-t px-6 py-6 text-sm sm:px-6"
            >
                <ul className="pb-2">
                    <li className="flex justify-between py-1">
                        <span>Subtotal</span>
                        <span>{subTotal}</span>
                    </li>
                    <li className="flex justify-between py-1">
                        <span>Taxes</span>
                        <span>Calculated at checkout</span>
                    </li>
                    <li className="flex justify-between py-1">
                        <span>Shipping</span>
                        <span className="font-bold tracking-wide">FREE</span>
                    </li>
                </ul>
                <div className="border-accent-2 mb-2 flex justify-between border-t py-3 font-bold">
                    <span>Total</span>
                    <span>{total}</span>
                </div>
                <div>
                    {/* Once data is correctly filled */}
                    <Button
                        type="submit"
                        width="100%"
                        disabled={true}
                        // !checkoutData?.hasPayment ||
                        // !checkoutData?.hasShipping
                        loading={loadingSubmit}
                    >
                        Confirm Purchase
                    </Button>
                </div>
            </form>
        </SidebarLayout>
    );
};
