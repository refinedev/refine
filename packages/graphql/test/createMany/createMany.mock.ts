import nock from "nock";

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "CreateManyBlogPosts",
    query:
      "mutation CreateManyBlogPosts($input: CreateManyBlogPostsInput!) {\n  createManyBlogPosts(input: $input) {\n    id\n    title\n    content\n    category {\n      id\n    }\n  }\n}",
    variables: {
      input: {
        blogPosts: [
          { categoryId: "1", content: "bar1", status: "DRAFT", title: "foo1" },
          { categoryId: "2", content: "bar2", status: "DRAFT", title: "foo2" },
        ],
      },
    },
  })
  .reply(
    200,
    {
      data: {
        createManyBlogPosts: [
          { id: "501", title: "foo1", content: "bar1", category: { id: "1" } },
          { id: "502", title: "foo2", content: "bar2", category: { id: "2" } },
        ],
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "170",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Thu, 26 Sep 2024 12:24:48 GMT",
      etag: 'W/"aa-gQK/S0twncVKhGZ9SZ2sK0O9fZ4"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );
