import React from "react";
import { DevtoolsEvent } from "./event-types";

type DevToolsContextValue = {
    port: number;
    url: string;
    secure: boolean;
    ws: WebSocket | null;
};

export const DevToolsContext = React.createContext<DevToolsContextValue>({
    port: 5002,
    url: "localhost",
    secure: false,
    ws: null,
});

type Props = React.PropsWithChildren<
    Partial<Pick<DevToolsContextValue, "port">>
>;

export const DevToolsContextProvider: React.FC<Props> = ({
    port,
    children,
}) => {
    const [values] = React.useState<DevToolsContextValue>({
        port: port ?? 5002,
        url: "localhost",
        secure: false,
        ws: null,
    });

    const [ws] = React.useState<WebSocket | null>(() => {
        const ws = new WebSocket(
            `${values.secure ? "wss" : "ws"}://localhost:${values.port}`,
        );

        ws.addEventListener("open", () => {
            ws.send("hello");
        });

        return ws;
    });

    const contextValues = React.useMemo<DevToolsContextValue>(
        () => ({
            ...values,
            ws,
        }),
        [values, ws],
    );

    return (
        <DevToolsContext.Provider value={contextValues}>
            {children}
        </DevToolsContext.Provider>
    );
};
