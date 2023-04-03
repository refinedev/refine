import { useRouter } from "next/router";
import { formatAmount } from "medusa-react";

import { useUI } from "@lib/context";
import {
    CartItem,
    Button,
    Text,
    SidebarLayout,
    SkeletonCartSidebar,
} from "@components";
import { Bag } from "@components/icons";
import { useCartContext } from "@lib/context/";

import s from "./CartSidebarView.module.css";

export const CartSidebarView: React.FC = () => {
    const { closeSidebar } = useUI();
    const router = useRouter();

    const { cart, cartIsFetching } = useCartContext();

    const isEmpty = cart?.items.length === 0;

    const goToCheckout = () => {
        closeSidebar();
        router.push("/checkout");
    };
    const handleClose = () => closeSidebar();

    if (!cart) {
        return null;
    }

    const getAmount = (amount: number | undefined | null) => {
        return formatAmount({
            amount: amount || 0,
            region: cart.region,
        });
    };

    return (
        <SidebarLayout handleClose={handleClose}>
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
                        <Text variant="sectionHeading" onClick={handleClose}>
                            My Cart
                        </Text>
                        <ul className={s.lineItemsList}>
                            {cart.items.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </ul>
                    </div>

                    <div className="bg-accent-0 sticky bottom-0 left-0 right-0 z-20 w-full flex-shrink-0 border-t px-6 py-6 text-sm sm:px-6">
                        <Button
                            Component="a"
                            width="100%"
                            onClick={goToCheckout}
                        >
                            Proceed to Checkout ({getAmount(cart.subtotal)})
                        </Button>
                    </div>
                </>
            )}
        </SidebarLayout>
    );
};
