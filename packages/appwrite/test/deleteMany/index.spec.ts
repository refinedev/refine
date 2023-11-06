import { dataProvider } from "../../src";
import { client } from "../appwriteClient";
import "./index.mock";

describe("deleteMany", () => {
    it("correct response", async () => {
        const { data } = await dataProvider(client, {
            databaseId: "632455a0b8d017403ce9",
        }).deleteMany!({
            resource: "632455a55dc72e1aa016",
            ids: ["63245b3987e0f40c7988", "63245b2f163591192f81"],
        });

        expect(data[0].id).toEqual("63245b3987e0f40c7988");
        expect(data[1].id).toEqual("63245b2f163591192f81");
    });
});
