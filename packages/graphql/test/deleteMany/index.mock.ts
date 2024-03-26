import nock from "nock";

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: deletePostInput) {\n      deletePost (input: $input) {\n    post  { id, title }\n  }\n    }",
    variables: { input: { where: { id: "37" } } },
  })
  .reply(
    200,
    { data: { deletePost: { post: { id: "37", title: "Hello" } } } },
    [
      "Server",
      "nginx/1.17.10",
      "Date",
      "Fri, 17 Sep 2021 09:07:05 GMT",
      "Content-Type",
      "application/json",
      "Content-Length",
      "61",
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
      "144ms",
    ],
  );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: deletePostInput) {\n      deletePost (input: $input) {\n    post  { id, title }\n  }\n    }",
    variables: { input: { where: { id: "38" } } },
  })
  .reply(200, { data: { deletePost: { post: { id: "38", title: "Loem" } } } }, [
    "Server",
    "nginx/1.17.10",
    "Date",
    "Fri, 17 Sep 2021 09:07:05 GMT",
    "Content-Type",
    "application/json",
    "Content-Length",
    "60",
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
    "129ms",
  ]);

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: deletePostInput) {\n      deletePost (input: $input) {\n    post  { id }\n  }\n    }",
    variables: { input: { where: { id: "34" } } },
  })
  .reply(200, { data: { deletePost: { post: { id: "34" } } } }, [
    "Server",
    "nginx/1.17.10",
    "Date",
    "Fri, 17 Sep 2021 09:08:27 GMT",
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
    "137ms",
  ]);

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: deletePostInput) {\n      deletePost (input: $input) {\n    post  { id }\n  }\n    }",
    variables: { input: { where: { id: "35" } } },
  })
  .reply(200, { data: { deletePost: { post: { id: "35" } } } }, [
    "Server",
    "nginx/1.17.10",
    "Date",
    "Fri, 17 Sep 2021 09:08:27 GMT",
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
    "129ms",
  ]);

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: deletePostInput!) {\n  deletePost(input: $input) {\n    post {\n      id\n    }\n  }\n}\n",
    variables: { input: { where: { id: "10051" } } },
  })
  .reply(200, { data: { deletePost: { post: { id: "10051" } } } }, [
    "Date",
    "Tue, 12 Mar 2024 21:36:15 GMT",
    "Content-Type",
    "application/json",
    "Content-Length",
    "359",
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
    "16ms",
  ]);

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: deletePostInput!) {\n  deletePost(input: $input) {\n    post {\n      id\n    }\n  }\n}\n",
    variables: { input: { where: { id: "10052" } } },
  })
  .reply(200, { data: { deletePost: { post: { id: "10052" } } } }, [
    "Date",
    "Tue, 12 Mar 2024 21:36:15 GMT",
    "Content-Type",
    "application/json",
    "Content-Length",
    "359",
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
    "16ms",
  ]);
