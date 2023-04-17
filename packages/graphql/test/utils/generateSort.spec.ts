import { CrudSorting } from "@refinedev/core";
import { generateSort, genereteSort } from "../../src/utils";

describe("generateSort", () => {
    it.each([undefined, null, []])(
        "should return empty array when sorters is %p",
        (sorters) => {
            expect(generateSort(sorters as CrudSorting)).toEqual([]);
        },
    );

    it("should return correct sort query for single sorter", () => {
        const sorters: CrudSorting = [
            {
                field: "name",
                order: "asc",
            },
        ];
        expect(generateSort(sorters)).toEqual("name:asc");
    });

    it("should return correct sort query for multiple sorters", () => {
        const sorters: CrudSorting = [
            {
                field: "name",
                order: "asc",
            },
            {
                field: "age",
                order: "desc",
            },
        ];
        expect(generateSort(sorters)).toEqual("name:asc,age:desc");
    });
});

describe("genereteSort (deprecated)", () => {
    it("should be deprecated and equal to generateSort", () => {
        const sorters: CrudSorting = [
            {
                field: "name",
                order: "asc",
            },
            {
                field: "age",
                order: "desc",
            },
        ];
        expect(genereteSort(sorters)).toEqual(generateSort(sorters));
    });
});
