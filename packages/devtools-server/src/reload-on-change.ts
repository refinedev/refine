import fs from "fs";
import { debounce } from "lodash";
import { DevtoolsEvent, send } from "@refinedev/devtools-shared";

import type { Server } from "ws";
import { OPEN } from "ws";

export const reloadOnChange = __DEVELOPMENT__
    ? (ws: Server) => {
          const reloadEmitter = debounce(() => {
              setTimeout(() => {
                  ws.clients.forEach((client) => {
                      if (client.readyState === OPEN) {
                          console.log("Reloading connected client...");
                          send(client as any, DevtoolsEvent.RELOAD, {});
                      }
                  });
              }, 200);
          }, 300);

          const watcher = fs.watch(
              "./dist/client",
              { recursive: true },
              reloadEmitter,
          );

          process.on("SIGTERM", () => {
              watcher.close();
          });
      }
    : () => 0;
