import { dataProvider } from "../../src/index";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("deleteOne", () => {
    it("correct response", async () => {
        const { data } = await dataProvider(supabaseClient).deleteOne({
            resource: "posts",
            id: "40",
        });

        expect(data.id).toEqual(40);
        expect(data.title).toEqual("Delete me");
    });
});
