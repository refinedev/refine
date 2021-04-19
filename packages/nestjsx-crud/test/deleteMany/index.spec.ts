import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("deleteMany", () => {
    it("correct response", async () => {
        const response = await JsonServer(
            "https://readmin-nestjs-crud.pankod.com",
            axios,
        ).deleteMany("posts", ["0916d7a2-0675-44f7-af5e-183a701ce1d8"]);

        const { data } = response;

        expect(data).toEqual([""]);
    });
});
