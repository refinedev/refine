import { SupabaseClient } from "@supabase/supabase-js";
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
            meta: {
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
            sorters: [
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

    describe("Supabase order", () => {
        const mockSupabaseOrder = jest.fn();
        const mockSupabaseClient = {
            select: () => mockSupabaseClient,
            from: () => mockSupabaseClient,
            range: () => mockSupabaseClient,
            order: mockSupabaseOrder,
        } as unknown as SupabaseClient;

        it("correct sorting object with foreignTable", async () => {
            await dataProvider(mockSupabaseClient).getList({
                resource: "posts",
                sorters: [
                    {
                        field: "categories.title",
                        order: "asc",
                    },
                ],
            });
            expect(mockSupabaseOrder).toHaveBeenCalledWith("title", {
                ascending: true,
                foreignTable: "categories",
            });
        });
        it("correct sorting object without foreignTable", async () => {
            await dataProvider(mockSupabaseClient).getList({
                resource: "posts",
                sorters: [
                    {
                        field: "title",
                        order: "asc",
                    },
                ],
            });
            expect(mockSupabaseOrder).toHaveBeenCalledWith("title", {
                ascending: true,
            });
        });
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

    it("or operator should work correctly", async () => {
        const { data, total } = await dataProvider(supabaseClient).getList({
            resource: "posts",
            filters: [
                {
                    operator: "or",
                    value: [
                        {
                            field: "title",
                            operator: "eq",
                            value: "Hello",
                        },
                        {
                            field: "title",
                            operator: "eq",
                            value: "World",
                        },
                    ],
                },
            ],
        });

        expect(data[0]["title"]).toBe("Hello");
        expect(data[1]["title"]).toBe("World");
        expect(total).toBe(2);
    });
});
