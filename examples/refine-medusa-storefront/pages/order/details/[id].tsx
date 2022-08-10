import { useRouter } from "next/router";
import { useOne, LayoutWrapper } from "@pankod/refine-core";
import { Order } from "@medusajs/medusa";

import { IS_BROWSER } from "@lib/constants";
import SEO from "@components/common/SEO";
import OrderCompletedTemplate from "@components/orders/OrderCompletedTemplate";
import SkeletonOrderConfirmed from "@components/skeletons/SkeletonOrderConfirmed";

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

                <LayoutWrapper>
                    <OrderCompletedTemplate order={data.data.order} />
                </LayoutWrapper>
            </>
        );
    }

    return <></>;
};

export default Details;
