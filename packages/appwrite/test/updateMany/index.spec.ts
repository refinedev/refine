import { dataProvider } from "../../src/index";
import { client } from "../appwriteClient";
import "./index.mock";

describe("updateMany", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client, {
            databaseId: "632455a0b8d017403ce9",
        }).updateMany!({
            resource: "632455a55dc72e1aa016",
            ids: ["63245b0e9c8ea5620b4a", "632456c5998583bcb6d3	"],
            variables: {
                title: "Batch",
            },
        });

        expect(data[0].id).toEqual("63245b0e9c8ea5620b4a");
        expect(data[0].title).toEqual("Batch");

        expect(data[1].id).toEqual("632456c5998583bcb6d3");
        expect(data[1].title).toEqual("Batch");
    });
});
