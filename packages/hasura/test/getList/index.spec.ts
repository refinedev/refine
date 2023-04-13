import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("getList", () => {
    it("correct response", async () => {
        const { data, total } = await dataProvider(client).getList({
            resource: "posts",
            meta: {
                fields: ["id", "title"],
            },
        });

        expect(data[0]["id"]).toBe("bac2ef0a-899f-4694-84ef-b9c6fe4dc2b7");
        expect(data[0]["title"]).toBe("asdfasdfsadf");
        expect(total).toBe(25);
    });

    it("correct sorting response", async () => {
        const { data, total } = await dataProvider(client).getList({
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

        expect(data[0]["id"]).toBe("75dbf808-6dc0-4b7b-bd1a-f1f381ee0e4c");
        expect(data[0]["title"]).toBe("Boliviano Mvdol B2B Saint Helena Pound");
        expect(total).toBe(25);
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
            meta: {
                fields: ["id", "title"],
            },
        });

        expect(data[0]["id"]).toBe("ecd7aa21-19f4-46c9-bc3e-227dcd0807fd");
        expect(data[0]["title"]).toBe("E-business alarm");
        expect(total).toBe(5);
    });

    it("correct nested filter response", async () => {
        const { data } = await dataProvider(client).getList({
            resource: "posts",
            filters: [
                {
                    field: "category.id",
                    operator: "eq",
                    value: "8332c138-3231-406d-9655-1328ded9d5f2",
                },
            ],
            meta: {
                fields: ["id", "title"],
            },
        });

        expect(data[0]["id"]).toBe("bac2ef0a-899f-4694-84ef-b9c6fe4dc2b7");
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
            sorters: [
                {
                    field: "title",
                    order: "asc",
                },
            ],
            meta: {
                fields: ["id", "title", { category: ["id", "title"] }],
            },
        });

        expect(data[0]["id"]).toBe("bed4727e-33bb-4468-9868-941efe648acc");
        expect(data[0]["category"].title).toBe("Optical Ohio Wooddkh");
        expect(total).toBe(8);
    });
});

describe("getList with graphql naming convention", () => {
    it("correct response", async () => {
        const { data, total } = await dataProvider(client, {
            namingConvention: "graphql-default",
        }).getList({
            resource: "posts",
            meta: {
                fields: ["id", "title"],
            },
        });

        expect(data[0]["id"]).toBe("bac2ef0a-899f-4694-84ef-b9c6fe4dc2b7");
        expect(data[0]["title"]).toBe("asdfasdfsadf");
        expect(total).toBe(25);
    });

    it("correct sorting response", async () => {
        const { data, total } = await dataProvider(client, {
            namingConvention: "graphql-default",
        }).getList({
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

        expect(data[0]["id"]).toBe("75dbf808-6dc0-4b7b-bd1a-f1f381ee0e4c");
        expect(data[0]["title"]).toBe("Boliviano Mvdol B2B Saint Helena Pound");
        expect(total).toBe(25);
    });

    it("correct filter response", async () => {
        const { data, total } = await dataProvider(client, {
            namingConvention: "graphql-default",
        }).getList({
            resource: "posts",
            filters: [
                {
                    field: "categoryId",
                    operator: "eq",
                    value: "170b5abd-d8e6-476c-b3fd-bd2474b0f369",
                },
            ],
            meta: {
                fields: ["id", "title"],
            },
        });

        expect(data[0]["id"]).toBe("ecd7aa21-19f4-46c9-bc3e-227dcd0807fd");
        expect(data[0]["title"]).toBe("E-business alarm");
        expect(total).toBe(5);
    });

    it("correct nested filter response", async () => {
        const { data } = await dataProvider(client, {
            namingConvention: "graphql-default",
        }).getList({
            resource: "posts",
            filters: [
                {
                    field: "category.id",
                    operator: "eq",
                    value: "8332c138-3231-406d-9655-1328ded9d5f2",
                },
            ],
            meta: {
                fields: ["id", "title"],
            },
        });

        expect(data[0]["id"]).toBe("bac2ef0a-899f-4694-84ef-b9c6fe4dc2b7");
    });

    it("correct filter and sort response", async () => {
        const { data, total } = await dataProvider(client, {
            namingConvention: "graphql-default",
        }).getList({
            resource: "posts",
            filters: [
                {
                    field: "categoryId",
                    operator: "eq",
                    value: "170b5abd-d8e6-476c-b3fd-bd2474b0f369",
                },
            ],
            sorters: [
                {
                    field: "title",
                    order: "asc",
                },
            ],
            meta: {
                fields: ["id", "title", { category: ["id", "title"] }],
            },
        });

        expect(data[0]["id"]).toBe("bed4727e-33bb-4468-9868-941efe648acc");
        expect(data[0]["category"].title).toBe("Optical Ohio Wooddkh");
        expect(total).toBe(8);
    });
});
