import WebSocket from "ws";
import { SERVER_PORT, WS_PORT } from "./constants";
import { DevtoolsEvent, send } from "@refinedev/devtools-shared";

export const serveWs = () => {
    const ws = new WebSocket.Server({ port: WS_PORT });

    if (__DEVELOPMENT__) {
        console.log(`WebSocket server started on PORT ${WS_PORT}`);
    }

    ws.on("connection", (client) => {
        // send client the devtools client url
        send(client as any, DevtoolsEvent.DEVTOOLS_HANDSHAKE, {
            url: `http://localhost:${SERVER_PORT}`,
        });

        client.on("close", () => {
            client.terminate();
        });
    });

    process.on("SIGTERM", () => {
        ws.close(() => {
            if (__DEVELOPMENT__) {
                console.log("Process terminated");
            }
        });
    });

    return ws;
};
