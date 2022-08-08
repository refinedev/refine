import Link from "next/link";
import { useOne } from "@pankod/refine-core";
import { Customer } from "@medusajs/medusa";

import { Button, LoadingDots } from "@components";
import OrderCard from "../OrderCard/OrderCard";

const OrderOverview = () => {
    const { data: ordersData, isLoading } = useOne<Customer>({
        resource: "customers",
        id: "me",
    });

    const orders = ordersData?.data.orders || [];

    if (isLoading) {
        return (
            <div className="text-gray-900 w-full flex justify-center pt-12">
                <LoadingDots />
            </div>
        );
    }

    if (orders?.length > 0) {
        return (
            <div className="flex flex-col gap-y-8 w-full">
                {orders.map((o) => (
                    <div
                        key={o.id}
                        className="border-b border-gray-200 pb-6 last:pb-0 last:border-none"
                    >
                        <OrderCard order={o} />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col items-center gap-y-4">
            <h2 className="text-large-semi">Nothing to see here</h2>
            <p className="text-base-regular">
                You don&apos;t have any orders yet, let us change that {":)"}
            </p>
            <div className="mt-4">
                <Link href="/" passHref>
                    <Button>Continue shopping</Button>
                </Link>
            </div>
        </div>
    );
};

export default OrderOverview;
