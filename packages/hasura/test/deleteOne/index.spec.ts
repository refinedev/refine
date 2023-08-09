import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";
// import nock from "nock";
// nock.recorder.rec();

describe.each(["hasura-default", "graphql-default"] as const)(
    "deleteOne with %s naming convention",
    (namingConvention) => {
        const client = createClient(namingConvention);
        let withMetaId = "56c5a2cd-3b4d-4465-9d41-67f7991d833c";
        let withoutMetaId = "312b993d-9648-4a15-aa92-11e7b77e0071";
        if (namingConvention === "graphql-default") {
            withMetaId = "bc7025dc-f5d6-414a-b335-20b58a451af8";
            withoutMetaId = "f39fbacb-c0e8-4fa0-97d9-833f15866ab7";
        }

        it("correct response with meta", async () => {
            const { data } = await dataProvider(client, {
                namingConvention,
            }).deleteOne({
                resource: "posts",
                id: withMetaId,
                meta: {
                    fields: ["id", "title"],
                },
            });

            expect(data.id).toEqual(withMetaId);
        });

        it("correct response with meta and Int idType", async () => {
            const { data } = await dataProvider(client, {
                namingConvention,
                idType: "Int",
            }).deleteOne({
                resource: "users",
                id: 1,
                meta: {
                    fields: ["id", "name"],
                },
            });

            expect(data.id).toEqual(1);
        });

        it("correct response without metaData", async () => {
            const { data } = await dataProvider(client, {
                namingConvention,
            }).deleteOne({
                resource: "posts",
                id: withoutMetaId,
            });

            expect(data.id).toEqual(withoutMetaId);
        });
    },
);
