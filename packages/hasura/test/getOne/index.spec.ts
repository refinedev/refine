import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("useOne", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client).getOne({
            resource: "posts",
            id: "cddd4ced-651d-4039-abe0-2a9dffbc8c82",
            meta: {
                fields: ["id", "title", "content", { category: ["id"] }],
            },
        });

        expect(data["id"]).toEqual("cddd4ced-651d-4039-abe0-2a9dffbc8c82");
        expect(data["title"]).toEqual("Focus group Human Sleek");
        expect(data["content"]).toEqual(
            "Quia nihil dolores et accusantium labore eum.",
        );
        expect(data["category"].id).toEqual(
            "317cea5e-fef3-4858-8043-4496e5c7f5ab",
        );
    });

    it("correct response with meta and custom idType", async () => {
        const { data } = await dataProvider(client, { idType: "Int" }).getOne({
            resource: "users",
            id: 1,
            meta: {
                fields: ["id", "name", "email"],
            },
        });

        expect(data["id"]).toEqual(1);
        expect(data["name"]).toEqual("Refine User");
        expect(data["email"]).toEqual("dev@refine.com");
    });

    it("correct response with meta and dynamic idType", async () => {
        const idTypeMap: Record<string, "Int" | "uuid"> = {
            users: "Int",
            posts: "uuid",
        };
        const cDataProvider = dataProvider(client, {
            idType: (resource) => idTypeMap[resource] ?? "uuid",
        });
        const { data: userData } = await cDataProvider.getOne({
            resource: "users",
            id: 1,
            meta: {
                fields: ["id", "name", "email"],
            },
        });

        expect(userData["id"]).toEqual(1);
        expect(userData["name"]).toEqual("Refine User");
        expect(userData["email"]).toEqual("dev@refine.com");

        const { data: postData } = await cDataProvider.getOne({
            resource: "posts",
            id: "cddd4ced-651d-4039-abe0-2a9dffbc8c82",
            meta: {
                fields: ["id", "title", "content", { category: ["id"] }],
            },
        });

        expect(postData["id"]).toEqual("cddd4ced-651d-4039-abe0-2a9dffbc8c82");
        expect(postData["title"]).toEqual("Focus group Human Sleek");
        expect(postData["content"]).toEqual(
            "Quia nihil dolores et accusantium labore eum.",
        );
        expect(postData["category"].id).toEqual(
            "317cea5e-fef3-4858-8043-4496e5c7f5ab",
        );
    });
});

describe("getOne with graphql naming convention", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client, {
            namingConvention: "graphql-default",
        }).getOne({
            resource: "posts",
            id: "cddd4ced-651d-4039-abe0-2a9dffbc8c82",
            meta: {
                fields: ["id", "title", "content", { category: ["id"] }],
            },
        });

        expect(data["id"]).toEqual("cddd4ced-651d-4039-abe0-2a9dffbc8c82");
        expect(data["title"]).toEqual("Focus group Human Sleek");
        expect(data["content"]).toEqual(
            "Quia nihil dolores et accusantium labore eum.",
        );
        expect(data["category"].id).toEqual(
            "317cea5e-fef3-4858-8043-4496e5c7f5ab",
        );
    });

    it("correct response with meta and custom idType", async () => {
        const { data } = await dataProvider(client, {
            idType: "Int",
            namingConvention: "graphql-default",
        }).getOne({
            resource: "users",
            id: 1,
            meta: {
                fields: ["id", "name", "email"],
            },
        });

        expect(data["id"]).toEqual(1);
        expect(data["name"]).toEqual("Refine User");
        expect(data["email"]).toEqual("dev@refine.com");
    });

    it("correct response with meta and dynamic idType", async () => {
        const idTypeMap: Record<string, "Int" | "uuid"> = {
            users: "Int",
            posts: "uuid",
        };
        const cDataProvider = dataProvider(client, {
            idType: (resource) => idTypeMap[resource] ?? "uuid",
            namingConvention: "graphql-default",
        });
        const { data: userData } = await cDataProvider.getOne({
            resource: "users",
            id: 1,
            meta: {
                fields: ["id", "name", "email"],
            },
        });

        expect(userData["id"]).toEqual(1);
        expect(userData["name"]).toEqual("Refine User");
        expect(userData["email"]).toEqual("dev@refine.com");

        const { data: postData } = await cDataProvider.getOne({
            resource: "posts",
            id: "cddd4ced-651d-4039-abe0-2a9dffbc8c82",
            meta: {
                fields: ["id", "title", "content", { category: ["id"] }],
            },
        });

        expect(postData["id"]).toEqual("cddd4ced-651d-4039-abe0-2a9dffbc8c82");
        expect(postData["title"]).toEqual("Focus group Human Sleek");
        expect(postData["content"]).toEqual(
            "Quia nihil dolores et accusantium labore eum.",
        );
        expect(postData["category"].id).toEqual(
            "317cea5e-fef3-4858-8043-4496e5c7f5ab",
        );
    });
});
