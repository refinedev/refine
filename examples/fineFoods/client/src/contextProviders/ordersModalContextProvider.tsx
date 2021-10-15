import React, { useState } from "react";

export const OrdersModalContext = React.createContext<{
    ordersModalVisible: boolean;
    setOrdersModalVisible: Function;
}>({
    ordersModalVisible: false,
    setOrdersModalVisible: () => null,
});

export const OrdersModalContextProvider: React.FC = ({ children }) => {
    const [ordersModalVisible, setOrdersModalVisible] = useState(false);

    return (
        <OrdersModalContext.Provider
            value={{ ordersModalVisible, setOrdersModalVisible }}
        >
            {children}
        </OrdersModalContext.Provider>
    );
};
