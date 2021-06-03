import axios from "axios";
// import nock from "nock";

import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("deleteOne", () => {
    it("correct response", async () => {
        const response = await JsonServer(
            "https://refine-fake-rest.pankod.com",
            axios,
        ).deleteOne("posts", "1");

        const { data } = response;

        expect(data).toEqual({});
    });
});
