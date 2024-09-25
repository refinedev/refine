import { gql } from "@urql/core";
import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

const gqlMutation = gql`
  mutation CreateBlogPost($input: CreateOneBlogPostInput!) {
    createOneBlogPost(input: $input) {
      id
      title
      content
      status
    }
  }
`;

describe("create", () => {
  it("stuff", async () => {
    const { data } = await dataProvider(client).create({
      resource: "blogPosts",
      variables: {
        title: "foo",
        content: "bar",
        status: "DRAFT",
        categoryId: 1,
      },
      meta: {
        gqlMutation,
      },
    });

    expect(data.title).toEqual("foo");
    expect(data.content).toEqual("bar");
  });

  //   it("correct response without meta", async () => {
  //     const { data } = await dataProvider(client).create({
  //       resource: "posts",
  //       variables: {
  //         title: "foo",
  //         content: "bar",
  //         category: "2",
  //       },
  //     });

  //     expect(data.id).toEqual("44");
  //   });
  // });

  // describe("create gql", () => {
  //   it("correct response", async () => {
  //     const { data } = await dataProvider(client).create({
  //       resource: "posts",
  //       variables: {
  //         title: "test",
  //         content: "test",
  //         category: "19",
  //       },
  //       meta: {
  //         gqlQuery: gql`
  //           mutation createPost($input: createPostInput!) {
  //             createPost (input: $input) {
  //               post {
  //                 id
  //                 title
  //                 content
  //                 category {
  //                   id
  //                 }
  //               }
  //             }
  //           }
  //         `,
  //       },
  //     });

  //     expect(data.title).toEqual("test");
  //     expect(data.content).toEqual("test");
  //     expect(data.category.id).toEqual("19");
  //   });
});
