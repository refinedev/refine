import type { Express } from "express";
import { SERVER_PORT } from "./constants";

export const setupServer = (app: Express) => {
    const server = app.listen(SERVER_PORT, () => {
        if (__DEVELOPMENT__) {
            console.log(`Server started on PORT ${SERVER_PORT}`);
        }
    });

    process.on("SIGTERM", () => {
        server.close(() => {
            if (__DEVELOPMENT__) {
                console.log("Process terminated");
            }
        });
    });
};
