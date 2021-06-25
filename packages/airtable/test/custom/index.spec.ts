import dataProvider from "../../src/index";

describe("custom", () => {
    it("correct get response", async () => {
        try {
            await dataProvider("keywoytODSr6xAqfg", "appKYl1H4k9g73sBT")
                .custom!(`users`, "get");
        } catch (error) {
            expect(error).toEqual(
                Error("Not implemented on refine-airtable data provider."),
            );
        }
    });
});
