import gql from "graphql-tag";
import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";

describe("with meta.fields", () => {
  describe.each(["hasura-default", "graphql-default"] as const)(
    "updateMany with %s naming convention",
    (namingConvention) => {
      const client = createClient(namingConvention);
      let posts = [
        {
          id: "572708c7-840d-430a-befd-1416bdee799a",
          title: "Aenean ultricies non libero sit amet pellentesque",
          content: "Vestibulum vulputate sapien arcu.",
          category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
        },
        {
          id: "478212ed-9a78-428c-b418-306bd88e0790",
          title: "Etiam tincidunt ex ut auctor faucibus",
          content: "Aliquam nibh erat.",
          category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
        },
      ];

      let ids = posts.map((post) => post.id);

      if (namingConvention === "graphql-default") {
        posts = [
          {
            id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
            title: "Aenean ultricies non libero sit amet pellentesque",
            content: "Vestibulum vulputate sapien arcu.",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          },
          {
            id: "ae316d48-025a-47db-b4c0-ff4694f52c85",
            title: "Etiam tincidunt ex ut auctor faucibus",
            content: "Aliquam nibh erat.",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          },
        ];

        ids = posts.map((post) => post.id);
      }

      it("correct response with meta", async () => {
        const { data } = await dataProvider(client, {
          namingConvention,
        }).getMany!({
          resource: "posts",
          ids,
          meta: {
            fields: ["id", "title", "content", { category: ["id"] }],
          },
        });

        expect(data[0]["id"]).toEqual(posts[0]["id"]);
        expect(data[0]["title"]).toEqual(posts[0]["title"]);
        expect(data[0]["content"]).toEqual(posts[0]["content"]);
        expect(data[0]["category"].id).toEqual(posts[0]["category"]["id"]);

        expect(data[1]["id"]).toEqual(posts[1]["id"]);
        expect(data[1]["title"]).toEqual(posts[1]["title"]);
        expect(data[1]["content"]).toEqual(posts[1]["content"]);
        expect(data[1]["category"].id).toEqual(posts[1]["category"]["id"]);
      });
    },
  );
});

describe("with gqlQuery", () => {
  it("correct response hasura-default", async () => {
    const client = createClient("hasura-default");
    const posts = [
      {
        id: "572708c7-840d-430a-befd-1416bdee799a",
        title: "Aenean ultricies non libero sit amet pellentesque",
        content: "Vestibulum vulputate sapien arcu.",
        category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
      },
      {
        id: "478212ed-9a78-428c-b418-306bd88e0790",
        title: "Etiam tincidunt ex ut auctor faucibus",
        content: "Aliquam nibh erat.",
        category: { id: "e27156c3-9998-434f-bd5b-2b078283ff26" },
      },
    ];

    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).getMany!({
      resource: "posts",
      ids: posts.map((post) => post.id),
      meta: {
        gqlQuery: gql`
                    query GetPosts($where: posts_bool_exp!) {
                        posts(where: $where) {
                            id
                            title
                            content
                            category {
                                id
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

    expect(data[0]["id"]).toEqual(posts[0]["id"]);
    expect(data[0]["title"]).toEqual(posts[0]["title"]);
    expect(data[0]["content"]).toEqual(posts[0]["content"]);
    expect(data[0]["category"].id).toEqual(posts[0]["category"]["id"]);

    expect(data[1]["id"]).toEqual(posts[1]["id"]);
    expect(data[1]["title"]).toEqual(posts[1]["title"]);
    expect(data[1]["content"]).toEqual(posts[1]["content"]);
    expect(data[1]["category"].id).toEqual(posts[1]["category"]["id"]);
  });

  it("correct response graphql-default", async () => {
    const client = createClient("graphql-default");
    const posts = [
      {
        id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
        title: "Aenean ultricies non libero sit amet pellentesque",
        content: "Vestibulum vulputate sapien arcu.",
        category: {
          id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
      },
      {
        id: "ae316d48-025a-47db-b4c0-ff4694f52c85",
        title: "Etiam tincidunt ex ut auctor faucibus",
        content: "Aliquam nibh erat.",
        category: {
          id: "e27156c3-9998-434f-bd5b-2b078283ff26",
        },
      },
    ];

    const { data } = await dataProvider(client, {
      namingConvention: "graphql-default",
    }).getMany!({
      resource: "posts",
      ids: posts.map((post) => post.id),
      meta: {
        gqlQuery: gql`
                    query GetPosts($where: PostsBoolExp!) {
                        posts(where: $where) {
                            id
                            title
                            content
                            category {
                                id
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

    expect(data[0]["id"]).toEqual(posts[0]["id"]);
    expect(data[0]["title"]).toEqual(posts[0]["title"]);
    expect(data[0]["content"]).toEqual(posts[0]["content"]);
    expect(data[0]["category"].id).toEqual(posts[0]["category"]["id"]);

    expect(data[1]["id"]).toEqual(posts[1]["id"]);
    expect(data[1]["title"]).toEqual(posts[1]["title"]);
    expect(data[1]["content"]).toEqual(posts[1]["content"]);
    expect(data[1]["category"].id).toEqual(posts[1]["category"]["id"]);
  });
});
