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

    it("correct response with metaData", async () => {
        const { data } = await dataProvider(nhost).getOne({
            resource: "posts",
            id: "72fab741-2352-49cb-8b31-06ae4be2f1d1",
            metaData: {
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
});
