import { useCartContext } from "@lib/context";
import { CartTotals, DiscountCode, GiftCard, PaymentButton } from "@components";

export const CheckoutSummary: React.FC = () => {
    const { cart } = useCartContext();

    if (!cart?.id) {
        return null;
    }

    return (
        <div className="small:flex-col sticky top-0 flex flex-col-reverse gap-y-8">
            <div className="flex w-full flex-col gap-y-6 bg-white p-6">
                <CartTotals cart={cart} />
                <PaymentButton paymentSession={cart?.payment_session} />
            </div>
            <div className="bg-white p-6">
                <DiscountCode cart={cart} />
            </div>
            <GiftCard cart={cart} />
        </div>
    );
};
