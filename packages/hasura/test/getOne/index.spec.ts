import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("useOne", () => {
    it("correct response with metaData", async () => {
        const { data } = await dataProvider(client).getOne({
            resource: "posts",
            id: "cddd4ced-651d-4039-abe0-2a9dffbc8c82",
            metaData: {
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
});
