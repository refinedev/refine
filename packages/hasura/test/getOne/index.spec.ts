import gql from "graphql-tag";
import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";

describe("with meta.fields", () => {
    describe.each(["hasura-default", "graphql-default"] as const)(
        "updateOne with %s naming convention",
        (namingConvention) => {
            const client = createClient(namingConvention);
            it("correct response with meta", async () => {
                const { data } = await dataProvider(client, {
                    namingConvention,
                }).getOne({
                    resource: "posts",
                    id: "6379bbda-0857-40f2-a277-b401ea6134d7",
                    meta: {
                        fields: [
                            "id",
                            "title",
                            "content",
                            { category: ["id"] },
                        ],
                    },
                });

                expect(data["id"]).toEqual(
                    "6379bbda-0857-40f2-a277-b401ea6134d7",
                );
                expect(data["title"]).toEqual(
                    "Aenean ultricies non libero sit amet pellentesque",
                );
                expect(data["content"]).toEqual(
                    "Vestibulum vulputate sapien arcu.",
                );
                expect(data["category"].id).toEqual(
                    "e27156c3-9998-434f-bd5b-2b078283ff26",
                );
            });

            it("correct response with meta and custom idType", async () => {
                const { data } = await dataProvider(client, {
                    namingConvention,
                    idType: "Int",
                }).getOne({
                    resource: "users",
                    id: 1,
                    meta: {
                        fields: ["id", "name", "email"],
                    },
                });

                expect(data["id"]).toEqual(1);
                expect(data["name"]).toEqual("Refine");
                expect(data["email"]).toEqual("mail@refine.dev");
            });

            it("correct response with meta and dynamic idType", async () => {
                const idTypeMap: Record<string, "Int" | "uuid"> = {
                    users: "Int",
                    posts: "uuid",
                };
                const cDataProvider = dataProvider(client, {
                    namingConvention,
                    idType: (resource) => idTypeMap[resource] ?? "uuid",
                });
                const { data: userData } = await cDataProvider.getOne({
                    resource: "users",
                    id: 1,
                    meta: {
                        fields: ["id", "name", "email"],
                    },
                });

                expect(userData["id"]).toEqual(1);
                expect(userData["name"]).toEqual("Refine");
                expect(userData["email"]).toEqual("mail@refine.dev");

                const { data: postData } = await cDataProvider.getOne({
                    resource: "posts",
                    id: "6379bbda-0857-40f2-a277-b401ea6134d7",
                    meta: {
                        fields: [
                            "id",
                            "title",
                            "content",
                            { category: ["id"] },
                        ],
                    },
                });

                expect(postData["id"]).toEqual(
                    "6379bbda-0857-40f2-a277-b401ea6134d7",
                );
                expect(postData["title"]).toEqual(
                    "Aenean ultricies non libero sit amet pellentesque",
                );
                expect(postData["content"]).toEqual(
                    "Vestibulum vulputate sapien arcu.",
                );
                expect(postData["category"].id).toEqual(
                    "e27156c3-9998-434f-bd5b-2b078283ff26",
                );
            });
        },
    );
});

describe("with gqlQuery", () => {
    it("correct response hasura-default", async () => {
        const client = createClient("hasura-default");

        const { data } = await dataProvider(client, {
            namingConvention: "hasura-default",
        }).getOne({
            resource: "posts",
            id: "6379bbda-0857-40f2-a277-b401ea6134d7",
            meta: {
                gqlQuery: gql`
                    query GetPost($id: uuid!) {
                        posts_by_pk(id: $id) {
                            id
                            title
                            content
                            category {
                                id
                            }
                        }
                    }
                `,
            },
        });

        expect(data["id"]).toEqual("6379bbda-0857-40f2-a277-b401ea6134d7");
        expect(data["title"]).toEqual(
            "Aenean ultricies non libero sit amet pellentesque",
        );
        expect(data["content"]).toEqual("Vestibulum vulputate sapien arcu.");
        expect(data["category"].id).toEqual(
            "e27156c3-9998-434f-bd5b-2b078283ff26",
        );
    });

    it("correct response graphql-default", async () => {
        const client = createClient("graphql-default");

        const { data } = await dataProvider(client, {
            namingConvention: "graphql-default",
        }).getOne({
            resource: "users",
            id: 1,
            meta: {
                gqlQuery: gql`
                    query GetUser($id: id!) {
                        usersByPk(id: $id) {
                            id
                            name
                            email
                        }
                    }
                `,
            },
        });

        expect(data["id"]).toEqual(1);
        expect(data["name"]).toEqual("Refine");
        expect(data["email"]).toEqual("mail@refine.dev");
    });
});
