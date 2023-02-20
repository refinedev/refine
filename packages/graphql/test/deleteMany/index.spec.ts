import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("deleteMany", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client).deleteMany!({
            resource: "posts",
            ids: ["37", "38"],
            meta: {
                fields: [
                    {
                        operation: "post",
                        fields: ["id", "title"],
                        variables: {},
                    },
                ],
            },
        });

        expect(data[0].id).toEqual("37");
        expect(data[0].title).toEqual("Hello");

        expect(data[1].id).toEqual("38");
        expect(data[1].title).toEqual("Loem");
    });

    it("correct response without meta", async () => {
        const { data } = await dataProvider(client).deleteMany!({
            resource: "posts",
            ids: ["34", "35"],
        });

        expect(data[0].id).toEqual("34");

        expect(data[1].id).toEqual("35");
    });
});
