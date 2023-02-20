import { dataProvider } from "../../src/index";
import { client } from "../appwriteClient";
import "./index.mock";

describe("deleteOne", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client, {
            databaseId: "632455a0b8d017403ce9",
        }).deleteOne({
            resource: "632455a55dc72e1aa016",
            id: "63245af4d15590ca1984",
        });

        expect(data.id).toEqual("63245af4d15590ca1984");
    });
});
