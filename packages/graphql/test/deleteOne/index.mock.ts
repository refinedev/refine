import nock from "nock";

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "DeleteOneBlogPost",
    query:
      "mutation DeleteOneBlogPost($input: DeleteOneBlogPostInput!) {\n  deleteOneBlogPost(input: $input) {\n    id\n    title\n  }\n}",
    variables: { input: { id: "42" } },
  })
  .reply(
    200,
    {
      data: {
        deleteOneBlogPost: {
          id: null,
          title: "Id cupiditate veritatis ea odio totam at deleniti.",
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "104",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 08 Oct 2024 14:08:33 GMT",
      etag: 'W/"68-TDuJj7/vFePG+kD7NzTYthPx/TU"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );
