import React, {
    createContext,
    SetStateAction,
    useEffect,
    useState,
} from "react";

type CartProviderProps = {
    children: React.ReactNode;
};

type CartContextType = {
    setCartId: React.Dispatch<SetStateAction<string>>;
    cartId: string;
    isCartIdLoading: boolean;
};

export const CartContext = createContext<CartContextType>({
    setCartId: () => {
        throw new Error("cart id is not implemented");
    },
    cartId: "",
    isCartIdLoading: true,
});

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartId, setCartId] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (cartId.length > 0) {
            localStorage?.setItem("cartId", cartId);
        }
    }, [cartId]);

    useEffect(() => {
        if (typeof window !== "undefined" && localStorage) {
            const parsed = localStorage.getItem("cartId") ?? "";
            setCartId(parsed);
            setIsLoading(false);
        }
    }, [typeof window]);

    return (
        <CartContext.Provider
            value={{ cartId, setCartId, isCartIdLoading: isLoading }}
        >
            {children}
        </CartContext.Provider>
    );
};
