import {
    getDefaultSortOrder,
    getDefaultFilter,
    mapAntdSorterToCrudSorting,
    mapAntdFilterToCrudFilter,
} from "./";
import { CrudSorting, CrudFilters } from "@pankod/refine-core";

describe("definitions/table", () => {
    it("getDefaultSortOrder", () => {
        const sorter: CrudSorting = [
            {
                field: "title",
                order: "asc",
            },
            {
                field: "view",
                order: "desc",
            },
        ];

        expect(getDefaultSortOrder("title", sorter)).toEqual("ascend");
    });

    it("getDefaultFilter", () => {
        const filters: CrudFilters = [
            {
                field: "title",
                operator: "contains",
                value: "test",
            },
        ];
        expect(getDefaultFilter("title", filters, "contains")).toEqual("test");
    });

    it("getDefaultFilter empty array", () => {
        const filters: CrudFilters = [
            {
                field: "title",
                operator: "contains",
                value: undefined,
            },
        ];
        expect(getDefaultFilter("title", filters, "contains")).toEqual([]);
    });

    it("getDefaultFilter default operator", () => {
        const filters: CrudFilters = [
            {
                field: "title",
                operator: "eq",
                value: "test",
            },
        ];
        expect(getDefaultFilter("title", filters)).toEqual("test");
    });

    it("mapAntdSorterToCrudSorting", () => {
        expect(
            mapAntdSorterToCrudSorting({
                field: "title",
                order: "descend",
            }),
        ).toMatchInlineSnapshot(`
            Array [
              Object {
                "field": "title",
                "order": "desc",
              },
            ]
        `);
    });

    it("mapAntdSorterToCrudSorting with sorting priority", () => {
        expect(
            mapAntdSorterToCrudSorting([
                {
                    field: "id",
                    order: "descend",
                    column: {
                        sorter: {
                            multiple: 2,
                        },
                    },
                },
                {
                    field: "title",
                    order: "descend",
                    column: {
                        sorter: {
                            multiple: 1,
                        },
                    },
                },
            ]),
        ).toMatchInlineSnapshot(`
            Array [
              Object {
                "field": "title",
                "order": "desc",
              },
              Object {
                "field": "id",
                "order": "desc",
              },
            ]
        `);
    });

    it("mapAntdSorterToCrudSorting for array and columnKey", () => {
        expect(
            mapAntdSorterToCrudSorting([
                {
                    columnKey: "title",
                    field: "title",
                    order: "descend",
                },
            ]),
        ).toMatchInlineSnapshot(`
            Array [
              Object {
                "field": "title",
                "order": "desc",
              },
            ]
        `);
    });

    it("mapAntdFilterToCrudFilter", () => {
        expect(
            mapAntdFilterToCrudFilter(
                {
                    foo: ["bar", "baz"],
                },
                [],
            ),
        ).toMatchInlineSnapshot(`
            Array [
              Object {
                "field": "foo",
                "operator": "in",
                "value": Array [
                  "bar",
                  "baz",
                ],
              },
            ]
        `);
    });

    it("mapAntdFilterToCrudFilter with non array", () => {
        expect(
            mapAntdFilterToCrudFilter(
                {
                    foo: "bar",
                },
                [],
            ),
        ).toMatchInlineSnapshot(`
            Array [
              Object {
                "field": "foo",
                "operator": "eq",
                "value": "bar",
              },
            ]
        `);
    });

    it("mapAntdFilterToCrudFilter with value 0", () => {
        expect(
            mapAntdFilterToCrudFilter(
                {
                    foo: [0],
                },
                [],
            ),
        ).toMatchInlineSnapshot(`
            Array [
              Object {
                "field": "foo",
                "operator": "in",
                "value": Array [
                  0,
                ],
              },
            ]
        `);
    });

    it("mapAntdFilterToCrudFilter with in operator and null value", () => {
        expect(
            mapAntdFilterToCrudFilter(
                {
                    foo: null,
                },
                [
                    {
                        field: "foo",
                        operator: "in",
                        value: ["1"],
                    },
                ],
            ),
        ).toMatchInlineSnapshot(`
            Array [
              Object {
                "field": "foo",
                "operator": "in",
                "value": null,
              },
            ]
        `);
    });

    it("mapAntdFilterToCrudFilter with eq operator and null value", () => {
        expect(
            mapAntdFilterToCrudFilter(
                {
                    foo: null,
                },
                [
                    {
                        field: "foo",
                        operator: "eq",
                        value: "1",
                    },
                ],
            ),
        ).toMatchInlineSnapshot(`
            Array [
              Object {
                "field": "foo",
                "operator": "eq",
                "value": null,
              },
            ]
        `);
    });
});
