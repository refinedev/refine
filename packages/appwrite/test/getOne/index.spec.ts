import { dataProvider } from "../../src/index";
import client from "../appwriteClient";
import "./index.mock";

describe("useOne", () => {
    it("correct response with metaData", async () => {
        const { data } = await dataProvider(client).getOne({
            resource: "6180e4315f3e7",
            id: "61b9dd4a6261d",
        });

        expect(data.id).toEqual("61b9dd4a6261d");
    });
});
