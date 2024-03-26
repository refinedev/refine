import gql from "graphql-tag";
import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("getMany", () => {
  it("correct response with meta", async () => {
    const { data } = await dataProvider(client).getMany!({
      resource: "posts",
      ids: ["45", "46"],
      meta: {
        fields: ["id", "title", "content", { category: ["id"] }],
      },
    });

    expect(data[0].id).toEqual("45");
    expect(data[0].title).toEqual("foo");
    expect(data[0].content).toEqual("bar");
    expect(data[0].category.id).toEqual("2");

    expect(data[1].id).toEqual("46");
    expect(data[1].title).toEqual("foo-2");
    expect(data[1].content).toEqual("bar-2");
    expect(data[1].category.id).toEqual("3");
  });
});

describe("getMany gql", () => {
  it("correct response with meta", async () => {
    const { data } = await dataProvider(client).getMany!({
      resource: "posts",
      ids: ["2121", "6223"],
      meta: {
        gqlQuery: gql`
          query ($where: JSON) {
            posts (where: $where) {
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

    expect(data[0].id).toEqual("2121");
    expect(data[0].title).toEqual("test");
    expect(data[0].content).toEqual("test");
    expect(data[0].category.id).toEqual("19");

    expect(data[1].id).toEqual("6223");
    expect(data[1].title).toEqual("test");
    expect(data[1].content).toEqual("test");
    expect(data[1].category.id).toEqual("19");
  });
});
