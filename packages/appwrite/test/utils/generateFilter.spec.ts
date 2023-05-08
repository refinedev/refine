import { Query } from "appwrite";
import { generateFilter } from "../../src/utils";
import { CrudFilter } from "@refinedev/core";

describe("generateFilter", () => {
    it("should generate filter based on the specified operator", () => {
        const testCases: { filter: CrudFilter; expected: any }[] = [
            {
                filter: { operator: "eq", field: "name", value: "John" },
                expected: Query.equal("name", "John"),
            },
            {
                filter: { operator: "ne", field: "name", value: "John" },
                expected: Query.notEqual("name", "John"),
            },
            {
                filter: { operator: "gt", field: "age", value: 25 },
                expected: Query.greaterThan("age", 25),
            },
            {
                filter: { operator: "gte", field: "age", value: 25 },
                expected: Query.greaterThanEqual("age", 25),
            },
            {
                filter: { operator: "lt", field: "age", value: 25 },
                expected: Query.lessThan("age", 25),
            },
            {
                filter: { operator: "lte", field: "age", value: 25 },
                expected: Query.lessThanEqual("age", 25),
            },
            {
                filter: { operator: "contains", field: "name", value: "John" },
                expected: Query.search("name", "%John%"),
            },
        ];

        testCases.forEach(({ filter, expected }) => {
            const result = generateFilter(filter);
            expect(result).toEqual(expected);
        });
    });

    it("should throw an error for unsupported operator", () => {
        const filter = {
            operator: "unsupported",
            field: "name",
            value: "John",
        };
        expect(() => generateFilter(filter as any)).toThrowError(
            `Operator ${filter.operator} is not supported`,
        );
    });
});
