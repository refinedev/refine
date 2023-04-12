import { CrudFilter } from "@refinedev/core";
import { SCondition } from "@nestjsx/crud-request";
import { createSearchQuery } from "../../src/utils";

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
