import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("update", () => {
    it("correct response with metaData", async () => {
        const { data } = await dataProvider(client).update({
            resource: "posts",
            id: "eb824b2e-986d-4d19-b6a9-98ca620df046",
            variables: {
                title: "E-business alarm Bedfordshire",
                content: "Updated Content",
                category_id: "4653050e-f969-4d58-939b-ece4c17aa506",
            },
            metaData: {
                fields: ["id", "title", "content", { category: ["id"] }],
            },
        });

        expect(data["id"]).toEqual("eb824b2e-986d-4d19-b6a9-98ca620df046");
        expect(data["title"]).toEqual("E-business alarm Bedfordshire");
        expect(data["content"]).toEqual("Updated Content");
        expect(data["category"].id).toEqual(
            "4653050e-f969-4d58-939b-ece4c17aa506",
        );
    });

    it("correct response without metaData", async () => {
        const { data } = await dataProvider(client).update({
            resource: "posts",
            id: "eb824b2e-986d-4d19-b6a9-98ca620df046",
            variables: {
                title: "E-business alarm",
            },
        });

        expect(data["id"]).toEqual("eb824b2e-986d-4d19-b6a9-98ca620df046");
    });
});
