import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("create", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client).update({
            resource: "posts",
            id: "150",
            variables: {
                title: "updated-foo",
                content: "updated-bar",
                category: "2",
            },
            meta: {
                fields: ["id", "title", "content", { category: ["id"] }],
            },
        });

        expect(data["title"]).toEqual("updated-foo");
        expect(data["content"]).toEqual("updated-bar");
        expect(data["category"].id).toEqual("2");
    });

    it("correct response without meta", async () => {
        const { data } = await dataProvider(client).update({
            resource: "posts",
            id: "21",
            variables: {
                title: "updated-foo-2",
                content: "updated-bar-2",
                category: "3",
            },
        });

        expect(data["id"]).toEqual("21");
    });
});
