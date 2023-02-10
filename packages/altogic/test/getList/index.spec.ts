import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

const YOUR_SECRET_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnZJZCI6IjYxMzczZGVkMjQ5NWMzMDAxOTliZTAxNiIsImtleUlkIjoiNjEzNzNlMzYyNDk1YzMwMDE5OWJlMDJkIiwiaWF0IjoxNjMxMDEwMzU4LCJleHAiOjI0OTUwMTAzNTh9.2fL28Bzd97mqfAvcsTrYj1mZ_hqf3WRnr2DOtV3lsc0";

const axiosInstance = axios.create();
axiosInstance.defaults.headers.common["Authorization"] = YOUR_SECRET_API_KEY;

describe("getList", () => {
    it("correct response", async () => {
        const response = await JsonServer(
            "https://dev001.na-dev-engine.altogic.com",
            axiosInstance,
        ).getList({
            resource: "post",
            filters: [
                {
                    field: "_id",
                    operator: "ne",
                    value: "",
                },
            ],
        });

        expect(response.data[0]["id"]).toBe("613a25eb65f2050012410a41");
        expect(response.data[0]["title"]).toBe("foo");
        expect(response.total).toBe(8);
    });

    it("correct sorting response", async () => {
        const response = await JsonServer(
            "https://dev001.na-dev-engine.altogic.com",
            axiosInstance,
        ).getList({
            resource: "post",
            sorters: [
                {
                    field: "title",
                    order: "asc",
                },
            ],
        });

        expect(response.data[0]["id"]).toBe("613b80901550aa001b0a85f8");
        expect(response.data[0]["title"]).toBe("Deneme1");
        expect(response.total).toBe(8);
    });

    it("correct filter response", async () => {
        const response = await JsonServer(
            "https://dev001.na-dev-engine.altogic.com",
            axiosInstance,
        ).getList({
            resource: "post",
            filters: [
                {
                    field: "categoryId",
                    operator: "eq",
                    value: ["61373e585d65d30019e2b0a2"],
                },
            ],
        });

        expect(response.data[0]["categoryId"]).toBe("61373e585d65d30019e2b0a2");
        expect(response.total).toBe(5);
    });

    it("correct filter and sort response", async () => {
        const response = await JsonServer(
            "https://dev001.na-dev-engine.altogic.com",
            axiosInstance,
        ).getList({
            resource: "post",
            filters: [
                {
                    field: "categoryId",
                    operator: "eq",
                    value: ["61373e585d65d30019e2b0a2"],
                },
            ],
            sorters: [
                {
                    field: "title",
                    order: "asc",
                },
            ],
        });

        expect(response.data[0]["id"]).toBe("613a25eb65f2050012410a41");
        expect(response.total).toBe(5);
    });
});
