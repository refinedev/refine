import { useRouter } from "next/router";
import { useOne, LayoutWrapper } from "@pankod/refine-core";
import { Order } from "@medusajs/medusa";

import { IS_BROWSER } from "@lib/constants";
import SEO from "@components/common/SEO";
import OrderCompletedTemplate from "@components/orders/OrderCompletedTemplate";

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
        // return <SkeletonOrderConfirmed />;
        return <div>Loading</div>;
    }

    if (isError) {
        if (IS_BROWSER) {
            router.replace("/404");
        }
        // return <SkeletonOrderConfirmed />;
        return <div>Loading</div>;
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
