import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($pk_columns: posts_pk_columns_input!, $_set: posts_set_input!) {\n      update_posts_by_pk (pk_columns: $pk_columns, _set: $_set) {\n    id, title, content, category { id }\n  }\n    }",
        variables: {
            pk_columns: { id: "6379bbda-0857-40f2-a277-b401ea6134d7" },
            _set: {
                title: "Updated Title",
                content: "Updated Content",
                category_id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000000034c8d4b0ac2401005af22bd4ec364321f93ad57d075e899ee48504c30ed2284b9bb18445c5615bcb7019312741bbc6626957e9e165dfab4f6f3ed6347860e4213db9498d01c7d4467068b6463c4e44c2d14eac671840a74d4bb4007977d890fe79d2bc8d343e5a17fe5f435156452b94ecff5f765c4e49672464f2ce82c37984c261c62b03e78b14e0628a59437000000ffff03004035cbedba000000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 11:43:11 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "ef5fb2f9957e00c703aaf4ec589d3f61",
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
            "7f168a8cbfba92d2-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($pk_columns: posts_pk_columns_input!, $_set: posts_set_input!) {\n      update_posts_by_pk (pk_columns: $pk_columns, _set: $_set) {\n    id\n  }\n    }",
        variables: {
            pk_columns: { id: "6379bbda-0857-40f2-a277-b401ea6134d7" },
            _set: { title: "E-business alarm" },
        },
    })
    .reply(
        200,
        [
            "1f8b080000000000000314c83b0a80300c00d0bb640ff41fed654a422a888385d6414aef2ebef14d501e0c79c2d394472dedeea317794bbbfe3d1532244fbb88329a2d12067338644784128cad9cac0f4ab0d6fa000000ffff0300c02025704d000000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 11:43:12 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "0ae5352e56364b26d02e2af5f2463e18",
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
            "7f168a90e86492cb-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($pkColumns: PostsPkColumnsInput!, $_set: PostsSetInput!) {\n      updatePostsByPk (pkColumns: $pkColumns, _set: $_set) {\n    id, title, content, category { id }\n  }\n    }",
        variables: {
            pkColumns: { id: "c7ba5e30-8c5f-46bb-862d-e2bcf6487749" },
            _set: {
                title: "Updated Title",
                content: "Updated Content",
                categoryId: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000000034c8d4b0ac2401005af22bd4ec330994f92a55e200b3d404f4f47829288691721ccddc520e2b2aae0bd0d322941b7c1eb9149a59f175d8e6b7ffba83143071c1379a90d36ec077421256c82cd2836f1105c13a36ba1021df52ed0c1659fc987f3ce15f03ca94cfa574e5f530193ca757eaebf2f23865b62464f59d0d95c63324c38c4607df0629d0c504a296f000000ffff03000fb7c7cfb7000000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 11:43:14 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "cdc30f34315759c3b9cab48cb9adce2d",
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
            "7f168a9a29fb92d8-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($pkColumns: PostsPkColumnsInput!, $_set: PostsSetInput!) {\n      updatePostsByPk (pkColumns: $pkColumns, _set: $_set) {\n    id\n  }\n    }",
        variables: {
            pkColumns: { id: "c7ba5e30-8c5f-46bb-862d-e2bcf6487749" },
            _set: { title: "E-business alarm" },
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000003aa564a492c4954b2aa562a2d48492c490dc82f2e2976aa0cc8060965a6285929259b27259aa61a1be85a249ba6e99a982525e95a9819a5e8a61a2525a7999958989b9b582ad5d6d602000000ffff030036bc558d4a000000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 11:43:14 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "58c7f4f55a12db6be774f316e5dffea7",
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
            "7f168aa15e4a92db-IST",
            "Content-Encoding",
            "gzip",
        ],
    );
