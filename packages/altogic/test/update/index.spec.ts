import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

const YOUR_SECRET_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnZJZCI6IjYxMzczZGVkMjQ5NWMzMDAxOTliZTAxNiIsImtleUlkIjoiNjEzNzNlMzYyNDk1YzMwMDE5OWJlMDJkIiwiaWF0IjoxNjMxMDEwMzU4LCJleHAiOjI0OTUwMTAzNTh9.2fL28Bzd97mqfAvcsTrYj1mZ_hqf3WRnr2DOtV3lsc0";

const axiosInstance = axios.create();
axiosInstance.defaults.headers.common["Authorization"] = YOUR_SECRET_API_KEY;
axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

describe("update", () => {
    it("correct response", async () => {
        const response = await JsonServer(
            "https://dev001.na-dev-engine.altogic.com",
            axiosInstance,
        ).update({
            resource: "post",
            id: "613a25eb65f2050012410a41",
            variables: {
                title: "foo",
                content: "bar",
            },
        });

        const { data } = response;

        expect(data["_id"]).toBe("613a25eb65f2050012410a41");
        expect(data["title"]).toBe("foo");
        expect(data["content"]).toBe("bar");
    });
});
