import { RequestQueryBuilder } from "@nestjsx/crud-request";
import { handleFilter, handlePagination, handleSort } from "../../src/utils";
import { CrudFilters, CrudSorting, Pagination } from "@refinedev/core";

describe("handlePagination", () => {
    it("should apply pagination for server mode", () => {
        let query = RequestQueryBuilder.create();
        const pagination: Pagination = {
            current: 2,
            pageSize: 20,
            mode: "server",
        };

        query = handlePagination(query, pagination);

        expect(query.query()).toContain("limit=20");
        expect(query.query()).toContain("page=2");
        expect(query.query()).toContain("offset=20");
    });

    it("should use default pagination values if not provided", () => {
        let query = RequestQueryBuilder.create();

        query = handlePagination(query);

        expect(query.query()).toContain("limit=10");
        expect(query.query()).toContain("page=1");
        expect(query.query()).toContain("offset=0");
    });

    it("should not apply pagination for client mode", () => {
        let query = RequestQueryBuilder.create();
        const pagination: Pagination = {
            current: 3,
            pageSize: 15,
            mode: "client",
        };

        query = handlePagination(query, pagination);

        expect(query.query()).not.toContain("limit=15");
        expect(query.query()).not.toContain("page=3");
        expect(query.query()).not.toContain("offset=30");
    });

    it("should work with complex sort and filter parameters", () => {
        let query = RequestQueryBuilder.create();

        const pagination: Pagination = {
            current: 3,
            pageSize: 15,
        };

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
        query = handlePagination(query, pagination);

        const expectedQuery =
            "sort%5B0%5D=name%2CASC&s=%7B%22%24and%22%3A%5B%7B%22age%22%3A%7B%22%24gte%22%3A18%7D%7D%2C%7B%22email%22%3A%7B%22%24eq%22%3A%22john%22%7D%7D%5D%7D&limit=15&page=3&offset=30";

        expect(query.query()).toEqual(expectedQuery);
    });
});
