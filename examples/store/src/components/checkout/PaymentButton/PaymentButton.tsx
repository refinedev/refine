import React, { useEffect, useState } from "react";
import { PaymentSession } from "@medusajs/medusa";
import { useElements, useStripe } from "@stripe/react-stripe-js";

import { Spinner } from "@components/icons";
import { Button } from "@components";
import { useCartContext, useCheckout } from "@lib/context";

interface PaymentButtonProps {
    paymentSession?: PaymentSession | null;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
    paymentSession,
}) => {
    const [notReady, setNotReady] = useState(true);
    const { cart } = useCartContext();
    const { onPaymentCompleted } = useCheckout();

    useEffect(() => {
        setNotReady(true);

        if (!cart) {
            return;
        }

        if (!cart.shipping_address) {
            return;
        }

        if (!cart.billing_address) {
            return;
        }

        if (!cart.email) {
            return;
        }

        if (cart.shipping_methods.length < 1) {
            return;
        }

        setNotReady(false);
    }, [cart]);

    const handlePayment = () => {
        onPaymentCompleted();
    };

    if (!paymentSession && cart?.total === 0) {
        return <Button onClick={handlePayment}>Checkout</Button>;
    }

    switch (paymentSession?.provider_id) {
        case "stripe":
            return (
                <StripePaymentButton
                    session={paymentSession}
                    notReady={notReady}
                />
            );
        default:
            return <Button disabled>Select a payment method</Button>;
    }
};

const StripePaymentButton = ({
    session,
    notReady,
}: {
    session: PaymentSession;
    notReady: boolean;
}) => {
    const [disabled, setDisabled] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined,
    );

    const { cart } = useCartContext();
    const { onPaymentCompleted } = useCheckout();

    const stripe = useStripe();
    const elements = useElements();
    const card = elements?.getElement("cardNumber");

    useEffect(() => {
        if (!stripe || !elements) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [stripe, elements]);

    const handlePayment = async () => {
        setSubmitting(true);

        if (!stripe || !elements || !card || !cart) {
            setSubmitting(false);
            return;
        }

        await stripe
            .confirmCardPayment(session.data.client_secret as string, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name:
                            cart.billing_address.first_name +
                            " " +
                            cart.billing_address.last_name,
                        address: {
                            city: cart.billing_address.city ?? undefined,
                            country:
                                cart.billing_address.country_code ?? undefined,
                            line1: cart.billing_address.address_1 ?? undefined,
                            line2: cart.billing_address.address_2 ?? undefined,
                            postal_code:
                                cart.billing_address.postal_code ?? undefined,
                            state: cart.billing_address.province ?? undefined,
                        },
                        email: cart.email,
                        phone: cart.billing_address.phone ?? undefined,
                    },
                },
            })
            .then(({ error, paymentIntent }) => {
                if (error) {
                    const pi = error.payment_intent;

                    if (
                        (pi && pi.status === "requires_capture") ||
                        (pi && pi.status === "succeeded")
                    ) {
                        onPaymentCompleted();
                    }

                    setErrorMessage(error.message);
                    return;
                }

                if (
                    (paymentIntent &&
                        paymentIntent.status === "requires_capture") ||
                    paymentIntent.status === "succeeded"
                ) {
                    return onPaymentCompleted();
                }

                return;
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <>
            <Button
                disabled={submitting || disabled || notReady}
                onClick={handlePayment}
            >
                {submitting ? <Spinner /> : "Checkout"}
            </Button>
            {errorMessage && (
                <div className="text-small-regular mt-2 text-red-500">
                    {errorMessage}
                </div>
            )}
        </>
    );
};
