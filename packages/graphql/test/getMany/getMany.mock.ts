import nock from "nock";

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "GetManyBlogPosts",
    query:
      "query GetManyBlogPosts($filter: BlogPostFilter!) {\n  blogPosts(filter: $filter) {\n    nodes {\n      id\n      title\n      content\n    }\n  }\n}",
    variables: { filter: { id: { in: ["113", "369"] } } },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "113",
              title: "Updated Title 3",
              content:
                "Pariatur est corporis necessitatibus quos consequuntur nostrum. Libero nesciunt delectus sunt eligendi ullam doloribus ratione. Rem dolore odio.\nLaudantium ea quis ut fuga minus molestias facilis laudantium. Hic ut nisi possimus natus asperiores aspernatur. Vel alias placeat ipsum.\nSuscipit quis blanditiis tempora consequatur veniam nam voluptatibus accusamus. Eum dolores sunt eius aperiam perferendis autem eligendi optio perspiciatis. Culpa corrupti nobis incidunt non.",
            },
            {
              id: "369",
              title: "Occaecati incidunt ratione.",
              content:
                "Quia harum culpa fuga facilis cum. Nisi natus animi sapiente quidem commodi cum. Fuga nostrum fuga aliquam veritatis a voluptatum veniam.\nSed minus nulla aperiam esse labore nihil veniam rerum tempora. Temporibus id sit iure dignissimos aliquid reiciendis ex ipsam accusamus. Illum et aliquam nisi est esse.\nQuibusdam eos repellendus veritatis suscipit ducimus quis facilis laboriosam. Velit tempore modi rerum vitae nisi minima accusamus facere. Provident qui recusandae at provident consequatur quod asperiores expedita quis.",
            },
          ],
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "1156",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Wed, 09 Oct 2024 08:26:04 GMT",
      etag: 'W/"484-sdbbSd6hIT/0sDGzZU2M9oQCl2k"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );
