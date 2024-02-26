import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($where: posts_bool_exp) { posts (where: $where) { id, title, content, category { id } } }",
    variables: {
      where: {
        id: {
          _in: [
            "572708c7-840d-430a-befd-1416bdee799a",
            "478212ed-9a78-428c-b418-306bd88e0790",
          ],
        },
      },
    },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "572708c7-840d-430a-befd-1416bdee799a",
            title: "Aenean ultricies non libero sit amet pellentesque",
            content: "Vestibulum vulputate sapien arcu.",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          },
          {
            id: "478212ed-9a78-428c-b418-306bd88e0790",
            title: "Etiam tincidunt ex ut auctor faucibus",
            content: "Aliquam nibh erat.",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          },
        ],
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:48:53 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "412",
      "Connection",
      "close",
      "x-request-id",
      "2edeb4dcb3e80b775bfbe82c3f3fc7e8",
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
      "843770a1bb76c1c8-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query ($where: PostsBoolExp) { posts (where: $where) { id, title, content, category { id } } }",
    variables: {
      where: {
        id: {
          _in: [
            "4ec22cb3-b679-4891-a489-3d19cf275ab3",
            "ae316d48-025a-47db-b4c0-ff4694f52c85",
          ],
        },
      },
    },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
            title: "Aenean ultricies non libero sit amet pellentesque",
            content: "Vestibulum vulputate sapien arcu.",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          },
          {
            id: "ae316d48-025a-47db-b4c0-ff4694f52c85",
            title: "Etiam tincidunt ex ut auctor faucibus",
            content: "Aliquam nibh erat.",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          },
        ],
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:48:54 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "412",
      "Connection",
      "close",
      "x-request-id",
      "6dd165860aa3c106fd125c6d431b6847",
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
      "843770a919557340-BUD",
    ],
  );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($where: posts_bool_exp!) {\n  posts(where: $where) {\n    id\n    title\n    content\n    category {\n      id\n    }\n  }\n  posts_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "572708c7-840d-430a-befd-1416bdee799a",
            "478212ed-9a78-428c-b418-306bd88e0790",
          ],
        },
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
            id: "572708c7-840d-430a-befd-1416bdee799a",
            title: "Aenean ultricies non libero sit amet pellentesque",
            content: "Vestibulum vulputate sapien arcu.",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          },
          {
            id: "478212ed-9a78-428c-b418-306bd88e0790",
            title: "Etiam tincidunt ex ut auctor faucibus",
            content: "Aliquam nibh erat.",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          },
        ],
        posts_aggregate: { aggregate: { count: 2 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:48:55 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "460",
      "Connection",
      "close",
      "x-request-id",
      "2675282c7701be1743c0672fed751840",
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
      "843770b02ebb7339-BUD",
    ],
  );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
  .post("/v1/graphql", {
    query:
      "query GetPosts($where: PostsBoolExp!) {\n  posts(where: $where) {\n    id\n    title\n    content\n    category {\n      id\n    }\n  }\n  postsAggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n",
    variables: {
      where: {
        id: {
          _in: [
            "4ec22cb3-b679-4891-a489-3d19cf275ab3",
            "ae316d48-025a-47db-b4c0-ff4694f52c85",
          ],
        },
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
            id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
            title: "Aenean ultricies non libero sit amet pellentesque",
            content: "Vestibulum vulputate sapien arcu.",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          },
          {
            id: "ae316d48-025a-47db-b4c0-ff4694f52c85",
            title: "Etiam tincidunt ex ut auctor faucibus",
            content: "Aliquam nibh erat.",
            category: {
              id: "e27156c3-9998-434f-bd5b-2b078283ff26",
            },
          },
        ],
        postsAggregate: { aggregate: { count: 2 } },
      },
    },
    [
      "Date",
      "Wed, 10 Jan 2024 19:48:56 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "459",
      "Connection",
      "close",
      "x-request-id",
      "ce9c0fa21bbec5cc3b01a12527bb7a78",
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
      "843770b74ad6c1a8-BUD",
    ],
  );
