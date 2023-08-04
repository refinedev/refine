import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";

describe.each(["hasura-default", "graphql-default"] as const)(
    "updateMany with %s naming convention",
    (namingConvention) => {
        const client = createClient(namingConvention);
        let posts = [
            {
                id: "6379bbda-0857-40f2-a277-b401ea6134d7",
                title: "Aenean ultricies non libero sit amet pellentesque",
                content: "Vestibulum vulputate sapien arcu.",
                category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
            },
            {
                id: "c7ba5e30-8c5f-46bb-862d-e2bcf6487749",
                title: "Etiam tincidunt ex ut auctor faucibus",
                content: "Aliquam nibh erat.",
                category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
            },
        ];

        let ids = [
            "6379bbda-0857-40f2-a277-b401ea6134d7",
            "c7ba5e30-8c5f-46bb-862d-e2bcf6487749",
        ];

        if (namingConvention === "graphql-default") {
            ids = [
                "4ef4ba41-92d5-4d1f-b1a5-fc91c9a08284",
                "4040c05e-c4c8-4314-aafd-0baf3faae354",
            ];

            posts = [
                {
                    id: "4ef4ba41-92d5-4d1f-b1a5-fc91c9a08284",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    content: "Vestibulum vulputate sapien arcu.",
                    category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
                },
                {
                    id: "4040c05e-c4c8-4314-aafd-0baf3faae354",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    content: "Aliquam nibh erat.",
                    category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
                },
            ];
        }

        it("correct response with meta", async () => {
            const { data } = await dataProvider(client, {
                namingConvention,
            }).getMany!({
                resource: "posts",
                ids,
                meta: {
                    fields: ["id", "title", "content", { category: ["id"] }],
                },
            });

            expect(data[0]["id"]).toEqual(posts[0]["id"]);
            expect(data[0]["title"]).toEqual(posts[0]["title"]);
            expect(data[0]["content"]).toEqual(posts[0]["content"]);
            expect(data[0]["category"].id).toEqual(posts[0]["category"]["id"]);

            expect(data[1]["id"]).toEqual(posts[1]["id"]);
            expect(data[1]["title"]).toEqual(posts[1]["title"]);
            expect(data[1]["content"]).toEqual(posts[1]["content"]);
            expect(data[1]["category"].id).toEqual(posts[1]["category"]["id"]);
        });
    },
);
