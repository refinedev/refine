import { dataProvider } from "../../src/index";
import client from "../appwriteClient";
import "./index.mock";

describe("create", () => {
    it("correct response with metaData", async () => {
        const { data } = await dataProvider(client).create({
            resource: "6180e6efb14df",
            variables: {
                title: "Lorem ipsum dolor",
            },
            metaData: {
                readPermissions: ["*"],
                writePermissions: ["*"],
            },
        });

        expect(data["title"]).toEqual("Lorem ipsum dolor");
    });
});
