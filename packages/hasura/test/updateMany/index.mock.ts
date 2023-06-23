import nock from "nock";

/**
 * Hasura default 'snake_case' naming convention
 */

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: posts_bool_exp!, $_set: posts_set_input!) {\n      update_posts (where: $where, _set: $_set) {\n    returning { id, title, content }\n  }\n    }",
        variables: {
            where: {
                id: {
                    _in: [
                        "8f11b716-1d5a-4b56-831f-7aaf8c6ce36c",
                        "92345710-b197-49ed-a00f-f52b32536acc",
                    ],
                },
            },
            _set: { content: "Vel deserunt rerum et." },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004038d8d316ec3300c45af22708e0acbb224db5b7a840e5d8aa0a0252a15922881444f86ef1e05e8d0b1c3073ff108be0d0232c2bcc1fa688dbe1ff7caf5b517e2b5e494cf2066f1b5410a30c318955a9cb252058372588c95a356513ac4387aeb495b0f07e0c4576ae758437ca56288c3d837e2ef992973639f7415812a9535b3286ddc04f11bec07f1eb9a7a3d18a73ab9a8c9c961a220b1eba28ca65f746fb445ffd7753cb7bfe29dcaa5fea442e263ad9cbc9becbfaca77ddf9fec0c2fd20c010000",
        ],
        [
            "Date",
            "Wed, 30 Nov 2022 12:04:29 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "1da3c37bb1c2ae89726087499a30bd5d",
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
            "7723721b298f9b83-FRA",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: posts_bool_exp!, $_set: posts_set_input!) {\n      update_posts (where: $where, _set: $_set) {\n    returning { id }\n  }\n    }",
        variables: {
            where: {
                id: {
                    _in: [
                        "8f11b716-1d5a-4b56-831f-7aaf8c6ce36c",
                        "92345710-b197-49ed-a00f-f52b32536acc",
                    ],
                },
            },
            _set: { title: "updated-foo-1", content: "updated-bar-1" },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004032dcacb0a83301040d15f915977209377fc152965f22a6eac685c85fc7b2d74772f9c0e991bc3dce1daef2aaffd73b6f3f74769d7b1addb1ba6795a3aac1966f095283ab248d930ea682c7a45151d73f5c9a6a26c82f198fe3c48a58d23819182431d4a4616a26235322a6994e574f3e718e30b5ed7ec1888000000",
        ],
        [
            "Date",
            "Wed, 30 Nov 2022 12:05:01 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "cfb64f6437b9a814808f2634cba17359",
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
            "772372e36fe0bb7a-FRA",
        ],
    );

/**
 * Graphql default 'camelCase' naming convention
 */

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: PostsBoolExp!, $_set: PostsSetInput!) {\n      updatePosts (where: $where, _set: $_set) {\n    returning { id, title, content }\n  }\n    }",
        variables: {
            where: {
                id: {
                    _in: [
                        "8f11b716-1d5a-4b56-831f-7aaf8c6ce36c",
                        "92345710-b197-49ed-a00f-f52b32536acc",
                    ],
                },
            },
            _set: { content: "Vel deserunt rerum et." },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000000138d8d316ec3300c45af22708e0acbb224db5b7b82a04397a0032d5189d05409247a327cf72840878e193ef88947f06d109011e60dd67b6b74bc55aecfb510af25a77c06318bd30629c00c63546a71ca4a150cca6131568e5a45e910e3e8ad276d3d1c80135fa99d630df1998a210e63df88bf65a6cc8d7dd15504aa54d6cca2b4f12b88df603f883fd7d4ebc138d5c9454d4e0e1305895d176534fda27ba32dfaffaef773fb2b3ea8fcd44b2a243ed7cac9bbc9be64fddef7fd016361bf2a0b010000",
        ],
        [
            "Date",
            "Wed, 30 Nov 2022 12:04:29 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "1da3c37bb1c2ae89726087499a30bd5d",
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
            "7723721b298f9b83-FRA",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: PostsBoolExp!, $_set: PostsSetInput!) {\n      updatePosts (where: $where, _set: $_set) {\n    returning { id }\n  }\n    }",
        variables: {
            where: {
                id: {
                    _in: [
                        "8f11b716-1d5a-4b56-831f-7aaf8c6ce36c",
                        "92345710-b197-49ed-a00f-f52b32536acc",
                    ],
                },
            },
            _set: { title: "updated-foo-1", content: "updated-bar-1" },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000000132dca390ac3301040d1ab88a933a0d12e9f227d4831da821b27d8722574f73890ee7f78030a778665c0f9b9aadedf473f7ebbd77eeedbbabd402ce231602db0406844c993432a96d124eb30686ae8995bc82e57ed32cc9bf8f3a8b4b19e24268a1e4dac0559ca86cdaaa495d58ef3c59f73ce2fc41d5fa28700000",
        ],
        [
            "Date",
            "Wed, 30 Nov 2022 12:05:01 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "cfb64f6437b9a814808f2634cba17359",
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
            "772372e36fe0bb7a-FRA",
        ],
    );
