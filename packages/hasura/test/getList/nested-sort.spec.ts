import { GraphQLClient } from "graphql-request";
import dataProvider from "../../src";

describe("getList sorting by a relation field", () => {
  it("sends nested order by with graphql-default naming convention", async () => {
    const client = new GraphQLClient("https://example.com/graphql");
    const request = vi.spyOn(client, "request").mockResolvedValue({
      posts: [],
      postsAggregate: { aggregate: { count: 0 } },
    });
    const dp = dataProvider(client, { namingConvention: "graphql-default" });

    await expect(
      dp.getList({
        resource: "posts",
        sorters: [{ field: "category.title", order: "asc" }],
      }),
    ).resolves.toEqual({
      data: [],
      total: 0,
    });

    expect(request).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        orderBy: { category: { title: "ASC" } },
      }),
    );
  });
});
