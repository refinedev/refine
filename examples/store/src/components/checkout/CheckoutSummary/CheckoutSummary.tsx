import { useCartContext } from "@lib/context";
import { CartTotals, DiscountCode, GiftCard, PaymentButton } from "@components";

export const CheckoutSummary: React.FC = () => {
    const { cart } = useCartContext();

    if (!cart?.id) {
        return null;
    }

    return (
        <div>
            <div className="small:flex-col sticky top-28 flex flex-col-reverse gap-y-8">
                <div className="bg-accent-2 flex w-full flex-col gap-y-6 p-6">
                    <CartTotals cart={cart} />
                    <PaymentButton paymentSession={cart?.payment_session} />
                </div>
                <div className="bg-accent-2 p-6">
                    <DiscountCode cart={cart} />
                </div>
                <GiftCard cart={cart} />
            </div>
        </div>
    );
};
