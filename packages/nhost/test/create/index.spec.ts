import dataProvider from "../../src/index";
import nhost from "../nhost";
import "./index.mock";

describe("create", () => {
    beforeAll(async () => {
        await nhost.auth.signIn({
            email: "salih@pankod.com",
            password: "refine-nhost",
        });
    });

    it("correct response with meta", async () => {
        const { data } = await dataProvider(nhost).create({
            resource: "posts",
            variables: {
                content: "Lorem ipsum dolor sit amet.",
                title: "Lorem ipsum dolore",
                category_id: "73c14cb4-a58c-471d-9410-fc97ea6dac66",
            },
            meta: {
                fields: ["id", "title", "content", { category: ["id"] }],
            },
        });

        expect(data["title"]).toEqual("Lorem ipsum dolore");
        expect(data["content"]).toEqual("Lorem ipsum dolor sit amet.");
        expect(data["category"].id).toEqual(
            "73c14cb4-a58c-471d-9410-fc97ea6dac66",
        );
    });
});
