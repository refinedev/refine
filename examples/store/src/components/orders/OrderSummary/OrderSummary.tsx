import { Order } from "@medusajs/medusa";
import { formatAmount } from "medusa-react";

interface OrderSummaryProps {
    order: Order;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
    const getAmount = (amount: number) => {
        return formatAmount({
            amount,
            region: order.region,
            includeTaxes: false,
        });
    };

    return (
        <div>
            <h2 className="text-base-semi">Order Summary</h2>
            <div className="text-small-regular text-primary my-2">
                <div className="text-base-regular text-primary mb-2 flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>{getAmount(order.subtotal)}</span>
                </div>
                <div className="flex flex-col gap-y-1">
                    {order.discount_total > 0 && (
                        <div className="flex items-center justify-between">
                            <span>Discount</span>
                            <span>- {getAmount(order.discount_total)}</span>
                        </div>
                    )}
                    {order.gift_card_total > 0 && (
                        <div className="flex items-center justify-between">
                            <span>Discount</span>
                            <span>- {getAmount(order.gift_card_total)}</span>
                        </div>
                    )}
                    <div className="flex items-center justify-between">
                        <span>Shipping</span>
                        <span>{getAmount(order.shipping_total)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Taxes</span>
                        <span>{getAmount(order.tax_total || 0)}</span>
                    </div>
                </div>
                <div className="my-4 h-px w-full border-b border-dashed border-gray-200" />
                <div className="text-base-regular text-accent-9 mb-2 flex items-center justify-between">
                    <span>Total</span>
                    <span>{getAmount(order.total)}</span>
                </div>
            </div>
        </div>
    );
};
