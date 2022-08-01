import React, { createContext, SetStateAction, useState } from "react";

type CardProviderProps = {
    children: React.ReactNode;
};

type CardContextType = {
    setCartId: React.Dispatch<SetStateAction<string>>;
    cartId: string;
};

export const CardContext = createContext<CardContextType>({
    setCartId: () => {
        throw new Error("card id is not implemented");
    },
    cartId: "",
});

export const CardProvider: React.FC<CardProviderProps> = ({ children }) => {
    const [cartId, setCartId] = useState("");

    return (
        <CardContext.Provider value={{ setCartId, cartId }}>
            {children}
        </CardContext.Provider>
    );
};
