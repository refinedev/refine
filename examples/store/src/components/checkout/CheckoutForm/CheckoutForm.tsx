import { Shipping, Addresses, Payment } from "@components";
import { useCartContext } from "@lib/context";

export const CheckoutForm: React.FC = () => {
    const { cart } = useCartContext();

    if (!cart?.id) {
        return null;
    }

    return (
        <div>
            <div className="grid w-full grid-cols-1 gap-y-8">
                <div>
                    <Addresses />
                </div>

                <div>
                    <Shipping cart={cart} />
                </div>

                <div>
                    <Payment />
                </div>
            </div>
        </div>
    );
};
