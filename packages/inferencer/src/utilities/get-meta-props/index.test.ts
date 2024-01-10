import gql from "graphql-tag";
import { Action, getMetaProps } from ".";
import { InferencerComponentProps } from "@/types";

// remove all indentation, newlines, empty spaces
const getMetaPropsForTest = (
    identifier?: string,
    meta?: InferencerComponentProps["meta"],
    actions?: Action[],
) => getMetaProps(identifier, meta, actions).replace(/\s/g, "");

describe("getMetaProps", () => {
    it("should return empty string if no meta, actions, or identifier", () => {
        expect(getMetaProps("posts")).toBe("");
    });

    it("should return empty string if no meta or actions", () => {
        expect(getMetaProps("posts", {})).toBe("");
    });

    it("should return empty string if no actions", () => {
        expect(getMetaProps("posts", {}, [])).toBe("");
    });

    it("should correctly return meta props", () => {
        const inferencerPredefinedMeta: InferencerComponentProps["meta"] = {
            blog_posts: {
                getOne: {
                    gqlQuery: gql`
                        query GetBlogPost($id: uuid!) {
                            blog_posts_by_pk(id: $id) {
                                id
                                title
                                content
                                category_id
                                created_at
                                status
                                category {
                                    id
                                    title
                                }
                            }
                        }
                    `,
                },
                create: {
                    foo: "bar",
                    objFoo: {
                        bar: "baz",
                    },
                    gqlMutation: gql`
                        mutation CreateBlogPosts(
                            $object: blog_posts_insert_input!
                        ) {
                            insert_blog_posts_one(object: $object) {
                                id
                                title
                                content
                                created_at
                                category_id
                                status
                                category {
                                    id
                                    title
                                }
                            }
                        }
                    `,
                },
            },
        };

        const result = getMetaPropsForTest(
            "blog_posts",
            inferencerPredefinedMeta,
            ["getOne", "create"],
        );

        expect(result).toBe(
            'meta:{gqlQuery:gql`queryGetBlogPost($id:uuid!){blog_posts_by_pk(id:$id){idtitlecontentcategory_idcreated_atstatuscategory{idtitle}}}`,foo:"bar",objFoo:{"bar":"baz"},gqlMutation:gql`mutationCreateBlogPosts($object:blog_posts_insert_input!){insert_blog_posts_one(object:$object){idtitlecontentcreated_atcategory_idstatuscategory{idtitle}}}`}',
        );
    });

    it("should correctly return default when no action", () => {
        const inferencerPredefinedMeta: InferencerComponentProps["meta"] = {
            blog_posts: {
                getList: {
                    gqlQuery: gql`
                        query BlogPostsList(
                            $offset: Int!
                            $limit: Int!
                            $order_by: [blog_posts_order_by!]
                            $where: blog_posts_bool_exp
                        ) {
                            blog_posts(
                                offset: $offset
                                limit: $limit
                                order_by: $order_by
                                where: $where
                            ) {
                                id
                                title
                                content
                                category_id
                                created_at
                                status
                                category {
                                    id
                                    title
                                }
                            }
                            blog_posts_aggregate(where: $where) {
                                aggregate {
                                    count
                                }
                            }
                        }
                    `,
                },
            },
            categories: {
                getList: {
                    gqlQuery: gql`
                        query CategoriesList(
                            $offset: Int
                            $limit: Int
                            $order_by: [categories_order_by!]
                            $where: categories_bool_exp
                        ) {
                            categories(
                                offset: $offset
                                limit: $limit
                                order_by: $order_by
                                where: $where
                            ) {
                                id
                                title
                                created_at
                            }
                            categories_aggregate(where: $where) {
                                aggregate {
                                    count
                                }
                            }
                        }
                    `,
                },
            },
        };

        const result = getMetaPropsForTest(
            "blog_posts",
            inferencerPredefinedMeta,
            ["getOne"],
        );
        expect(result).toBe("");

        // add default to meta
        inferencerPredefinedMeta.blog_posts["default"] = {
            gqlQuery: gql`
                query DefaultQuery($id: uuid!) {
                    default(id: $id) {
                        id
                        category {
                            id
                            title
                        }
                    }
                }
            `,
        };

        // should return default when no "action"
        const resultWithDefault = getMetaPropsForTest(
            "blog_posts",
            inferencerPredefinedMeta,
            ["getOne"],
        );
        expect(resultWithDefault).toBe(
            "meta:{gqlQuery:gql`queryDefaultQuery($id:uuid!){default(id:$id){idcategory{idtitle}}}`}",
        );
    });
});
