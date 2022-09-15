import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { LayoutWrapper } from "@pankod/refine-core";

import { AccountLayout } from "@components/account";
import { OrdersTemplate } from "@components/orders/OrdersTemplate";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout: (page: ReactElement) => ReactNode;
};

const Orders: NextPage = () => {
    return (
        <LayoutWrapper>
            <AccountLayout>
                <OrdersTemplate />
            </AccountLayout>
        </LayoutWrapper>
    );
};

export default Orders;
