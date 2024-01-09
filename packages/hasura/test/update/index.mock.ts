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

// correct response with hasura-default & gqlQuery
nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation UpdatePost($id: uuid!, $object: posts_set_input!) {\n  update_posts_by_pk(pk_columns: {id: $id}, _set: $object) {\n    id\n    title\n    content\n    category_id\n    category {\n      id\n      title\n    }\n  }\n}\n",
        variables: {
            id: "6379bbda-0857-40f2-a277-b401ea6134d7",
            object: {
                title: "Updated Title",
                content: "Updated Content",
                category_id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
            },
        },
        operationName: "UpdatePost",
    })
    .reply(
        200,
        [
            "1f8b08000000000000038c4e4b0e823014bc8a796b9a94d28fb0f50aba6e5edb87120d25501684f4ee46a284a5b39b99cc67858009a159611e0226b2439cd264dd6287e747ed0234a02b533b1790f1b3324cf2563014c630277949a8cb4a060305a42ebd081ab86d4de174dd78013ef689fa74702e5fa5008f89ee715cec36c489fb1abd670a03312942c51cf7c85aa385d28a84a4f610da0ffe99fb1dc41de323f67e9e20e79cdf000000ffff0300513c9a2d0b010000",
        ],
        [
            "Date",
            "Tue, 09 Jan 2024 09:18:54 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "1ae161f126fcff7333e5d48df15d7ef5",
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
            "842b98712c4168bc-BUD",
            "Content-Encoding",
            "gzip",
        ],
    );

// correct response with hasura-default & gqlMutation
nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation UpdatePost($id: uuid!, $object: posts_set_input!) {\n  update_posts_by_pk(pk_columns: {id: $id}, _set: $object) {\n    id\n    title\n    content\n    category_id\n    category {\n      id\n      title\n    }\n  }\n}\n",
        variables: {
            id: "6379bbda-0857-40f2-a277-b401ea6134d7",
            object: {
                title: "Updated Title",
                content: "Updated Content",
                category_id: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
            },
        },
        operationName: "UpdatePost",
    })
    .reply(
        200,
        [
            "1f8b08000000000000038c4e4b0e823014bc8a796b9a94d28fb0f50aba6e5edb87120d25501684f4ee46a284a5b39b99cc67858009a159611e0226b2439cd264dd6287e747ed0234a02b533b1790f1b3324cf2563014c630277949a8cb4a060305a42ebd081ab86d4de174dd78013ef689fa74702e5fa5008f89ee715cec36c489fb1abd670a03312942c51cf7c85aa385d28a84a4f610da0ffe99fb1dc41de323f67e9e20e79cdf000000ffff0300513c9a2d0b010000",
        ],
        [
            "Date",
            "Tue, 09 Jan 2024 09:18:56 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "e64ce6e484fe64509628e15c95d93cff",
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
            "842b987a6eaf6846-BUD",
            "Content-Encoding",
            "gzip",
        ],
    );

// correct response with graphql-default & gqlQuery
nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation UpdatePost($id: uuid!, $object: PostsSetInput!) {\n  updatePostsByPk(pkColumns: {id: $id}, _set: $object) {\n    id\n    title\n    content\n    categoryId\n    category {\n      id\n      title\n    }\n  }\n}\n",
        variables: {
            id: "c7ba5e30-8c5f-46bb-862d-e2bcf6487749",
            object: {
                title: "Updated Title",
                content: "Updated Content",
                categoryId: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
            },
        },
        operationName: "UpdatePost",
    })
    .reply(
        200,
        [
            "1f8b08000000000000038c4ecb0e823010fc15b3679a90da96c7514fde38e8076cb75b251a6aa01c08e9bf1b88128ece6d66328f191c46847a86f1ed30721386389ca6e6b948ad831aa8b0a8f9988b92b417ca582b4a239d6069c91b551685aa2083d8c617430db7b5c61dae2bcf804217b98b3be7fc5532208c7c0ffd74597672cea94222a1d1b150d21d85cd09852f8cd446b354ec7799eddf9fb9df3fdcd03f4247e30029a5f4010000ffff03006fffa05907010000",
        ],
        [
            "Date",
            "Tue, 09 Jan 2024 09:24:17 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "56350d0aa6adca97f27ed8a4d600b235",
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
            "842ba057e8ff733a-BUD",
            "Content-Encoding",
            "gzip",
        ],
    );

// correct response with graphql-default & gqlMutation
nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation UpdatePost($id: uuid!, $object: PostsSetInput!) {\n  updatePostsByPk(pkColumns: {id: $id}, _set: $object) {\n    id\n    title\n    content\n    categoryId\n    category {\n      id\n      title\n    }\n  }\n}\n",
        variables: {
            id: "c7ba5e30-8c5f-46bb-862d-e2bcf6487749",
            object: {
                title: "Updated Title",
                content: "Updated Content",
                categoryId: "0e0c9acc-5ade-42d3-b0ca-f762565e24ef",
            },
        },
        operationName: "UpdatePost",
    })
    .reply(
        200,
        [
            "1f8b08000000000000038c4ecb0e823010fc15b3679a90da96c7514fde38e8076cb75b251a6aa01c08e9bf1b88128ece6d66328f191c46847a86f1ed30721386389ca6e6b948ad831aa8b0a8f9988b92b417ca582b4a239d6069c91b551685aa2083d8c617430db7b5c61dae2bcf804217b98b3be7fc5532208c7c0ffd74597672cea94222a1d1b150d21d85cd09852f8cd446b354ec7799eddf9fb9df3fdcd03f4247e30029a5f4010000ffff03006fffa05907010000",
        ],
        [
            "Date",
            "Tue, 09 Jan 2024 09:24:18 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "2977f3a240031d7b442e904c12427bc1",
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
            "842ba05d5eafc1c1-BUD",
            "Content-Encoding",
            "gzip",
        ],
    );
