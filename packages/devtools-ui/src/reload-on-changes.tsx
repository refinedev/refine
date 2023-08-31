import React from "react";
import { DevToolsContext, DevtoolsEvent } from "@refinedev/devtools-shared";

export const ReloadOnChanges = () => {
    const { ws } = React.useContext(DevToolsContext);

    React.useEffect(() => {
        if (ws) {
            const listener = (event: MessageEvent<any>) => {
                if (event.data === DevtoolsEvent.RELOAD) {
                    window.location.reload();
                }
            };

            ws.addEventListener("message", listener);

            return () => {
                ws.removeEventListener("message", listener);
            };
        }

        return () => 0;
    }, [ws]);

    return null;
};
