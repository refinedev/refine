import dataProvider from "../../src/index";
import nhost from "../nhost";
import "./index.mock";

describe("updateMany", () => {
    beforeAll(async () => {
        await nhost.auth.signIn({
            email: "salih@pankod.com",
            password: "refine-nhost",
        });
    });

    it("correct response with meta", async () => {
        const { data } = await dataProvider(nhost).updateMany!({
            resource: "posts",
            ids: [
                "6a117e72-9446-4413-9760-30d66b9a27dc",
                "eccfaeb9-7fc7-45f6-b546-cb6e14109087",
            ],
            variables: {
                content: "Vel deserunt rerum et.",
            },
            meta: {
                fields: ["id", "title", "content"],
            },
        });

        expect(data[0]["id"]).toEqual("eccfaeb9-7fc7-45f6-b546-cb6e14109087");
        expect(data[0]["title"]).toEqual("Updated Title");
        expect(data[0]["content"]).toEqual("Vel deserunt rerum et.");

        expect(data[1]["id"]).toEqual("6a117e72-9446-4413-9760-30d66b9a27dc");
        expect(data[1]["title"]).toEqual("E-business alarm Bedfordshire");
        expect(data[1]["content"]).toEqual("Vel deserunt rerum et.");
    });

    it("correct response without meta", async () => {
        const { data } = await dataProvider(nhost).updateMany!({
            resource: "posts",
            ids: [
                "6a117e72-9446-4413-9760-30d66b9a27dc",
                "eccfaeb9-7fc7-45f6-b546-cb6e14109087",
            ],
            variables: {
                title: "updated-foo-1",
                content: "updated-bar-1",
            },
        });

        expect(data[0]["id"]).toEqual("eccfaeb9-7fc7-45f6-b546-cb6e14109087");
        expect(data[1]["id"]).toEqual("6a117e72-9446-4413-9760-30d66b9a27dc");
    });
});
