import nock from "nock";

/**
 * Hasura default 'snake_case' naming convention
 */

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($id: uuid!) {\n      delete_posts_by_pk (id: $id) {\n    id, title\n  }\n    }",
        variables: { id: "bac2ef0a-899f-4694-84ef-b9c6fe4dc2b7" },
    })
    .reply(
        200,
        [
            "1f8b080000000000040315cac10a80200c80e177d93921422c7d19d9dc065290e02e11be7b79f82f1fff0b8c86905e60b9c424b7bb5bcff4e4764ead0c0908cb26baa23b6254e743f4eef0a28e62092a9ecb463b2c60d52ef977ecacb38eac30c6f800141bc47064000000",
        ],
        [
            "Date",
            "Wed, 30 Nov 2022 11:57:37 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "b9552b07bf02a0852ba560fef7fd64be",
            "Content-Encoding",
            "gzip",
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
            "7723680ded00bb9b-FRA",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($id: uuid!) {\n      delete_posts_by_pk (id: $id) {\n    id\n  }\n    }",
        variables: { id: "b19c9bd4-dff9-4ecf-acfe-aea2c4c9ec41" },
    })
    .reply(
        200,
        [
            "1f8b080000000000040315c83b0ac0200c00d0bb64cf60c9122f13623e505aa8a04b11ef5efac6b7c0752ad4051e77cc90fe8c39a4bdd2af7f4f870aadb0717342cf64a4b044b50cd4d0c3c8388c0aecbd3f84a6ff974d000000",
        ],
        [
            "Date",
            "Wed, 30 Nov 2022 11:58:17 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "9d3d79109c7d732bb1529b768af1fa06",
            "Content-Encoding",
            "gzip",
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
            "7723690bafb49170-FRA",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($id: Int!) {\n      delete_users_by_pk (id: $id) {\n    id, name\n  }\n    }",
        variables: { id: 1 },
    })
    .reply(
        200,
        [
            "1f8b080035c1066402ffab564a492c4954b2aa564a49cd492d498d2f2d4e2d2a8e4faa8c2fc8068966a6285919ea28e525e6a62a592905a5a665e6a52ab8a49629d5d6d602005304de7c3c000000",
        ],
        [
            "Date",
            "Wed, 30 Nov 2022 11:58:17 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "9d3d79109c7d732bb1529b768af1fa06",
            "Content-Encoding",
            "gzip",
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
            "7723690bafb49170-FRA",
        ],
    );

/**
 * Graphql default 'camelCase' naming convention
 */

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($id: uuid!) {\n      deletePostsByPk (id: $id) {\n    id, title\n  }\n    }",
        variables: { id: "bac2ef0a-899f-4694-84ef-b9c6fe4dc2b7" },
    })
    .reply(
        200,
        [
            "1f8b080000000000001315ca310ac0200c40d1bb64ae50445a75ec09bc42340948850e6629e2dd5b87bf3cfe0042458803881b2ba7a76bbfde742faa04113216cbb2a3f12188714770c63b16934339841d159b4fd840ab36fe77ec24ab8e2430e7fc009d078ee661000000",
        ],
        [
            "Date",
            "Wed, 30 Nov 2022 11:57:37 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "b9552b07bf02a0852ba560fef7fd64be",
            "Content-Encoding",
            "gzip",
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
            "7723680ded00bb9b-FRA",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($id: uuid!) {\n      deletePostsByPk (id: $id) {\n    id\n  }\n    }",
        variables: { id: "b19c9bd4-dff9-4ecf-acfe-aea2c4c9ec41" },
    })
    .reply(
        200,
        [
            "1f8b080000000000001315c8310a80300c05d0bb64cf50c912474fd02ba4c90f888243bb48e9ddc537be4961c3689f14b831509f3efaf1d6ebaf3368a756d4b58570642a0b3cd93cc106db5c5ce15268adf5017fe51a484a000000",
        ],
        [
            "Date",
            "Wed, 30 Nov 2022 11:58:17 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "9d3d79109c7d732bb1529b768af1fa06",
            "Content-Encoding",
            "gzip",
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
            "7723690bafb49170-FRA",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($id: Int!) {\n      deleteUsersByPk (id: $id) {\n    id, name\n  }\n    }",
        variables: { id: 1 },
    })
    .reply(
        200,
        [
            "1f8b0800000000000013ab564a492c4954b2aa564a49cd492d490d2d4e2d2a76aa0cc8060965a6285919ea28e525e6a62a592905a5a665e6a52ab8a49629d5d6d60200796635e439000000",
        ],
        [
            "Date",
            "Wed, 30 Nov 2022 11:58:17 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "9d3d79109c7d732bb1529b768af1fa06",
            "Content-Encoding",
            "gzip",
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
            "7723690bafb49170-FRA",
        ],
    );
