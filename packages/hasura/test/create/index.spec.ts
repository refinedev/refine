import dataProvider from "../../src/index";
import client from "../gqlClient";

import "./index.mock";

describe("create", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client).create({
            resource: "posts",
            variables: {
                content: "Lorem ipsum dolor sit amet.",
                title: "Lorem ipsum dolore",
                category_id: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
            },
            meta: {
                fields: ["id", "title", "content", { category: ["id"] }],
            },
        });

        expect(data["title"]).toEqual("Lorem ipsum dolore");
        expect(data["content"]).toEqual("Lorem ipsum dolor sit amet.");
        expect(data["category"].id).toEqual(
            "317cea5e-fef3-4858-8043-4496e5c7f5ab",
        );
    });
});

describe("create with graphql naming convention", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client, {
            namingConvention: "graphql-default",
        }).create({
            resource: "posts",
            variables: {
                content: "Lorem ipsum dolor sit amet.",
                title: "Lorem ipsum dolore",
                categoryId: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
            },
            meta: {
                fields: ["id", "title", "content", { category: ["id"] }],
            },
        });

        expect(data["title"]).toEqual("Lorem ipsum dolore");
        expect(data["content"]).toEqual("Lorem ipsum dolor sit amet.");
        expect(data["category"].id).toEqual(
            "317cea5e-fef3-4858-8043-4496e5c7f5ab",
        );
    });
});
