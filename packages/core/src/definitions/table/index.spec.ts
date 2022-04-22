import {
    stringifyTableParams,
    parseTableParams,
    parseTableParamsFromQuery,
    unionFilters,
    compareFilters,
    compareSorters,
    unionSorters,
} from "./";
import { CrudSorting, CrudFilters } from "../../interfaces";

describe("definitions/table", () => {
    it("stringify table params correctly", async () => {
        const pagination = {
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
        const pagination = {
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
            "?current=1&pageSize=10&sorter[0][field]=id&sorter[0][order]=desc&filters[0][operator]=in&filters[0][field]=categoryId&filters[0][value][0]=1&filters[0][value][1]=2";

        const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } =
            parseTableParams(url);

        expect(parsedCurrent).toBe(1);
        expect(parsedPageSize).toBe(10);
        expect(parsedSorter).toStrictEqual([{ field: "id", order: "desc" }]);
        expect(parsedFilters).toStrictEqual([
            { field: "categoryId", operator: "in", value: ["1", "2"] },
        ]);
    });

    it("parse table params with advanced query object", async () => {
        const query = {
            current: 1,
            pageSize: 10,
            sorter: [
                { field: "id", order: "asc" },
                { field: "firstName", order: "desc" },
            ],
            filters: [
                { field: "id", operator: "eq", value: "1" },
                {
                    operator: "or",
                    value: [
                        {
                            field: "age",
                            operator: "lt",
                            value: "18",
                        },
                        {
                            field: "age",
                            operator: "gt",
                            value: "20",
                        },
                    ],
                },
            ],
        };

        const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } =
            parseTableParamsFromQuery(query);

        expect(parsedCurrent).toBe(1);
        expect(parsedPageSize).toBe(10);
        expect(parsedSorter).toStrictEqual([
            { field: "id", order: "asc" },
            { field: "firstName", order: "desc" },
        ]);
        expect(parsedFilters).toStrictEqual([
            { field: "id", operator: "eq", value: "1" },
            {
                operator: "or",
                value: [
                    {
                        field: "age",
                        operator: "lt",
                        value: "18",
                    },
                    {
                        field: "age",
                        operator: "gt",
                        value: "20",
                    },
                ],
            },
        ]);
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

    it("unionSorters puts higher priority sorter at the end", () => {
        expect(
            unionSorters(
                [
                    {
                        field: "foo",
                        order: "asc",
                    },
                ],
                [
                    {
                        field: "bar",
                        order: "asc",
                    },
                ],
            ),
        ).toMatchInlineSnapshot(`
            Array [
              Object {
                "field": "bar",
                "order": "asc",
              },
              Object {
                "field": "foo",
                "order": "asc",
              },
            ]
        `);
    });

    it("unionSorters should override same sorter", () => {
        expect(
            unionSorters(
                [
                    {
                        field: "foo",
                        order: "asc",
                    },
                ],
                [
                    {
                        field: "foo",
                        order: "asc",
                    },
                    {
                        field: "bar",
                        order: "asc",
                    },
                ],
            ),
        ).toMatchInlineSnapshot(`
            Array [
              Object {
                "field": "bar",
                "order": "asc",
              },
              Object {
                "field": "foo",
                "order": "asc",
              },
            ]
        `);
    });

    it("unionSorters should override even when sorter value is null but should not keep it in the end result", () => {
        expect(
            unionSorters(
                [],
                [
                    {
                        field: "foo",
                        order: "asc",
                    },
                    {
                        field: "bar",
                        order: "asc",
                    },
                ],
            ),
        ).toMatchInlineSnapshot(`
            Array [
              Object {
                "field": "bar",
                "order": "asc",
              },
              Object {
                "field": "foo",
                "order": "asc",
              },
            ]
        `);
    });

    it("compareSorters sorters are the same if their field are the same", () => {
        expect(
            compareSorters(
                {
                    field: "foo",
                    order: "asc",
                },
                {
                    field: "foo",
                    order: "asc",
                },
            ),
        ).toBe(true);

        expect(
            compareSorters(
                {
                    field: "foo",
                    order: "asc",
                },
                {
                    field: "foo",
                    order: "desc",
                },
            ),
        ).toBe(true);
    });
});
