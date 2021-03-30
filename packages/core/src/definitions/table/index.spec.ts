import { stringifyTableParams, parseTableParams } from "./";
import { TablePaginationConfig } from "@components/antd";
import { Sort, Filters } from "../../interfaces";

describe("definitions/table", () => {
    it("stringify table params correctly", async () => {
        const pagination: TablePaginationConfig = {
            current: 1,
            pageSize: 10,
        };

        const sorter: Sort = [
            {
                field: "id",
                order: "descend",
            },
            {
                field: "title",
                order: "descend",
            },
        ];
        const filters: Filters = {
            categoryId: [1, 2],
        };

        const url = stringifyTableParams({ pagination, sorter, filters });
        expect(url).toMatchSnapshot();
    });

    it("stringify table single sort params correctly", async () => {
        const pagination: TablePaginationConfig = {
            current: 1,
            pageSize: 10,
        };

        const sorter: Sort = { field: "id", order: "descend" };
        const filters: Filters = {
            categoryId: [1, 2],
        };

        const url = stringifyTableParams({ pagination, sorter, filters });
        expect(url).toMatchSnapshot();
    });

    it("parse table params with single sorter correctly", async () => {
        const url =
            "current=1&pageSize=10&categoryId[]=1&categoryId[]=2&sort=id&order=descend";

        const initialSorter: Sort = [];
        const initialFilter: Filters = {};

        const {
            parsedCurrent,
            parsedPageSize,
            parsedSorter,
            parsedFilters,
        } = parseTableParams({
            initialSorter,
            initialFilter,
            url,
        });

        expect(parsedCurrent).toBe(1);
        expect(parsedPageSize).toBe(10);
        expect(parsedSorter).toStrictEqual([{ field: "id", order: "descend" }]);
        expect(parsedFilters).toStrictEqual({
            categoryId: ["1", "2"],
        });
    });
});
