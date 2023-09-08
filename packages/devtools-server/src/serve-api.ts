import type { Express } from "express";
import { json } from "express";
import { Data } from "./create-db";
import { Section, getFeed } from "./feed/get-feed";

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

    app.get("/api/packages/:packageName", async (req, res) => {
        const { packageName } = req.params ?? {};

        // const latestVersion = await getLatestVersionOfPackage(packageName);
        // const currentVersion = await getInstalledVersionOfPackage(packageName);

        // res.json({ latestVersion, currentVersion });

        res.status(400).json({ error: "Not implemented" });

        // if (!packageName) {
        //     res.status(400).json({ error: "Package name is required" });
        //     return;
        // }
        // // get latest version and return
        // const latestVersion = await getLatestVersionOfPackage(packageName);

        // console.log("Latest version", latestVersion);

        // if (!latestVersion) {
        //     res.status(400).json({ error: "Package not found" });
        //     return;
        // }

        // res.json({ version: latestVersion });
    });

    let cachedFeed: Section[] | null = null;
    app.get("/api/feed", async (req, res) => {
        if (!cachedFeed) {
            const feed = await getFeed();

            cachedFeed = feed;
        }

        res.header("x-total-count", `${cachedFeed.length}`);

        res.json({ data: cachedFeed });
    });
};
