import gql from "graphql-tag";
import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";

describe("with meta.fields", () => {
    describe.each(["hasura-default", "graphql-default"] as const)(
        "updateOne with %s naming convention",
        (namingConvention) => {
            const client = createClient(namingConvention);
            let id = `6379bbda-0857-40f2-a277-b401ea6134d7`;
            let categoryFieldName = "category_id";

            if (namingConvention === "graphql-default") {
                id = `c7ba5e30-8c5f-46bb-862d-e2bcf6487749`;
                categoryFieldName = "categoryId";
            }

            it("correct response with meta", async () => {
                const { data } = await dataProvider(client, {
                    namingConvention,
                }).update({
                    resource: "posts",
                    id,
                    variables: {
                        title: "Updated Title",
                        content: "Updated Content",
                        [categoryFieldName]:
                            "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
                    },
                    meta: {
                        fields: [
                            "id",
                            "title",
                            "content",
                            { category: ["id"] },
                        ],
                    },
                });

                expect(data["id"]).toEqual(id);
                expect(data["title"]).toEqual("Updated Title");
                expect(data["content"]).toEqual("Updated Content");
                expect(data["category"].id).toEqual(
                    "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
                );
            });

            it("correct response without meta", async () => {
                const { data } = await dataProvider(client, {
                    namingConvention,
                }).update({
                    resource: "posts",
                    id,
                    variables: {
                        title: "E-business alarm",
                    },
                });

                expect(data["id"]).toEqual(id);
            });
        },
    );
});

describe("with gql", () => {
    it.each(["gqlQuery", "gqlMutation"] as const)(
        "correct response with hasura-default & %s",
        async (gqlOperation) => {
            const id = `6379bbda-0857-40f2-a277-b401ea6134d7`;

            const client = createClient("hasura-default");
            const { data } = await dataProvider(client, {
                namingConvention: "hasura-default",
            }).update({
                resource: "posts",
                id,
                variables: {
                    title: "Updated Title",
                    content: "Updated Content",
                    category_id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
                },
                meta: {
                    [gqlOperation]: gql`
                        mutation UpdatePost(
                            $id: uuid!
                            $object: posts_set_input!
                        ) {
                            update_posts_by_pk(
                                pk_columns: { id: $id }
                                _set: $object
                            ) {
                                id
                                title
                                content
                                category_id
                                category {
                                    id
                                    title
                                }
                            }
                        }
                    `,
                },
            });

            expect(data["id"]).toEqual(id);
            expect(data["title"]).toEqual("Updated Title");
            expect(data["content"]).toEqual("Updated Content");
            expect(data["category"].id).toEqual(
                "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
            );
        },
    );

    it.each(["gqlQuery", "gqlMutation"] as const)(
        "correct response with graphql-default & %s",
        async (gqlOperation) => {
            const id = `c7ba5e30-8c5f-46bb-862d-e2bcf6487749`;

            const client = createClient("graphql-default");
            const { data } = await dataProvider(client, {
                namingConvention: "graphql-default",
            }).update({
                resource: "posts",
                id,
                variables: {
                    title: "Updated Title",
                    content: "Updated Content",
                    categoryId: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
                },
                meta: {
                    [gqlOperation]: gql`
                        mutation UpdatePost(
                            $id: uuid!
                            $object: PostsSetInput!
                        ) {
                            updatePostsByPk(
                                pkColumns: { id: $id }
                                _set: $object
                            ) {
                                id
                                title
                                content
                                categoryId
                                category {
                                    id
                                    title
                                }
                            }
                        }
                    `,
                },
            });

            expect(data["id"]).toEqual(id);
            expect(data["title"]).toEqual("Updated Title");
            expect(data["content"]).toEqual("Updated Content");
            expect(data["category"].id).toEqual(
                "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
            );
        },
    );
});
