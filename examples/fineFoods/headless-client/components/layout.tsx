import React from "react";
import { LayoutProps } from "@pankod/refine-core";

import { OrdersModal, Header, Footer } from "../components";
import { useOrdesModalContext } from "../hooks";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { ordersModalVisible } = useOrdesModalContext();
    return (
        <>
            <div className="grid grid-rows-[64px_1fr_auto] min-h-screen">
                <Header />
                <main className="bg-primary">{children}</main>
                <Footer />
            </div>
            {ordersModalVisible && <OrdersModal />}
        </>
    );
};
