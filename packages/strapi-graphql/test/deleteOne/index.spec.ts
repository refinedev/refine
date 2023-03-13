import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("deleteOne", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client).deleteOne({
            resource: "posts",
            id: "43",
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

        expect(data.id).toEqual("43");
        expect(data.title).toEqual("foo");
    });

    it("correct response without meta", async () => {
        const { data } = await dataProvider(client).deleteOne({
            resource: "posts",
            id: "48",
        });

        expect(data.id).toEqual("48");
    });
});
