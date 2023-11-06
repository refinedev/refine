import nock from "nock";
import { dataProvider } from "../../src/index";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("getMany", () => {
    it("correct response", async () => {
        const response = await dataProvider(supabaseClient).getMany!({
            resource: "posts",
            ids: ["2", "3"],
        });

        const { data } = response;

        expect(data[0]["id"]).toBe(2);
        expect(data[1]["id"]).toBe(3);
        expect(response.data.length).toBe(2);
    });

    it("correct response with select metadata", async () => {
        const { data } = await dataProvider(supabaseClient).getMany!({
            resource: "posts",
            ids: ["3", "61"],
            meta: {
                select: "title",
            },
        });

        expect(Object.keys(data[0]).length).toBe(1);
        expect(data[0]["title"]).toBe("1asdasd");
        expect(data[1]["title"]).toBe("Lorem Ipsum 2-6");
        expect(data.length).toBe(2);
    });
});
