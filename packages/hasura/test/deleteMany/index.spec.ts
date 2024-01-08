import gql from "graphql-tag";
import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";

describe("with meta.fields", () => {
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
});

describe("with gqlMutation", () => {
    it("correct response with hasura-default", async () => {
        const ids = [
            "9848cac2-80d7-4846-9a73-2f312459929a",
            "a5bbd909-9bc5-486d-be07-ece9c17523f9",
        ];

        const client = createClient("hasura-default");
        const { data } = await dataProvider(client, {
            namingConvention: "hasura-default",
        }).deleteMany!({
            resource: "posts",
            ids,
            meta: {
                gqlMutation: gql`
                    mutation DeleteManyPosts($where: posts_bool_exp!) {
                        delete_posts(where: $where) {
                            returning {
                                id
                                title
                            }
                        }
                    }
                `,
            },
        });

        expect(data[0].id).toEqual(ids[0]);
        expect(data[1].id).toEqual(ids[1]);
    });

    it("correct response with meta graphql-default", async () => {
        const ids = [
            "b8e8c884-d169-44ce-9fb1-118256a64181",
            "522d566a-a25d-4339-952d-bd95a3fe9f80",
        ];

        const client = createClient("graphql-default");
        const { data } = await dataProvider(client, {
            namingConvention: "graphql-default",
        }).deleteMany!({
            resource: "posts",
            ids,
            meta: {
                gqlMutation: gql`
                    mutation DeleteManyPosts($where: PostsBoolExp!) {
                        deletePosts(where: $where) {
                            returning {
                                id
                                title
                            }
                        }
                    }
                `,
            },
        });

        expect(data[0].id).toEqual(ids[0]);
        expect(data[1].id).toEqual(ids[1]);
    });

    it("correct response without gql hasura-default", async () => {
        const ids = [
            "54d9f65c-592a-4a0a-9743-4b6761030853",
            "b97c56d0-83b1-483f-bbcc-45305c6340a4",
        ];

        const client = createClient("hasura-default");
        const { data } = await dataProvider(client, {
            namingConvention: "hasura-default",
        }).deleteMany!({
            resource: "posts",
            ids,
        });

        expect(data[0].id).toEqual(ids[0]);
        expect(data[1].id).toEqual(ids[1]);
    });

    it("correct response without gql graphql-default", async () => {
        const ids = [
            "f79a1033-62f3-4551-b9b4-4bd40ba4b51b",
            "bc86c10a-d807-4196-9fc3-af5619e4228a",
        ];

        const client = createClient("graphql-default");
        const { data } = await dataProvider(client, {
            namingConvention: "graphql-default",
        }).deleteMany!({
            resource: "posts",
            ids,
        });

        expect(data[0].id).toEqual(ids[0]);
        expect(data[1].id).toEqual(ids[1]);
    });
});
