import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("create", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client).update({
            resource: "blog_posts",
            id: "1",
            variables: {
                title: "updated-foo",
                content: "updated-bar",
                categoryId: "2",
                status: "PUBLISHED",
            },
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

        expect(data["title"]).toEqual("updated-foo");
        expect(data["content"]).toEqual("updated-bar");
        expect(data["category"].id).toEqual("2");
        expect(data["status"]).toEqual("PUBLISHED");
    });

    it("correct response without meta", async () => {
        const { data } = await dataProvider(client).update({
            resource: "blog_posts",
            id: "21",
            variables: {
                title: "updated-foo-2",
                content: "updated-bar-2",
                categoryId: "3",
                status: "REJECTED",
            },
        });

        expect(data["id"]).toBeDefined();
    });
});
