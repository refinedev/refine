import WebSocket from "ws";
import { WS_PORT } from "./constants";

export const serveWs = () => {
    const ws = new WebSocket.Server({ port: WS_PORT });

    console.log(`WebSocket server started on PORT ${WS_PORT}`);

    ws.on("connection", () => {
        console.log("Client connected");
    });

    process.on("SIGTERM", () => {
        ws.close(() => {
            console.log("Process terminated");
        });
    });

    return ws;
};
