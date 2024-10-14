import { gql } from "@urql/core";
import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./create.mock";

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
  describe("with correct params", () => {
    it("works as expected", async () => {
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
  });

  describe("without operation", () => {
    it("throws error", async () => {
      expect(
        dataProvider(client).create({ resource: "blogPosts", variables: {} }),
      ).rejects.toEqual(new Error("Operation is required."));
    });
  });
});
