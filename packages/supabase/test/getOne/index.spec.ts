import { dataProvider } from "../../src";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("getOne", () => {
    it("correct response", async () => {
        const { data } = await dataProvider(supabaseClient).getOne({
            resource: "posts",
            id: "2",
        });

        expect(data.title).toBe("Hello World");
        expect(data.content).toBe("test content");
        expect(data.categoryId).toEqual(1);
    });
});
