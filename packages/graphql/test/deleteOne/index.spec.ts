import { gql } from "@urql/core";

import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

const gqlMutation = gql`
  mutation DeleteOneBlogPost($input: DeleteOneBlogPostInput!) {
    deleteOneBlogPost(input: $input) {
      id
      title
    }
  }
`;

describe("deleteOne", () => {
  it("with correct params", async () => {
    const { data } = await dataProvider(client).deleteOne({
      resource: "blogPosts",
      id: "42",
      meta: {
        gqlMutation,
      },
    });

    expect(data.id).toEqual(null);
    expect(data.title).toBeDefined();
  });

  it("without mutation", async () => {
    expect(
      dataProvider(client).deleteOne({ resource: "blogPosts", id: 42 }),
    ).rejects.toEqual(new Error("Operation is required."));
  });
});
