import {
    stringifyTableParams,
    parseTableParams,
    getDefaultSortOrder,
    getDefaultFilter,
    mapAntdSorterToCrudSorting,
    mapAntdFilterToCrudFilter,
    unionFilters,
    compareFilters,
} from "./";
import { TablePaginationConfig } from "@components/antd";
import { CrudSorting, CrudFilters } from "../../interfaces";

describe("definitions/table", () => {
    it("stringify table params correctly", async () => {
        const pagination: TablePaginationConfig = {
            current: 1,
            pageSize: 10,
        };

        const sorter: CrudSorting = [
            {
                field: "id",
                order: "desc",
            },
            {
                field: "title",
                order: "desc",
            },
        ];

        const filters: CrudFilters = [
            {
                field: "categoryId",
                operator: "in",
                value: [1, 2],
            },
        ];

        const url = stringifyTableParams({ pagination, sorter, filters });
        expect(url).toMatchSnapshot();
    });

    it("stringify table single sort params correctly", async () => {
        const pagination: TablePaginationConfig = {
            current: 1,
            pageSize: 10,
        };

        const sorter: CrudSorting = [{ field: "id", order: "desc" }];
        const filters: CrudFilters = [
            {
                field: "categoryId",
                operator: "in",
                value: [1, 2],
            },
        ];

        const url = stringifyTableParams({ pagination, sorter, filters });
        expect(url).toMatchSnapshot();
    });

    it("parse table params with single sorter correctly", async () => {
        const url =
            "?current=1&pageSize=10&categoryId__in[]=1&categoryId__in[]=2&sort[]=id&order[]=desc";

        const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } =
            parseTableParams(url);

        expect(parsedCurrent).toBe(1);
        expect(parsedPageSize).toBe(10);
        expect(parsedSorter).toStrictEqual([{ field: "id", order: "desc" }]);
        expect(parsedFilters).toStrictEqual([
            { field: "categoryId", operator: "in", value: ["1", "2"] },
        ]);
    });

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

    it("unionFilters puts higher priority filters at the end", () => {
        expect(
            unionFilters(
                [
                    {
                        field: "foo",
                        operator: "in",
                        value: "permenant",
                    },
                ],
                [
                    {
                        field: "bar",
                        operator: "in",
                        value: "crud",
                    },
                ],
                [
                    {
                        field: "baz",
                        operator: "in",
                        value: "prev",
                    },
                ],
            ),
        ).toMatchInlineSnapshot(`
            Array [
              Object {
                "field": "baz",
                "operator": "in",
                "value": "prev",
              },
              Object {
                "field": "bar",
                "operator": "in",
                "value": "crud",
              },
              Object {
                "field": "foo",
                "operator": "in",
                "value": "permenant",
              },
            ]
        `);
    });

    it("unionFilters should override same filters", () => {
        expect(
            unionFilters(
                [
                    {
                        field: "foo",
                        operator: "in",
                        value: "permenant",
                    },
                ],
                [
                    {
                        field: "foo",
                        operator: "in",
                        value: "crud",
                    },
                    {
                        field: "bar",
                        operator: "in",
                        value: "crud",
                    },
                ],
                [
                    {
                        field: "bar",
                        operator: "in",
                        value: "prev",
                    },
                    {
                        field: "baz",
                        operator: "in",
                        value: "prev",
                    },
                ],
            ),
        ).toMatchInlineSnapshot(`
            Array [
              Object {
                "field": "baz",
                "operator": "in",
                "value": "prev",
              },
              Object {
                "field": "bar",
                "operator": "in",
                "value": "crud",
              },
              Object {
                "field": "foo",
                "operator": "in",
                "value": "permenant",
              },
            ]
        `);
    });

    it("unionFilters should override even when filter value is null but should not keep it in the end result", () => {
        expect(
            unionFilters(
                [],
                [
                    {
                        field: "foo",
                        operator: "in",
                        value: null,
                    },
                    {
                        field: "bar",
                        operator: "in",
                        value: undefined,
                    },
                ],
                [
                    {
                        field: "bar",
                        operator: "in",
                        value: "prev",
                    },
                    {
                        field: "baz",
                        operator: "in",
                        value: "prev",
                    },
                ],
            ),
        ).toMatchInlineSnapshot(`
            Array [
              Object {
                "field": "baz",
                "operator": "in",
                "value": "prev",
              },
            ]
        `);
    });

    it("compareFilters filters are the same if their field and operator are the same", () => {
        expect(
            compareFilters(
                {
                    field: "foo",
                    operator: "in",
                    value: "left",
                },
                {
                    field: "foo",
                    operator: "in",
                    value: "right",
                },
            ),
        ).toBe(true);

        expect(
            compareFilters(
                {
                    field: "foo",
                    operator: "in",
                    value: "test",
                },
                {
                    field: "foo",
                    operator: "contains",
                    value: "test",
                },
            ),
        ).toBe(false);
    });
});
