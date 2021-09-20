import { dataProvider } from "../../src/index";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("getMany", () => {
    it("correct response", async () => {
        const response = await dataProvider(supabaseClient).getMany({
            resource: "posts",
            ids: ["2", "3"],
        });

        const { data } = response;

        expect(data[0]["id"]).toBe(2);
        expect(data[1]["id"]).toBe(3);
        expect(response.data.length).toBe(2);
    });
});
