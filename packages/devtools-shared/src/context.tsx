import React from "react";
import { DevtoolsEvent } from "./event-types";
import { send } from "./send";
import { receive } from "./receive";

type DevToolsContextValue = {
  __devtools: boolean;
  port: number;
  url: string;
  secure: boolean;
  ws: WebSocket | null;
  devtoolsUrl?: string;
};

export const DevToolsContext = React.createContext<DevToolsContextValue>({
  __devtools: false,
  port: 5002,
  url: "localhost",
  secure: false,
  ws: null,
});

type Props = React.PropsWithChildren<
  Partial<Pick<DevToolsContextValue, "port" | "__devtools">>
>;

export const DevToolsContextProvider: React.FC<Props> = ({
  __devtools,
  port,
  children,
}) => {
  const [values, setValues] = React.useState<DevToolsContextValue>({
    __devtools: __devtools ?? false,
    port: port ?? 5002,
    url: "localhost",
    secure: false,
    ws: null,
  });

  const [ws, setWs] = React.useState<WebSocket | null>(null);

  React.useEffect(() => {
    const wsInstance = new WebSocket(
      `${values.secure ? "wss" : "ws"}://localhost:${values.port}`,
    );

    const unsubscribe = receive(
      wsInstance,
      DevtoolsEvent.DEVTOOLS_HANDSHAKE,
      (data) => {
        setValues((v) => ({
          ...v,
          devtoolsUrl: data.url,
        }));
        unsubscribe();
      },
    );

    wsInstance.addEventListener("open", () => {
      if (!values.__devtools) {
        send(wsInstance, DevtoolsEvent.DEVTOOLS_INIT, {
          url: window.location.origin,
        });
      }
    });

    setWs(wsInstance);

    return () => {
      unsubscribe();

      wsInstance.close(1000, window.location.origin);
    };
  }, []);

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
