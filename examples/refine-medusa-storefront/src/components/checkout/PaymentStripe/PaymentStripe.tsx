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
            <div className="relative flex w-full flex-col pb-6">
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
        <div className="relative border-b border-gray-200 py-2">
            <span className="text-base-regular absolute -top-6 text-gray-700">
                Card number
            </span>
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
        <div className="relative w-full border-b border-gray-200 py-2">
            <span className="text-base-regular absolute -top-6 text-gray-700">
                Expiration date
            </span>
            <CardExpiryElement options={options} />
        </div>
    );
};

const CardCVC = ({ options }: { options: StripeCardCvcElementOptions }) => {
    return (
        <div className="relative w-full border-b border-gray-200 py-2">
            <span className="text-base-regular absolute -top-6 text-gray-700">
                CVC
            </span>
            <CardCvcElement options={{ ...options, placeholder: "123" }} />
        </div>
    );
};
