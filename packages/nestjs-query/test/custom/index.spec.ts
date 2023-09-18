import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("custom", () => {
    it("correct get query response", async () => {
        const response = await dataProvider(client).custom?.({
            url: "",
            method: "get",
            meta: {
                operation: "blogPostAggregate",
                fields: [{ groupBy: ["status"], count: ["status"] }],
            },
        });

        expect(response?.data).toHaveLength(3);
        expect(response.data[0].groupBy.status).toBe("DRAFT");
        expect(response.data[0].count.status).toBeDefined();
        expect(response.data[1].groupBy.status).toBe("PUBLISHED");
        expect(response.data[1].count.status).toBeDefined();
        expect(response.data[2].groupBy.status).toBe("REJECTED");
        expect(response.data[2].count.status).toBeDefined();
    });

    it("custom graphql query", async () => {
        const response = await dataProvider(client).custom<any>({
            url: "",
            method: "get",
            meta: {
                rawQuery: `
                    query GetAllBlogPosts(
                        $sorting: [BlogPostSort!]
                        $filter: BlogPostFilter!
                        $paging: OffsetPaging!
                      ) {
                        sorted: blogPosts(sorting: $sorting, paging: $paging) {
                          nodes {
                            id
                            title
                            createdAt
                          }
                        }
                        filtered: blogPosts(filter: $filter) {
                          nodes {
                            id
                          }
                        }
                      }
                `,
                variables: {
                    sorting: [{ field: "id", direction: "ASC" }],
                    filter: { id: { eq: 1 } },
                    paging: { limit: 2, offset: 0 },
                },
            },
        });

        expect(response.data.sorted).toBeDefined();
        expect(response.data.filtered).toBeDefined();
        expect(+response.data.sorted.nodes[1].id).toBeGreaterThan(
            +response.data.sorted.nodes[0].id,
        );
        expect(response.data.filtered.nodes).toHaveLength(1);
    });

    it("correct get mutation response", async () => {
        const response = await dataProvider(client).custom?.({
            url: "",
            method: "post",
            meta: {
                operation: "updateManyBlogPosts",
                variables: {
                    input: {
                        value: {
                            filter: {
                                id: { in: ["42"] },
                            },
                            update: {
                                status: "REJECTED",
                            },
                        },
                        type: "UpdateManyBlogPostsInput",
                        required: true,
                    },
                },
                fields: ["updatedCount"],
            },
        });

        expect(response?.data.updatedCount).toBe(1);
    });
});
