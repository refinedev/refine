import { useRouter } from "next/router";
import { useOne } from "@refinedev/core";
import { Order } from "@medusajs/medusa";

import { IS_BROWSER } from "@lib/isBrowser";
import { SEO } from "@components/common";
import { SkeletonOrderConfirmed } from "@components/skeletons";
import { OrderDetailsTemplate } from "@components/orders/OrderDetailsTemplate";

const Details: React.FC = () => {
    const router = useRouter();

    const id = typeof router.query?.id === "string" ? router.query.id : "";

    const { isSuccess, data, isLoading, isError } = useOne<{ order: Order }>({
        resource: "orders",
        id,
        queryOptions: {
            enabled: !!id,
            staleTime: 60 * 60 * 1000, // 1 hour,
        },
    });

    if (isLoading) {
        return <SkeletonOrderConfirmed />;
    }

    if (isError) {
        if (IS_BROWSER) {
            router.replace("/404");
        }

        return <SkeletonOrderConfirmed />;
    }

    if (isSuccess) {
        return (
            <>
                <SEO
                    title={`Order #${data.data.order.display_id}`}
                    description="View your order"
                />

                <OrderDetailsTemplate order={data.data.order} />
            </>
        );
    }

    return <></>;
};

export default Details;
