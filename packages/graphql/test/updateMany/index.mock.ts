import nock from "nock";

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: updatePostInput) {\n      updatePost (input: $input) {\n    post  { id, title, content, category { id } }\n  }\n    }",
    variables: {
      input: {
        where: { id: "24" },
        data: {
          title: "updated-foo",
          content: "updated-bar",
          category: "2",
        },
      },
    },
  })
  .reply(
    200,
    {
      data: {
        updatePost: {
          post: {
            id: "24",
            title: "updated-foo",
            content: "updated-bar",
            category: { id: "2" },
          },
        },
      },
    },
    [
      "Server",
      "nginx/1.17.10",
      "Date",
      "Fri, 17 Sep 2021 08:35:00 GMT",
      "Content-Type",
      "application/json",
      "Content-Length",
      "113",
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
      "326ms",
    ],
  );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: updatePostInput) {\n      updatePost (input: $input) {\n    post  { id, title, content, category { id } }\n  }\n    }",
    variables: {
      input: {
        where: { id: "25" },
        data: {
          title: "updated-foo",
          content: "updated-bar",
          category: "2",
        },
      },
    },
  })
  .reply(
    200,
    {
      data: {
        updatePost: {
          post: {
            id: "25",
            title: "updated-foo",
            content: "updated-bar",
            category: { id: "2" },
          },
        },
      },
    },
    [
      "Server",
      "nginx/1.17.10",
      "Date",
      "Fri, 17 Sep 2021 08:35:00 GMT",
      "Content-Type",
      "application/json",
      "Content-Length",
      "113",
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
      "324ms",
    ],
  );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: updatePostInput) {\n      updatePost (input: $input) {\n    post  { id }\n  }\n    }",
    variables: {
      input: {
        where: { id: "24" },
        data: {
          title: "updated-foo-2",
          content: "updated-bar-2",
          category: "3",
        },
      },
    },
  })
  .reply(200, { data: { updatePost: { post: { id: "24" } } } }, [
    "Server",
    "nginx/1.17.10",
    "Date",
    "Fri, 17 Sep 2021 08:32:03 GMT",
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
    "372ms",
  ]);

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: updatePostInput) {\n      updatePost (input: $input) {\n    post  { id }\n  }\n    }",
    variables: {
      input: {
        where: { id: "25" },
        data: {
          title: "updated-foo-2",
          content: "updated-bar-2",
          category: "3",
        },
      },
    },
  })
  .reply(200, { data: { updatePost: { post: { id: "25" } } } }, [
    "Server",
    "nginx/1.17.10",
    "Date",
    "Fri, 17 Sep 2021 08:32:03 GMT",
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
    "442ms",
  ]);

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: updatePostInput) {\n      updatePost (input: $input) {\n    post  { id }\n  }\n    }",
    variables: {
      input: {
        where: { id: "2121" },
        data: {
          title: "updated-test",
          content: "updated-test",
          category: "19",
        },
      },
    },
  })
  .reply(200, { data: { updatePost: { post: { id: "2121" } } } }, [
    "Date",
    "Mon, 11 Mar 2024 14:43:30 GMT",
    "Content-Type",
    "application/json",
    "Content-Length",
    "47",
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
    "112ms",
  ]);

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: updatePostInput) {\n      updatePost (input: $input) {\n    post  { id }\n  }\n    }",
    variables: {
      input: {
        where: { id: "6223" },
        data: {
          title: "updated-test",
          content: "updated-test",
          category: "19",
        },
      },
    },
  })
  .reply(200, { data: { updatePost: { post: { id: "6223" } } } }, [
    "Date",
    "Mon, 11 Mar 2024 15:15:13 GMT",
    "Content-Type",
    "application/json",
    "Content-Length",
    "47",
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
    "78ms",
  ]);

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    query:
      "mutation ($input: updatePostInput) {\n      updatePost (input: $input) {\n    post  { id }\n  }\n    }",
    variables: {
      input: {
        where: { id: "2121" },
        data: {
          title: "updated-test",
          content: "updated-test",
          category: "19",
        },
      },
    },
  })
  .reply(200, { data: { updatePost: { post: { id: "2121" } } } }, [
    "Date",
    "Mon, 11 Mar 2024 15:15:13 GMT",
    "Content-Type",
    "application/json",
    "Content-Length",
    "47",
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
    "75ms",
  ]);
