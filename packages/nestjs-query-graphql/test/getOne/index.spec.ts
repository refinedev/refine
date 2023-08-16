import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("useOne", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client).getOne({
            resource: "blog_posts",
            id: "1",
            meta: {
                fields: [
                    "id",
                    "title",
                    "content",
                    "status",
                    { category: ["id"] },
                ],
            },
        });

        expect(data["id"]).toBeDefined();
        expect(data["title"]).toBeDefined();
        expect(data["content"]).toBeDefined();
        expect(data["category"].id).toBeDefined();
    });
});
