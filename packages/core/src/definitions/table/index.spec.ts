import {
    stringifyTableParams,
    parseTableParams,
    parseTableParamsFromQuery,
    unionFilters,
    compareFilters,
    compareSorters,
    unionSorters,
    getDefaultSortOrder,
    getDefaultFilter,
} from "./";
import { CrudSorting, CrudFilters } from "../../interfaces";

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

        expect(getDefaultSortOrder("title", sorter)).toEqual("asc");
        expect(getDefaultSortOrder("view", sorter)).toEqual("desc");
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

    it("stringify table params correctly", async () => {
        const pagination = {
            current: 1,
            pageSize: 10,
        };

        const sorters: CrudSorting = [
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

        const userDefinedQueryParam = {
            foo: "bar",
        };

        const url = stringifyTableParams({
            pagination,
            sorters,
            filters,
            ...userDefinedQueryParam,
        });
        expect(url).toMatchSnapshot();
    });

    it("stringify table single sort params correctly", async () => {
        const pagination = {
            current: 1,
            pageSize: 10,
        };

        const sorters: CrudSorting = [{ field: "id", order: "desc" }];
        const filters: CrudFilters = [
            {
                field: "categoryId",
                operator: "in",
                value: [1, 2],
            },
        ];

        const url = stringifyTableParams({ pagination, sorters, filters });
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

    it("sorters should be prioritized over sorter", async () => {
        const pagination = {
            current: 1,
            pageSize: 10,
        };

        const sorters: CrudSorting = [{ field: "id", order: "desc" }];
        const sorter: CrudSorting = [{ field: "id2", order: "asc" }];
        const filters: CrudFilters = [];

        const url = stringifyTableParams({
            pagination,
            sorters,
            sorter,
            filters,
        });

        expect(url).toMatchSnapshot();
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
            ),
        ).toMatchInlineSnapshot(`
            [
              {
                "field": "foo",
                "operator": "in",
                "value": "permenant",
              },
              {
                "field": "bar",
                "operator": "in",
                "value": "crud",
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
                    {
                        field: "baz",
                        operator: "in",
                        value: "prev",
                    },
                ],
            ),
        ).toMatchInlineSnapshot(`
            [
              {
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

    it("compareFilters return correct result when `or` is used", () => {
        expect(
            compareFilters(
                {
                    operator: "or",
                    value: [
                        {
                            field: "name",
                            operator: "eq",
                            value: "test",
                        },
                    ],
                },
                {
                    operator: "or",
                    value: [
                        {
                            field: "created_at",
                            operator: "gte",
                            value: "2022-01-01",
                        },
                    ],
                },
            ),
        ).toBe(true);

        expect(
            compareFilters(
                {
                    operator: "or",
                    value: [
                        {
                            field: "name",
                            operator: "eq",
                            value: "test",
                        },
                    ],
                },
                {
                    field: "created_at",
                    operator: "gte",
                    value: "2022-01-01",
                },
            ),
        ).toBe(false);
    });

    it("unionFilters should override `or` filter", () => {
        const union = unionFilters(
            // permanent filters
            [],
            // new filters
            [
                {
                    field: "other-field",
                    operator: "in",
                    value: "crud",
                },
                {
                    operator: "or",
                    value: [
                        {
                            field: "created_at",
                            operator: "contains",
                            value: "2022",
                        },
                    ],
                },
            ],
            // prev filters
            [
                {
                    operator: "or",
                    value: [
                        {
                            field: "name",
                            operator: "eq",
                            value: "test",
                        },
                    ],
                },
            ],
        );

        // does not include previous `or`
        expect(union).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    operator: "or",
                    value: expect.arrayContaining([
                        expect.objectContaining({
                            field: "name",
                            operator: "eq",
                            value: "test",
                        }),
                    ]),
                }),
            ]),
        );

        // includes new `or` and new filters
        expect(union).toMatchObject([
            {
                field: "other-field",
                operator: "in",
                value: "crud",
            },
            {
                operator: "or",
                value: [
                    {
                        field: "created_at",
                        operator: "contains",
                        value: "2022",
                    },
                ],
            },
        ]);
    });

    it("unionFilters should remove `or` filter if value is empty array", () => {
        const union = unionFilters(
            // permanent filters
            [],
            // new filters
            [
                {
                    field: "other-field",
                    operator: "in",
                    value: "crud",
                },
                {
                    operator: "or",
                    value: [],
                },
            ],
            // prev filters
            [
                {
                    operator: "or",
                    value: [
                        {
                            field: "name",
                            operator: "eq",
                            value: "test",
                        },
                    ],
                },
            ],
        );

        expect(union).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    operator: "or",
                }),
            ]),
        );
    });

    it("unionFilters should keep `or` filter if it's untouched", () => {
        const union = unionFilters(
            // permanent filters
            [],
            // new filters
            [
                {
                    field: "other-field",
                    operator: "in",
                    value: "crud",
                },
            ],
            // prev filters
            [
                {
                    operator: "or",
                    value: [
                        {
                            field: "name",
                            operator: "eq",
                            value: "test",
                        },
                    ],
                },
            ],
        );

        expect(union).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    operator: "or",
                }),
            ]),
        );
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
            [
              {
                "field": "foo",
                "order": "asc",
              },
              {
                "field": "bar",
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
                        field: "bar",
                        order: "asc",
                    },
                    {
                        field: "foo",
                        order: "asc",
                    },
                ],
            ),
        ).toMatchInlineSnapshot(`
            [
              {
                "field": "bar",
                "order": "asc",
              },
              {
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
