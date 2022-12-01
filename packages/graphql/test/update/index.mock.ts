import nock from "nock";

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
    .post("/graphql", {
        query: "mutation ($input: updatePostInput) {\n      updatePost (input: $input) {\n    post  { id, title, content, category { id } }\n  }\n    }",
        variables: {
            input: {
                where: { id: "21" },
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
                        id: "21",
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
            "Fri, 17 Sep 2021 08:18:44 GMT",
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
            "157ms",
        ],
    );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
    .post("/graphql", {
        query: "mutation ($input: updatePostInput) {\n      updatePost (input: $input) {\n    post  { id }\n  }\n    }",
        variables: {
            input: {
                where: { id: "21" },
                data: {
                    title: "updated-foo-2",
                    content: "updated-bar-2",
                    category: "3",
                },
            },
        },
    })
    .reply(200, { data: { updatePost: { post: { id: "21" } } } }, [
        "Server",
        "nginx/1.17.10",
        "Date",
        "Fri, 17 Sep 2021 08:20:36 GMT",
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
        "454ms",
    ]);
