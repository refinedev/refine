import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("updateMany", () => {
    it("correct response", async () => {
        const { data } = await JsonServer(
            "https://readmin-nestjs-crud.pankod.com",
            axios,
        ).updateMany("posts", ["f1d6e030-4d70-44d4-98dd-8786f197c640"], {
            title: "updated-title-1",
        });

        expect(data[0]["title"]).toBe("updated-title-1");
    });
});
