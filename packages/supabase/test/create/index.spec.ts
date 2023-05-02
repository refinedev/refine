import { dataProvider } from "../../src/index";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("create", () => {
    it("correct response with `select`", async () => {
        const { data } = await dataProvider(supabaseClient).create({
            resource: "posts",
            variables: {
                title: "foo",
                slug: "foo-bar",
                content: "bar",
                categoryId: 2,
                image: {},
            },
            meta: {
                select: "*",
            },
        });

        expect(data["id"]).toEqual(33);
        expect(data["title"]).toEqual("foo");
        expect(data["slug"]).toEqual("foo-bar");
        expect(data["content"]).toEqual("bar");
        expect(data["categoryId"]).toEqual(2);
    });
});
