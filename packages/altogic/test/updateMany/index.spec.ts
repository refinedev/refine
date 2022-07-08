import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

const YOUR_SECRET_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnZJZCI6IjYxMzczZGVkMjQ5NWMzMDAxOTliZTAxNiIsImtleUlkIjoiNjEzNzNlMzYyNDk1YzMwMDE5OWJlMDJkIiwiaWF0IjoxNjMxMDEwMzU4LCJleHAiOjI0OTUwMTAzNTh9.2fL28Bzd97mqfAvcsTrYj1mZ_hqf3WRnr2DOtV3lsc0";

const axiosInstance = axios.create();
axiosInstance.defaults.headers.common["Authorization"] = YOUR_SECRET_API_KEY;
axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

describe("updateMany", () => {
    it("correct response", async () => {
        const response = await JsonServer(
            "https://dev001.na-dev-engine.altogic.com",
            axiosInstance,
        ).updateMany({
            resource: "post",
            ids: ["613f445e97d1370019b25a60", "613f445c1550aa001b0a8de7"],
            variables: {
                title: "foo",
                content: "bar",
            },
        });

        const { data } = response;

        expect(data[0]["title"]).toBe("foo");
        expect(data[0]["content"]).toBe("bar");

        expect(data[1]["title"]).toBe("foo");
        expect(data[1]["content"]).toBe("bar");
    });
});
