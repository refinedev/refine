import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("deleteMany", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client).deleteMany!({
            resource: "posts",
            ids: [
                "cddd4ced-651d-4039-abe0-2a9dffbc8c82",
                "c82c71c5-0f0b-4042-b9a3-db977fe28a83",
            ],
            meta: {
                fields: ["id", "title"],
            },
        });

        expect(data[0].id).toEqual("cddd4ced-651d-4039-abe0-2a9dffbc8c82");
        expect(data[0].title).toEqual("Focus group Human Sleek");

        expect(data[1].id).toEqual("c82c71c5-0f0b-4042-b9a3-db977fe28a83");
        expect(data[1].title).toEqual("E-business alarm Bedfordshire");
    });

    it("correct response without meta", async () => {
        const { data } = await dataProvider(client).deleteMany!({
            resource: "posts",
            ids: [
                "ecd7aa21-19f4-46c9-bc3e-227dcd0807fd",
                "88a479ec-296d-48a4-9c57-7b48048a8067",
            ],
        });

        expect(data[0].id).toEqual("ecd7aa21-19f4-46c9-bc3e-227dcd0807fd");
        expect(data[1].id).toEqual("88a479ec-296d-48a4-9c57-7b48048a8067");
    });
});

describe("deleteMany with graphql naming convention", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client, {
            namingConvention: "graphql-default",
        }).deleteMany!({
            resource: "posts",
            ids: [
                "cddd4ced-651d-4039-abe0-2a9dffbc8c82",
                "c82c71c5-0f0b-4042-b9a3-db977fe28a83",
            ],
            meta: {
                fields: ["id", "title"],
            },
        });

        expect(data[0].id).toEqual("cddd4ced-651d-4039-abe0-2a9dffbc8c82");
        expect(data[0].title).toEqual("Focus group Human Sleek");

        expect(data[1].id).toEqual("c82c71c5-0f0b-4042-b9a3-db977fe28a83");
        expect(data[1].title).toEqual("E-business alarm Bedfordshire");
    });

    it("correct response without meta", async () => {
        const { data } = await dataProvider(client, {
            namingConvention: "graphql-default",
        }).deleteMany!({
            resource: "posts",
            ids: [
                "ecd7aa21-19f4-46c9-bc3e-227dcd0807fd",
                "88a479ec-296d-48a4-9c57-7b48048a8067",
            ],
        });

        expect(data[0].id).toEqual("ecd7aa21-19f4-46c9-bc3e-227dcd0807fd");
        expect(data[1].id).toEqual("88a479ec-296d-48a4-9c57-7b48048a8067");
    });
});
