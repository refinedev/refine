import nock from "nock";

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "DeleteManyBlogPosts",
    query:
      "mutation DeleteManyBlogPosts($input: DeleteManyBlogPostsInput!) {\n  deleteManyBlogPosts(input: $input) {\n    deletedCount\n  }\n}",
    variables: { input: { filter: { id: { in: ["333", "334"] } } } },
  })
  .reply(
    200,
    { data: { deleteManyBlogPosts: { deletedCount: 2 } } },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "52",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Wed, 09 Oct 2024 07:55:46 GMT",
      etag: 'W/"34-TyRyk9Eipbm0h3MCmbejsSL12SQ"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );
