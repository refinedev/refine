import nock from "nock";

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "GetOneBlogPost",
    query:
      "query GetOneBlogPost($id: ID!) {\n  blogPost(id: $id) {\n    id\n    title\n    content\n    status\n    category {\n      id\n    }\n  }\n}",
    variables: { id: "19" },
  })
  .reply(
    200,
    {
      data: {
        blogPost: {
          id: "19",
          title: "Ullam placeat distinctio nam ab exercitationem nostrum.",
          content:
            "Illum tenetur voluptatum officiis sint libero voluptates omnis commodi. Quaerat optio qui. Pariatur maxime impedit dolore voluptatibus perferendis nobis laudantium.\nEarum accusamus earum. Laborum eaque voluptates magnam iusto quae similique iusto. Non iste atque accusantium eius.\nEarum ducimus sapiente iste non similique. Cum quas in. Deleniti veniam totam.",
          status: "DRAFT",
          category: { id: "14" },
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "514",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 08 Oct 2024 14:23:43 GMT",
      etag: 'W/"202-kbs2b5EeBwLyIizDtkctxMoHfCo"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "GetBlogPost",
    query:
      "query GetBlogPost($id: ID!) {\n  blogPost(id: $id) {\n    id\n    title\n    content\n    status\n    category {\n      id\n    }\n  }\n}",
    variables: { id: "19" },
  })
  .reply(
    200,
    {
      data: {
        blogPost: {
          id: "19",
          title: "Ullam placeat distinctio nam ab exercitationem nostrum.",
          content:
            "Illum tenetur voluptatum officiis sint libero voluptates omnis commodi. Quaerat optio qui. Pariatur maxime impedit dolore voluptatibus perferendis nobis laudantium.\nEarum accusamus earum. Laborum eaque voluptates magnam iusto quae similique iusto. Non iste atque accusantium eius.\nEarum ducimus sapiente iste non similique. Cum quas in. Deleniti veniam totam.",
          status: "DRAFT",
          category: { id: "14" },
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "514",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 08 Oct 2024 14:23:43 GMT",
      etag: 'W/"202-kbs2b5EeBwLyIizDtkctxMoHfCo"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );
