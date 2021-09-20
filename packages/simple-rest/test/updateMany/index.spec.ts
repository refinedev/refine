import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("updateMany", () => {
    it("correct response", async () => {
        const response = await JsonServer(
            "https://api.fake-rest.refine.dev",
            axios,
        ).updateMany({
            resource: "posts",
            ids: ["999"],
            variables: {
                title: "foo",
                content: "bar",
            },
        });

        const { data } = response;

        expect(data[0]["title"]).toBe("foo");
        expect(data[0]["content"]).toBe("bar");
    });
});
