import { RequestQueryBuilder } from "@nestjsx/crud-request";
import { CrudFilters, CrudSorting } from "@refinedev/core";
import { handleFilter, handleSort } from "../../src/utils";

describe("handleSort", () => {
    it("should not modify the query if no sorters are provided", () => {
        let query = RequestQueryBuilder.create();
        const initialQuery = query.query();

        const sorters: CrudSorting = [];

        query = handleSort(query, sorters);

        expect(query.query()).toEqual(initialQuery);
    });

    it("should add sortBy to the query if sorters are provided", () => {
        let query = RequestQueryBuilder.create();

        const sorters: CrudSorting = [
            {
                field: "field1",
                order: "asc",
            },
            {
                field: "field2",
                order: "desc",
            },
        ];

        query = handleSort(query, sorters);

        const expectedSortBy =
            "sort%5B0%5D=field1%2CASC&sort%5B1%5D=field2%2CDESC";
        expect(query.query()).toEqual(expectedSortBy);
    });

    it("should ignore invalid sort entries", () => {
        let query = RequestQueryBuilder.create();

        const sorters: CrudSorting = [
            {
                field: "field1",
                order: "asc",
            },
            {
                field: "",
                order: "desc",
            },
        ];

        query = handleSort(query, sorters);

        const expectedSortBy = "sort%5B0%5D=field1%2CASC";
        expect(query.query()).toEqual(expectedSortBy);
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
