import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("custom", () => {
    it("correct get query response", async () => {
        const response = await dataProvider(client).custom?.({
            url: "",
            method: "get",
            meta: {
                operation: "posts",
                variables: {
                    sort: "id:asc",
                    where: { value: { title_contains: "foo" }, type: "JSON" },
                },
                fields: ["id", "title", { category: ["id"] }],
            },
        });

        expect(response?.data[0].id).toBe("21");
        expect(response?.data[0].title).toBe("updated-foo-2");
    });

    it("correct get mutation response", async () => {
        const response = await dataProvider(client).custom?.({
            url: "",
            method: "post",
            meta: {
                operation: "updatePost",
                variables: {
                    input: {
                        value: {
                            where: { id: "32" },
                            data: { title: "custom-foo" },
                        },
                        type: "updatePostInput",
                    },
                },
                fields: [
                    {
                        operation: "post",
                        fields: ["id", "title"],
                        variables: {},
                    },
                ],
            },
        });

        expect(response?.data.post.id).toBe("32");
        expect(response?.data.post.title).toBe("custom-foo");
    });
});
