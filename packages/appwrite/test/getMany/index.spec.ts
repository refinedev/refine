import { dataProvider } from "../../src/index";
import { client } from "../appwriteClient";
import "./index.mock";

describe("getMany", () => {
    it("correct response", async () => {
        const { data } = await dataProvider(client, {
            databaseId: "632455a0b8d017403ce9",
        }).getMany!({
            resource: "632455a55dc72e1aa016",
            ids: ["63245b3987e0f40c7988", "632456bf1eeb69a71a78"],
        });

        expect(data[0].id).toEqual("63245b3987e0f40c7988");
        expect(data[0].title).toEqual("Lorem");

        expect(data[1].id).toEqual("632456bf1eeb69a71a78");
        expect(data[1].title).toEqual("test");
    });
});
