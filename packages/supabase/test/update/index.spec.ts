import { dataProvider } from "../../src";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("update", () => {
    it("correct response with `select`", async () => {
        const { data } = await dataProvider(supabaseClient).update({
            id: 1246,
            resource: "posts",
            variables: {
                title: "test",
                categoryId: 52,
                content: "test content",
            },
            meta: {
                select: "*",
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
