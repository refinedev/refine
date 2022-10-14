import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("updateMany", () => {
    it("correct response with metaData", async () => {
        const { data } = await dataProvider(client).updateMany!({
            resource: "posts",
            ids: [
                "487524fd-1160-45c8-a28d-717f78893c37",
                "55c37980-05e5-45b3-8368-a2d8c2210436",
            ],
            variables: {
                content: "Vel deserunt rerum et.",
            },
            metaData: {
                fields: ["id", "title", "content"],
            },
        });

        expect(data[0]["id"]).toEqual("487524fd-1160-45c8-a28d-717f78893c37");
        expect(data[0]["title"]).toEqual("updated-foo-1");
        expect(data[0]["content"]).toEqual("Vel deserunt rerum et.");

        expect(data[1]["id"]).toEqual("55c37980-05e5-45b3-8368-a2d8c2210436");
        expect(data[1]["title"]).toEqual("updated-foo-1");
        expect(data[1]["content"]).toEqual("Vel deserunt rerum et.");
    });

    it("correct response without metaData", async () => {
        const { data } = await dataProvider(client).updateMany!({
            resource: "posts",
            ids: [
                "487524fd-1160-45c8-a28d-717f78893c37",
                "55c37980-05e5-45b3-8368-a2d8c2210436",
            ],
            variables: {
                title: "updated-foo-1",
                content: "updated-bar-1",
            },
        });

        expect(data[0]["id"]).toEqual("487524fd-1160-45c8-a28d-717f78893c37");
        expect(data[1]["id"]).toEqual("55c37980-05e5-45b3-8368-a2d8c2210436");
    });
});
