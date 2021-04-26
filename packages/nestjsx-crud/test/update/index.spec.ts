import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("update", () => {
    it("correct response", async () => {
        const { data } = await JsonServer(
            "https://refine-nestjs-crud.pankod.com",
            axios,
        ).update("posts", "0b4faa6d-6726-4967-be13-e9d05d9aef7f", {
            title: "updated-title",
        });

        expect(data["id"]).toBe("0b4faa6d-6726-4967-be13-e9d05d9aef7f");
        expect(data["title"]).toBe("updated-title");
    });
});
