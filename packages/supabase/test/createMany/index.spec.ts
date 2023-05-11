import { dataProvider } from "../../src/index";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("createMany", () => {
    it("correct response with `select`", async () => {
        const { data } = await dataProvider(supabaseClient).createMany!({
            resource: "posts",
            variables: [
                {
                    title: "foo",
                    slug: "foo-bar",
                    content: "bar",
                    categoryId: 2,
                    image: {},
                },
                {
                    title: "foo-2",
                    slug: "foo-bar-2",
                    content: "bar-2",
                    categoryId: 1,
                    image: {},
                },
            ],
            meta: {
                select: "*",
            },
        });

        expect(data[0]["id"]).toEqual(36);
        expect(data[0]["title"]).toEqual("foo");
        expect(data[0]["slug"]).toEqual("foo-bar");
        expect(data[0]["content"]).toEqual("bar");
        expect(data[0]["categoryId"]).toEqual(2);

        expect(data[1]["id"]).toEqual(37);
        expect(data[1]["title"]).toEqual("foo-2");
        expect(data[1]["slug"]).toEqual("foo-bar-2");
        expect(data[1]["content"]).toEqual("bar-2");
        expect(data[1]["categoryId"]).toEqual(1);
    });
});
