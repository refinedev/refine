import { dataProvider } from "../../src";
import client from "../appwriteClient";
import "./index.mock";

describe("deleteMany", () => {
    it("correct response", async () => {
        const { data } = await dataProvider(client).deleteMany({
            resource: "6180e6efb14df",
            ids: ["61bb4c710fbbf", "61c0832765134"],
        });

        expect(data[0].id).toEqual("61bb4c710fbbf");
        expect(data[1].id).toEqual("61c0832765134");
    });
});
