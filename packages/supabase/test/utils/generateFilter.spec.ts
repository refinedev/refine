import { CrudFilter } from "@refinedev/core";
import { generateFilter } from "../../src/utils";

describe("generateFilter", () => {
    it("should throw error if operator is and", () => {
        const filter = {
            field: "id",
            operator: "and",
            value: "5",
        } as unknown as CrudFilter;

        expect(() => generateFilter(filter, jest.fn())).toThrowError(
            "Operator 'and' is not supported",
        );
    });
});
