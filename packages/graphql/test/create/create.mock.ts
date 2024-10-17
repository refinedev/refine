import nock from "nock";

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "CreateBlogPost",
    query:
      "mutation CreateBlogPost($input: CreateOneBlogPostInput!) {\n  createOneBlogPost(input: $input) {\n    id\n    title\n    content\n    status\n  }\n}",
    variables: {
      input: {
        blogPost: {
          categoryId: 1,
          content: "bar",
          status: "DRAFT",
          title: "foo",
        },
      },
    },
  })
  .reply(
    200,
    {
      data: {
        createOneBlogPost: {
          id: "507",
          title: "foo",
          content: "bar",
          status: "DRAFT",
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "91",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Thu, 26 Sep 2024 11:54:40 GMT",
      etag: 'W/"5b-jJ/FnAK4aEJwavpg5viT6Qcb+ZM"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );
