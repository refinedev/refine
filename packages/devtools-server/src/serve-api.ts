import type { Express } from "express";
import { Data } from "./create-db";

export const serveApi = (app: Express, db: Data) => {
    app.get("/api/connected-app", (_, res) => {
        res.json({ url: db.connectedApp });
    });
};
