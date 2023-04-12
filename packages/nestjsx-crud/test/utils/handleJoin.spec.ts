import {
    RequestQueryBuilder,
    QueryJoin,
    QueryJoinArr,
} from "@nestjsx/crud-request";
import { handleFilter, handleJoin, handleSort } from "../../src/utils";
import { CrudFilters, CrudSorting } from "@refinedev/core";

describe("handleJoin", () => {
    it("should apply join to the query", () => {
        let query = RequestQueryBuilder.create();

        const join: QueryJoin | QueryJoinArr | (QueryJoin | QueryJoinArr)[] = [
            {
                field: "profile",
                select: ["name", "age"],
            },
            {
                field: "posts",
                select: ["title", "content"],
            },
        ];

        query = handleJoin(query, join);

        expect(query.query()).toEqual(
            "join%5B0%5D=profile%7C%7Cname%2Cage&join%5B1%5D=posts%7C%7Ctitle%2Ccontent",
        );
    });

    it("should not apply join if none is provided", () => {
        let query = RequestQueryBuilder.create();

        query = handleJoin(query);

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

        const join: QueryJoin | QueryJoinArr | (QueryJoin | QueryJoinArr)[] = [
            {
                field: "profile",
                select: ["name", "age"],
            },
            {
                field: "posts",
                select: ["title", "content"],
            },
        ];

        query = handleJoin(query, join);
        query = handleSort(query, sorters);
        query = handleFilter(query, filters);

        const expectedQuery =
            "join%5B0%5D=profile%7C%7Cname%2Cage&join%5B1%5D=posts%7C%7Ctitle%2Ccontent&sort%5B0%5D=name%2CASC&s=%7B%22%24and%22%3A%5B%7B%22age%22%3A%7B%22%24gte%22%3A18%7D%7D%2C%7B%22email%22%3A%7B%22%24eq%22%3A%22john%22%7D%7D%5D%7D";

        expect(query.query()).toEqual(expectedQuery);
    });
});
