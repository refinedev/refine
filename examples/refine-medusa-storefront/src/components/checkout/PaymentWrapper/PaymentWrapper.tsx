import React, { PropsWithChildren } from "react";
import { PaymentSession } from "@medusajs/medusa";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";

type WrapperProps = {
    paymentSession?: PaymentSession | null;
};

const Wrapper: React.FC<PropsWithChildren<WrapperProps>> = ({
    paymentSession,
    children,
}) => {
    if (!paymentSession) {
        return <div>{children}</div>;
    }

    switch (paymentSession.provider_id) {
        case "stripe":
            return (
                <StripeWrapper paymentSession={paymentSession}>
                    {children}
                </StripeWrapper>
            );

        default:
            return <div>{children}</div>;
    }
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || "");

const StripeWrapper: React.FC<PropsWithChildren<WrapperProps>> = ({
    paymentSession,
    children,
}) => {
    const options: StripeElementsOptions = {
        clientSecret: paymentSession!.data.client_secret as string | undefined,
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            {children}
        </Elements>
    );
};

export default Wrapper;
