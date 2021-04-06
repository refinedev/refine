import axios from "axios";

import JsonServer from "../../src/index";
import "./index.mock";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("update", () => {
    it("correct response", async () => {
        const { data } = await JsonServer(
            "https://readmin-nestjs-crud.pankod.com",
        ).update("posts", "6536e986-e500-4933-b154-b51d60d702c2", {
            title: "updated-title",
            content: "updated-content",
            status: "draft",
            category: {
                id: "ab50ed75-e3df-477c-a8f7-e41b59848e9e",
            },
            user: {
                id: "8a6066b6-8034-46a4-af6a-8a84035673c4",
            },
        });

        expect(data["id"]).toBe("6536e986-e500-4933-b154-b51d60d702c2");
        expect(data["title"]).toBe("updated-title");
    });
});
