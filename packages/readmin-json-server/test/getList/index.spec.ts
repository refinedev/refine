import axios from "axios";
// import nock from "nock";

import JsonServer from "../../src/index";
import "./getList.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("getList", () => {
    it("correct response", async () => {
        const response = await JsonServer(
            "https://readmin-fake-rest.pankod.com",
        ).getList("posts", {});

        expect(response.data[0]["id"]).toBe(1000);
        expect(response.data[0]["title"]).toBe(
            "Omnis repellat maiores eligendi fugiat voluptatem consectetur.",
        );
        expect(response.total).toBe(1000);
    });
});
