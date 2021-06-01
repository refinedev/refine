import {
    stringifyTableParams,
    parseTableParams,
    getDefaultSortOrder,
    getDefaultFilter,
} from "./";
import { TablePaginationConfig } from "@components/antd";
import { CrudSorting, CrudFilters } from "../../interfaces";

describe("definitions/table", () => {
    it("stringify table params correctly", async () => {
        const pagination: TablePaginationConfig = {
            current: 1,
            pageSize: 10,
        };

        const sorter: CrudSorting = [
            {
                field: "id",
                order: "desc",
            },
            {
                field: "title",
                order: "desc",
            },
        ];

        const filters: CrudFilters = [
            {
                field: "categoryId",
                operator: "in",
                value: [1, 2],
            },
        ];

        const url = stringifyTableParams({ pagination, sorter, filters });
        expect(url).toMatchSnapshot();
    });

    it("stringify table single sort params correctly", async () => {
        const pagination: TablePaginationConfig = {
            current: 1,
            pageSize: 10,
        };

        const sorter: CrudSorting = [{ field: "id", order: "desc" }];
        const filters: CrudFilters = [
            {
                field: "categoryId",
                operator: "in",
                value: [1, 2],
            },
        ];

        const url = stringifyTableParams({ pagination, sorter, filters });
        expect(url).toMatchSnapshot();
    });

    it("parse table params with single sorter correctly", async () => {
        const url =
            "?current=1&pageSize=10&categoryId__in[]=1&categoryId__in[]=2&sort[]=id&order[]=desc";

        const {
            parsedCurrent,
            parsedPageSize,
            parsedSorter,
            parsedFilters,
        } = parseTableParams(url);

        expect(parsedCurrent).toBe(1);
        expect(parsedPageSize).toBe(10);
        expect(parsedSorter).toStrictEqual([{ field: "id", order: "desc" }]);
        expect(parsedFilters).toStrictEqual([
            { field: "categoryId", operator: "in", value: ["1", "2"] },
        ]);
    });

    it("getDefaultSortOrder", () => {
        const sorter: CrudSorting = [
            {
                field: "title",
                order: "asc",
            },
            {
                field: "view",
                order: "desc",
            },
        ];

        expect(getDefaultSortOrder("title", sorter)).toEqual("ascend");
    });

    it("getDefaultFilter", () => {
        const filters: CrudFilters = [
            {
                field: "title",
                operator: "contains",
                value: "test",
            },
        ];
        expect(getDefaultFilter("title", filters)).toEqual("test");
    });

    it("getDefaultFilter empty array", () => {
        const filters: CrudFilters = [
            {
                field: "title",
                operator: "contains",
                value: undefined,
            },
        ];
        expect(getDefaultFilter("title", filters)).toEqual([]);
    });
});
