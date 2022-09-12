import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("deleteMany", () => {
    it("correct response", async () => {
        const response = await JsonServer(
            "https://api.fake-rest.refine.dev",
            axios,
        ).deleteMany({ resource: "posts", ids: ["10"] });

        const { data } = response;

        expect(data).toEqual([{}]);
    });
});
