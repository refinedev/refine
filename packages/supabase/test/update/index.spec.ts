import { dataProvider } from "../../src";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("update", () => {
    it("correct response", async () => {
        const { data } = await dataProvider(supabaseClient).update({
            id: 1246,
            resource: "posts",
            variables: {
                title: "test",
                categoryId: 52,
                content: "test content",
            },
        });

        expect(data).toEqual(
            expect.objectContaining({
                id: 1246,
                title: "test",
                categoryId: 52,
                content: "test content",
            }),
        );
    });
});
