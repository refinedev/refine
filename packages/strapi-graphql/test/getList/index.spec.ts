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
        expect(data[0]["id"]).toBe("1050");
        expect(data[0]["title"]).toBe("Numquam accusamus adipisci et.");
        expect(total).toBe(98);
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

        expect(data[0]["id"]).toBe("65");
        expect(data[0]["title"]).toBe(
            "Delectus neque rerum nulla vel reiciendis.",
        );
        expect(total).toBe(98);
    });

    it("correct filter response", async () => {
        const { data, total } = await dataProvider(client).getList({
            resource: "posts",
            filters: [
                {
                    field: "title",
                    operator: "eq",
                    value: "Delectus neque rerum nulla vel reiciendis.",
                },
            ],
            metaData: {
                fields: ["title"],
            },
        });

        expect(data[0]["title"]).toBe(
            "Delectus neque rerum nulla vel reiciendis.",
        );
        expect(data[1]["title"]).toBe(
            "Delectus neque rerum nulla vel reiciendis.",
        );
        expect(data[2]["title"]).toBe(
            "Delectus neque rerum nulla vel reiciendis.",
        );
        expect(total).toBe(3);
    });

    it("correct filter and sort response", async () => {
        const { data, total } = await dataProvider(client).getList({
            resource: "posts",
            filters: [
                {
                    field: "category",
                    operator: "eq",
                    value: "2",
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

        expect(data[0]["id"]).toBe("824");
        expect(data[0]["category"].title).toBe("Demo");
        expect(total).toBe(31);
    });
});
