import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("createMany", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client).createMany({
            resource: "blog_posts",
            variables: [
                {
                    title: "foo",
                    content: "bar",
                    categoryId: "2",
                    status: "DRAFT",
                    createdAt: "2023-08-08T11:40:36.177Z",
                },
                {
                    title: "foo-2",
                    content: "bar-2",
                    categoryId: "3",
                    status: "DRAFT",
                    createdAt: "2023-08-08T11:40:36.177Z",
                },
            ],
            meta: {
                fields: ["id", "title", "content", { category: ["id"] }],
            },
        });

        expect(data[0]["title"]).toEqual("foo");
        expect(data[0]["content"]).toEqual("bar");
        expect(data[0]["category"].id).toEqual("2");

        expect(data[1]["title"]).toEqual("foo-2");
        expect(data[1]["content"]).toEqual("bar-2");
        expect(data[1]["category"].id).toEqual("3");
    });

    it("correct response without meta", async () => {
        const { data } = await dataProvider(client).createMany({
            resource: "blog_posts",
            variables: [
                {
                    title: "foo",
                    content: "bar",
                    categoryId: "2",
                    status: "DRAFT",
                    createdAt: "2023-08-08T11:40:36.197Z",
                },
                {
                    title: "foo-2",
                    content: "bar-2",
                    categoryId: "3",
                    status: "DRAFT",
                    createdAt: "2023-08-08T11:40:36.197Z",
                },
            ],
        });

        expect(data[0]["id"]).toBeDefined();

        expect(data[1]["id"]).toBeDefined();
    });
});
