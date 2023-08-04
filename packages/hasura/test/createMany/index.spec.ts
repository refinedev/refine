import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";

describe.each(["hasura-default", "graphql-default"] as const)(
    "createMany with %s naming convention",
    (namingConvention) => {
        const client = createClient(namingConvention);
        const categoryFieldName =
            namingConvention === "hasura-default"
                ? "category_id"
                : "categoryId";

        it("correct response with meta", async () => {
            const { data } = await dataProvider(client, {
                namingConvention,
            }).createMany!({
                resource: "posts",
                variables: [
                    {
                        content: "Vestibulum vulputate sapien arcu.",
                        title: "Aenean ultricies non libero sit amet pellentesque",
                        [categoryFieldName]:
                            "e27156c3-9998-434f-bd5b-2b078283ff26",
                    },
                    {
                        content: "Aliquam nibh erat.",
                        title: "Etiam tincidunt ex ut auctor faucibus",
                        [categoryFieldName]:
                            "e27156c3-9998-434f-bd5b-2b078283ff26",
                    },
                ],
                meta: {
                    fields: ["id", "title", "content", { category: ["id"] }],
                },
            });

            expect(data[0]["title"]).toEqual(
                "Aenean ultricies non libero sit amet pellentesque",
            );
            expect(data[0]["content"]).toEqual(
                "Vestibulum vulputate sapien arcu.",
            );
            expect(data[0]["category"].id).toEqual(
                "e27156c3-9998-434f-bd5b-2b078283ff26",
            );

            expect(data[1]["title"]).toEqual(
                "Etiam tincidunt ex ut auctor faucibus",
            );
            expect(data[1]["content"]).toEqual("Aliquam nibh erat.");
            expect(data[1]["category"].id).toEqual(
                "e27156c3-9998-434f-bd5b-2b078283ff26",
            );
        });

        it("correct response without meta", async () => {
            const { data } = await dataProvider(client, {
                namingConvention,
            }).createMany!({
                resource: "posts",
                variables: [
                    {
                        content: "Vestibulum vulputate sapien arcu.",
                        title: "Aenean ultricies non libero sit amet pellentesque",
                        [categoryFieldName]:
                            "e27156c3-9998-434f-bd5b-2b078283ff26",
                    },
                    {
                        content: "Aliquam nibh erat.",
                        title: "Etiam tincidunt ex ut auctor faucibus",
                        [categoryFieldName]:
                            "e27156c3-9998-434f-bd5b-2b078283ff26",
                    },
                ],
                meta: {
                    fields: ["id", "title"],
                },
            });

            expect(data[0]["title"]).toEqual(
                "Aenean ultricies non libero sit amet pellentesque",
            );
            expect(data[1]["title"]).toEqual(
                "Etiam tincidunt ex ut auctor faucibus",
            );
        });
    },
);
