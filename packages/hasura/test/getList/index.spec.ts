import gql from "graphql-tag";
import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";

describe("with meta.fields", () => {
  describe.each(["hasura-default", "graphql-default"] as const)(
    "getList with %s naming convention",
    (namingConvention) => {
      const client = createClient(namingConvention);
      const categoryFieldName =
        namingConvention === "hasura-default" ? "category_id" : "categoryId";

      it("correct response", async () => {
        const { data, total } = await dataProvider(client, {
          namingConvention,
        }).getList({
          resource: "posts",
          meta: {
            fields: ["id", "title"],
          },
        });

        expect(data[0]["id"]).toBe("4ec22cb3-b679-4891-a489-3d19cf275ab3");
        expect(data[0]["title"]).toBe(
          "Aenean ultricies non libero sit amet pellentesque",
        );
        expect(total).toBe(526);
      });

      it("correct sorting response", async () => {
        const { data, total } = await dataProvider(client, {
          namingConvention,
        }).getList({
          resource: "posts",
          sorters: [
            {
              field: "id",
              order: "asc",
            },
          ],
          meta: {
            fields: ["id", "title"],
          },
        });

        expect(data[0]["id"]).toBe("00c688e2-a1bd-40dd-9f58-1e41d53386d2");
        expect(data[0]["title"]).toBe(
          "Aenean ultricies non libero sit amet pellentesque",
        );
        expect(total).toBe(526);
      });

      it("correct filter response", async () => {
        const { data, total } = await dataProvider(client, {
          namingConvention,
        }).getList({
          resource: "posts",
          filters: [
            {
              field: categoryFieldName,
              operator: "eq",
              value: "ff9cffb8-b5bd-4020-8f00-2f9b589a5264",
            },
          ],
          meta: {
            fields: ["id", "title"],
          },
        });

        expect(data[0]["id"]).toBe("48a5591e-4ab0-45f8-950e-aee8a63769df");
        expect(data[0]["title"]).toBe("velit eu est congue elementum in");
        expect(total).toBe(3);
      });

      it("correct nested filter response", async () => {
        const { data, total } = await dataProvider(client, {
          namingConvention,
        }).getList({
          resource: "posts",
          filters: [
            {
              field: "category.id",
              operator: "eq",
              value: "ff9cffb8-b5bd-4020-8f00-2f9b589a5264",
            },
          ],
          meta: {
            fields: ["id", "title"],
          },
        });

        expect(data[0]["id"]).toBe("48a5591e-4ab0-45f8-950e-aee8a63769df");
        expect(total).toBe(3);
      });

      it("correct filter and sort response", async () => {
        const { data, total } = await dataProvider(client, {
          namingConvention,
        }).getList({
          resource: "posts",
          filters: [
            {
              field: categoryFieldName,
              operator: "eq",
              value: "6869be25-7189-40a0-9e3c-12164c1929ec",
            },
          ],
          sorters: [
            {
              field: "title",
              order: "asc",
            },
          ],
          meta: {
            fields: ["id", "title", { category: ["id", "title"] }],
          },
        });

        expect(data[0]["id"]).toBe("3be19a24-ecee-42d9-949b-5f41623b9b5a");
        expect(data[0]["category"].title).toBe("consequat nulla");
        expect(total).toBe(3);
      });
    },
  );
});

describe("with gqlQuery", () => {
  it("correct filter and sort response with hasura-default", async () => {
    const client = createClient("hasura-default");

    const { data, total } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).getList({
      resource: "posts",
      filters: [
        {
          field: "category_id",
          operator: "eq",
          value: "6869be25-7189-40a0-9e3c-12164c1929ec",
        },
      ],
      sorters: [
        {
          field: "title",
          order: "asc",
        },
      ],
      meta: {
        gqlQuery: gql`
                    query GetPosts(
                        $offset: Int!
                        $limit: Int!
                        $order_by: [posts_order_by!]
                        $where: posts_bool_exp
                    ) {
                        posts(
                            offset: $offset
                            limit: $limit
                            order_by: $order_by
                            where: $where
                        ) {
                            id
                            title
                            category_id
                            created_at
                            category {
                                id
                                title
                            }
                        }
                        posts_aggregate(where: $where) {
                            aggregate {
                                count
                            }
                        }
                    }
                `,
      },
    });

    expect(data[0]["id"]).toBe("3be19a24-ecee-42d9-949b-5f41623b9b5a");
    expect(data[0]["category"].title).toBe("consequat nulla");
    expect(total).toBe(3);
  });

  it("correct filter and sort response with graphql-default", async () => {
    const client = createClient("graphql-default");

    const { data, total } = await dataProvider(client, {
      namingConvention: "graphql-default",
    }).getList({
      resource: "posts",
      filters: [
        {
          field: "categoryId",
          operator: "eq",
          value: "6869be25-7189-40a0-9e3c-12164c1929ec",
        },
      ],
      sorters: [
        {
          field: "title",
          order: "asc",
        },
      ],
      meta: {
        gqlQuery: gql`
                    query GetPosts(
                        $offset: Int!
                        $limit: Int!
                        $orderBy: [PostsOrderBy!]
                        $where: PostsBoolExp
                    ) {
                        posts(
                            offset: $offset
                            limit: $limit
                            orderBy: $orderBy
                            where: $where
                        ) {
                            id
                            title
                            categoryId
                            createdAt
                            category {
                                id
                                title
                            }
                        }
                        postsAggregate(where: $where) {
                            aggregate {
                                count
                            }
                        }
                    }
                `,
      },
    });

    expect(data[0]["id"]).toBe("3be19a24-ecee-42d9-949b-5f41623b9b5a");
    expect(data[0]["category"].title).toBe("consequat nulla");
    expect(total).toBe(3);
  });
});
