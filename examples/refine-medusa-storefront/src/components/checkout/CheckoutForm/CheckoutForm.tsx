import { useCart } from "medusa-react";

import Shipping from "../Shipping";
import Addresses from "../Addresses";
import Payment from "../Payment";

const CheckoutForm: React.FC = () => {
    const { cart } = useCart();

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

export default CheckoutForm;
