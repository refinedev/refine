import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

const YOUR_SECRET_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnZJZCI6IjYxMzczZGVkMjQ5NWMzMDAxOTliZTAxNiIsImtleUlkIjoiNjEzNzNlMzYyNDk1YzMwMDE5OWJlMDJkIiwiaWF0IjoxNjMxMDEwMzU4LCJleHAiOjI0OTUwMTAzNTh9.2fL28Bzd97mqfAvcsTrYj1mZ_hqf3WRnr2DOtV3lsc0";

const axiosInstance = axios.create();
axiosInstance.defaults.headers.common["Authorization"] = YOUR_SECRET_API_KEY;

describe("deleteMany", () => {
    it("correct response", async () => {
        const response = await JsonServer(
            "https://dev001.na-dev-engine.altogic.com",
            axiosInstance,
        ).deleteMany({
            resource: "post",
            ids: ["613f40854f18c4001914e7ff", "613f405197d1370019b259ab"],
        });

        const { data } = response;

        expect(data).toEqual(["", ""]);
    });
});
