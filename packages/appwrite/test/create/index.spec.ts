import { dataProvider } from "../../src/index";
import { client } from "../appwriteClient";
import "./index.mock";

describe("create", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client, {
            databaseId: "632455a0b8d017403ce9",
        }).create({
            resource: "632455a55dc72e1aa016",
            variables: {
                title: "Lorem",
            },
        });

        expect(data.title).toEqual("Lorem");
        expect(data.id).toBeTruthy();
    });
});
