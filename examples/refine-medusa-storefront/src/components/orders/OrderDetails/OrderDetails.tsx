import { Order } from "@medusajs/medusa";

interface OrderDetailsProps {
    order: Order;
    showStatus?: boolean;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
    order,
    showStatus,
}) => {
    const items = order.items.reduce((acc, i) => acc + i.quantity, 0);

    const formatStatus = (str: string) => {
        const formatted = str.split("_").join(" ");

        return formatted.slice(0, 1).toUpperCase() + formatted.slice(1);
    };

    return (
        <div className="border-accent-2 border-b p-10">
            <span className="text-small-regular text-primary uppercase">
                Thank you, your order was successfully placed
            </span>
            <h1 className="text-2xl-semi mt-2 uppercase">
                #{order.display_id}
            </h1>
            <span>{order.id.split("order_")[1]}</span>
            <div className="text-small-regular text-primary mt-4 flex items-center gap-x-4">
                <span>{new Date(order.created_at).toDateString()}</span>
                <span>{`${items} ${items !== 1 ? "items" : "item"}`}</span>
                {showStatus && (
                    <>
                        <span>{formatStatus(order.fulfillment_status)}</span>
                        <span>{formatStatus(order.payment_status)}</span>
                    </>
                )}
            </div>
        </div>
    );
};
