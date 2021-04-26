import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("getOne", () => {
    it("correct response", async () => {
        const { data } = await JsonServer(
            "https://refine-nestjs-crud.pankod.com",
            axios,
        ).getOne("posts", "6536e986-e500-4933-b154-b51d60d702c2");

        expect(data.id).toBe("6536e986-e500-4933-b154-b51d60d702c2");
        expect(data.title).toBe("Refined productize SMS");
    });
});
