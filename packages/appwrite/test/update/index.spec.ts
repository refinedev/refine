import { dataProvider } from "../../src/index";
import { client } from "../appwriteClient";
import "./index.mock";

describe("update", () => {
    it("correct response", async () => {
        const { data } = await dataProvider(client, {
            databaseId: "632455a0b8d017403ce9",
        }).update({
            resource: "632455a55dc72e1aa016",
            id: "63245b02205ba8cec507",
            variables: {
                title: "Updated",
            },
        });

        expect(data.id).toEqual("63245b02205ba8cec507");
        expect(data.title).toEqual("Updated");
    });
});
