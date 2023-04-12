import { CrudFilters } from "@refinedev/core";
import { generateSearchFilter } from "../../src/utils";

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
