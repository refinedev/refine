import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("updateMany", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client).updateMany!({
            resource: "posts",
            ids: [
                "8f11b716-1d5a-4b56-831f-7aaf8c6ce36c",
                "92345710-b197-49ed-a00f-f52b32536acc",
            ],
            variables: {
                content: "Vel deserunt rerum et.",
            },
            meta: {
                fields: ["id", "title", "content"],
            },
        });

        expect(data[0]["id"]).toEqual("8f11b716-1d5a-4b56-831f-7aaf8c6ce36c");
        expect(data[0]["title"]).toEqual("asdfasdfsadf482");
        expect(data[0]["content"]).toEqual("Vel deserunt rerum et.");

        expect(data[1]["id"]).toEqual("92345710-b197-49ed-a00f-f52b32536acc");
        expect(data[1]["title"]).toEqual("Agent Berkshire Rustic796");
        expect(data[1]["content"]).toEqual("Vel deserunt rerum et.");
    });

    it("correct response without meta", async () => {
        const { data } = await dataProvider(client).updateMany!({
            resource: "posts",
            ids: [
                "8f11b716-1d5a-4b56-831f-7aaf8c6ce36c",
                "92345710-b197-49ed-a00f-f52b32536acc",
            ],
            variables: {
                title: "updated-foo-1",
                content: "updated-bar-1",
            },
        });

        expect(data[0]["id"]).toEqual("8f11b716-1d5a-4b56-831f-7aaf8c6ce36c");
        expect(data[1]["id"]).toEqual("92345710-b197-49ed-a00f-f52b32536acc");
    });
});

describe("updateMany with graphql naming convention", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client, {
            namingConvention: "graphql-default",
        }).updateMany!({
            resource: "posts",
            ids: [
                "8f11b716-1d5a-4b56-831f-7aaf8c6ce36c",
                "92345710-b197-49ed-a00f-f52b32536acc",
            ],
            variables: {
                content: "Vel deserunt rerum et.",
            },
            meta: {
                fields: ["id", "title", "content"],
            },
        });

        expect(data[0]["id"]).toEqual("8f11b716-1d5a-4b56-831f-7aaf8c6ce36c");
        expect(data[0]["title"]).toEqual("asdfasdfsadf482");
        expect(data[0]["content"]).toEqual("Vel deserunt rerum et.");

        expect(data[1]["id"]).toEqual("92345710-b197-49ed-a00f-f52b32536acc");
        expect(data[1]["title"]).toEqual("Agent Berkshire Rustic796");
        expect(data[1]["content"]).toEqual("Vel deserunt rerum et.");
    });

    it("correct response without meta", async () => {
        const { data } = await dataProvider(client, {
            namingConvention: "graphql-default",
        }).updateMany!({
            resource: "posts",
            ids: [
                "8f11b716-1d5a-4b56-831f-7aaf8c6ce36c",
                "92345710-b197-49ed-a00f-f52b32536acc",
            ],
            variables: {
                title: "updated-foo-1",
                content: "updated-bar-1",
            },
        });

        expect(data[0]["id"]).toEqual("8f11b716-1d5a-4b56-831f-7aaf8c6ce36c");
        expect(data[1]["id"]).toEqual("92345710-b197-49ed-a00f-f52b32536acc");
    });
});
