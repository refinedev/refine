import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("deleteOne", () => {
    it("correct response with metaData", async () => {
        const { data } = await dataProvider(client).deleteOne({
            resource: "posts",
            id: "52218781-f240-48d3-8407-fca1d163d3ce",
            metaData: {
                fields: ["id", "title"],
            },
        });

        expect(data.id).toEqual("52218781-f240-48d3-8407-fca1d163d3ce");
        expect(data.title).toEqual("Intangible open-source Licensed");
    });

    it("correct response without metaData", async () => {
        const { data } = await dataProvider(client).deleteOne({
            resource: "posts",
            id: "b65b724e-7f21-47ad-aa37-194c4dbcf7cd",
        });

        expect(data.id).toEqual("b65b724e-7f21-47ad-aa37-194c4dbcf7cd");
    });
});
