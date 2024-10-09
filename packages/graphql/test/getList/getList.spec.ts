import dataProvider from "../../src/index";
import client from "../gqlClient";
import { gql } from "@urql/core";
import "./getList.mock";

const gqlQuery = gql`
  query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {
    blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {
      nodes {
        id
        title
        status
      }
      totalCount
    }
  }
`;

describe("getList", () => {
  it("default params", async () => {
    const { data, total } = await dataProvider(client).getList({
      resource: "blogPosts",
      meta: {
        gqlQuery: gqlQuery,
      },
    });

    expect(data[0].id).toBe("1");
    expect(data.length).toBe(10);
    expect(total).toBe(507);
  });

  describe("pagination", () => {
    it("current", async () => {
      const { data } = await dataProvider(client).getList({
        resource: "blogPosts",
        meta: {
          gqlQuery: gqlQuery,
        },
        pagination: {
          current: 2,
        },
      });

      expect(data[0].id).toBe("11");
    });

    it("pageSize", async () => {
      const { data } = await dataProvider(client).getList({
        resource: "blogPosts",
        meta: {
          gqlQuery: gqlQuery,
        },
        pagination: {
          pageSize: 2,
        },
      });

      expect(data.length).toBe(2);
    });

    describe("mode", () => {
      it("off", async () => {
        const { data } = await dataProvider(client).getList({
          resource: "blogPosts",
          meta: {
            gqlQuery: gqlQuery,
          },
          pagination: {
            mode: "off",
          },
        });

        expect(data.length).toBe(507);
      });

      it("server", async () => {
        const { data } = await dataProvider(client).getList({
          resource: "blogPosts",
          meta: {
            gqlQuery: gqlQuery,
          },
          pagination: {
            mode: "server",
          },
        });
      });
    });
  });

  describe("sorters", () => {
    it("sort by id desc", async () => {
      const { data } = await dataProvider(client).getList({
        resource: "blogPosts",
        meta: {
          gqlQuery: gqlQuery,
        },
        sorters: [{ field: "id", order: "desc" }],
      });

      expect(data[0].id).toBe("507");
    });
  });

  describe("filters", () => {
    it("default", async () => {
      const { data } = await dataProvider(client).getList({
        resource: "blogPosts",
        meta: {
          gqlQuery: gqlQuery,
        },
        filters: [{ field: "status", operator: "eq", value: "DRAFT" }],
      });

      data.map((d) => expect(d.status).toBe("DRAFT"));
    });

    it("and", async () => {
      const { data } = await dataProvider(client).getList({
        resource: "blogPosts",
        meta: {
          gqlQuery: gqlQuery,
        },
        filters: [
          {
            operator: "and",
            value: [
              { field: "status", operator: "eq", value: "DRAFT" },
              { field: "id", operator: "lt", value: 10 },
            ],
          },
        ],
      });

      expect(data.length).toBe(4);
      expect(data[0].status).toBe("DRAFT");
    });

    it("or", async () => {
      const { data } = await dataProvider(client).getList({
        resource: "blogPosts",
        meta: {
          gqlQuery: gqlQuery,
        },
        filters: [
          {
            operator: "or",
            value: [
              { field: "status", operator: "eq", value: "DRAFT" },
              { field: "status", operator: "eq", value: "PUBLISHED" },
            ],
          },
        ],
      });

      data.map((d) => expect(d.status).not.toBe("REJECTED"));
    });
  });
});
