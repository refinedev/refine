import type { Express } from "express";

export const setupServer = (app: Express) => {
    const server = app.listen(5001, () => {
        console.log("Server started on PORT 5001");
    });

    process.on("SIGTERM", () => {
        server.close(() => {
            console.log("Process terminated");
        });
    });
};
