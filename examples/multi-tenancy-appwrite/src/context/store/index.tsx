import { createContext, useState } from "react";

// eslint-disable-next-line
export const StoreContext = createContext<any[]>([]);

// eslint-disable-next-line
export const StoreProvider = (props: any) => {
    const [store, setStore] = useState("61cdb05132609");

    return <StoreContext.Provider value={[store, setStore]} {...props} />;
};
