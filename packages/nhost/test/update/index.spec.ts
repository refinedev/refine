import dataProvider from "../../src/index";
import nhost from "../nhost";
import "./index.mock";

describe("update", () => {
    beforeAll(async () => {
        await nhost.auth.signIn({
            email: "salih@pankod.com",
            password: "refine-nhost",
        });
    });

    it("correct response with meta", async () => {
        const { data } = await dataProvider(nhost).update({
            resource: "posts",
            id: "6a117e72-9446-4413-9760-30d66b9a27dc",
            variables: {
                title: "E-business alarm Bedfordshire",
                content: "Updated Content",
                category_id: "3e5ff497-af3e-4234-876d-0fb7ccb078f5",
            },
            meta: {
                fields: ["id", "title", "content", { category: ["id"] }],
            },
        });

        expect(data["id"]).toEqual("6a117e72-9446-4413-9760-30d66b9a27dc");
        expect(data["title"]).toEqual("E-business alarm Bedfordshire");
        expect(data["content"]).toEqual("Updated Content");
        expect(data["category"].id).toEqual(
            "3e5ff497-af3e-4234-876d-0fb7ccb078f5",
        );
    });

    it("correct response without meta", async () => {
        const { data } = await dataProvider(nhost).update({
            resource: "posts",
            id: "eccfaeb9-7fc7-45f6-b546-cb6e14109087",
            variables: {
                title: "Updated Title",
            },
        });

        expect(data["id"]).toEqual("eccfaeb9-7fc7-45f6-b546-cb6e14109087");
    });
});
