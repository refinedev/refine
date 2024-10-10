import { gql } from "@urql/core";
import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./updateMany.mock";

const gqlMutation = gql`
mutation UpdateManyBlogPosts($input: UpdateManyBlogPostsInput!) {
  updateManyBlogPosts(input: $input) {
    updatedCount
  }
}
`;

describe("updateMany", () => {
  describe("with correct params", () => {
    it("works as expected", async () => {
      const { data } = await dataProvider(client).updateMany({
        resource: "blogPosts",
        ids: ["1", "2"],
        meta: {
          gqlMutation,
        },
        variables: { status: "PUBLISHED" },
      });

      expect(data[0].updatedCount).toEqual(2);
    });
  });

  describe("without operation", () => {
    it("throws error", async () => {
      expect(
        dataProvider(client).updateMany({
          resource: "blogPosts",
          ids: [1, 2],
          variables: { status: "PUBLISHED" },
        }),
      ).rejects.toEqual(new Error("Operation is required."));
    });
  });
});
