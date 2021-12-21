import { dataProvider } from "../../src/index";
import client from "../appwriteClient";
import "./index.mock";

describe("updateMany", () => {
    it("correct response with metaData", async () => {
        const { data } = await dataProvider(client).updateMany({
            resource: "6180e4315f3e7",
            ids: ["61b9dd4a6261d", "61b886fbd9398"],
            variables: {
                content: "Batch updated content",
            },
        });

        expect(data[0].id).toEqual("61b9dd4a6261d");
        expect(data[0].title).toEqual("Updated Title");
        expect(data[0].content).toEqual("Batch updated content");

        expect(data[1].id).toEqual("61b886fbd9398");
        expect(data[1].title).toEqual("test");
        expect(data[1].content).toEqual("Batch updated content");
    });
});
