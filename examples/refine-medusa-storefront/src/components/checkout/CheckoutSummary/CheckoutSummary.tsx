import { useCartContext } from "@lib/context";

import CartTotals from "../CardTotals";
import DiscountCode from "../DiscountCode";
import GiftCard from "../GiftCard";
import PaymentButton from "../PaymentButton";

const CheckoutSummary: React.FC = () => {
    const { cart } = useCartContext();
    console.log("cart", cart);

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

export default CheckoutSummary;
