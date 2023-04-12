import { QuerySort } from "@nestjsx/crud-request";
import { CrudSorting } from "@refinedev/core";
import { generateSort } from "../../src/utils";

describe("generateSort", () => {
    it("should return undefined when no sorting is provided", () => {
        expect(generateSort()).toBeUndefined();
    });

    it("should generate an array of sort objects when sorting is provided", () => {
        const sort: CrudSorting = [
            {
                field: "field1",
                order: "asc",
            },
            {
                field: "field2",
                order: "desc",
            },
        ];

        const expectedSort: QuerySort[] = [
            {
                field: "field1",
                order: "ASC",
            },
            {
                field: "field2",
                order: "DESC",
            },
        ];

        expect(generateSort(sort)).toEqual(expectedSort);
    });

    it("should ignore invalid sort entries", () => {
        const sort: CrudSorting = [
            {
                field: "field1",
                order: "asc",
            },
            {
                field: "",
                order: "desc",
            },
        ];

        const expectedSort: QuerySort[] = [
            {
                field: "field1",
                order: "ASC",
            },
        ];

        expect(generateSort(sort)).toEqual(expectedSort);
    });

    it("should return undefined when array is empty", () => {
        const sort: CrudSorting = [];

        expect(generateSort(sort)).toBeUndefined();
    });
});
