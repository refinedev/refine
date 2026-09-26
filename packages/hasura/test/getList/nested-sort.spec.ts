import { GraphQLClient } from "graphql-request";
import { vi } from "vitest";
import dataProvider from "../../src/index";

describe("getList sorting by a relation field", () => {
  it.each([
    ["hasura-default", "order_by", { category: { title: "asc" } }],
    ["graphql-default", "orderBy", { category: { title: "ASC" } }],
  ] as const)(
    "sends nested order by with %s naming convention",
    async (namingConvention, orderByKey, expectedOrderBy) => {
      const client = new GraphQLClient("http://localhost/v1/graphql");
      const request = vi.spyOn(client, "request").mockResolvedValue({
        posts: [],
        posts_aggregate: { aggregate: { count: 0 } },
        postsAggregate: { aggregate: { count: 0 } },
      } as any);

      await dataProvider(client, { namingConvention }).getList({
        resource: "posts",
        sorters: [{ field: "category.title", order: "asc" }],
        meta: { fields: ["id", "title"] },
      });

      expect(request).toHaveBeenCalledTimes(1);
      const variables = request.mock.calls[0][1] as Record<string, unknown>;
      expect(variables[orderByKey]).toEqual(expectedOrderBy);
    },
  );
});
