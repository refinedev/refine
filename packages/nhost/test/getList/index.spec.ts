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

        expect(data[0]["id"]).toBe("bac2ef0a-899f-4694-84ef-b9c6fe4dc2b7");
        expect(data[0]["title"]).toBe("asdfasdfsadf");
        expect(total).toBe(29);
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

        expect(data[0]["id"]).toBe("2b5ac145-0f89-4e38-a8c5-a26b1b1631d3");
        expect(data[0]["title"]).toBe("deneme");
        expect(total).toBe(29);
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

        expect(data[0]["id"]).toBe("bac2ef0a-899f-4694-84ef-b9c6fe4dc2b7");
        expect(data[0]["title"]).toBe("asdfasdfsadf");
        expect(total).toBe(8);
    });

    it("correct filter and sort response", async () => {
        //nock.recorder.rec();
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

        expect(data[0]["id"]).toBe("bed4727e-33bb-4468-9868-941efe648acc");
        expect(data[0]["category"].title).toBe("Optical Ohio Wooddkh");
        expect(total).toBe(8);
    });
});
