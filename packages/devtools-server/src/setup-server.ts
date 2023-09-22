import type { Express } from "express";

export const setupServer = (app: Express) => {
    const server = app.listen(5001, () => {
        if (__DEVELOPMENT__) {
            console.log("Server started on PORT 5001");
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
