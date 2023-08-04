import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: posts_bool_exp!) {\n      delete_posts (where: $where) {\n    returning { id, title }\n  }\n    }",
        variables: {
            where: {
                id: {
                    _in: [
                        "9848cac2-80d7-4846-9a73-2f312459929a",
                        "a5bbd909-9bc5-486d-be07-ece9c17523f9",
                    ],
                },
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000000034ccc4b0a83301000d0ab84591bd09868c6ab945226c95802d6da7c5692bb17a18b2edfe69d10a8102c2704deb8f0e378e7922f272e35ed717f8258c4ed84186001b4da7af24ada3ecc525b3d49a479946a1d07a50da242820e4a2c1bc3029f4a2f516a3a621614e211b3bfc2d689df47c6b9803d4a74de486da7201df7b364cfe887d9a871c5bf8fabc87444de85af29d70cedde5afb020000ffff0300025a53bac4000000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 08:58:16 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "f4f3a142188815f203b241ec952323f3",
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
            "7f1598f4ca3492d8-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: posts_bool_exp!) {\n      delete_posts (where: $where) {\n    returning { id }\n  }\n    }",
        variables: {
            where: {
                id: {
                    _in: [
                        "54d9f65c-592a-4a0a-9743-4b6761030853",
                        "b97c56d0-83b1-483f-bbcc-45305c6340a4",
                    ],
                },
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000000032cca4b0ac2400c00d0ab94ac0da42699df558ac8fc2a05a9d28eab61ee2e82cb07af43892d42e850eab3b67a7fbfce76fe7cd4f639f66d7fc014a6a5c35620804af1abd18ceaaf112552446f855192b1662626a70ce332fd7bf236ab29848ed38ce278c59472465126cd8685a2c0b88d31be000000ffff0300a34cfbeb88000000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 08:58:17 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "02fbba97893224b22d915be23c59395e",
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
            "7f1598fd9b8f92db-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: PostsBoolExp!) {\n      deletePosts (where: $where) {\n    returning { id, title }\n  }\n    }",
        variables: {
            where: {
                id: {
                    _in: [
                        "b8e8c884-d169-44ce-9fb1-118256a64181",
                        "522d566a-a25d-4339-952d-bd95a3fe9f80",
                    ],
                },
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000000034cccb16ec3201000d05f39dd1ca4800181bf227bd5e16cce111121a939bc58fc7b55a943c6b7bc131309e17c62e2c2c2b75793f6c79da5ef35d73bc20c5f27e684332e81c31a825549fba8ac5d59c56dd14aeb609c276f75d07841c95218673cf241cfdee0e02679e9a53fa1d13d8be486e302ffa9332639ef49917149d9698a2a3a93d492a2a369e3b885eb475af9a733347a67aef02eb4f24e025485a1f652081ebdc90bc7f718e3170000ffff030004333c35de000000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 08:58:19 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "57b3798dbb5fe61bda0ac0b12f416a3d",
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
            "7f1599062921548e-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: PostsBoolExp!) {\n      deletePosts (where: $where) {\n    returning { id }\n  }\n    }",
        variables: {
            where: {
                id: {
                    _in: [
                        "f79a1033-62f3-4551-b9b4-4bd40ba4b51b",
                        "bc86c10a-d807-4196-9fc3-af5619e4228a",
                    ],
                },
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000000032cca3b0ac3300c00d0ab18cd15f8233b764ed1bd7490fc29819242e24cc6772f858e0fde80c29d611d50eabbf67aff9cfdfcf1a8fd3af66d7f815ad563c0566085b62436da390cb63924ef0d4a124292425a98c41b817953ff2e39866c3463897a413229606ad921371f4caa646d6498cf39e7170000ffff0300e2e9682887000000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 08:58:19 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "0b215a0b932d25d8b02224f7fb35ae92",
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
            "7f15990f6f4192cf-IST",
            "Content-Encoding",
            "gzip",
        ],
    );
