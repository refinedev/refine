import React from "react";
import { PaymentSession } from "@medusajs/medusa";
import cn from "clsx";

import { PaymentStripe, Radio } from "@components";

interface PaymentContainerProps {
    paymentSession: PaymentSession;
    selected: boolean;
    setSelected: () => void;
    disabled?: boolean;
}

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
            className={cn(
                "border-accent-3 flex flex-col gap-y-4 border-b last:border-b-0 ",
                {
                    "bg-primary": selected,
                },
            )}
        >
            <div className={"px-8 py-4"}>
                <button
                    className="grid grid-cols-[12px_1fr] gap-x-4"
                    onClick={setSelected}
                    disabled={disabled}
                >
                    <Radio checked={selected} />
                    <div className="flex flex-col text-left">
                        <h3 className="text-base-semi text-primary leading-none">
                            {PaymentInfoMap[paymentSession.provider_id].title}
                        </h3>
                        <span className="text-small-regular text-accent-8 mt-2">
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
                <div className="text-primary pr-7 pt-8">
                    <PaymentStripe />
                </div>
            );
        default:
            return null;
    }
};
