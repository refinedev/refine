import { Pagination } from "@pankod/refine-core";
import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

const defaultPagination: Required<Pagination> = {
    current: 1,
    pageSize: 10,
    mode: "server",
};

describe("getList", () => {
    it("correct response", async () => {
        const response = await JsonServer(
            "https://api.fake-rest.refine.dev",
            axios,
        ).getList({ resource: "posts", pagination: defaultPagination });

        expect(response.data[0]["id"]).toBe(1);
        expect(response.data[0]["title"]).toBe(
            "Mollitia ipsam nisi in porro velit asperiores et quaerat dolorem.",
        );
        expect(response.total).toBe(1000);
    });

    it("correct sorting response", async () => {
        const response = await JsonServer(
            "https://api.fake-rest.refine.dev",
            axios,
        ).getList({
            resource: "posts",
            pagination: defaultPagination,
            sorters: [
                {
                    field: "id",
                    order: "asc",
                },
            ],
        });

        expect(response.data[0]["id"]).toBe(1);
        expect(response.data[0]["title"]).toBe(
            "Mollitia ipsam nisi in porro velit asperiores et quaerat dolorem.",
        );
        expect(response.total).toBe(1000);
    });

    it("correct filter response", async () => {
        const response = await JsonServer(
            "https://api.fake-rest.refine.dev",
            axios,
        ).getList({
            resource: "posts",
            pagination: defaultPagination,
            filters: [
                {
                    field: "category.id",
                    operator: "eq",
                    value: ["1"],
                },
            ],
        });

        expect(response.data[0]["category"]["id"]).toBe(1);
        expect(response.total).toBe(17);
    });

    it("correct filter and sort response", async () => {
        const response = await JsonServer(
            "https://api.fake-rest.refine.dev",
            axios,
        ).getList({
            resource: "posts",
            pagination: defaultPagination,
            filters: [
                {
                    field: "category.id",
                    operator: "eq",
                    value: ["1"],
                },
            ],
            sorters: [
                {
                    field: "id",
                    order: "asc",
                },
            ],
        });

        expect(response.data[0]["id"]).toBe(44);
        expect(response.total).toBe(17);
    });
});
