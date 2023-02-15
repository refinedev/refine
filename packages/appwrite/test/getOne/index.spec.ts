import { dataProvider } from "../../src/index";
import { client } from "../appwriteClient";
import "./index.mock";

describe("useOne", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client, {
            databaseId: "632455a0b8d017403ce9",
        }).getOne({
            resource: "632455a55dc72e1aa016",
            id: "632456bf1eeb69a71a78",
        });

        expect(data.id).toEqual("632456bf1eeb69a71a78");
    });
});
