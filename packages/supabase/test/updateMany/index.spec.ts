import { dataProvider } from "../../src/index";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("updateMany", () => {
    it("correct response with `select`", async () => {
        const { data } = await dataProvider(supabaseClient).updateMany!({
            resource: "posts",
            ids: [1246],
            variables: {
                title: "test",
                categoryId: 52,
                content: "test content",
            },
            meta: {
                select: "*",
            },
        });

        expect(data[0]).toEqual(
            expect.objectContaining({
                id: 1246,
                title: "test",
                categoryId: 52,
                content: "test content",
            }),
        );
    });
});
