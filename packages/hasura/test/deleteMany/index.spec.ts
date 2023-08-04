import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";

describe.each(["hasura-default", "graphql-default"] as const)(
    "deleteMany with %s naming convention",
    (namingConvention) => {
        const client = createClient(namingConvention);
        let withMetaIds = [
            "9848cac2-80d7-4846-9a73-2f312459929a",
            "a5bbd909-9bc5-486d-be07-ece9c17523f9",
        ];
        let withoutMetaIds = [
            "54d9f65c-592a-4a0a-9743-4b6761030853",
            "b97c56d0-83b1-483f-bbcc-45305c6340a4",
        ];

        if (namingConvention === "graphql-default") {
            withMetaIds = [
                "b8e8c884-d169-44ce-9fb1-118256a64181",
                "522d566a-a25d-4339-952d-bd95a3fe9f80",
            ];
            withoutMetaIds = [
                "f79a1033-62f3-4551-b9b4-4bd40ba4b51b",
                "bc86c10a-d807-4196-9fc3-af5619e4228a",
            ];
        }

        it("correct response with meta", async () => {
            const { data } = await dataProvider(client, {
                namingConvention,
            }).deleteMany!({
                resource: "posts",
                ids: withMetaIds,
                meta: {
                    fields: ["id", "title"],
                },
            });

            expect(data[0].id).toEqual(withMetaIds[0]);
            expect(data[1].id).toEqual(withMetaIds[1]);
        });

        it("correct response without meta", async () => {
            const { data } = await dataProvider(client, {
                namingConvention,
            }).deleteMany!({
                resource: "posts",
                ids: withoutMetaIds,
            });

            expect(data[0].id).toEqual(withoutMetaIds[0]);
            expect(data[1].id).toEqual(withoutMetaIds[1]);
        });
    },
);
