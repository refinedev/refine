import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("deleteMany", () => {
    it("correct response with metaData", async () => {
        const { data } = await dataProvider(client).deleteMany!({
            resource: "posts",
            ids: [
                "bb5e4a56-504d-4561-ad8c-fd8198e2e32a",
                "823a7094-1d5b-4404-80f4-575a99a69280",
            ],
            metaData: {
                fields: ["id", "title"],
            },
        });

        expect(data[0].id).toEqual("bb5e4a56-504d-4561-ad8c-fd8198e2e32a");
        expect(data[0].title).toEqual("Table Industrial Checking Account");

        expect(data[1].id).toEqual("823a7094-1d5b-4404-80f4-575a99a69280");
        expect(data[1].title).toEqual("Handmade Mouse Fresh");
    });

    it("correct response without metaData", async () => {
        const { data } = await dataProvider(client).deleteMany!({
            resource: "posts",
            ids: [
                "72182c50-32e5-40bb-b259-67d49c2530ec",
                "86f4a3b3-a328-4fa5-9d7e-f06a35e3635f",
            ],
        });

        expect(data[0].id).toEqual("72182c50-32e5-40bb-b259-67d49c2530ec");
        expect(data[1].id).toEqual("86f4a3b3-a328-4fa5-9d7e-f06a35e3635f");
    });
});
