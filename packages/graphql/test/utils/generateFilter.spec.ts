import { CrudFilters } from "@refinedev/core";
import { generateFilter } from "../../src/utils";

describe("generateFilter", () => {
    it("should return an empty object if no filters are provided", () => {
        expect(generateFilter()).toEqual({});
    });

    it("should return correct queryFilters for given filters", () => {
        const filters: CrudFilters = [
            { field: "name", operator: "eq", value: "John" },
            { field: "age", operator: "gte", value: 18 },
            { field: "city", operator: "ne", value: "New York" },
            {
                operator: "or",
                value: [
                    { field: "status", operator: "eq", value: "active" },
                    { field: "status", operator: "eq", value: "pending" },
                ],
            },
        ];

        const expectedResult = {
            name: "John",
            age_gte: 18,
            city_ne: "New York",
            _or: [{ status_eq: "active" }, { status_eq: "pending" }],
        };

        expect(generateFilter(filters)).toEqual(expectedResult);
    });
});
