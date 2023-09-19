import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("deleteOne", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client).deleteOne({
            resource: "blog_posts",
            id: "77",
            meta: {
                fields: ["id", "title"],
            },
        });

        expect(data.id).toEqual(null);
        expect(data.title).toBeDefined();
    });

    it("correct response without meta", async () => {
        const { data } = await dataProvider(client).deleteOne({
            resource: "blog_posts",
            id: "78",
        });

        expect(data.id).toEqual(null);
    });
});
