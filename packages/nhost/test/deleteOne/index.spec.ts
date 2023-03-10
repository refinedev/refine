import dataProvider from "../../src/index";
import nhost from "../nhost";
import "./index.mock";

describe("deleteOne", () => {
    beforeAll(async () => {
        await nhost.auth.signIn({
            email: "salih@pankod.com",
            password: "refine-nhost",
        });
    });

    it("correct response with meta", async () => {
        const { data } = await dataProvider(nhost).deleteOne({
            resource: "posts",
            id: "92bbb942-a5a7-4cd9-8232-d7aa544a0c40",
            meta: {
                fields: ["id", "title"],
            },
        });

        expect(data.id).toEqual("92bbb942-a5a7-4cd9-8232-d7aa544a0c40");
        expect(data.title).toEqual("Etiam tincidunt ex ut auctor faucibus");
    });

    it("correct response with meta and Int idType", async () => {
        const { data } = await dataProvider(nhost, {
            idType: "Int",
        }).deleteOne({
            resource: "users",
            id: 1,
            meta: {
                fields: ["id", "name"],
            },
        });

        expect(data.id).toEqual(1);
        expect(data.name).toEqual("Refine Dev");
    });

    it("correct response without metaData", async () => {
        const { data } = await dataProvider(nhost).deleteOne({
            resource: "posts",
            id: "2d0c792c-4d28-4dff-a5b8-37858d0faa54",
        });

        expect(data.id).toEqual("2d0c792c-4d28-4dff-a5b8-37858d0faa54");
    });
});
