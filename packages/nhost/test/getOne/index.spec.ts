import dataProvider from "../../src/index";
import nhost from "../nhost";
import "./index.mock";

describe("useOne", () => {
    beforeAll(async () => {
        await nhost.auth.signIn({
            email: "salih@pankod.com",
            password: "refine-nhost",
        });
    });

    it("correct response with meta", async () => {
        const { data } = await dataProvider(nhost).getOne({
            resource: "posts",
            id: "72fab741-2352-49cb-8b31-06ae4be2f1d1",
            meta: {
                fields: ["id", "title", "content", { category: ["id"] }],
            },
        });

        expect(data["id"]).toEqual("72fab741-2352-49cb-8b31-06ae4be2f1d1");
        expect(data["title"]).toEqual("Refine Nhost Demo Title");
        expect(data["content"]).toEqual("Hello Test");
        expect(data["category"].id).toEqual(
            "73c14cb4-a58c-471d-9410-fc97ea6dac66",
        );
    });

    it("correct response with meta and custom idType", async () => {
        const { data } = await dataProvider(nhost, { idType: "Int" }).getOne({
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
        const cDataProvider = dataProvider(nhost, {
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
            id: "72fab741-2352-49cb-8b31-06ae4be2f1d1",
            meta: {
                fields: ["id", "title", "content", { category: ["id"] }],
            },
        });

        expect(postData["id"]).toEqual("72fab741-2352-49cb-8b31-06ae4be2f1d1");
        expect(postData["title"]).toEqual("Refine Nhost Demo Title");
        expect(postData["content"]).toEqual("Hello Test");
        expect(postData["category"].id).toEqual(
            "73c14cb4-a58c-471d-9410-fc97ea6dac66",
        );
    });
});
