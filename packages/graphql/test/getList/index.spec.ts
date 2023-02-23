import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("getList", () => {
    it("correct response", async () => {
        const { data } = await dataProvider(client).getList({
            resource: "posts",
            meta: {
                fields: ["id", "title"],
            },
        });
        expect(data[0]["id"]).toBe("21");
        expect(data[0]["title"]).toBe("Another New Post");
    });

    it("correct sorting response", async () => {
        const { data } = await dataProvider(client).getList({
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

        expect(data[0]["id"]).toBe("7");
        expect(data[0]["title"]).toBe("GraphQl 3");
    });

    it("correct filter response", async () => {
        const { data } = await dataProvider(client).getList({
            resource: "posts",
            filters: [
                {
                    field: "id",
                    operator: "eq",
                    value: "907",
                },
            ],
            meta: {
                fields: ["title"],
            },
        });

        expect(data[0]["title"]).toBe(
            "Molestias iste voluptatem velit sed voluptate aut voluptatibus explicabo.",
        );
    });

    it("correct filter and sort response", async () => {
        const response = await dataProvider(client).getList({
            resource: "posts",
            filters: [
                {
                    field: "category",
                    operator: "eq",
                    value: "8",
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

        expect(response.data[0]["id"]).toBe("349");
        expect(response.data[0]["category"].title).toBe("Test");
    });
});
