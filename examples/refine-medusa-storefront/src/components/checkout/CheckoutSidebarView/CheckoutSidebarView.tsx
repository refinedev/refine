import Link from "next/link";
import { FC, useContext, useState } from "react";
import CartItem from "@components/cart/CartItem";
import { Button, Text } from "@components/ui";
import { useUI } from "@components/ui/context";
import SidebarLayout from "@components/common/SidebarLayout";
// import useCart from "@framework/cart/use-cart";
// import usePrice from "@framework/product/use-price";
// import useCheckout from "@framework/checkout/use-checkout";
import ShippingWidget from "../ShippingWidget";
import PaymentWidget from "../PaymentWidget";
import s from "./CheckoutSidebarView.module.css";
import { useCheckoutContext } from "../context";
import { CartContext } from "@lib/context";
import { useOne } from "@pankod/refine-core";
import { currencySymbolFromCode } from "@components/product/helpers";

const CheckoutSidebarView: FC = () => {
    const { cartId } = useContext(CartContext);

    const { data, isLoading } = useOne({
        resource: `carts`,
        id: cartId ?? "",
    });

    const cart = data?.data.cart;
    const currencyCode = currencySymbolFromCode(
        cart?.region["currency_code"] ?? "",
    );

    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const { setSidebarView, closeSidebar } = useUI();
    // const { data: cartData, mutate: refreshCart } = useCart();
    // const { data: checkoutData, submit: onCheckout } = useCheckout();
    const { clearCheckoutFields } = useCheckoutContext();

    const subTotal = 0;
    const total = 0;

    // async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    //     try {
    //         setLoadingSubmit(true);
    //         event.preventDefault();

    //         await onCheckout();
    //         clearCheckoutFields();
    //         setLoadingSubmit(false);
    //         refreshCart();
    //         closeSidebar();
    //     } catch {
    //         // TODO - handle error UI here.
    //         setLoadingSubmit(false);
    //     }
    // }

    // const { price: subTotal } = usePrice(
    //     cartData && {
    //         amount: Number(cartData.subtotalPrice),
    //         currencyCode: cartData.currency.code,
    //     },
    // );
    // const { price: total } = usePrice(
    //     cartData && {
    //         amount: Number(cartData.totalPrice),
    //         currencyCode: cartData.currency.code,
    //     },
    // );

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

export default CheckoutSidebarView;
