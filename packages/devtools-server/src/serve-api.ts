import type { Express } from "express";
import { json } from "express";

import { Feed, PackageType } from "@refinedev/devtools-shared";

import { Data } from "./create-db";
import { getFeed } from "./feed/get-feed";
import { getAllPackages } from "./packages/get-all-packages";
import { updatePackage } from "./packages/update-package";

export const serveApi = (app: Express, db: Data) => {
    app.use("/api", json());

    app.get("/api/connected-app", (_, res) => {
        res.json({ url: db.connectedApp });
    });

    app.get("/api/activities", (req, res) => {
        const { offset = 0, limit = db.activities.length } = req.query;

        res.setHeader("x-total-count", db.activities.length);

        res.json({
            data: db.activities.slice(Number(offset), Number(limit)),
        });
    });

    app.get("/api/activities/reset", (_, res) => {
        db.activities = [];
        res.json({ success: true });
    });

    let cachedPackages: PackageType[] | null = null;
    app.get("/api/packages", async (_, res) => {
        if (!cachedPackages) {
            cachedPackages = await getAllPackages();
        }

        res.header("x-total-count", `${cachedPackages.length}`);

        res.json({ data: cachedPackages });
    });

    app.post("/api/packages/:packageName/update", async (req, res) => {
        const { packageName } = req.params ?? {};

        if (!packageName) {
            res.status(400).json({ error: "Package name is required" });
            return;
        }

        const success = await updatePackage(packageName);

        if (success) {
            cachedPackages = null;
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({
                success: false,
                error: "Failed to update package",
            });
        }
    });

    let cachedFeed: Feed | null = null;
    app.get("/api/feed", async (req, res) => {
        if (!cachedFeed) {
            cachedFeed = await getFeed();
        }

        res.header("x-total-count", `${cachedFeed.length}`);

        res.json({ data: cachedFeed });
    });
};
