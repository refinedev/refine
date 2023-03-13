import React, { useMemo } from "react";
import { formatAmount } from "medusa-react";
import { Cart } from "@medusajs/medusa";
import { useForm } from "react-hook-form";
import { useDelete, useInvalidate, useUpdate } from "@refinedev/core";

import { Trash } from "@components/icons";
import { Input, Button } from "@components";

interface DiscountFormValues {
    discount_code: string;
}

interface DiscountCodeProps {
    cart: Omit<Cart, "refundable_amount" | "refunded_total">;
}

export const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
    const { id, discounts, region } = cart;
    const { mutate, isLoading } = useUpdate();
    const { mutate: removeDiscount } = useDelete();
    const invalidate = useInvalidate();

    const appliedDiscount = useMemo(() => {
        if (!discounts || !discounts.length) {
            return undefined;
        }

        switch (discounts[0].rule.type) {
            case "percentage":
                return `${discounts[0].rule.value}%`;
            case "fixed":
                return `- ${formatAmount({
                    amount: discounts[0].rule.value,
                    region: region,
                })}`;

            default:
                return "Free shipping";
        }
    }, [discounts, region]);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, touchedFields },
    } = useForm<DiscountFormValues>();

    const onApply = (data: DiscountFormValues) => {
        mutate(
            {
                resource: "carts",
                id,
                values: {
                    discounts: [{ code: data.discount_code }],
                },
            },
            {
                onSuccess: () => {
                    invalidate({
                        resource: "carts",
                        invalidates: ["detail"],
                        id,
                    });
                },
                onError: (err) => {
                    setError(
                        "discount_code",
                        {
                            message: err.message,
                        },
                        {
                            shouldFocus: true,
                        },
                    );
                },
            },
        );
    };

    const onRemove = () => {
        removeDiscount(
            {
                resource: `carts/${id}/discounts/${discounts[0].code}`,
                id: "",
            },
            {
                onSuccess: () => {
                    invalidate({
                        resource: "carts",
                        invalidates: ["detail"],
                        id,
                    });
                },
            },
        );
    };

    return (
        <div className="flex w-full flex-col">
            <div className="mb-4">
                <h3 className="text-base-semi">Discount</h3>
            </div>
            <div className="text-small-regular">
                {appliedDiscount ? (
                    <div className="flex items-center justify-between">
                        <div>
                            <span>Code: </span>
                            <span className="font-semibold">
                                {appliedDiscount}
                            </span>
                        </div>
                        <div>
                            <button
                                className="flex items-center gap-x-2"
                                onClick={onRemove}
                                disabled={isLoading}
                            >
                                <Trash size={16} />
                                <span className="sr-only">
                                    Remove gift card from order
                                </span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onApply)} className="w-full">
                        <div className="grid grid-cols-[1fr_80px] gap-x-2">
                            <Input
                                label="Code"
                                {...register("discount_code", {
                                    required: "code is required",
                                })}
                                errors={errors}
                                touched={touchedFields}
                            />
                            <div className="mt-8">
                                <Button
                                    variant="slim"
                                    className="w-[80px]"
                                    disabled={isLoading}
                                    loading={isLoading}
                                >
                                    {!isLoading && "Apply"}
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
