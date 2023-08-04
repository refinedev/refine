import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";

describe.each(["hasura-default", "graphql-default"] as const)(
    "getList with %s naming convention",
    (namingConvention) => {
        const client = createClient(namingConvention);
        const categoryFieldName =
            namingConvention === "hasura-default"
                ? "category_id"
                : "categoryId";

        it(`correct response`, async () => {
            const { data, total } = await dataProvider(client, {
                namingConvention,
            }).getList({
                resource: "posts",
                meta: {
                    fields: ["id", "title"],
                },
            });

            expect(data[0]["id"]).toBe("a376eb2a-f743-4921-a656-8d0d13fe7d24");
            expect(data[0]["title"]).toBe(
                "Vivamus in felis eu sapien cursus vestibulum.",
            );
            expect(total).toBe(92);
        });

        it("correct sorting response", async () => {
            const { data, total } = await dataProvider(client, {
                namingConvention,
            }).getList({
                resource: "posts",
                sorters: [
                    {
                        field: "id",
                        order: "asc",
                    },
                ],
                meta: {
                    fields: ["id", "title"],
                },
            });

            expect(data[0]["id"]).toBe("27e2d9a9-6c00-4dac-9f8c-e5010c41cd85");
            expect(data[0]["title"]).toBe("Rameeesss");
            expect(total).toBe(92);
        });

        it("correct filter response", async () => {
            const { data, total } = await dataProvider(client, {
                namingConvention,
            }).getList({
                resource: "posts",
                filters: [
                    {
                        field: categoryFieldName,
                        operator: "eq",
                        value: "ff9cffb8-b5bd-4020-8f00-2f9b589a5264",
                    },
                ],
                meta: {
                    fields: ["id", "title"],
                },
            });

            expect(data[0]["id"]).toBe("4ba59c71-d560-45b4-bdbe-2a11d3dfa54a");
            expect(data[0]["title"]).toBe("nascetur ridiculus");
            expect(total).toBe(4);
        });

        it("correct nested filter response", async () => {
            const { data } = await dataProvider(client, {
                namingConvention,
            }).getList({
                resource: "posts",
                filters: [
                    {
                        field: "category.id",
                        operator: "eq",
                        value: "ff9cffb8-b5bd-4020-8f00-2f9b589a5264",
                    },
                ],
                meta: {
                    fields: ["id", "title"],
                },
            });

            expect(data[0]["id"]).toBe("4ba59c71-d560-45b4-bdbe-2a11d3dfa54a");
        });

        it("correct filter and sort response", async () => {
            const { data, total } = await dataProvider(client, {
                namingConvention,
            }).getList({
                resource: "posts",
                filters: [
                    {
                        field: categoryFieldName,
                        operator: "eq",
                        value: "6869be25-7189-40a0-9e3c-12164c1929ec",
                    },
                ],
                sorters: [
                    {
                        field: "title",
                        order: "asc",
                    },
                ],
                meta: {
                    fields: ["id", "title", { category: ["id", "title"] }],
                },
            });

            expect(data[0]["id"]).toBe("a9189b36-fa46-4c35-bb01-c79485a7a6ac");
            expect(data[0]["category"].title).toBe("consequat nulla");
            expect(total).toBe(4);
        });
    },
);
