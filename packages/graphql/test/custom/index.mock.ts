import nock from "nock";

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
    .post("/graphql", {
        query: "query ($sort: String, $where: JSON) { posts (sort: $sort, where: $where) { id, title, category { id } } }",
        variables: { sort: "id:asc", where: { title_contains: "foo" } },
    })
    .reply(
        200,
        [
            "1f8b0800000000000003aa564a492c4954b2aa562ac82f2e2956b28aae56ca4c51b252323254d2512ac92cc94905724a0b80aa525374d3f2f3758d80e2c9405e7a7e5125481f58b5b1526dad0e4ca709769dd8f41921eb33254f9f09b24b89516f44a27a1312d59b12a73eb6b6960b000000ffff",
            "0300a671041a7f010000",
        ],
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Fri, 17 Sep 2021 11:16:31 GMT",
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
            "52ms",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
    .post("/graphql", {
        query: "mutation ($input: updatePostInput) {\n      updatePost (input: $input) {\n    post  { id, title }\n  }\n    }",
        variables: {
            input: { where: { id: "32" }, data: { title: "custom-foo" } },
        },
    })
    .reply(
        200,
        { data: { updatePost: { post: { id: "32", title: "custom-foo" } } } },
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Fri, 17 Sep 2021 11:21:50 GMT",
            "Content-Type",
            "application/json",
            "Content-Length",
            "66",
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
