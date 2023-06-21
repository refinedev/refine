import { CrudFilter } from "@refinedev/core";
import { generateFilter, getAppwriteFilters } from "../../src/utils";

jest.mock("../../src/utils/generateFilter", () => ({
    generateFilter: jest.fn(),
}));

describe("getAppwriteFilters", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should generate Appwrite filters based on the input filters", () => {
        const filters: CrudFilter[] = [
            { operator: "eq", field: "name", value: "John" },
            { operator: "lt", field: "age", value: 30 },
        ];

        getAppwriteFilters(filters);

        expect(generateFilter).toHaveBeenCalledTimes(2);
        expect(generateFilter).toHaveBeenNthCalledWith(1, {
            operator: "eq",
            field: "name",
            value: "John",
        });
        expect(generateFilter).toHaveBeenNthCalledWith(2, {
            operator: "lt",
            field: "age",
            value: 30,
        });
    });

    it('should not generate Appwrite filters for "or" and "and" operators', () => {
        const filters = [
            { operator: "or", filters: [] },
            { operator: "and", filters: [] },
        ];

        getAppwriteFilters(filters as any);

        expect(generateFilter).toHaveBeenCalledTimes(0);
    });

    it('should replace "id" field with "$id"', () => {
        const filters: CrudFilter[] = [
            { operator: "eq", field: "id", value: "123" },
        ];

        getAppwriteFilters(filters);

        expect(generateFilter).toHaveBeenCalledTimes(1);
        expect(generateFilter).toHaveBeenCalledWith({
            operator: "eq",
            field: "$id",
            value: "123",
        });
    });

    it("should return an empty array when no filters are provided", () => {
        const result = getAppwriteFilters(undefined);

        expect(result).toEqual([]);
        expect(generateFilter).toHaveBeenCalledTimes(0);
    });
});
