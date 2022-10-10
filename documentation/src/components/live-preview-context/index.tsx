import React, { PropsWithChildren } from "react";

export type LivePreviewContextType = {
    shared: string | undefined;
    setShared: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const LivePreviewContext = React.createContext<LivePreviewContextType>({
    shared: undefined,
    setShared: () => undefined,
});

export const LivePreviewProvider: React.FC<PropsWithChildren<{}>> = ({
    children,
}) => {
    const [shared, setShared] = React.useState<string | undefined>(undefined);
    return (
        <LivePreviewContext.Provider value={{ shared, setShared }}>
            {children}
        </LivePreviewContext.Provider>
    );
};

export const useLivePreviewContext = (): LivePreviewContextType => {
    const context = React.useContext(LivePreviewContext);

    if (!context) {
        throw new Error(
            "useLivePreviewContext must be used within a LivePreviewProvider",
        );
    }

    return context;
};
