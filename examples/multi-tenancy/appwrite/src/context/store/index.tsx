import { createContext, useState } from "react";

export const StoreContext = createContext<any[]>([]);

export const StoreProvider = (props: any) => {
    const [store, setStore] = useState("61cdb05132609");

    return <StoreContext.Provider value={[store, setStore]} {...props} />;
};
