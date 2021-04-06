import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("updateMany", () => {
    it("correct response", async () => {
        const { data } = await JsonServer(
            "https://readmin-nestjs-crud.pankod.com",
        ).updateMany("posts", ["7810bbc3-b133-4f85-8c6b-d7806b329f17"], {
            title: "updated-title-1",
            content: "updated-content",
            status: "draft",
            category: {
                id: "aafa2e39-fdba-4987-bfd3-77fca8f76e89",
            },
            user: {
                id: "c19675a7-ab4a-48c6-8d35-1d838da3a613",
            },
        });

        expect(data[0]["title"]).toBe("updated-title-1");
    });
});
