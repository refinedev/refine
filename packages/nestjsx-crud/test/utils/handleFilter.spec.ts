import { RequestQueryBuilder, SCondition } from "@nestjsx/crud-request";
import { CrudFilters, CrudSorting, CrudFilter } from "@refinedev/core";
import {
    handleFilter,
    handleSort,
    generateSearchFilter,
    createSearchQuery,
} from "../../src/utils";

describe("handleFilter", () => {
    it("should apply filters to the query", () => {
        let query = RequestQueryBuilder.create();

        // Apply filters
        const filters: CrudFilters = [
            {
                field: "age",
                operator: "gt",
                value: 25,
            },
            {
                field: "name",
                operator: "contains",
                value: "John",
            },
        ];

        query = handleFilter(query, filters);

        expect(query.query()).toEqual(
            "s=%7B%22%24and%22%3A%5B%7B%22age%22%3A%7B%22%24gt%22%3A25%7D%7D%2C%7B%22name%22%3A%7B%22%24contL%22%3A%22John%22%7D%7D%5D%7D",
        );
    });

    it("should not apply filters if none are provided", () => {
        let query = RequestQueryBuilder.create();

        query = handleFilter(query);

        expect(query.query()).toEqual("");
    });

    it("should work with complex sort and filter parameters", () => {
        let query = RequestQueryBuilder.create();

        const sorters: CrudSorting = [
            {
                field: "name",
                order: "asc",
            },
        ];

        const filters: CrudFilters = [
            {
                field: "age",
                operator: "gte",
                value: 18,
            },
            {
                field: "email",
                operator: "eq",
                value: "john",
            },
        ];

        query = handleSort(query, sorters);
        query = handleFilter(query, filters);

        const expectedQuery =
            "sort%5B0%5D=name%2CASC&s=%7B%22%24and%22%3A%5B%7B%22age%22%3A%7B%22%24gte%22%3A18%7D%7D%2C%7B%22email%22%3A%7B%22%24eq%22%3A%22john%22%7D%7D%5D%7D";

        expect(query.query()).toEqual(expectedQuery);
    });
});

describe("generateSearchFilter", () => {
    it("should generate a search filter with 'and' operator", () => {
        const filters: CrudFilters = [
            {
                field: "name",
                operator: "contains",
                value: "John",
            },
            {
                field: "age",
                operator: "gte",
                value: 25,
            },
        ];

        const searchFilter = generateSearchFilter(filters);

        expect(searchFilter).toEqual({
            $and: [{ name: { $contL: "John" } }, { age: { $gte: 25 } }],
        });
    });

    it("should generate an empty search filter with 'and' operator when no filters are provided", () => {
        const filters: CrudFilters = [];

        const searchFilter = generateSearchFilter(filters);

        expect(searchFilter).toEqual({
            $and: [],
        });
    });
});

describe("createSearchQuery", () => {
    it("should create a search query for simple filters", () => {
        const filter: CrudFilter = {
            field: "testField",
            operator: "gt",
            value: 42,
        };

        const expectedQuery: SCondition = { testField: { $gt: 42 } };

        expect(createSearchQuery(filter)).toEqual(expectedQuery);
    });

    it("should create a search query for complex filters", () => {
        const filter: CrudFilter = {
            operator: "and",
            value: [
                {
                    field: "testField",
                    operator: "lt",
                    value: 10,
                },
                {
                    field: "anotherField",
                    operator: "ne",
                    value: "testValue",
                },
            ],
        };

        const expectedQuery: SCondition = {
            $and: [
                {
                    testField: {
                        $lt: 10,
                    },
                },
                {
                    anotherField: {
                        $ne: "testValue",
                    },
                },
            ],
        };

        expect(createSearchQuery(filter)).toEqual(expectedQuery);
    });

    it("should create a search query for complex filters with nested filters", () => {
        const filter: CrudFilter = {
            operator: "and",
            value: [
                {
                    field: "testField",
                    operator: "lt",
                    value: 10,
                },
                {
                    operator: "or",
                    value: [
                        {
                            field: "anotherField",
                            operator: "ne",
                            value: "testValue",
                        },
                        {
                            field: "yetAnotherField",
                            operator: "eq",
                            value: "testValue2",
                        },
                    ],
                },
            ],
        };

        const expectedQuery: SCondition = {
            $and: [
                {
                    testField: {
                        $lt: 10,
                    },
                },
                {
                    $or: [
                        {
                            anotherField: {
                                $ne: "testValue",
                            },
                        },
                        {
                            yetAnotherField: {
                                $eq: "testValue2",
                            },
                        },
                    ],
                },
            ],
        };

        expect(createSearchQuery(filter)).toEqual(expectedQuery);
    });
});
