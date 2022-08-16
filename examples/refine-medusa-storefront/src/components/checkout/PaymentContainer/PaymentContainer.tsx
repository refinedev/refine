import React from "react";
import { PaymentSession } from "@medusajs/medusa";
import clsx from "clsx";

import { PaymentStripe } from "@components";
import { Radio } from "@components/common";

type PaymentContainerProps = {
    paymentSession: PaymentSession;
    selected: boolean;
    setSelected: () => void;
    disabled?: boolean;
};

const PaymentInfoMap: Record<string, { title: string; description: string }> = {
    stripe: {
        title: "Credit card",
        description: "Secure payment with credit card",
    },
};

export const PaymentContainer: React.FC<PaymentContainerProps> = ({
    paymentSession,
    selected,
    setSelected,
    disabled = false,
}) => {
    return (
        <div
            className={clsx(
                "flex flex-col gap-y-4 border-b border-gray-200 last:border-b-0",
                {
                    "bg-gray-50": selected,
                },
            )}
        >
            <div className={"py-4 px-8"}>
                <button
                    className="grid grid-cols-[12px_1fr] gap-x-4"
                    onClick={setSelected}
                    disabled={disabled}
                >
                    <Radio checked={selected} />
                    <div className="flex flex-col text-left">
                        <h3 className="text-base-semi leading-none text-gray-900">
                            {PaymentInfoMap[paymentSession.provider_id].title}
                        </h3>
                        <span className="text-small-regular mt-2 text-gray-700">
                            {
                                PaymentInfoMap[paymentSession.provider_id]
                                    .description
                            }
                        </span>
                    </div>
                </button>
                {selected && (
                    <div className="mt-4 w-full">
                        <PaymentElement paymentSession={paymentSession} />
                    </div>
                )}
            </div>
        </div>
    );
};

const PaymentElement = ({
    paymentSession,
}: {
    paymentSession: PaymentSession;
}) => {
    switch (paymentSession.provider_id) {
        case "stripe":
            return (
                <div className="pt-8 pr-7">
                    <PaymentStripe />
                </div>
            );
        default:
            return null;
    }
};
