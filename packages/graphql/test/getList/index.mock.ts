import nock from "nock";

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query ($sort: String, $where: JSON, $start: Int, $limit: Int) { posts (sort: $sort, where: $where, start: $start, limit: $limit) { id, title } }",
    variables: { where: {}, start: 0, limit: 10 },
  })
  .reply(
    200,
    [
      "1f8b0800000000000003aa564a492c4954b2aa562ac82f2e2956b28aae56ca4c51b252323254d2512ac92cc94905721cf3f24b32528b14fc52cb150280ea946a7560ca8c919461913621ce1453e29499e1b7cc823853ccf19b628957dad880284b8c0db19a125b5bcb05000000ffff",
      "0300af7dd9d673010000",
    ],
    [
      "Server",
      "nginx/1.17.10",
      "Date",
      "Fri, 17 Sep 2021 07:22:50 GMT",
      "Content-Type",
      "application/json",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "Vary",
      "Accept-Encoding",
      "Vary",
      "Origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "X-Response-Time",
      "29ms",
      "Content-Encoding",
      "gzip",
    ],
  );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query ($sort: String, $where: JSON, $start: Int, $limit: Int) { posts (sort: $sort, where: $where, start: $start, limit: $limit) { id, title } }",
    variables: { sort: "id:asc", where: {}, start: 0, limit: 10 },
  })
  .reply(
    200,
    [
      "1f8b0800000000000003aa564a492c4954b2aa562ac82f2e2956b28aae56ca4c51b2523257d2512ac92cc94905b2dd8b120b320273148c956a75a0d21648d25ef9197908194b2499c4e2142042c8191ae09334c4905430429236c62f6d82cf68532449bfd4728500a067155c5273f315420b8001908aa4d40c49a9635e7e49466a91025c4b680142a591211e954ab5b1b5b55c00000000ffff",
      "030048acc85b5e010000",
    ],
    [
      "Server",
      "nginx/1.17.10",
      "Date",
      "Fri, 17 Sep 2021 07:31:50 GMT",
      "Content-Type",
      "application/json",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "Vary",
      "Accept-Encoding",
      "Vary",
      "Origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "X-Response-Time",
      "107ms",
      "Content-Encoding",
      "gzip",
    ],
  );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query ($sort: String, $where: JSON, $start: Int, $limit: Int) { posts (sort: $sort, where: $where, start: $start, limit: $limit) { title } }",
    variables: { where: { id: "907" }, start: 0, limit: 10 },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            title:
              "Molestias iste voluptatem velit sed voluptate aut voluptatibus explicabo.",
          },
        ],
      },
    },
    [
      "Server",
      "nginx/1.17.10",
      "Date",
      "Fri, 04 Mar 2022 11:33:59 GMT",
      "Content-Type",
      "application/json",
      "Content-Length",
      "107",
      "Connection",
      "close",
      "Vary",
      "Origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "X-Response-Time",
      "24ms",
    ],
  );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query ($sort: String, $where: JSON, $start: Int, $limit: Int) { posts (sort: $sort, where: $where, start: $start, limit: $limit) { id, title, category { id, title } } }",
    variables: {
      sort: "title:asc",
      where: { category: "8" },
      start: 0,
      limit: 10,
    },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "349",
            title: "Illo non iusto rem distinctio sequi dolores nobis.",
            category: { id: "8", title: "Test" },
          },
        ],
      },
    },
    [
      "Server",
      "nginx/1.17.10",
      "Date",
      "Fri, 04 Mar 2022 11:50:17 GMT",
      "Content-Type",
      "application/json",
      "Content-Length",
      "132",
      "Connection",
      "close",
      "Vary",
      "Origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "X-Response-Time",
      "37ms",
    ],
  );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query: "{\n  posts {\n    id\n    title\n  }\n}\n",
    variables: { sort: [], where: {}, start: 0, limit: 10 },
  })
  .reply(
    200,
    {
      data: {
        posts: [{ id: "6200", title: "test" }],
      },
    },
    [
      "Date",
      "Mon, 11 Mar 2024 12:18:21 GMT",
      "Content-Type",
      "application/json",
      "Content-Length",
      "5597",
      "Connection",
      "close",
      "Vary",
      "Accept-Encoding",
      "Vary",
      "Origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "X-Response-Time",
      "65ms",
    ],
  );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query ($sort: String) {\n  posts(sort: $sort) {\n    id\n    title\n  }\n}\n",
    variables: { sort: "id:desc", where: {}, start: 0, limit: 10 },
  })
  .reply(
    200,
    {
      data: {
        posts: [{ id: "10031", title: "test" }],
      },
    },
    [
      "Date",
      "Mon, 11 Mar 2024 12:18:22 GMT",
      "Content-Type",
      "application/json",
      "Content-Length",
      "2763",
      "Connection",
      "close",
      "Vary",
      "Accept-Encoding",
      "Vary",
      "Origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "X-Response-Time",
      "62ms",
    ],
  );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query ($where: JSON) {\n  posts(where: $where) {\n    id\n    title\n  }\n}\n",
    variables: { sort: [], where: { id: "5403" }, start: 0, limit: 10 },
  })
  .reply(200, { data: { posts: [{ id: "5403", title: "test" }] } }, [
    "Date",
    "Mon, 11 Mar 2024 12:16:28 GMT",
    "Content-Type",
    "application/json",
    "Content-Length",
    "51",
    "Connection",
    "close",
    "Vary",
    "Origin",
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
    "X-Frame-Options",
    "SAMEORIGIN",
    "X-Powered-By",
    "Strapi <strapi.io>",
    "X-Response-Time",
    "26ms",
  ]);

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query ($where: JSON, $sort: String) {\n  posts(where: $where, sort: $sort) {\n    id\n    title\n    category {\n      id\n      title\n    }\n  }\n}\n",
    variables: {
      sort: "title:asc",
      where: { category: "19" },
      start: 0,
      limit: 10,
    },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "2121",
            title: "da-1",
            category: { id: "19", title: "New Category" },
          },
          {
            id: "4240",
            title: "da-1",
            category: { id: "19", title: "New Category" },
          },
          {
            id: "5285",
            title: "da-1",
            category: { id: "19", title: "New Category" },
          },
          {
            id: "5309",
            title: "da-1",
            category: { id: "19", title: "New Category" },
          },
          {
            id: "2020",
            title: "Dolores in debitis est aut necessitatibus.",
            category: { id: "19", title: "New Category" },
          },
          {
            id: "8025",
            title: "dummy",
            category: { id: "19", title: "New Category" },
          },
          {
            id: "6204",
            title: "test",
            category: { id: "19", title: "New Category" },
          },
          {
            id: "6205",
            title: "testest",
            category: { id: "19", title: "New Category" },
          },
          {
            id: "974",
            title: "To be Deleted",
            category: { id: "19", title: "New Category" },
          },
          {
            id: "6223",
            title: "tt",
            category: { id: "19", title: "New Category" },
          },
        ],
      },
    },
    [
      "Date",
      "Mon, 11 Mar 2024 12:14:53 GMT",
      "Content-Type",
      "application/json",
      "Content-Length",
      "819",
      "Connection",
      "close",
      "Vary",
      "Accept-Encoding",
      "Vary",
      "Origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "X-Response-Time",
      "49ms",
    ],
  );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "query ($where: JSON, $sort: String) {\n  posts(where: $where, sort: $sort) {\n    id\n    title\n    category {\n      id\n      title\n    }\n  }\n}\n",
    variables: {
      sort: "title:desc",
      where: { category: "19" },
      start: 0,
      limit: 10,
    },
  })
  .reply(
    200,
    {
      data: {
        posts: [
          {
            id: "6223",
            title: "tt",
            category: { id: "19", title: "New Category" },
          },
          {
            id: "974",
            title: "To be Deleted",
            category: { id: "19", title: "New Category" },
          },
          {
            id: "6205",
            title: "testest",
            category: { id: "19", title: "New Category" },
          },
          {
            id: "6204",
            title: "test",
            category: { id: "19", title: "New Category" },
          },
          {
            id: "8025",
            title: "dummy",
            category: { id: "19", title: "New Category" },
          },
          {
            id: "2020",
            title: "Dolores in debitis est aut necessitatibus.",
            category: { id: "19", title: "New Category" },
          },
          {
            id: "2121",
            title: "da-1",
            category: { id: "19", title: "New Category" },
          },
          {
            id: "4240",
            title: "da-1",
            category: { id: "19", title: "New Category" },
          },
          {
            id: "5285",
            title: "da-1",
            category: { id: "19", title: "New Category" },
          },
          {
            id: "5309",
            title: "da-1",
            category: { id: "19", title: "New Category" },
          },
        ],
      },
    },
    [
      "Date",
      "Mon, 11 Mar 2024 12:16:01 GMT",
      "Content-Type",
      "application/json",
      "Content-Length",
      "819",
      "Connection",
      "close",
      "Vary",
      "Accept-Encoding",
      "Vary",
      "Origin",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Frame-Options",
      "SAMEORIGIN",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "X-Response-Time",
      "40ms",
    ],
  );
