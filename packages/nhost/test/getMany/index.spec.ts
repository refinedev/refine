import dataProvider from "../../src/index";
import nhost from "../nhost";
import "./index.mock";

describe("getMany", () => {
    beforeAll(async () => {
        await nhost.auth.signIn({
            email: "salih@pankod.com",
            password: "refine-nhost",
        });
    });

    it("correct response with meta", async () => {
        const { data } = await dataProvider(nhost).getMany!({
            resource: "posts",
            ids: [
                "72fab741-2352-49cb-8b31-06ae4be2f1d1",
                "acfff044-c728-4030-8d50-330b9224d99b",
            ],
            meta: {
                fields: ["id", "title", "content", { category: ["id"] }],
            },
        });

        expect(data[0]["id"]).toEqual("acfff044-c728-4030-8d50-330b9224d99b");
        expect(data[0]["title"]).toEqual("Title One");
        expect(data[0]["content"]).toEqual("Content For Demo");
        expect(data[0]["category"].id).toEqual(
            "3e5ff497-af3e-4234-876d-0fb7ccb078f5",
        );

        expect(data[1]["id"]).toEqual("72fab741-2352-49cb-8b31-06ae4be2f1d1");
        expect(data[1]["title"]).toEqual("Refine Nhost Demo Title");
        expect(data[1]["content"]).toEqual("Hello Test");
        expect(data[1]["category"].id).toEqual(
            "73c14cb4-a58c-471d-9410-fc97ea6dac66",
        );
    });
});
