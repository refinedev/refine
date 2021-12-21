import { dataProvider } from "../../src/index";
import client from "../appwriteClient";
import "./index.mock";

describe("getList", () => {
    it("correct response", async () => {
        const { data, total } = await dataProvider(client).getList({
            resource: "6180e4315f3e7",
        });

        expect(data[0].id).toBe("61b886fbd9398");
        expect(data[0].title).toBe("test");
        expect(total).toBe(2);
    });

    it("correct sorting response", async () => {
        const { data, total } = await dataProvider(client).getList({
            resource: "6180e4315f3e7",
            sort: [
                {
                    field: "id",
                    order: "asc",
                },
            ],
        });

        expect(data[0].id).toBe("61b886fbd9398");
        expect(data[0].title).toBe("test");

        expect(data[1].id).toBe("61b9dd4a6261d");
        expect(data[1].title).toBe("Test4");

        expect(total).toBe(2);
    });

    it("correct filter response", async () => {
        const { data, total } = await dataProvider(client).getList({
            resource: "6180e4315f3e7",
            filters: [
                {
                    field: "categoryId",
                    operator: "eq",
                    value: "61811751a3b04",
                },
            ],
        });

        expect(data[0].id).toBe("61b9dd4a6261d");
        expect(data[0].title).toBe("Test4");
        expect(total).toBe(1);
    });
});
