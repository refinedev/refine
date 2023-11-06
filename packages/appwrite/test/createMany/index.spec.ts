import { dataProvider } from "../../src/index";
import { client } from "../appwriteClient";
import "./index.mock";

describe("createMany", () => {
    it("correct response", async () => {
        const { data } = await dataProvider(client, {
            databaseId: "632455a0b8d017403ce9",
        }).createMany!({
            resource: "632455a55dc72e1aa016",
            variables: [
                {
                    title: "Test 1",
                },
                {
                    title: "Test 2",
                },
            ],
        });

        expect(data[0].title).toEqual("Test 1");
        expect(data[0].id).toBeTruthy();
        expect(data[1].title).toEqual("Test 2");
        expect(data[1].id).toBeTruthy();
    });
});
