import gql from "graphql-tag";
import dataProvider from "../../src/index";
import { createClient } from "../gqlClient";
import "./index.mock";
// import nock from "nock";
// nock.recorder.rec();

describe("with meta.fields", () => {
  describe.each(["hasura-default", "graphql-default"] as const)(
    "deleteOne with %s naming convention",
    (namingConvention) => {
      const client = createClient(namingConvention);
      let withMetaId = "25c94041-84c8-4e8f-9fb4-ea5453bf53e6";
      let withoutMetaId = "8bdbb0f5-f99b-4c80-808a-3ef64d52559b";
      if (namingConvention === "graphql-default") {
        withMetaId = "acab1eff-1b2d-4abb-9f0d-c2490f576850";
        withoutMetaId = "f1dc4055c-f31e-42df-b72d-c7a3a2936e51";
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
        expect(data.name).toEqual("test");
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
});

describe("with gqlMutation", () => {
  it("correct response with hasura-default", async () => {
    const id = "5a7e0232-c581-4fbb-81ff-bf768c74d662";

    const client = createClient("hasura-default");
    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).deleteOne({
      resource: "posts",
      id,
      meta: {
        gqlMutation: gql`
                    mutation DeletePost($id: uuid!) {
                        delete_posts_by_pk(id: $id) {
                            id
                            title
                        }
                    }
                `,
      },
    });

    expect(data.id).toEqual(id);
  });

  it("correct response with graphql-default", async () => {
    const id = "2efdc1fe-658d-4379-bbfd-76f013d1df98";

    const client = createClient("graphql-default");
    const { data } = await dataProvider(client, {
      namingConvention: "graphql-default",
    }).deleteOne({
      resource: "posts",
      id,
      meta: {
        gqlMutation: gql`
                    mutation DeletePost($id: uuid!) {
                        deletePostsByPk(id: $id) {
                            id
                            title
                        }
                    }
                `,
      },
    });

    expect(data.id).toEqual(id);
  });

  it("correct response without gql hasura-default ", async () => {
    const id = "39ddbca5-cd14-49fc-b88a-1925d808d310";

    const client = createClient("hasura-default");
    const { data } = await dataProvider(client, {
      namingConvention: "hasura-default",
    }).deleteOne({
      resource: "posts",
      id,
    });

    expect(data.id).toEqual(id);
  });

  it("correct response without gql graphql-default", async () => {
    const id = "1e1dc4c8-c9fa-46b7-924e-0995c33fdb10";

    const client = createClient("graphql-default");
    const { data } = await dataProvider(client, {
      namingConvention: "graphql-default",
    }).deleteOne({
      resource: "posts",
      id,
    });

    expect(data.id).toEqual(id);
  });
});
