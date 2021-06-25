import dataProvider from "../../src/index";
import "./index.mock";

describe("update", () => {
    it("correct response", async () => {
        const response = await dataProvider(
            "keywoytODSr6xAqfg",
            "appKYl1H4k9g73sBT",
        ).update("posts", "recLKRioqifTrPUIz", {
            title: "Hello World!!",
        });

        const { data } = response;

        expect(data.fields["title"]).toBe("Hello World!!");
    });
});
