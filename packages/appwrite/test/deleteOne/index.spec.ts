import { dataProvider } from "../../src/index";
import client from "../appwriteClient";
import "./index.mock";

describe("deleteOne", () => {
    it("correct response with metaData", async () => {
        const { data } = await dataProvider(client).deleteOne({
            resource: "6180e6efb14df",
            id: "61c1a17614a97",
        });

        expect(data.id).toEqual("61c1a17614a97");
    });
});
