import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($objects: [posts_insert_input!]!) {\n      insert_posts (objects: $objects) {\n    returning { id, title, content, category { id } }\n  }\n    }",
        variables: {
            objects: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
                },
            ],
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000003a48fbb4ec43010007f65b5f5195dde71ba2bf8051a84d0dad91c2b39ce9dbd46a053fe1d1da2809a72a429666e3893124e37949839e9eb65cb9aef9c584b8a12cf08133cdf50669cb0ebadb7553518769e4ccbb637b6e3c18c7674d671d337e3820754d1c038e18923538412348917ce10b708411ca70db228d0ca0a170e81a372be16c603fa2d2a47c5099f38abb812ca0aef255c8a923264ba0847a0e4cbc3dd26e5f3963ebf0fee855c0f55d7fbc6586b47d336ed62dcdc3953bbe330d663b32c758ffb7e801fdf7755d5f6cdd15877f4a66d9d3396e6ce3403d3dcd9aea2defd3a7a54a11554a297b94405fe80a240c5eb9660a1e2c595fce7e214e45a688528ee0d3891fe27fb65dff72f000000ffff03006eefabf5b3010000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 12:15:26 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "eb47a844c2d283f88a588d8f1c7129ef",
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
            "7f16b9c7dca7548d-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($objects: [posts_insert_input!]!) {\n      insert_posts (objects: $objects) {\n    returning { id, title }\n  }\n    }",
        variables: {
            objects: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
                },
            ],
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000000034ccd4b6a03310c00d0ab08ad637062cf309e5d173d4529c51fa5081c4d6acb50187cf752e8a2cbb77a2796a811f713593a35fd781e5dfbaf1be968c2f289b0c3db895c70c714b35b722826932bc65b0a26dc72318bbbba6db1217b4b784165ad843bbe90501418551b67a60e7208544ed40ee8ac101fa4f0a45a4994fad7209c17f8ab56bb96e4d3d594e083f1c991d9b6cd99c5c598576f6ff65efe55afcaf101ca92b90c51a06f180a71643d1adce3c89c46c7f93ee7fc010000ffff030035378e38f4000000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 12:15:27 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "ee0512a4bc7d5909589e2d36e813ee07",
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
            "7f16b9d018df5488-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($objects: [PostsInsertInput!]!) {\n      insertPosts (objects: $objects) {\n    returning { id, title, content, category { id } }\n  }\n    }",
        variables: {
            objects: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    categoryId: "e27156c3-9998-434f-bd5b-2b078283ff26",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    categoryId: "e27156c3-9998-434f-bd5b-2b078283ff26",
                },
            ],
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000003a48f3d4fc3301040ffcae9e61a35df71b60eec4c2c88e16c5fca4989d3da6704aaf2df511103cc8c4f7ac37b370ca484d30d25664efab465cd774cac2545896784095e6e280127ecfc7c742ed4a6b2159bd6d7c1d0406442cf55e8471a4368f0802aba304e78e2c814a12c9ac40b67885b84451ca70db228d0ca0a175e168ecaf95a180fe8b7a81c15277ce6ace2ca5256782fcba5282943a68b70044abe3cdc6d523e6fe9f37be05ec8f55075bd6f8cb576346dd3cec685ce99da1d87b11e9b79ae7bdcf703fcf89eb8b1f5d1193b56d6b4be77c6ce4363daa3efc6dece8179f875f4a8422ba8442fa14405fe80a240c5eb9660a6e2c595fce7e2b4c8b5d00a51dc1b7022fd4ff6ebbeef5f000000ffff030068593c32b2010000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 12:15:28 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "2eae16760eeea7cf4422782316e250e6",
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
            "7f16b9d47d0f548d-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($objects: [PostsInsertInput!]!) {\n      insertPosts (objects: $objects) {\n    returning { id, title }\n  }\n    }",
        variables: {
            objects: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    categoryId: "e27156c3-9998-434f-bd5b-2b078283ff26",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    categoryId: "e27156c3-9998-434f-bd5b-2b078283ff26",
                },
            ],
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000000034ccdb16ac4300c00d05f119acfe0e49238c9d6a17bf7d241b6e522f039575b8642c8bf9742878e6f7a274652c2fd44298dabbe1d4ddb2f2b6baf45ca27c20eef274ac41da794c266793296039b292ec9908bab218a6e1eee6eb333e10d553433eef8c285a940cf5a2508372847812c9eeb014d14e8c10a4fce998b72fbea8cd70dfe2a3fc461f263303c4636931f935987b09899ad5d5c0ceebeadffaa57157a804a09127b51e06fe80ad4831e1512f520be37bc3eaeebfa010000ffff0300b802a3e8f3000000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 12:15:28 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "2e940da4e2477a5bdb8d3e811965ebc5",
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
            "7f16b9d99e0b92dd-IST",
            "Content-Encoding",
            "gzip",
        ],
    );
