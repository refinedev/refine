import { gql } from "@urql/core";
import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./deleteMany.mock";

const gqlMutation = gql`
mutation DeleteManyBlogPosts($input: DeleteManyBlogPostsInput!) {
  deleteManyBlogPosts(input: $input) {
    deletedCount
  }
}
`;

describe("deleteMany", () => {
  describe("with correct params", () => {
    it("works as expected", async () => {
      const ids = ["333", "334"];
      const { data } = await dataProvider(client).deleteMany({
        resource: "blogPosts",
        ids,
        meta: {
          gqlMutation,
        },
      });

      expect(data).toEqual(ids.map((id) => ({ id })));
    });
  });

  describe("without operation", () => {
    it("throws error", async () => {
      expect(
        dataProvider(client).deleteMany({ resource: "blogPosts", ids: [1, 2] }),
      ).rejects.toEqual(new Error("Operation is required."));
    });
  });
});
