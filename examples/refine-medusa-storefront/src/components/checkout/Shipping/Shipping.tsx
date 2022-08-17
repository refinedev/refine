import React from "react";
import clsx from "clsx";
import { RadioGroup } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Cart } from "@medusajs/medusa";

import { StepContainer } from "@components";
import { Radio } from "@components/common";
import Spinner from "@components/icons/Spinner";
import { useCheckout } from "@lib/context/checkout";

import s from "./Shipping.module.css";

type ShippingProps = {
    cart: Omit<Cart, "refundable_amount" | "refunded_total">;
};

type ShippingFormProps = {
    soId: string;
};

export const Shipping: React.FC<ShippingProps> = ({ cart }) => {
    const { shippingMethods, setShippingOption } = useCheckout();

    const {
        control,
        setError,
        formState: { errors },
    } = useForm<ShippingFormProps>({
        defaultValues: {
            soId: cart.shipping_methods?.[0]?.shipping_option_id,
        },
    });

    const submitShippingOption = (soId: string) => {
        try {
            setShippingOption(soId);
        } catch (error) {
            setError(
                "soId",
                {
                    type: "validate",
                    message:
                        "An error occurred while adding shipping. Please try again.",
                },
                { shouldFocus: true },
            );
        }
    };

    const handleChange = (value: string, fn: (value: string) => void) => {
        submitShippingOption(value);
        fn(value);
    };

    const {
        sameAsBilling: { state: sameBilling },
    } = useCheckout();

    return (
        <StepContainer
            className="bg-accent-2"
            index={sameBilling ? 2 : 3}
            title="Delivery"
            closedState={
                <div className="text-small-regular text-primary px-8 pb-8">
                    <p>Enter your address to see available delivery options.</p>
                </div>
            }
        >
            <Controller
                name="soId"
                control={control}
                render={({ field: { value, onChange } }) => {
                    return (
                        <div className="bg-primary">
                            <RadioGroup
                                value={value}
                                onChange={(value: string) =>
                                    handleChange(value, onChange)
                                }
                            >
                                {shippingMethods && shippingMethods.length ? (
                                    shippingMethods.map((option) => {
                                        return (
                                            <RadioGroup.Option
                                                key={option.value}
                                                value={option.value}
                                                className={clsx(s.radio, {
                                                    "bg-accent-1":
                                                        option.value === value,
                                                })}
                                            >
                                                <div className="flex items-center gap-x-4 ">
                                                    <Radio
                                                        checked={
                                                            value ===
                                                            option.value
                                                        }
                                                    />
                                                    <span className="text-base-regular">
                                                        {option.label}
                                                    </span>
                                                </div>
                                                <span className="text-primary justify-self-end">
                                                    {option.price}
                                                </span>
                                            </RadioGroup.Option>
                                        );
                                    })
                                ) : (
                                    <div className={s.spinner}>
                                        <Spinner />
                                    </div>
                                )}
                            </RadioGroup>
                            <ErrorMessage
                                errors={errors}
                                name="soId"
                                render={({ message }) => {
                                    return (
                                        <div className="text-small-regular text-magenta pt-2">
                                            <span>{message}</span>
                                        </div>
                                    );
                                }}
                            />
                        </div>
                    );
                }}
            />
        </StepContainer>
    );
};
