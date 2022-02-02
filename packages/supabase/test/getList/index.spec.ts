import nock from "nock";
import { dataProvider } from "../../src/index";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("getList", () => {
    it("correct response", async () => {
        const { data, total } = await dataProvider(supabaseClient).getList({
            resource: "posts",
        });

        expect(data[0]["id"]).toBe(2);
        expect(data[0]["title"]).toBe("test title");
        expect(total).toBe(2);
    });

    it("correct response with metadata select", async () => {
        const { data, total } = await dataProvider(supabaseClient).getList({
            resource: "posts",
            metaData: {
                select: "title",
            },
        });

        expect(Object.keys(data[0]).length).toBe(1);
        expect(data[0]["title"]).toBe("sadasdsa333");
        expect(total).toBe(71);
    });

    it("correct sorting response", async () => {
        const { data, total } = await dataProvider(supabaseClient).getList({
            resource: "posts",
            sort: [
                {
                    field: "title",
                    order: "asc",
                },
            ],
        });

        expect(data[0]["id"]).toBe(3);
        expect(data[0]["title"]).toBe("What a library");
        expect(total).toBe(2);
    });
});

describe("filtering", () => {
    it("eq operator should work correctly", async () => {
        const { data, total } = await dataProvider(supabaseClient).getList({
            resource: "posts",
            filters: [
                {
                    field: "title",
                    operator: "eq",
                    value: "Hello World",
                },
            ],
        });
        expect(data[0]["title"]).toBe("Hello World");
        expect(total).toBe(1);
    });

    it("ne operator should work correctly", async () => {
        const { data, total } = await dataProvider(supabaseClient).getList({
            resource: "posts",
            filters: [
                {
                    field: "title",
                    operator: "ne",
                    value: "Hello World",
                },
            ],
        });
        expect(data[0]["title"]).not.toBe("Hello World");
        expect(total).toBe(2);
    });

    it("lt operator should work correctly", async () => {
        const { data, total } = await dataProvider(supabaseClient).getList({
            resource: "posts",
            filters: [
                {
                    field: "id",
                    operator: "lt",
                    value: 3,
                },
            ],
        });
        expect(data[0]["id"]).toBe(2);
        expect(total).toBe(1);
    });

    it("gt operator should work correctly", async () => {
        const { data, total } = await dataProvider(supabaseClient).getList({
            resource: "posts",
            filters: [
                {
                    field: "id",
                    operator: "gt",
                    value: 3,
                },
            ],
        });
        expect(data[0]["id"]).toBe(42);
        expect(total).toBe(1);
    });

    it("lte operator should work correctly", async () => {
        const { data, total } = await dataProvider(supabaseClient).getList({
            resource: "posts",
            filters: [
                {
                    field: "id",
                    operator: "lte",
                    value: 2,
                },
            ],
        });
        expect(data[0]["id"]).toBe(2);
        expect(total).toBe(1);
    });

    it("gte operator should work correctly", async () => {
        const { data, total } = await dataProvider(supabaseClient).getList({
            resource: "posts",
            filters: [
                {
                    field: "id",
                    operator: "gte",
                    value: 42,
                },
            ],
        });

        expect(data[0]["id"]).toBe(42);
        expect(total).toBe(1);
    });

    it("in operator should work correctly", async () => {
        const { data, total } = await dataProvider(supabaseClient).getList({
            resource: "posts",
            filters: [
                {
                    field: "id",
                    operator: "in",
                    value: ["2", "3"],
                },
            ],
        });

        expect(data[0]["id"]).toBe(2);
        expect(data[1]["id"]).toBe(3);
        expect(total).toBe(2);
    });

    it("nin operator should throw error", async () => {
        try {
            await dataProvider(supabaseClient).getList({
                resource: "posts",
                filters: [
                    {
                        field: "id",
                        operator: "nin",
                        value: ["2", "3"],
                    },
                ],
            });
        } catch (error) {
            expect(error).toEqual(Error("Operator nin is not supported"));
        }
    });

    it("contains operator should work correctly", async () => {
        const { data, total } = await dataProvider(supabaseClient).getList({
            resource: "posts",
            filters: [
                {
                    field: "title",
                    operator: "contains",
                    value: "world",
                },
            ],
        });

        expect(data).toEqual([]);
        expect(total).toBe(0);
    });

    it("ncontains operator should throw error", async () => {
        try {
            await dataProvider(supabaseClient).getList({
                resource: "posts",
                filters: [
                    {
                        field: "id",
                        operator: "ncontains",
                        value: "world",
                    },
                ],
            });
        } catch (error) {
            expect(error).toEqual(Error("Operator ncontains is not supported"));
        }
    });

    it("containss operator should work correctly", async () => {
        const { data, total } = await dataProvider(supabaseClient).getList({
            resource: "posts",
            filters: [
                {
                    field: "title",
                    operator: "containss",
                    value: "world",
                },
            ],
        });

        expect(data[0]["title"]).toBe("Hello World");
        expect(total).toBe(1);
    });

    it("ncontainss operator should throw error", async () => {
        try {
            await dataProvider(supabaseClient).getList({
                resource: "posts",
                filters: [
                    {
                        field: "id",
                        operator: "ncontainss",
                        value: "world",
                    },
                ],
            });
        } catch (error) {
            expect(error).toEqual(
                Error("Operator ncontainss is not supported"),
            );
        }
    });

    it("null operator should work correctly", async () => {
        const { data, total } = await dataProvider(supabaseClient).getList({
            resource: "posts",
            filters: [
                {
                    field: "content",
                    operator: "null",
                    value: null,
                },
            ],
        });

        expect(data[0]["title"]).toBe("Supabase");
        expect(data[0]["slug"]).toBe("supabase-data-provider");
        expect(total).toBe(1);
    });
});
