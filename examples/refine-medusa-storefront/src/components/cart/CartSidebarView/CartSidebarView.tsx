import cn from "clsx";
import Link from "next/link";
import { FC, useContext } from "react";
import s from "./CartSidebarView.module.css";
import CartItem from "../CartItem";
import { Button, Text } from "@components/ui";
import { useUI } from "@components/ui/context";
import { Bag, Cross, Check } from "@components/icons";
// import useCart from "@framework/cart/use-cart";
// import usePrice from "@framework/product/use-price";
import SidebarLayout from "@components/common/SidebarLayout";
import { useOne } from "@pankod/refine-core";
import { CartContext } from "@lib/context";
import { currencySymbolFromCode } from "@components/product/helpers";

const CartSidebarView: FC = () => {
    const { closeSidebar, setSidebarView } = useUI();
    // const { data, isLoading, isEmpty } = useCart();

    const { cartId } = useContext(CartContext);

    const { data, isLoading } = useOne({
        resource: `carts`,
        id: cartId,
    });

    const cart = data?.data.cart;
    const currencyCode = currencySymbolFromCode(cart?.region["currency_code"]);

    console.log(`currency`, currencyCode);

    const isEmpty = cart?.items === 0;
    const total = cart?.total;
    const subTotal = cart?.subtotal;

    const handleClose = () => closeSidebar();
    const goToCheckout = () => setSidebarView("CHECKOUT_VIEW");

    const error = null;
    const success = null;

    return (
        <SidebarLayout
            className={cn({
                [s.empty]: error || success || isLoading || isEmpty,
            })}
            handleClose={handleClose}
        >
            {isEmpty ? (
                <div className="flex-1 px-4 flex flex-col justify-center items-center">
                    <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
                        <Bag className="absolute" />
                    </span>
                    <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
                        Your cart is empty
                    </h2>
                    <p className="text-accent-3 px-10 text-center pt-2">
                        Biscuit oat cake wafer icing ice cream tiramisu pudding
                        cupcake.
                    </p>
                </div>
            ) : error ? (
                <div className="flex-1 px-4 flex flex-col justify-center items-center">
                    <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
                        <Cross width={24} height={24} />
                    </span>
                    <h2 className="pt-6 text-xl font-light text-center">
                        We couldn’t process the purchase. Please check your card
                        information and try again.
                    </h2>
                </div>
            ) : success ? (
                <div className="flex-1 px-4 flex flex-col justify-center items-center">
                    <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
                        <Check />
                    </span>
                    <h2 className="pt-6 text-xl font-light text-center">
                        Thank you for your order.
                    </h2>
                </div>
            ) : (
                <>
                    <div className="px-4 sm:px-6 flex-1">
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

                    <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t text-sm">
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
                        <div className="flex justify-between border-t border-accent-2 py-3 font-bold mb-2">
                            <span>Total</span>
                            <span>
                                {currencyCode}
                                {total}
                            </span>
                        </div>
                        <div>
                            {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED ? (
                                <Button
                                    Component="a"
                                    width="100%"
                                    onClick={goToCheckout}
                                >
                                    Proceed to Checkout ({total})
                                </Button>
                            ) : (
                                <Button
                                    href="/checkout"
                                    Component="a"
                                    width="100%"
                                >
                                    Proceed to Checkout
                                </Button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </SidebarLayout>
    );
};

export default CartSidebarView;
