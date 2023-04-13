import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($object: posts_insert_input!) {\n      insert_posts_one (object: $object) {\n    id, title, content, category { id }\n  }\n    }",
        variables: {
            object: {
                content: "Lorem ipsum dolor sit amet.",
                title: "Lorem ipsum dolore",
                category_id: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004036d4d4b0ec22010bd0a99b5189a029d7a06efd08c3035242d34655c98c6bb8b2e5cf956ef9b77402421b81c9072e55da6ad54a953c9fcf5225cc00463acf541233aa76dd7198dde053d52b444683bf4039c40922c6d04d7b2f3aad2561fab8a6569aa85a164e12cff625593285a59ce9f1e09dfcbfefc9df7dd10981ceb99e75e5b74a8d1d8c6ece8d9856176748357c31b337f058bc9000000",
        ],
        [
            "Date",
            "Wed, 30 Nov 2022 11:46:47 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "adcdc620a8682f56fbcf3734dffe8ab5",
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
            "7723582dfc039090-FRA",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($object: PostsInsertInput!) {\n      insertPostsOne (object: $object) {\n    id, title, content, category { id }\n  }\n    }",
        variables: {
            object: {
                content: "Lorem ipsum dolor sit amet.",
                title: "Lorem ipsum dolore",
                categoryId: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004036d4d4b0ec22010bd0a99b5189a029d7a06efd08c3035242d34655c98c6bb8b2e5cf956ef9b77402421b81c9072e55da6ad54a953c9fcf5225cc00463acf541233aa76dd7198dde053d52b444683bf4039c40922c6d04d7b2f3aad2561fab8a6569aa85a164e12cff625593285a59ce9f1e09dfcbfefc9df7dd10981ceb99e75e5b74a8d1d8c6ece8d9856176748357c31b337f058bc9000000",
        ],
        [
            "Date",
            "Wed, 30 Nov 2022 11:46:47 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "adcdc620a8682f56fbcf3734dffe8ab5",
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
            "7723582dfc039090-FRA",
        ],
    );
