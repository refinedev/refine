import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

const YOUR_SECRET_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnZJZCI6IjYxMzczZGVkMjQ5NWMzMDAxOTliZTAxNiIsImtleUlkIjoiNjEzNzNlMzYyNDk1YzMwMDE5OWJlMDJkIiwiaWF0IjoxNjMxMDEwMzU4LCJleHAiOjI0OTUwMTAzNTh9.2fL28Bzd97mqfAvcsTrYj1mZ_hqf3WRnr2DOtV3lsc0";

const axiosInstance = axios.create();
axiosInstance.defaults.headers.common["Authorization"] = YOUR_SECRET_API_KEY;

describe("getMany", () => {
    it("correct response", async () => {
        const response = await JsonServer(
            "https://dev001.na-dev-engine.altogic.com",
            axiosInstance,
        ).getMany({
            resource: "category",
            ids: ["61373e585d65d30019e2b0a2", "61373e5e59c5a7001aeac77d"],
        });

        const { data } = response;

        expect(data[0]["id"]).toBe("61373e585d65d30019e2b0a2");
        expect(data[1]["id"]).toBe("61373e5e59c5a7001aeac77d");
        expect(response.data.length).toBe(2);
    });
});
