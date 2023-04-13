import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("deleteOne", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client).deleteOne({
            resource: "posts",
            id: "bac2ef0a-899f-4694-84ef-b9c6fe4dc2b7",
            meta: {
                fields: ["id", "title"],
            },
        });

        expect(data.id).toEqual("bac2ef0a-899f-4694-84ef-b9c6fe4dc2b7");
        expect(data.title).toEqual("asdfasdfsadf");
    });

    it("correct response with meta and Int idType", async () => {
        const { data } = await dataProvider(client, {
            idType: "Int",
        }).deleteOne({
            resource: "users",
            id: 1,
            meta: {
                fields: ["id", "name"],
            },
        });

        expect(data.id).toEqual(1);
        expect(data.name).toEqual("Refine Dev");
    });

    it("correct response without metaData", async () => {
        const { data } = await dataProvider(client).deleteOne({
            resource: "posts",
            id: "b19c9bd4-dff9-4ecf-acfe-aea2c4c9ec41",
        });

        expect(data.id).toEqual("b19c9bd4-dff9-4ecf-acfe-aea2c4c9ec41");
    });
});

describe("deleteOne with graphql naming convention", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client, {
            namingConvention: "graphql-default",
        }).deleteOne({
            resource: "posts",
            id: "bac2ef0a-899f-4694-84ef-b9c6fe4dc2b7",
            meta: {
                fields: ["id", "title"],
            },
        });

        expect(data.id).toEqual("bac2ef0a-899f-4694-84ef-b9c6fe4dc2b7");
        expect(data.title).toEqual("asdfasdfsadf");
    });

    it("correct response with meta and Int idType", async () => {
        const { data } = await dataProvider(client, {
            idType: "Int",
            namingConvention: "graphql-default",
        }).deleteOne({
            resource: "users",
            id: 1,
            meta: {
                fields: ["id", "name"],
            },
        });

        expect(data.id).toEqual(1);
        expect(data.name).toEqual("Refine Dev");
    });

    it("correct response without metaData", async () => {
        const { data } = await dataProvider(client, {
            namingConvention: "graphql-default",
        }).deleteOne({
            resource: "posts",
            id: "b19c9bd4-dff9-4ecf-acfe-aea2c4c9ec41",
        });

        expect(data.id).toEqual("b19c9bd4-dff9-4ecf-acfe-aea2c4c9ec41");
    });
});
