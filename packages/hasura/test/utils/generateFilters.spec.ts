import { CrudFilters, CrudOperators } from "@refinedev/core";
import { generateFilters, handleFilterValue } from "../../src/utils";

describe("generateFilters", () => {
    it("should generate nested filter query for given filters", () => {
        const filters: CrudFilters = [
            { field: "title", operator: "contains", value: "test" },
            { field: "published", operator: "eq", value: true },
        ];

        const result = generateFilters(filters);

        expect(result).toEqual({
            _and: [
                { title: { _ilike: "%test%" } },
                { published: { _eq: true } },
            ],
        });
    });

    it("should return undefined for undefined filters", () => {
        const result = generateFilters(undefined);

        expect(result).toBeUndefined();
    });

    it("should generate nested filter query for nested filters", () => {
        const filters: CrudFilters = [
            {
                operator: "or",
                value: [
                    { field: "title", operator: "contains", value: "test" },
                    { field: "published", operator: "eq", value: true },
                ],
            },
            {
                field: "author.name",
                operator: "contains",
                value: "John",
            },
        ];

        const result = generateFilters(filters);

        expect(result).toEqual({
            _and: [
                {
                    _or: [
                        { title: { _ilike: "%test%" } },
                        { published: { _eq: true } },
                    ],
                },
                { author: { name: { _ilike: "%John%" } } },
            ],
        });
    });
});

describe("handleFilterValue", () => {
    const testCases: Array<[CrudOperators, any, any]> = [
        ["startswiths", "test", "test%"],
        ["nstartswiths", "test", "test%"],
        ["endswiths", "test", "%test"],
        ["nendswiths", "test", "%test"],
        ["startswith", "test", "^test"],
        ["nstartswith", "test", "^(?!test)"],
        ["endswith", "test", "test$"],
        ["nendswith", "test", "(?<!test)$"],
        ["nnull", null, false],
        ["contains", "test", "%test%"],
        ["containss", "test", "%test%"],
        ["ncontains", "test", "%test%"],
        ["ncontainss", "test", "%test%"],
        ["eq", "test", "test"],
    ];

    it.each(testCases)(
        "should return correct value for %s operator",
        (operator, value, expected) => {
            const result = handleFilterValue(operator, value);

            expect(result).toEqual(expected);
        },
    );
});
