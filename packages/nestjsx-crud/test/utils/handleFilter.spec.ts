import { RequestQueryBuilder } from "@nestjsx/crud-request";
import { CrudFilters, CrudSorting } from "@refinedev/core";
import { handleFilter, handleSort } from "../../src/utils";

describe("handleFilter", () => {
    it("should apply filters to the query", () => {
        let query = RequestQueryBuilder.create();

        // Apply filters
        const filters: CrudFilters = [
            {
                field: "age",
                operator: "gt",
                value: 25,
            },
            {
                field: "name",
                operator: "contains",
                value: "John",
            },
        ];

        query = handleFilter(query, filters);

        expect(query.query()).toEqual(
            "s=%7B%22%24and%22%3A%5B%7B%22age%22%3A%7B%22%24gt%22%3A25%7D%7D%2C%7B%22name%22%3A%7B%22%24contL%22%3A%22John%22%7D%7D%5D%7D",
        );
    });

    it("should not apply filters if none are provided", () => {
        let query = RequestQueryBuilder.create();

        query = handleFilter(query);

        expect(query.query()).toEqual("");
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
