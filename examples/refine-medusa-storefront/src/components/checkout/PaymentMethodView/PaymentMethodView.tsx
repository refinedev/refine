import { useContext } from "react";
import {
    Elements,
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StoreCompleteCartRes } from "@medusajs/medusa";
import { useCreate } from "@pankod/refine-core";

import { Button, Text } from "@components/ui";
import { ArrowLeft } from "@components/icons";
import { CartContext } from "@lib/context";

import s from "./PaymentMethodView.module.css";

const stripePromise = loadStripe(
    "pk_test_51LSJnfKC5j4fayVQkNNv4SlexKRAK82cUi3lZ4z2mRAvBqtzB0PnBXOL6Z6HKleButtVFXa7kBO0R7IHnx76Pbab007XELtn6c",
);

interface PaymentMethodViewProps {
    clientSecret?: string;
    goBack: () => void;
}

const StripeForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();

    const { cartId } = useContext(CartContext);
    const { mutate } = useCreate<StoreCompleteCartRes>();

    async function handlePayment(e: { preventDefault: () => void }) {
        e.preventDefault();

        stripe!
            .confirmPayment({
                elements: elements!,
                redirect: "if_required",
            })
            .then(({ error, paymentIntent }) => {
                //TODO handle errors
                mutate(
                    {
                        resource: `carts/${cartId}/complete`,
                        values: {},
                    },
                    {
                        onSuccess(data) {
                            console.log({ data });
                        },
                    },
                );
            });
    }

    return (
        <div className="flex flex-col gap-4">
            <PaymentElement />
            <div className="flex justify-end">
                <Button variant="slim" onClick={handlePayment}>
                    Payment
                </Button>
            </div>
        </div>
    );
};

const PaymentMethodView: React.FC<PaymentMethodViewProps> = ({
    clientSecret,
    goBack,
}) => {
    return (
        <>
            <Text variant="pageHeading" className="flex items-center gap-2">
                <button
                    aria-label="Previous Section"
                    className={s.leftArrow}
                    onClick={goBack}
                >
                    <ArrowLeft />
                </button>
                Payment Method
            </Text>

            <div>
                {clientSecret && (
                    <Elements
                        stripe={stripePromise}
                        options={{
                            clientSecret,
                        }}
                    >
                        <StripeForm />
                    </Elements>
                )}
            </div>
        </>
    );
};

export default PaymentMethodView;
