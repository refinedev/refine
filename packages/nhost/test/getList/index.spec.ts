import dataProvider from "../../src/index";
import nhost from "../nhost";
import "./index.mock";

describe("getList", () => {
    beforeAll(async () => {
        await nhost.auth.signIn({
            email: "salih@pankod.com",
            password: "refine-nhost",
        });
    });

    it("correct response", async () => {
        const { data, total } = await dataProvider(nhost).getList({
            resource: "posts",
            meta: {
                fields: ["id", "title"],
            },
        });

        expect(data[0]["id"]).toBe("72fab741-2352-49cb-8b31-06ae4be2f1d1");
        expect(data[0]["title"]).toBe("Refine Nhost Demo Title");
        expect(total).toBe(4);
    });

    it("correct sorting response", async () => {
        const { data, total } = await dataProvider(nhost).getList({
            resource: "posts",
            sorters: [
                {
                    field: "id",
                    order: "asc",
                },
            ],
            meta: {
                fields: ["id", "title"],
            },
        });

        expect(data[0]["id"]).toBe("72fab741-2352-49cb-8b31-06ae4be2f1d1");
        expect(data[0]["title"]).toBe("Refine Nhost Demo Title");
        expect(total).toBe(4);
    });

    it("correct filter response", async () => {
        const { data, total } = await dataProvider(nhost).getList({
            resource: "posts",
            filters: [
                {
                    field: "category_id",
                    operator: "eq",
                    value: "73c14cb4-a58c-471d-9410-fc97ea6dac66",
                },
            ],
            meta: {
                fields: ["id", "title", "category_id"],
            },
        });

        expect(data[0]["id"]).toBe("f028ff16-639a-4600-acee-059ea77a15b1");
        expect(data[0]["title"]).toBe("Lorem");
        expect(total).toBe(2);
    });

    it("correct filter and sort response", async () => {
        const { data, total } = await dataProvider(nhost).getList({
            resource: "posts",
            filters: [
                {
                    field: "category_id",
                    operator: "eq",
                    value: "73c14cb4-a58c-471d-9410-fc97ea6dac66",
                },
            ],
            sorters: [
                {
                    field: "title",
                    order: "desc",
                },
            ],
            meta: {
                fields: ["id", "title", { category: ["id", "title"] }],
            },
        });

        expect(data[0]["id"]).toBe("72fab741-2352-49cb-8b31-06ae4be2f1d1");
        expect(data[0]["category"].title).toBe("Category 2");
        expect(data[0]["category"].id).toBe(
            "73c14cb4-a58c-471d-9410-fc97ea6dac66",
        );
        expect(total).toBe(2);
    });
});
