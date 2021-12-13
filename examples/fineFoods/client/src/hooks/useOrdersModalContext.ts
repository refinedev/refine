import { useContext } from "react";

import { OrdersModalContext } from "@contextProviders";

export const useOrdesModalContext = () => {
    const { ordersModalVisible, setOrdersModalVisible } =
        useContext(OrdersModalContext);
    return { ordersModalVisible, setOrdersModalVisible };
};
