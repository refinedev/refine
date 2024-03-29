import gql from "graphql-tag";
import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("deleteMany", () => {
  it("correct response with meta", async () => {
    const { data } = await dataProvider(client).deleteMany!({
      resource: "posts",
      ids: ["37", "38"],
      meta: {
        fields: [
          {
            operation: "post",
            fields: ["id", "title"],
            variables: {},
          },
        ],
      },
    });

    expect(data[0].id).toEqual("37");
    expect(data[0].title).toEqual("Hello");

    expect(data[1].id).toEqual("38");
    expect(data[1].title).toEqual("Loem");
  });

  it("correct response without meta", async () => {
    const { data } = await dataProvider(client).deleteMany!({
      resource: "posts",
      ids: ["34", "35"],
    });

    expect(data[0].id).toEqual("34");

    expect(data[1].id).toEqual("35");
  });
});

describe("deleteMany gql", () => {
  it("correct response with meta", async () => {
    const { data } = await dataProvider(client).deleteMany({
      resource: "posts",
      ids: ["10051", "10052"],
      meta: {
        gqlMutation: gql`
          mutation ($input: deletePostInput!) {
              deletePost (input: $input) {
                  post { id }
              }
            }
        `,
      },
    });

    expect(data[0].id).toEqual("10051");

    expect(data[1].id).toEqual("10052");
  });
});
