import nock from "nock";

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: createPostInput) {\n      createPost (input: $input) {\n    post  { id, title, content, category { id } }\n  }\n    }",
    variables: {
      input: { data: { title: "foo", content: "bar", category: "2" } },
    },
  })
  .reply(
    200,
    {
      data: {
        createPost: {
          post: {
            id: "45",
            title: "foo",
            content: "bar",
            category: { id: "2" },
          },
        },
      },
    },
    [
      "Server",
      "nginx/1.17.10",
      "Date",
      "Thu, 16 Sep 2021 13:45:11 GMT",
      "Content-Type",
      "application/json",
      "Content-Length",
      "97",
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
      "350ms",
    ],
  );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: createPostInput) {\n      createPost (input: $input) {\n    post  { id, title, content, category { id } }\n  }\n    }",
    variables: {
      input: {
        data: { title: "foo-2", content: "bar-2", category: "3" },
      },
    },
  })
  .reply(
    200,
    {
      data: {
        createPost: {
          post: {
            id: "46",
            title: "foo-2",
            content: "bar-2",
            category: { id: "3" },
          },
        },
      },
    },
    [
      "Server",
      "nginx/1.17.10",
      "Date",
      "Thu, 16 Sep 2021 13:45:11 GMT",
      "Content-Type",
      "application/json",
      "Content-Length",
      "101",
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
      "341ms",
    ],
  );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: createPostInput) {\n      createPost (input: $input) {\n    post  { id }\n  }\n    }",
    variables: {
      input: { data: { title: "foo", content: "bar", category: "2" } },
    },
  })
  .reply(200, { data: { createPost: { post: { id: "48" } } } }, [
    "Server",
    "nginx/1.17.10",
    "Date",
    "Thu, 16 Sep 2021 14:22:07 GMT",
    "Content-Type",
    "application/json",
    "Content-Length",
    "45",
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
    "298ms",
  ]);

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: createPostInput) {\n      createPost (input: $input) {\n    post  { id }\n  }\n    }",
    variables: {
      input: {
        data: { title: "foo-2", content: "bar-2", category: "3" },
      },
    },
  })
  .reply(200, { data: { createPost: { post: { id: "47" } } } }, [
    "Server",
    "nginx/1.17.10",
    "Date",
    "Thu, 16 Sep 2021 14:22:07 GMT",
    "Content-Type",
    "application/json",
    "Content-Length",
    "45",
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
    "302ms",
  ]);

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation createPost($input: createPostInput!) {\n  createPost(input: $input) {\n    post {\n      id\n      title\n      content\n      category {\n        id\n      }\n    }\n  }\n}\n",
    variables: {
      input: { data: { title: "test", content: "test", category: "19" } },
    },
    operationName: "createPost",
  })
  .reply(
    200,
    {
      data: {
        createPost: {
          post: {
            id: "10045",
            title: "test",
            content: "test",
            category: { id: "19" },
          },
        },
      },
    },
    [
      "Date",
      "Tue, 12 Mar 2024 21:12:24 GMT",
      "Content-Type",
      "application/json",
      "Content-Length",
      "103",
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
      "64ms",
    ],
  );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation createPost($input: createPostInput!) {\n  createPost(input: $input) {\n    post {\n      id\n      title\n      content\n      category {\n        id\n      }\n    }\n  }\n}\n",
    variables: {
      input: { data: { title: "test2", content: "test2", category: "20" } },
    },
    operationName: "createPost",
  })
  .reply(
    200,
    {
      data: {
        createPost: {
          post: {
            id: "10046",
            title: "test2",
            content: "test2",
            category: { id: "20" },
          },
        },
      },
    },
    [
      "Date",
      "Tue, 12 Mar 2024 21:12:24 GMT",
      "Content-Type",
      "application/json",
      "Content-Length",
      "105",
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
      "62ms",
    ],
  );
