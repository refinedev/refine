import WebSocket from "ws";
import { SERVER_PORT, WS_PORT } from "./constants";
import { DevtoolsEvent, send } from "@refinedev/devtools-shared";
import { bold, cyanBright } from "chalk";

export const serveWs = () => {
  const ws = new WebSocket.Server({ port: WS_PORT }).on(
    "error",
    (error: any) => {
      if (error?.code === "EADDRINUSE") {
        console.error(
          `\n${cyanBright.bold("\u2717 ")}${bold(
            "refine devtools",
          )} failed to start. Port ${WS_PORT} is already in use, please make sure no other devtools server is running\n`,
        );
      } else {
        console.error(
          `\n${cyanBright.bold("\u2717 ")}${bold(
            "error from refine devtools",
          )}`,
          error,
        );
      }
      process.exit(1);
    },
  );

  ws.on("connection", (client) => {
    if (__DEVELOPMENT__) {
      console.log(`WebSocket server started on PORT ${WS_PORT}`);
    }
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
