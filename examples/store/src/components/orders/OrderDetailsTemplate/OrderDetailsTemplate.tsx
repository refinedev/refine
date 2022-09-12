import { Order } from "@medusajs/medusa";

import { Help } from "../Help";
import { Items } from "../Items";
import { OrderDetails } from "../OrderDetails";
import { OrderSummary } from "../OrderSummary";
import { PaymentDetails } from "../PaymentDetails";
import { ShippingDetails } from "../ShippingDetails";

interface OrderDetailsTemplateProps {
    order: Order;
}

export const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
    order,
}) => {
    return (
        <div className="bg-primary min-h-[calc(100vh-64px)] py-6">
            <div className="mx-auto flex w-full max-w-[1440px] justify-center px-8">
                <div className="bg-accent-2 h-full w-full max-w-4xl">
                    <OrderDetails order={order} showStatus />
                    <Items
                        items={order.items}
                        region={order.region}
                        cartId={order.cart_id}
                    />
                    <div className="border-accent-2 grid grid-cols-1 gap-4 border-b p-10 lg:grid-cols-2">
                        <PaymentDetails
                            payments={order.payments}
                            paymentStatus={order.payment_status}
                        />
                        <ShippingDetails
                            shippingMethods={order.shipping_methods}
                            address={order.shipping_address}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4 p-10 lg:grid-cols-2">
                        <Help />
                        <OrderSummary order={order} />
                    </div>
                </div>
            </div>
        </div>
    );
};
