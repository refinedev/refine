import React from "react";
import { Cart } from "@medusajs/medusa";
import { formatAmount } from "medusa-react";

interface CartTotalsProps {
    cart: Omit<Cart, "refundable_amount" | "refunded_total">;
}

export const CartTotals: React.FC<CartTotalsProps> = ({ cart }) => {
    const {
        subtotal,
        discount_total,
        gift_card_total,
        tax_total,
        shipping_total,
        total,
    } = cart;

    const getAmount = (amount: number | null | undefined) => {
        return formatAmount({
            amount: amount || 0,
            region: cart.region,
            includeTaxes: false,
        });
    };

    return (
        <div>
            <div className="text-small-regular text-primary">
                <div className="text-base-regular mb-2 flex items-center justify-between ">
                    <span>Subtotal</span>
                    <span>{getAmount(subtotal)}</span>
                </div>
                <div className="flex flex-col gap-y-1">
                    {!!discount_total && (
                        <div className="flex items-center justify-between">
                            <span>Discount</span>
                            <span>- {getAmount(discount_total)}</span>
                        </div>
                    )}
                    {!!gift_card_total && (
                        <div className="flex items-center justify-between">
                            <span>Gift card</span>
                            <span>- {getAmount(gift_card_total)}</span>
                        </div>
                    )}
                    <div className="flex items-center justify-between">
                        <span>Shipping</span>
                        <span>{getAmount(shipping_total)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Taxes</span>
                        <span>{getAmount(tax_total)}</span>
                    </div>
                </div>
                <div className="my-4 h-px w-full border-b border-dashed border-gray-200" />
                <div className="text-base-regular mb-2 flex items-center justify-between">
                    <span>Total</span>
                    <span>{getAmount(total)}</span>
                </div>
            </div>
        </div>
    );
};
