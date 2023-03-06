import React, { useMemo } from "react";
import { Cart } from "@medusajs/medusa";
import { useForm } from "react-hook-form";
import { useInvalidate, useUpdate } from "@refinedev/core";

import { Input, Button } from "@components";
import { Trash } from "@components/icons";

interface GiftCardFormValues {
    gift_card_code: string;
}

interface GiftCardProps {
    cart: Omit<Cart, "refundable_amount" | "refunded_total">;
}

export const GiftCard: React.FC<GiftCardProps> = ({ cart }) => {
    const invalidate = useInvalidate();
    const { mutate, isLoading } = useUpdate();

    const {
        register,
        handleSubmit,
        formState: { touchedFields, errors },
        setError,
    } = useForm<GiftCardFormValues>();

    const appliedGiftCard = useMemo(() => {
        if (!cart || !cart.gift_cards?.length) {
            return undefined;
        }

        return cart.gift_cards[0].code;
    }, [cart]);

    const onSubmit = (data: GiftCardFormValues) => {
        mutate(
            {
                resource: "carts",
                id: cart.id,
                values: { gift_cards: [{ code: data.gift_card_code }] },
            },
            {
                onSuccess: () => {
                    invalidate({
                        resource: "carts",
                        invalidates: ["detail"],
                        id: cart.id,
                    });
                },
                onError: () => {
                    setError(
                        "gift_card_code",
                        {
                            message: "Code is invalid",
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
        mutate(
            {
                resource: "carts",
                id: cart.id,
                values: { gift_cards: [] },
            },
            {
                onSuccess: () => {
                    invalidate({
                        resource: "carts",
                        invalidates: ["detail"],
                        id: cart.id,
                    });
                },
            },
        );
    };

    return (
        <div className="bg-accent-2 flex w-full flex-col p-6">
            <div className="mb-4">
                <h3 className="text-base-semi">Gift Card</h3>
            </div>
            <div className="text-small-regular">
                {appliedGiftCard ? (
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-primary">Code: </span>
                            <span className="font-semibold">
                                {appliedGiftCard}
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
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="grid grid-cols-[1fr_80px] gap-x-2">
                            <Input
                                label="Code"
                                {...register("gift_card_code", {
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
