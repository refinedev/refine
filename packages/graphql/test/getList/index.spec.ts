import gql from "graphql-tag";
import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("getList", () => {
  it("correct response", async () => {
    const { data } = await dataProvider(client).getList({
      resource: "posts",
      meta: {
        fields: ["id", "title"],
      },
    });
    expect(data[0].id).toBe("21");
    expect(data[0].title).toBe("Another New Post");
  });

  it("correct sorting response", async () => {
    const { data } = await dataProvider(client).getList({
      resource: "posts",
      sorters: [
        {
          field: "id",
          order: "asc",
        },
      ],
      meta: {
        fields: ["id", "title"],
      },
    });

    expect(data[0].id).toBe("7");
    expect(data[0].title).toBe("GraphQl 3");
  });

  it("correct filter response", async () => {
    const { data } = await dataProvider(client).getList({
      resource: "posts",
      filters: [
        {
          field: "id",
          operator: "eq",
          value: "907",
        },
      ],
      meta: {
        fields: ["title"],
      },
    });

    expect(data[0].title).toBe(
      "Molestias iste voluptatem velit sed voluptate aut voluptatibus explicabo.",
    );
  });

  it("correct filter and sort response", async () => {
    const response = await dataProvider(client).getList({
      resource: "posts",
      filters: [
        {
          field: "category",
          operator: "eq",
          value: "8",
        },
      ],
      sorters: [
        {
          field: "title",
          order: "asc",
        },
      ],
      meta: {
        fields: ["id", "title", { category: ["id", "title"] }],
      },
    });

    expect(response.data[0].id).toBe("349");
    expect(response.data[0].category.title).toBe("Test");
  });
});

describe("getList gql", () => {
  it("correct response", async () => {
    const { data } = await dataProvider(client).getList({
      resource: "posts",
      meta: {
        gqlQuery: gql`
              query {
                posts {
                  id
                  title
                }
              }
            `,
      },
    });
    expect(data[0].id).toBe("6200");
    expect(data[0].title).toBe("test");
  });

  it("correct sorting response", async () => {
    const { data } = await dataProvider(client).getList({
      resource: "posts",
      sorters: [
        {
          field: "id",
          order: "desc",
        },
      ],
      meta: {
        gqlQuery: gql`
              query ($sort: String) {
                posts(sort: $sort) {
                  id
                  title
                }
              }
            `,
      },
    });

    expect(data[0].id).toBe("10031");
    expect(data[0].title).toBe("test");
  });

  it("correct filter response", async () => {
    const { data } = await dataProvider(client).getList({
      resource: "posts",
      filters: [
        {
          field: "id",
          operator: "eq",
          value: "5403",
        },
      ],
      meta: {
        gqlQuery: gql`
              query ($where: JSON) {
                posts(where: $where) {
                  id
                  title
                }
              }
            `,
      },
    });

    expect(data[0].title).toBe("test");
  });

  it("correct filter and sort response", async () => {
    const response = await dataProvider(client).getList({
      resource: "posts",
      filters: [
        {
          field: "category",
          operator: "eq",
          value: "19",
        },
      ],
      sorters: [
        {
          field: "title",
          order: "asc",
        },
      ],
      meta: {
        gqlQuery: gql`
              query ($where: JSON, $sort: String) {
                posts(where: $where, sort: $sort) {
                  id
                  title
                  category {
                    id
                    title
                  }
                }
              }
            `,
      },
    });

    expect(response.data[0].id).toBe("2121");
    expect(response.data[0].category.title).toBe("New Category");

    const response2 = await dataProvider(client).getList({
      resource: "posts",
      filters: [
        {
          field: "category",
          operator: "eq",
          value: "19",
        },
      ],
      sorters: [
        {
          field: "title",
          order: "desc",
        },
      ],
      meta: {
        gqlQuery: gql`
              query ($where: JSON, $sort: String) {
                posts(where: $where, sort: $sort) {
                  id
                  title
                  category {
                    id
                    title
                  }
                }
              }
            `,
      },
    });

    expect(response2.data[0].id).toBe("6223");
    expect(response2.data[0].category.title).toBe("New Category");
  });
});
