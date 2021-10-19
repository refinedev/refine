import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("update", () => {
    it("correct response with metaData", async () => {
        const { data } = await dataProvider(client).update({
            resource: "posts",
            id: "c82c71c5-0f0b-4042-b9a3-db977fe28a83",
            variables: {
                title: "E-business alarm Bedfordshire",
                content: "Updated Content",
                category_id: "4653050e-f969-4d58-939b-ece4c17aa506",
            },
            metaData: {
                fields: ["id", "title", "content", { category: ["id"] }],
            },
        });

        expect(data["id"]).toEqual("c82c71c5-0f0b-4042-b9a3-db977fe28a83");
        expect(data["title"]).toEqual("E-business alarm Bedfordshire");
        expect(data["content"]).toEqual("Updated Content");
        expect(data["category"].id).toEqual(
            "4653050e-f969-4d58-939b-ece4c17aa506",
        );
    });

    it("correct response without metaData", async () => {
        const { data } = await dataProvider(client).update({
            resource: "posts",
            id: "ecd7aa21-19f4-46c9-bc3e-227dcd0807fd",
            variables: {
                title: "E-business alarm",
            },
        });

        expect(data["id"]).toEqual("ecd7aa21-19f4-46c9-bc3e-227dcd0807fd");
    });
});
