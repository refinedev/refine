import { CrudFilter } from "@pankod/refine-core";
import { generateFilter } from "../../src";
import supabaseClient from "../supabaseClient";

describe("filter utils", () => {
    it("should generate single filter", () => {
        const filter: CrudFilter = {
            field: "name",
            operator: "contains",
            value: "test",
        };
        const query = supabaseClient.from("test").select("*", {
            count: "exact",
        });
        // @ts-expect-error - private property
        expect(query.url.search).toEqual("?select=*");
        generateFilter(filter, query);
        // @ts-expect-error - private property
        expect(query.url.search).toEqual("?select=*&name=ilike.%25test%25");
    });

    it("should generate nested filters", () => {
        const filter: CrudFilter = {
            operator: "or",
            value: [
                {
                    field: "name",
                    operator: "contains",
                    value: "test",
                },
            ],
        };

        const query = supabaseClient.from("test").select("*", {
            count: "exact",
        });
        // @ts-expect-error - private property
        expect(query.url.search).toEqual("?select=*");
        generateFilter(filter, query);

        // @ts-expect-error - private property
        expect(query.url.search).toEqual("?select=*&or=%28name.ilike.test%29");
    });

    it("should generate deeply nested filters", () => {
        const filter: CrudFilter = {
            operator: "or",
            value: [
                {
                    operator: "or",
                    value: [
                        {
                            operator: "or",
                            value: [
                                {
                                    field: "id",
                                    operator: "contains",
                                    value: "252",
                                },
                                {
                                    field: "id",
                                    operator: "contains",
                                    value: "253",
                                },
                            ],
                        },
                        {
                            field: "id",
                            operator: "contains",
                            value: "254",
                        },
                    ],
                },
                {
                    field: "id",
                    operator: "contains",
                    value: "255",
                },
            ],
        };

        const query = supabaseClient.from("test").select("id", {
            count: "exact",
        });
        // @ts-expect-error - private property
        expect(query.url.search).toEqual("?select=id");
        generateFilter(filter, query);

        // @ts-expect-error - private property
        expect(query.url.search).toEqual(
            "?select=id&or=%28or%28or%28id.ilike.252%2Cid.ilike.253%29%2Cid.ilike.254%29%2Cid.ilike.255%29",
        );
    });
});
