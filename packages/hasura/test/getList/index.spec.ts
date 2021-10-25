import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("getList", () => {
    it("correct response", async () => {
        const { data, total } = await dataProvider(client).getList({
            resource: "posts",
            metaData: {
                fields: ["id", "title"],
            },
        });

        expect(data[0]["id"]).toBe("f3771f12-6dc6-4910-8fb5-2f523ff705d0");
        expect(data[0]["title"]).toBe("Communications Metal Industrial");
        expect(total).toBe(33);
    });

    it("correct sorting response", async () => {
        const { data, total } = await dataProvider(client).getList({
            resource: "posts",
            sort: [
                {
                    field: "id",
                    order: "asc",
                },
            ],
            metaData: {
                fields: ["id", "title"],
            },
        });

        expect(data[0]["id"]).toBe("1ba7b6f0-fef5-4050-a2fb-dacc056c7714");
        expect(data[0]["title"]).toBe(
            "Aenean ultricies non libero sit amet pellentesque",
        );
        expect(total).toBe(33);
    });

    it("correct filter response", async () => {
        const { data, total } = await dataProvider(client).getList({
            resource: "posts",
            filters: [
                {
                    field: "category_id",
                    operator: "eq",
                    value: "170b5abd-d8e6-476c-b3fd-bd2474b0f369",
                },
            ],
            metaData: {
                fields: ["id", "title"],
            },
        });

        expect(data[0]["id"]).toBe("f3771f12-6dc6-4910-8fb5-2f523ff705d0");
        expect(data[0]["title"]).toBe("Communications Metal Industrial");
        expect(total).toBe(33);
    });

    it("correct filter and sort response", async () => {
        const { data, total } = await dataProvider(client).getList({
            resource: "posts",
            filters: [
                {
                    field: "category_id",
                    operator: "eq",
                    value: "170b5abd-d8e6-476c-b3fd-bd2474b0f369",
                },
            ],
            sort: [
                {
                    field: "title",
                    order: "asc",
                },
            ],
            metaData: {
                fields: ["id", "title", { category: ["id", "title"] }],
            },
        });

        expect(data[0]["id"]).toBe("f3771f12-6dc6-4910-8fb5-2f523ff705d0");
        expect(data[0]["category"].title).toBe("Optical Ohio Wooden");
        expect(total).toBe(33);
    });
});
