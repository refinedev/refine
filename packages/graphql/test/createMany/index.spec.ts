import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("createMany", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client).createMany!({
            resource: "posts",
            variables: [
                {
                    title: "foo",
                    content: "bar",
                    category: "2",
                },
                {
                    title: "foo-2",
                    content: "bar-2",
                    category: "3",
                },
            ],
            meta: {
                fields: [
                    {
                        operation: "post",
                        fields: [
                            "id",
                            "title",
                            "content",
                            { category: ["id"] },
                        ],
                        variables: {},
                    },
                ],
            },
        });

        expect(data[0]["id"]).toEqual("45");
        expect(data[0]["title"]).toEqual("foo");
        expect(data[0]["content"]).toEqual("bar");
        expect(data[0]["category"].id).toEqual("2");

        expect(data[1]["id"]).toEqual("46");
        expect(data[1]["title"]).toEqual("foo-2");
        expect(data[1]["content"]).toEqual("bar-2");
        expect(data[1]["category"].id).toEqual("3");
    });

    it("correct response without meta", async () => {
        const { data } = await dataProvider(client).createMany!({
            resource: "posts",
            variables: [
                {
                    title: "foo",
                    content: "bar",
                    category: "2",
                },
                {
                    title: "foo-2",
                    content: "bar-2",
                    category: "3",
                },
            ],
        });

        expect(data[0]["id"]).toEqual("48");

        expect(data[1]["id"]).toEqual("47");
    });
});
