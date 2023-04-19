import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("getMany", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client).getMany!({
            resource: "posts",
            ids: [
                "c82c71c5-0f0b-4042-b9a3-db977fe28a83",
                "bac2ef0a-899f-4694-84ef-b9c6fe4dc2b7",
            ],
            meta: {
                fields: ["id", "title", "content", { category: ["id"] }],
            },
        });

        expect(data[0]["id"]).toEqual("c82c71c5-0f0b-4042-b9a3-db977fe28a83");
        expect(data[0]["title"]).toEqual("adcsadas");
        expect(data[0]["content"]).toEqual("asvasdvasdv");
        expect(data[0]["category"].id).toEqual(
            "8332c138-3231-406d-9655-1328ded9d5f2",
        );

        expect(data[1]["id"]).toEqual("bac2ef0a-899f-4694-84ef-b9c6fe4dc2b7");
        expect(data[1]["title"]).toEqual("asdfasdfsadf");
        expect(data[1]["content"]).toEqual("asdfasdfasdfasdf");
        expect(data[1]["category"].id).toEqual(
            "8332c138-3231-406d-9655-1328ded9d5f2",
        );
    });
});

describe("getMany with graphql naming convention", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client, {
            namingConvention: "graphql-default",
        }).getMany!({
            resource: "posts",
            ids: [
                "c82c71c5-0f0b-4042-b9a3-db977fe28a83",
                "bac2ef0a-899f-4694-84ef-b9c6fe4dc2b7",
            ],
            meta: {
                fields: ["id", "title", "content", { category: ["id"] }],
            },
        });

        expect(data[0]["id"]).toEqual("c82c71c5-0f0b-4042-b9a3-db977fe28a83");
        expect(data[0]["title"]).toEqual("adcsadas");
        expect(data[0]["content"]).toEqual("asvasdvasdv");
        expect(data[0]["category"].id).toEqual(
            "8332c138-3231-406d-9655-1328ded9d5f2",
        );

        expect(data[1]["id"]).toEqual("bac2ef0a-899f-4694-84ef-b9c6fe4dc2b7");
        expect(data[1]["title"]).toEqual("asdfasdfsadf");
        expect(data[1]["content"]).toEqual("asdfasdfasdfasdf");
        expect(data[1]["category"].id).toEqual(
            "8332c138-3231-406d-9655-1328ded9d5f2",
        );
    });
});
