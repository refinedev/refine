import React, { useMemo } from "react";
import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
} from "@stripe/react-stripe-js";
import {
    StripeCardCvcElementOptions,
    StripeCardExpiryElementOptions,
    StripeCardNumberElementOptions,
} from "@stripe/stripe-js";

import s from "./PaymentStripe.module.css";

export const PaymentStripe: React.FC = () => {
    const useOptions:
        | StripeCardNumberElementOptions
        | StripeCardExpiryElementOptions
        | StripeCardCvcElementOptions = useMemo(() => {
        return {
            style: {
                base: {
                    fontFamily: "Inter, sans-serif",
                    color: "#424270",
                    padding: "10px 12px",
                    "::placeholder": {
                        color: "#CFD7E0",
                    },
                },
            },
        };
    }, []);

    return (
        <div>
            <div className="relative flex w-full flex-col text-white">
                <CardNumber
                    options={useOptions as StripeCardNumberElementOptions}
                />
                <div className="relative mt-12 flex items-center gap-x-4">
                    <CardExpiry
                        options={useOptions as StripeCardExpiryElementOptions}
                    />
                    <CardCVC
                        options={useOptions as StripeCardCvcElementOptions}
                    />
                </div>
            </div>
        </div>
    );
};

const CardNumber = ({
    options,
}: {
    options: StripeCardNumberElementOptions;
}) => {
    return (
        <div className={s.paymentInput}>
            <span className={s.paymentLabel}>Card number</span>
            <CardNumberElement options={options} />
        </div>
    );
};

const CardExpiry = ({
    options,
}: {
    options: StripeCardExpiryElementOptions;
}) => {
    return (
        <div className={s.paymentInput}>
            <span className={s.paymentLabel}>Expiration date</span>
            <CardExpiryElement options={options} />
        </div>
    );
};

const CardCVC = ({ options }: { options: StripeCardCvcElementOptions }) => {
    return (
        <div className={s.paymentInput}>
            <span className={s.paymentLabel}>CVC</span>
            <CardCvcElement options={{ ...options, placeholder: "123" }} />
        </div>
    );
};
