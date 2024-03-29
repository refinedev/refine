import gql from "graphql-tag";
import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("update", () => {
  it("correct response with meta", async () => {
    const { data } = await dataProvider(client).update({
      resource: "posts",
      id: "21",
      variables: {
        title: "updated-foo",
        content: "updated-bar",
        category: "2",
      },
      meta: {
        fields: [
          {
            operation: "post",
            fields: ["id", "title", "content", { category: ["id"] }],
            variables: {},
          },
        ],
      },
    });

    expect(data.title).toEqual("updated-foo");
    expect(data.content).toEqual("updated-bar");
    expect(data.category.id).toEqual("2");
  });

  it("correct response without meta", async () => {
    const { data } = await dataProvider(client).update({
      resource: "posts",
      id: "21",
      variables: {
        title: "updated-foo-2",
        content: "updated-bar-2",
        category: "3",
      },
    });

    expect(data.id).toEqual("21");
  });
});

describe("update gql", () => {
  it("correct response", async () => {
    const { data } = await dataProvider(client).update({
      resource: "posts",
      id: "2121",
      variables: {
        title: "updated-test",
        content: "updated-test",
        category: "19",
      },
      meta: {
        gqlQuery: gql`
          mutation ($id: ID!, $data: editPostInput!) {
            updatePost (input: { where: { id: $id }, data: $data }) {
              post {
                id
                title
                content
                category {
                  id
                }
              }
            }
          }
        `,
      },
    });

    expect(data.id).toEqual("2121");
    expect(data.title).toEqual("updated-test");
    expect(data.content).toEqual("updated-test");
    expect(data.category.id).toEqual("19");
  });
});
