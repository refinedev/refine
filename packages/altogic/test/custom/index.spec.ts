import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

const YOUR_SECRET_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnZJZCI6IjYxMzczZGVkMjQ5NWMzMDAxOTliZTAxNiIsImtleUlkIjoiNjEzNzNlMzYyNDk1YzMwMDE5OWJlMDJkIiwiaWF0IjoxNjMxMDEwMzU4LCJleHAiOjI0OTUwMTAzNTh9.2fL28Bzd97mqfAvcsTrYj1mZ_hqf3WRnr2DOtV3lsc0";

const axiosInstance = axios.create();
axiosInstance.defaults.headers = {
    Authorization: YOUR_SECRET_API_KEY,
    "Content-Type": "application/json",
};

describe("custom", () => {
    const API_URL = "https://api.fake-rest.refine.dev";

    it("correct get response", async () => {
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
        expect(response.data[0]["title"]).toBe("test");
        expect(response.total).toBe(NaN);
    });
});
