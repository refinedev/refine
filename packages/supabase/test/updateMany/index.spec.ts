import { dataProvider } from "../../src/index";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("updateMany", () => {
    it("correct response", async () => {
        const { data } = await dataProvider(supabaseClient).updateMany(
            "posts",
            ["42"],
            {
                slug: "update-many",
            },
        );

        expect(data[0]["slug"]).toBe("update-many");
    });
});
