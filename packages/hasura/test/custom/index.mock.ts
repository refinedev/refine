import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query  { posts_aggregate  { aggregate  { count } } }",
        variables: {},
    })
    .reply(
        200,
        [
            "1f8b0800000000000003aa564a492c4954b2aa562ac82f2e298e4f4c4f2f4a4d4f2c49050921380a560ad54ac9f9a5792520a69185716d6d6d2d000000ffff0300f6750d833c000000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 08:38:38 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "d62083f656aad0b6f0ecae36298376f1",
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
            "7f157c33ce7c92d8-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query  { postsAggregate  { aggregate  { count } } }",
        variables: {},
    })
    .reply(
        200,
        [
            "1f8b0800000000000003aa564a492c4954b2aa562ac82f2e29764c4f2f4a4d4f2c49058924c2390a560ad54ac9f9a5792520a69185716d6d6d2d000000ffff03004f9ee1aa3b000000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 08:38:38 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "feb63c6f32afa1c2c707d902a7b1b0ea",
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
            "7f157c392f7f548d-IST",
            "Content-Encoding",
            "gzip",
        ],
    );
