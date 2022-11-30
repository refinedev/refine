import nock from "nock";

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
    .post("/graphql", {
        query: "mutation ($input: deletePostInput) {\n      deletePost (input: $input) {\n    post  { id, title }\n  }\n    }",
        variables: { input: { where: { id: "43" } } },
    })
    .reply(
        200,
        { data: { deletePost: { post: { id: "43", title: "foo" } } } },
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Fri, 17 Sep 2021 08:58:32 GMT",
            "Content-Type",
            "application/json",
            "Content-Length",
            "59",
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
            "85ms",
        ],
    );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
    .post("/graphql", {
        query: "mutation ($input: deletePostInput) {\n      deletePost (input: $input) {\n    post  { id }\n  }\n    }",
        variables: { input: { where: { id: "48" } } },
    })
    .reply(200, { data: { deletePost: { post: { id: "48" } } } }, [
        "Server",
        "nginx/1.17.10",
        "Date",
        "Fri, 17 Sep 2021 08:39:15 GMT",
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
        "70ms",
    ]);
