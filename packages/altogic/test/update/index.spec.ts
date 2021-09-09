import axios from "axios";
// import nock from "nock";

import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("update", () => {
    it("correct response", async () => {
        const response = await JsonServer(
            "https://api.fake-rest.refine.dev",
            axios,
        ).update("posts", "1000", {
            id: 1001,
            title: "foo",
            content: "bar",
        });

        const { data } = response;

        expect(data["id"]).toBe(1000);
        expect(data["title"]).toBe("foo");
        expect(data["content"]).toBe("bar");
    });
});
