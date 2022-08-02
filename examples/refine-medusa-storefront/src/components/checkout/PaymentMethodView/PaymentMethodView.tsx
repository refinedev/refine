import { FC, useContext, useLayoutEffect, useState } from "react";
import cn from "clsx";
import {
    CardElement,
    Elements,
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
            .confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements!.getElement(CardElement) as any,
                    billing_details: {
                        name: "Jenny Rosen",
                        email: "omer@refine.dev",
                        phone: "4158675309",
                        address: {
                            city: "San Francisco",
                            country: "US",
                            line1: "123 Fake St",
                            line2: "Apt B",
                            postal_code: "94102",
                        },
                    },
                },
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
            <CardElement />
            <button onClick={handlePayment}>Submit</button>
        </form>
    );
}

const PaymentMethodView: FC = () => {
    const { setSidebarView } = useUI();
    const [clientSecret, setClientSecret] = useState<string | undefined>();

    const { cartId } = useContext(CartContext);
    const { mutate } = useCreate<StoreCartsRes>();

    useLayoutEffect(() => {
        mutate(
            {
                resource: `carts/${cartId}/payment-sessions`,
                values: {},
            },
            {
                onSuccess: ({ data: { cart } }) => {
                    const isStripeAvailable = cart.payment_sessions?.some(
                        (session) => session.provider_id === "stripe",
                    );
                    if (!isStripeAvailable) {
                        return;
                    }

                    mutate(
                        {
                            resource: `carts/${cartId}/payment-session`,
                            values: { provider_id: "stripe" },
                        },
                        {
                            onSuccess({ data: { cart } }) {
                                setClientSecret(
                                    cart.payment_session?.data
                                        ?.client_secret as string,
                                );
                            },
                        },
                    );
                },
            },
        );
    }, []);

    /*  client.carts.createPaymentSessions(cart.id).then(({ cart }) => {
        //check if stripe is selected
        const isStripeAvailable = cart.payment_sessions?.some(
            (session) => session.provider_id === "stripe",
        );
        if (!isStripeAvailable) {
            return;
        }

        //select stripe payment session
        client.carts
            .setPaymentSession(cart.id, {
                provider_id: "stripe",
            })
            .then(({ cart }) => {
                setClientSecret(cart.payment_session.data.client_secret);
            });
    }); */

    // const addCard = useAddCard();

    // async function handleSubmit(event: React.ChangeEvent<Form>) {
    //     event.preventDefault();

    //     await addCard({
    //         cardHolder: event.target.cardHolder.value,
    //         cardNumber: event.target.cardNumber.value,
    //         cardExpireDate: event.target.cardExpireDate.value,
    //         cardCvc: event.target.cardCvc.value,
    //         firstName: event.target.firstName.value,
    //         lastName: event.target.lastName.value,
    //         company: event.target.company.value,
    //         streetNumber: event.target.streetNumber.value,
    //         zipCode: event.target.zipCode.value,
    //         city: event.target.city.value,
    //         country: event.target.country.value,
    //     });

    //     setSidebarView("CHECKOUT_VIEW");
    // }

    console.log({ clientSecret });

    return (
        <form className="h-full" onSubmit={() => undefined}>
            <SidebarLayout handleBack={() => setSidebarView("CHECKOUT_VIEW")}>
                <div className="px-4 sm:px-6 flex-1">
                    <Text variant="sectionHeading"> Payment Method</Text>
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
                    <div>
                        <div className={s.fieldset}>
                            <label className={s.label}>Cardholder Name</label>
                            <input name="cardHolder" className={s.input} />
                        </div>
                        <div className="grid gap-3 grid-flow-row grid-cols-12">
                            <div className={cn(s.fieldset, "col-span-7")}>
                                <label className={s.label}>Card Number</label>
                                <input name="cardNumber" className={s.input} />
                            </div>
                            <div className={cn(s.fieldset, "col-span-3")}>
                                <label className={s.label}>Expires</label>
                                <input
                                    name="cardExpireDate"
                                    className={s.input}
                                    placeholder="MM/YY"
                                />
                            </div>
                            <div className={cn(s.fieldset, "col-span-2")}>
                                <label className={s.label}>CVC</label>
                                <input name="cardCvc" className={s.input} />
                            </div>
                        </div>
                        <hr className="border-accent-2 my-6" />
                        <div className="grid gap-3 grid-flow-row grid-cols-12">
                            <div className={cn(s.fieldset, "col-span-6")}>
                                <label className={s.label}>First Name</label>
                                <input name="firstName" className={s.input} />
                            </div>
                            <div className={cn(s.fieldset, "col-span-6")}>
                                <label className={s.label}>Last Name</label>
                                <input name="lastName" className={s.input} />
                            </div>
                        </div>
                        <div className={s.fieldset}>
                            <label className={s.label}>
                                Company (Optional)
                            </label>
                            <input name="company" className={s.input} />
                        </div>
                        <div className={s.fieldset}>
                            <label className={s.label}>
                                Street and House Number
                            </label>
                            <input name="streetNumber" className={s.input} />
                        </div>
                        <div className={s.fieldset}>
                            <label className={s.label}>
                                Apartment, Suite, Etc. (Optional)
                            </label>
                            <input className={s.input} name="apartment" />
                        </div>
                        <div className="grid gap-3 grid-flow-row grid-cols-12">
                            <div className={cn(s.fieldset, "col-span-6")}>
                                <label className={s.label}>Postal Code</label>
                                <input name="zipCode" className={s.input} />
                            </div>
                            <div className={cn(s.fieldset, "col-span-6")}>
                                <label className={s.label}>City</label>
                                <input name="city" className={s.input} />
                            </div>
                        </div>
                        <div className={s.fieldset}>
                            <label className={s.label}>Country/Region</label>
                            <select name="country" className={s.select}>
                                <option>Hong Kong</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="sticky z-20 bottom-0 w-full right-0 left-0 py-12 bg-accent-0 border-t border-accent-2 px-6">
                    <Button type="submit" width="100%" variant="ghost">
                        Continue
                    </Button>
                </div>
            </SidebarLayout>
        </form>
    );
};

export default PaymentMethodView;
