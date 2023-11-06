import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";

describe.each(["hasura-default", "graphql-default"] as const)(
    "updateMany with %s naming convention",
    (namingConvention) => {
        const client = createClient(namingConvention);
        let postsWithMeta = [
            {
                id: "cf43a199-e791-4b81-a1fd-3ccf8e7f6166",
                title: "velit id pretium iaculis",
            },
            {
                id: "9cd924d2-de3b-479a-9882-23feeb0fd80f",
                title: "habitasse platea dictumst aliquam",
            },
        ];
        let postsWithoutMeta = [
            {
                id: "e890344b-d7b6-4793-b375-b3c2a7f6deea",
                title: "id pretium iaculis",
            },
            {
                id: "3be19a24-ecee-42d9-949b-5f41623b9b5a",
                title: "eros suspendisse accumsan",
            },
        ];

        if (namingConvention === "graphql-default") {
            postsWithMeta = [
                {
                    id: "9fb231b7-a2e6-4602-85a4-7ddab73cd05e",
                    title: "elit proin interdum mauris non",
                },
                {
                    id: "48a5591e-4ab0-45f8-950e-aee8a63769df",
                    title: "velit eu est congue elementum in",
                },
            ];
            postsWithoutMeta = [
                {
                    id: "7086ba36-9746-4f0a-90a1-96d93056d706",
                    title: "porttitor lorem id ligula",
                },
                {
                    id: "d682533d-9abe-4dcb-bfa5-801acd0ef5ab",
                    title: "integer ac neque duis bibendum morbi",
                },
            ];
        }

        it("correct response with meta", async () => {
            const { data } = await dataProvider(client, {
                namingConvention,
            }).updateMany!({
                resource: "posts",
                ids: postsWithMeta.map((post) => post.id),
                variables: {
                    content: "Updated Content",
                },
                meta: {
                    fields: ["id", "title", "content"],
                },
            });

            expect(data[0]["id"]).toEqual(postsWithMeta[0]["id"]);
            expect(data[0]["title"]).toEqual(postsWithMeta[0]["title"]);
            expect(data[0]["content"]).toEqual("Updated Content");

            expect(data[1]["id"]).toEqual(postsWithMeta[1]["id"]);
            expect(data[1]["title"]).toEqual(postsWithMeta[1]["title"]);
            expect(data[1]["content"]).toEqual("Updated Content");
        });

        it("correct response without meta", async () => {
            const { data } = await dataProvider(client, {
                namingConvention,
            }).updateMany!({
                resource: "posts",
                ids: postsWithoutMeta.map((post) => post.id),
                variables: {
                    title: "Multiple Updated Title",
                    content: "Multiple Updated Content",
                },
            });

            expect(data[0]["id"]).toEqual(postsWithoutMeta[0]["id"]);
            expect(data[1]["id"]).toEqual(postsWithoutMeta[1]["id"]);
        });
    },
);
