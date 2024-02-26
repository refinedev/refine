import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($limit: Int, $offset: Int, $where: posts_bool_exp) { posts (limit: $limit, offset: $offset) { id, title } posts_aggregate (where: $where) { aggregate { count } } }",
    variables: { limit: 10, offset: 0 },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "6379bbda-0857-40f2-a277-b401ea6134d7",
            title: "Updated Title",
          },
          {
            id: "ae316d48-025a-47db-b4c0-ff4694f52c85",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
          {
            id: "c7ba5e30-8c5f-46bb-862d-e2bcf6487749",
            title: "Updated Title",
          },
          {
            id: "20b3d4ab-80a0-4a9e-9080-b934c15f0a4d",
            title: "Lorem ipsum dolore",
          },
          {
            id: "3a62d79b-147d-4228-a494-42b87f0fa069",
            title: "Lorem ipsum dolore",
          },
          {
            id: "1e13f5b2-9fd9-413c-9017-c472c4dabcc9",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "b55402d1-5a28-4dd4-9d3d-a679935a2d68",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
          {
            id: "bae22655-73ed-4de6-a8c5-d8c2212e896f",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "865fc5b1-be18-47ab-9ab1-802900504b66",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
        ],
        posts_aggregate: { aggregate: { count: 526 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:07 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "x-request-id",
      "10469d6a279f029bf6c2550c8a4b0726",
      "CF-Cache-Status",
      "DYNAMIC",
      "Content-Security-Policy",
      "upgrade-insecure-requests",
      "Referrer-Policy",
      "strict-origin-when-cross-origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-XSS-Protection",
      "0",
      "Server",
      "cloudflare",
      "CF-RAY",
      "84380dba8b6fc1c1-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($limit: Int, $offset: Int, $order_by: [posts_order_by!], $where: posts_bool_exp) { posts (limit: $limit, offset: $offset, order_by: $order_by) { id, title } posts_aggregate (where: $where) { aggregate { count } } }",
    variables: { limit: 10, offset: 0, order_by: { id: "asc" } },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "00c688e2-a1bd-40dd-9f58-1e41d53386d2",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "01b0b68b-3cb7-4ba7-a176-9387d5ea3ef4",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "05eea4a6-5854-407c-af9d-614523a2342c",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
          {
            id: "06b353b2-a807-4e47-a31d-8a158b7615ad",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "080c7c2e-8f71-476b-8d8a-7b15c859cf9a",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
          {
            id: "08884710-eb2f-43b3-a4b8-9772527d3170",
            title: "Lorem ipsum dolore",
          },
          {
            id: "093728df-2cd5-486b-bccd-f1718c930967",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "09ec5ae3-6bb6-43d6-8612-1224d043d276",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "0a0f1ef8-37f5-4b10-8fe5-a9d2f19a3b6f",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "0ad3a15a-3191-4f44-910f-bd210deaa589",
            title: "updated title1234",
          },
        ],
        posts_aggregate: { aggregate: { count: 526 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:08 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "x-request-id",
      "586a5c610b5805ebc5f5cc8c172bbb6c",
      "CF-Cache-Status",
      "DYNAMIC",
      "Content-Security-Policy",
      "upgrade-insecure-requests",
      "Referrer-Policy",
      "strict-origin-when-cross-origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-XSS-Protection",
      "0",
      "Server",
      "cloudflare",
      "CF-RAY",
      "84380dc118c9c1cd-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($limit: Int, $offset: Int, $where: posts_bool_exp) { posts (limit: $limit, offset: $offset, where: $where) { id, title } posts_aggregate (where: $where) { aggregate { count } } }",
    variables: {
      limit: 10,
      offset: 0,
      where: {
        _and: [
          {
            category_id: {
              _eq: "ff9cffb8-b5bd-4020-8f00-2f9b589a5264",
            },
          },
        ],
      },
    },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "48a5591e-4ab0-45f8-950e-aee8a63769df",
            title: "velit eu est congue elementum in",
          },
          {
            id: "675133b1-dd64-4ac3-a585-3689fb6aa776",
            title: "accumsan felis ut at",
          },
          {
            id: "cf43a199-e791-4b81-a1fd-3ccf8e7f6166",
            title: "velit id pretium iaculis",
          },
        ],
        posts_aggregate: { aggregate: { count: 3 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:09 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "317",
      "Connection",
      "close",
      "x-request-id",
      "866683ac19a30cdb73f4f4f51d76e43d",
      "CF-Cache-Status",
      "DYNAMIC",
      "Content-Security-Policy",
      "upgrade-insecure-requests",
      "Referrer-Policy",
      "strict-origin-when-cross-origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-XSS-Protection",
      "0",
      "Server",
      "cloudflare",
      "CF-RAY",
      "84380dc81fb01ccc-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($limit: Int, $offset: Int, $where: posts_bool_exp) { posts (limit: $limit, offset: $offset, where: $where) { id, title } posts_aggregate (where: $where) { aggregate { count } } }",
    variables: {
      limit: 10,
      offset: 0,
      where: {
        _and: [
          {
            category: {
              id: { _eq: "ff9cffb8-b5bd-4020-8f00-2f9b589a5264" },
            },
          },
        ],
      },
    },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "48a5591e-4ab0-45f8-950e-aee8a63769df",
            title: "velit eu est congue elementum in",
          },
          {
            id: "675133b1-dd64-4ac3-a585-3689fb6aa776",
            title: "accumsan felis ut at",
          },
          {
            id: "cf43a199-e791-4b81-a1fd-3ccf8e7f6166",
            title: "velit id pretium iaculis",
          },
        ],
        posts_aggregate: { aggregate: { count: 3 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:09 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "317",
      "Connection",
      "close",
      "x-request-id",
      "ee9c6bd367105a6306d213d8a0ac05bc",
      "CF-Cache-Status",
      "DYNAMIC",
      "Content-Security-Policy",
      "upgrade-insecure-requests",
      "Referrer-Policy",
      "strict-origin-when-cross-origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-XSS-Protection",
      "0",
      "Server",
      "cloudflare",
      "CF-RAY",
      "84380dcaaeea1ce0-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($limit: Int, $offset: Int, $order_by: [posts_order_by!], $where: posts_bool_exp) { posts (limit: $limit, offset: $offset, order_by: $order_by, where: $where) { id, title, category { id, title } } posts_aggregate (where: $where) { aggregate { count } } }",
    variables: {
      limit: 10,
      offset: 0,
      order_by: { title: "asc" },
      where: {
        _and: [
          {
            category_id: {
              _eq: "6869be25-7189-40a0-9e3c-12164c1929ec",
            },
          },
        ],
      },
    },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "3be19a24-ecee-42d9-949b-5f41623b9b5a",
            title: "Multiple Updated Title",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
          {
            id: "664dff87-5dc5-4773-877a-b44a199a5f5e",
            title: "lorem ipsum dolor",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
          {
            id: "7f486f21-4147-45a7-a3e2-73aab6e0dce3",
            title: "rhoncus aliquam lacus",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 3 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:10 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "550",
      "Connection",
      "close",
      "x-request-id",
      "25d55a5af8b17cc1f3db39e176d075a2",
      "CF-Cache-Status",
      "DYNAMIC",
      "Content-Security-Policy",
      "upgrade-insecure-requests",
      "Referrer-Policy",
      "strict-origin-when-cross-origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-XSS-Protection",
      "0",
      "Server",
      "cloudflare",
      "CF-RAY",
      "84380dcd3ae41ce0-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($limit: Int, $offset: Int, $where: PostsBoolExp) { posts (limit: $limit, offset: $offset) { id, title } postsAggregate (where: $where) { aggregate { count } } }",
    variables: { limit: 10, offset: 0 },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "6379bbda-0857-40f2-a277-b401ea6134d7",
            title: "Updated Title",
          },
          {
            id: "ae316d48-025a-47db-b4c0-ff4694f52c85",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
          {
            id: "c7ba5e30-8c5f-46bb-862d-e2bcf6487749",
            title: "Updated Title",
          },
          {
            id: "20b3d4ab-80a0-4a9e-9080-b934c15f0a4d",
            title: "Lorem ipsum dolore",
          },
          {
            id: "3a62d79b-147d-4228-a494-42b87f0fa069",
            title: "Lorem ipsum dolore",
          },
          {
            id: "1e13f5b2-9fd9-413c-9017-c472c4dabcc9",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "b55402d1-5a28-4dd4-9d3d-a679935a2d68",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
          {
            id: "bae22655-73ed-4de6-a8c5-d8c2212e896f",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "865fc5b1-be18-47ab-9ab1-802900504b66",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
        ],
        postsAggregate: { aggregate: { count: 526 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:11 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "x-request-id",
      "0ebb2b0e92812628fa7d849717fa6905",
      "CF-Cache-Status",
      "DYNAMIC",
      "Content-Security-Policy",
      "upgrade-insecure-requests",
      "Referrer-Policy",
      "strict-origin-when-cross-origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-XSS-Protection",
      "0",
      "Server",
      "cloudflare",
      "CF-RAY",
      "84380dcfbfec1ce0-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($limit: Int, $offset: Int, $orderBy: [PostsOrderBy!], $where: PostsBoolExp) { posts (limit: $limit, offset: $offset, orderBy: $orderBy) { id, title } postsAggregate (where: $where) { aggregate { count } } }",
    variables: { limit: 10, offset: 0, orderBy: { id: "ASC" } },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "00c688e2-a1bd-40dd-9f58-1e41d53386d2",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "01b0b68b-3cb7-4ba7-a176-9387d5ea3ef4",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "05eea4a6-5854-407c-af9d-614523a2342c",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
          {
            id: "06b353b2-a807-4e47-a31d-8a158b7615ad",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "080c7c2e-8f71-476b-8d8a-7b15c859cf9a",
            title: "Etiam tincidunt ex ut auctor faucibus",
          },
          {
            id: "08884710-eb2f-43b3-a4b8-9772527d3170",
            title: "Lorem ipsum dolore",
          },
          {
            id: "093728df-2cd5-486b-bccd-f1718c930967",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "09ec5ae3-6bb6-43d6-8612-1224d043d276",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "0a0f1ef8-37f5-4b10-8fe5-a9d2f19a3b6f",
            title: "Aenean ultricies non libero sit amet pellentesque",
          },
          {
            id: "0ad3a15a-3191-4f44-910f-bd210deaa589",
            title: "updated title1234",
          },
        ],
        postsAggregate: { aggregate: { count: 526 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:12 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "x-request-id",
      "75af8cd9febf1fda4879417ed11a7289",
      "CF-Cache-Status",
      "DYNAMIC",
      "Content-Security-Policy",
      "upgrade-insecure-requests",
      "Referrer-Policy",
      "strict-origin-when-cross-origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-XSS-Protection",
      "0",
      "Server",
      "cloudflare",
      "CF-RAY",
      "84380dd70c6268bc-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($limit: Int, $offset: Int, $where: PostsBoolExp) { posts (limit: $limit, offset: $offset, where: $where) { id, title } postsAggregate (where: $where) { aggregate { count } } }",
    variables: {
      limit: 10,
      offset: 0,
      where: {
        _and: [
          {
            categoryId: {
              _eq: "ff9cffb8-b5bd-4020-8f00-2f9b589a5264",
            },
          },
        ],
      },
    },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "48a5591e-4ab0-45f8-950e-aee8a63769df",
            title: "velit eu est congue elementum in",
          },
          {
            id: "675133b1-dd64-4ac3-a585-3689fb6aa776",
            title: "accumsan felis ut at",
          },
          {
            id: "cf43a199-e791-4b81-a1fd-3ccf8e7f6166",
            title: "velit id pretium iaculis",
          },
        ],
        postsAggregate: { aggregate: { count: 3 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:12 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "316",
      "Connection",
      "close",
      "x-request-id",
      "ac650265692a3f233ed0af33fc235dc4",
      "CF-Cache-Status",
      "DYNAMIC",
      "Content-Security-Policy",
      "upgrade-insecure-requests",
      "Referrer-Policy",
      "strict-origin-when-cross-origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-XSS-Protection",
      "0",
      "Server",
      "cloudflare",
      "CF-RAY",
      "84380dde4eb0c1cd-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($limit: Int, $offset: Int, $where: PostsBoolExp) { posts (limit: $limit, offset: $offset, where: $where) { id, title } postsAggregate (where: $where) { aggregate { count } } }",
    variables: {
      limit: 10,
      offset: 0,
      where: {
        _and: [
          {
            category: {
              id: { _eq: "ff9cffb8-b5bd-4020-8f00-2f9b589a5264" },
            },
          },
        ],
      },
    },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "48a5591e-4ab0-45f8-950e-aee8a63769df",
            title: "velit eu est congue elementum in",
          },
          {
            id: "675133b1-dd64-4ac3-a585-3689fb6aa776",
            title: "accumsan felis ut at",
          },
          {
            id: "cf43a199-e791-4b81-a1fd-3ccf8e7f6166",
            title: "velit id pretium iaculis",
          },
        ],
        postsAggregate: { aggregate: { count: 3 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:13 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "316",
      "Connection",
      "close",
      "x-request-id",
      "7c71308017014e25eed1eb2c69353d3b",
      "CF-Cache-Status",
      "DYNAMIC",
      "Content-Security-Policy",
      "upgrade-insecure-requests",
      "Referrer-Policy",
      "strict-origin-when-cross-origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-XSS-Protection",
      "0",
      "Server",
      "cloudflare",
      "CF-RAY",
      "84380de0ee14c1be-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($limit: Int, $offset: Int, $orderBy: [PostsOrderBy!], $where: PostsBoolExp) { posts (limit: $limit, offset: $offset, orderBy: $orderBy, where: $where) { id, title, category { id, title } } postsAggregate (where: $where) { aggregate { count } } }",
    variables: {
      limit: 10,
      offset: 0,
      orderBy: { title: "ASC" },
      where: {
        _and: [
          {
            categoryId: {
              _eq: "6869be25-7189-40a0-9e3c-12164c1929ec",
            },
          },
        ],
      },
    },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "3be19a24-ecee-42d9-949b-5f41623b9b5a",
            title: "Multiple Updated Title",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
          {
            id: "664dff87-5dc5-4773-877a-b44a199a5f5e",
            title: "lorem ipsum dolor",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
          {
            id: "7f486f21-4147-45a7-a3e2-73aab6e0dce3",
            title: "rhoncus aliquam lacus",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
        ],
        postsAggregate: { aggregate: { count: 3 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:13 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "549",
      "Connection",
      "close",
      "x-request-id",
      "c607b18bbacd8aa52972395665f28b66",
      "CF-Cache-Status",
      "DYNAMIC",
      "Content-Security-Policy",
      "upgrade-insecure-requests",
      "Referrer-Policy",
      "strict-origin-when-cross-origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-XSS-Protection",
      "0",
      "Server",
      "cloudflare",
      "CF-RAY",
      "84380de3bef36852-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $order_by: [posts_order_by!], $where: posts_bool_exp) {\n  posts(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {\n    id\n    title\n    category_id\n    created_at\n    category {\n      id\n      title\n    }\n  }\n  posts_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      order_by: { title: "asc" },
      where: {
        _and: [
          {
            category_id: {
              _eq: "6869be25-7189-40a0-9e3c-12164c1929ec",
            },
          },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "3be19a24-ecee-42d9-949b-5f41623b9b5a",
            title: "Multiple Updated Title",
            category_id: "6869be25-7189-40a0-9e3c-12164c1929ec",
            created_at: "2022-12-26T08:24:11.665314+00:00",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
          {
            id: "664dff87-5dc5-4773-877a-b44a199a5f5e",
            title: "lorem ipsum dolor",
            category_id: "6869be25-7189-40a0-9e3c-12164c1929ec",
            created_at: "2022-12-26T08:24:11.665314+00:00",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
          {
            id: "7f486f21-4147-45a7-a3e2-73aab6e0dce3",
            title: "rhoncus aliquam lacus",
            category_id: "6869be25-7189-40a0-9e3c-12164c1929ec",
            created_at: "2022-12-26T08:24:11.665314+00:00",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 3 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:14 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "x-request-id",
      "57d5088254f2d322e56fdcc3efc648fd",
      "CF-Cache-Status",
      "DYNAMIC",
      "Content-Security-Policy",
      "upgrade-insecure-requests",
      "Referrer-Policy",
      "strict-origin-when-cross-origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-XSS-Protection",
      "0",
      "Server",
      "cloudflare",
      "CF-RAY",
      "84380de68d7c1cd4-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($offset: Int!, $limit: Int!, $orderBy: [PostsOrderBy!], $where: PostsBoolExp) {\n  posts(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {\n    id\n    title\n    categoryId\n    createdAt\n    category {\n      id\n      title\n    }\n  }\n  postsAggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      limit: 10,
      offset: 0,
      orderBy: { title: "ASC" },
      where: {
        _and: [
          {
            categoryId: {
              _eq: "6869be25-7189-40a0-9e3c-12164c1929ec",
            },
          },
        ],
      },
    },
    operationName: "GetPosts",
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "3be19a24-ecee-42d9-949b-5f41623b9b5a",
            title: "Multiple Updated Title",
            categoryId: "6869be25-7189-40a0-9e3c-12164c1929ec",
            createdAt: "2022-12-26T08:24:11.665314+00:00",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
          {
            id: "664dff87-5dc5-4773-877a-b44a199a5f5e",
            title: "lorem ipsum dolor",
            categoryId: "6869be25-7189-40a0-9e3c-12164c1929ec",
            createdAt: "2022-12-26T08:24:11.665314+00:00",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
          {
            id: "7f486f21-4147-45a7-a3e2-73aab6e0dce3",
            title: "rhoncus aliquam lacus",
            categoryId: "6869be25-7189-40a0-9e3c-12164c1929ec",
            createdAt: "2022-12-26T08:24:11.665314+00:00",
            category: {
              id: "6869be25-7189-40a0-9e3c-12164c1929ec",
              title: "consequat nulla",
            },
          },
        ],
        postsAggregate: { aggregate: { count: 3 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 21:36:14 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "x-request-id",
      "0c0cdf4b92314d901ba76c37799e8edb",
      "CF-Cache-Status",
      "DYNAMIC",
      "Content-Security-Policy",
      "upgrade-insecure-requests",
      "Referrer-Policy",
      "strict-origin-when-cross-origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-XSS-Protection",
      "0",
      "Server",
      "cloudflare",
      "CF-RAY",
      "84380de90e9e1cd0-BUD",
    ],
  );
