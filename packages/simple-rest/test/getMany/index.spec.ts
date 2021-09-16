import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("getMany", () => {
    it("correct response", async () => {
        const response = await JsonServer(
            "https://api.fake-rest.refine.dev",
            axios,
        ).getMany({ resource: "posts", ids: ["1", "2", "3"] });

        const { data } = response;

        expect(data[0]["id"]).toBe(1);
        expect(data[1]["id"]).toBe(2);
        expect(data[2]["id"]).toBe(3);
        expect(response.data.length).toBe(3);
    });
});
