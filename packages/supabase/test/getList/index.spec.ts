import { dataProvider } from "../../src/index";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("getList", () => {
    it("correct response", async () => {
        const response = await dataProvider(supabaseClient).getList(
            "posts",
            {},
        );

        expect(response.data[0]["id"]).toBe(2);
        expect(response.data[0]["title"]).toBe("test title");
        expect(response.total).toBe(2);
    });

    it("correct sorting response", async () => {
        const response = await dataProvider(supabaseClient).getList("posts", {
            sort: [
                {
                    field: "title",
                    order: "asc",
                },
            ],
        });

        expect(response.data[0]["id"]).toBe(3);
        expect(response.data[0]["title"]).toBe("What a library");
        expect(response.total).toBe(2);
    });
});
