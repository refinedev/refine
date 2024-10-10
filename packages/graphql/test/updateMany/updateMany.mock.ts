import nock from "nock";

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "UpdateManyBlogPosts",
    query:
      "mutation UpdateManyBlogPosts($input: UpdateManyBlogPostsInput!) {\n  updateManyBlogPosts(input: $input) {\n    updatedCount\n  }\n}",
    variables: {
      input: {
        filter: { id: { in: ["1", "2"] } },
        update: { status: "PUBLISHED" },
      },
    },
  })
  .reply(
    200,
    { data: { updateManyBlogPosts: { updatedCount: 2 } } },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "52",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Wed, 09 Oct 2024 08:02:52 GMT",
      etag: 'W/"34-q7TcgM8PgtPGtmI2KSKG50FWvSI"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );
