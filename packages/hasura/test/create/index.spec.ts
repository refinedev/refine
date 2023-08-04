import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";

describe.each(["hasura-default", "graphql-default"] as const)(
    "create with %s naming convention",
    (namingConvention) => {
        const client = createClient(namingConvention);
        const categoryFieldName =
            namingConvention === "hasura-default"
                ? "category_id"
                : "categoryId";

        it("correct response with meta", async () => {
            const { data } = await dataProvider(client, {
                namingConvention,
            }).create({
                resource: "posts",
                variables: {
                    content: "Lorem ipsum dolor sit amet.",
                    title: "Lorem ipsum dolore",
                    [categoryFieldName]: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
                },
                meta: {
                    fields: ["id", "title", "content", { category: ["id"] }],
                },
            });

            expect(data["title"]).toEqual("Lorem ipsum dolore");
            expect(data["content"]).toEqual("Lorem ipsum dolor sit amet.");
            expect(data["category"].id).toEqual(
                "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
            );
        });
    },
);
