import type { Express } from "express";
import { SERVER_PORT } from "./constants";
import { bold, cyanBright } from "chalk";
import http from "http";

export const setupServer = (app: Express) => {
  const server = http.createServer(app);

  server
    .on("error", (error: any) => {
      if (error?.code === "EADDRINUSE") {
        console.error(
          `\n${cyanBright.bold("\u2717 ")}${bold(
            "refine devtools",
          )} failed to start. Port ${SERVER_PORT} is already in use, please make sure no other devtools server is running\n`,
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
    })
    .on("listening", () => {
      console.log(
        `\n${cyanBright.bold("\u2713 ")}${bold(
          "refine devtools",
        )} is running at port ${cyanBright.bold(SERVER_PORT)}\n`,
      );
    });

  process.on("SIGTERM", () => {
    server.close(() => {
      if (__DEVELOPMENT__) {
        console.log("Process terminated");
      }
    });
  });

  server.listen(SERVER_PORT, undefined, undefined, () => {
    if (__DEVELOPMENT__) {
      console.log(`Server started on PORT ${SERVER_PORT}`);
    }
  });

  return server;
};
