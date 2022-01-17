import { createContext, useState } from "react";

export const StoreContext = createContext<any[]>([]);

export const StoreProvider = (props: any) => {
    const [store, setStore] = useState(1);

    return <StoreContext.Provider value={[store, setStore]} {...props} />;
};
