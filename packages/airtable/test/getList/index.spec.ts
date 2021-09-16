import dataProvider from "../../src/index";
import "./index.mock";

describe("getList", () => {
    it("correct response", async () => {
        const response = await dataProvider(
            "keywoytODSr6xAqfg",
            "appKYl1H4k9g73sBT",
        ).getList({
            resource: "posts",
        });

        expect(response.data[0]["id"]).toBe("rec9GbXLzd6dxn4Il");
        expect(response.data[0]["title"]).toBe("Hello World 3!");
        expect(response.total).toBe(2);
    });

    it("correct sorting response", async () => {
        const response = await dataProvider(
            "keywoytODSr6xAqfg",
            "appKYl1H4k9g73sBT",
        ).getList({
            resource: "posts",
            sort: [
                {
                    field: "title",
                    order: "desc",
                },
            ],
        });

        expect(response.data[0]["id"]).toBe("recLKRioqifTrPUIz");
        expect(response.data[0]["title"]).toBe("Hello World!");
        expect(response.total).toBe(2);
    });
});
