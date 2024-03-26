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
            id: "43",
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
      "Thu, 16 Sep 2021 13:28:08 GMT",
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
      "39ms",
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
  .reply(200, { data: { createPost: { post: { id: "44" } } } }, [
    "Server",
    "nginx/1.17.10",
    "Date",
    "Thu, 16 Sep 2021 13:30:33 GMT",
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
    "295ms",
  ]);

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: createPostInput) {\n  createPost(input: $input) {\n    post {\n      id\n    }\n  }\n}\n",
    variables: { title: "test", content: "test", category: "19" },
  })
  .reply(200, { data: { createPost: { post: { id: "10032" } } } }, [
    "Date",
    "Mon, 11 Mar 2024 14:51:02 GMT",
    "Content-Type",
    "application/json",
    "Content-Length",
    "48",
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
    "40ms",
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
            id: "10042",
            title: "test",
            content: "test",
            category: { id: "19" },
          },
        },
      },
    },
    [
      "Date",
      "Tue, 12 Mar 2024 21:02:31 GMT",
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
      "43ms",
    ],
  );
