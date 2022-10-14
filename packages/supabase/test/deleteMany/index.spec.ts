import { dataProvider } from "../../src/index";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("deleteMany", () => {
    it("correct response", async () => {
        const { data } = await dataProvider(supabaseClient).deleteMany!({
            resource: "posts",
            ids: ["43"],
        });

        expect(data[0].id).toEqual(43);
        expect(data[0].title).toEqual("Hello World 2");
    });
});
