import { dataProvider } from "../../src/index";
import { client } from "../appwriteClient";
import "./index.mock";

describe("getList", () => {
    it("correct response", async () => {
        const { data, total } = await dataProvider(client, {
            databaseId: "632455a0b8d017403ce9",
        }).getList({
            resource: "632455a55dc72e1aa016",
        });

        expect(data[0].id).toBe("632456bf1eeb69a71a78");
        expect(data[0].title).toBe("test");
        expect(total).toBe(3);
    });

    it("correct sorting response", async () => {
        const { data, total } = await dataProvider(client, {
            databaseId: "632455a0b8d017403ce9",
        }).getList({
            resource: "632455a55dc72e1aa016",
            sorters: [
                {
                    field: "title",
                    order: "asc",
                },
            ],
        });

        expect(data[0].id).toBe("632456ccc833a161e740");
        expect(data[0].title).toBe("1");

        expect(data[1].id).toBe("632456bf1eeb69a71a78");
        expect(data[1].title).toBe("test");

        expect(total).toBe(3);
    });

    it("correct multiple sorting response", async () => {
        const { data, total } = await dataProvider(client, {
            databaseId: "632455a0b8d017403ce9",
        }).getList({
            resource: "632455a55dc72e1aa016",
            sorters: [
                {
                    field: "id",
                    order: "asc",
                },
                {
                    field: "title",
                    order: "asc",
                },
            ],
        });

        expect(data[0].id).toBe("632456bf1eeb69a71a78");
        expect(data[0].title).toBe("test");

        expect(data[1].id).toBe("632456c5998583bcb6d3");
        expect(data[1].title).toBe("test 2");

        expect(total).toBe(3);
    });

    it("correct filter response", async () => {
        const { data, total } = await dataProvider(client, {
            databaseId: "632455a0b8d017403ce9",
        }).getList({
            resource: "632455a55dc72e1aa016",
            filters: [
                {
                    field: "id",
                    operator: "eq",
                    value: "632456c5998583bcb6d3",
                },
            ],
        });

        expect(data[0].id).toBe("632456c5998583bcb6d3");
        expect(data[0].title).toBe("test 2");
        expect(total).toBe(1);
    });

    it("throws when given an unsupported operator", async () => {
        expect.assertions(2);

        try {
            await dataProvider(client, {
                databaseId: "632455a0b8d017403ce9",
            }).getList({
                resource: "632455a55dc72e1aa016",
                filters: [
                    {
                        field: "id",
                        operator: "in",
                        value: "632456c5998583bcb6d3",
                    },
                ],
            });
        } catch (err) {
            expect(err).toBeInstanceOf(Error);
            expect(err).toHaveProperty(
                "message",
                "Operator in is not supported",
            );
        }
    });
});
