import { FC, useContext, useLayoutEffect, useState } from "react";
import cn from "clsx";
import {
    CardElement,
    Elements,
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StoreCartsRes, StoreCompleteCartRes } from "@medusajs/medusa";

// import useAddCard from "@framework/customer/card/use-add-item";
import { Button, Text } from "@components/ui";
import { useUI } from "@components/ui/context";
import SidebarLayout from "@components/common/SidebarLayout";

import s from "./PaymentMethodView.module.css";
import { CartContext } from "@lib/context";
import { useCreate } from "@pankod/refine-core";

interface Form extends HTMLFormElement {
    cardHolder: HTMLInputElement;
    cardNumber: HTMLInputElement;
    cardExpireDate: HTMLInputElement;
    cardCvc: HTMLInputElement;
    firstName: HTMLInputElement;
    lastName: HTMLInputElement;
    company: HTMLInputElement;
    streetNumber: HTMLInputElement;
    zipCode: HTMLInputElement;
    city: HTMLInputElement;
    country: HTMLSelectElement;
}

const stripePromise = loadStripe(
    "pk_test_51LSJnfKC5j4fayVQkNNv4SlexKRAK82cUi3lZ4z2mRAvBqtzB0PnBXOL6Z6HKleButtVFXa7kBO0R7IHnx76Pbab007XELtn6c",
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function Form({ clientSecret, cartId }) {
    const stripe = useStripe();
    const elements = useElements();
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
                        onSuccess(data, variables, context) {
                            console.log({ data });
                        },
                    },
                );
            });
    }

    return (
        <form>
            <PaymentElement />
            <button onClick={handlePayment}>Payment</button>
        </form>
    );
}

const PaymentMethodView: FC<{ clientSecret?: string }> = ({ clientSecret }) => {
    const { cartId } = useContext(CartContext);

    return (
        <form className="h-full" onSubmit={() => undefined}>
            <div className="px-4 sm:px-6 flex-1">
                <Text variant="sectionHeading"> Payment Method</Text>

                <div>
                    {clientSecret && (
                        <Elements
                            stripe={stripePromise}
                            options={{
                                clientSecret,
                            }}
                        >
                            <Form clientSecret={clientSecret} cartId={cartId} />
                        </Elements>
                    )}
                </div>
            </div>
        </form>
    );
};

export default PaymentMethodView;
