import nock from "nock";

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
    .post("/graphql", {
        query: "query ($id: ID!) { post (id: $id) { id, title, content, category { id } } }",
        variables: { id: "45" },
    })
    .reply(
        200,
        {
            data: {
                post: {
                    id: "45",
                    title: "foo",
                    content: "bar",
                    category: { id: "2" },
                },
            },
        },
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Thu, 16 Sep 2021 14:47:17 GMT",
            "Content-Type",
            "application/json",
            "Content-Length",
            "82",
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
            "32ms",
        ],
    );
