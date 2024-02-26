import React from "react";
import { LayoutProps } from "@refinedev/core";

import { OrdersModal, Header, Footer } from "@components";
import { useOrdesModalContext } from "@hooks";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { ordersModalVisible } = useOrdesModalContext();
  return (
    <>
      <div className="grid min-h-screen grid-rows-[64px_1fr_auto]">
        <Header />
        <main className="bg-primary px-2 py-8 lg:px-0">{children}</main>
        <Footer />
      </div>
      {ordersModalVisible && <OrdersModal />}
    </>
  );
};
