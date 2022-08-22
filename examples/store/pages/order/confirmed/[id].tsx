import { useRouter } from "next/router";
import { useOne, LayoutWrapper } from "@pankod/refine-core";
import { Order } from "@medusajs/medusa";

import { IS_BROWSER } from "@lib/isBrowser";
import { SEO } from "@components/common";
import { OrderCompletedTemplate } from "@components/orders/OrderCompletedTemplate";
import { SkeletonOrderConfirmed } from "@components/skeletons";

const Confirmed: React.FC = () => {
    const router = useRouter();

    const id = typeof router.query?.id === "string" ? router.query.id : "";

    const { isSuccess, data, isLoading, isError } = useOne<{ order: Order }>({
        resource: "orders",
        id,
        queryOptions: {
            enabled: !!id,
            staleTime: Infinity,
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
                    title="Order Confirmed"
                    description="You purchase was successful"
                />

                <LayoutWrapper>
                    <OrderCompletedTemplate order={data.data.order} />
                </LayoutWrapper>
            </>
        );
    }

    return <></>;
};

export default Confirmed;
