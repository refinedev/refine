import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: posts_bool_exp!, $_set: posts_set_input!) {\n      update_posts (where: $where, _set: $_set) {\n    returning { id, title, content }\n  }\n    }",
        variables: {
            where: {
                id: {
                    _in: [
                        "cf43a199-e791-4b81-a1fd-3ccf8e7f6166",
                        "9cd924d2-de3b-479a-9882-23feeb0fd80f",
                    ],
                },
            },
            _set: { content: "Updated Content" },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000000037ccd314ec4301040d1ab5853c7d23a8912db2d67a042084d3c6318c9c986784c13e5ee08b40515e5ffcd3b815011e2096d27547edbef55eb4f1facedd8647b0713cdcb09421021e571401782e539383b2ede597499ec9052f63ce7c94d1374a0a28521c21717512364f68355da6a04532b52a18374df94378508cfbf3099a7c7b93af3d042a2d08fd45be261b1e31cd006ef7bdb0f9979b965f2b7fc47fbc045146b65b31754464392b4ad550d16f96cb8fecfbe5ed7f50d0000ffff03001be7af870f010000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 11:58:51 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "b0ee6891391e1be0fe8219086b4d8ef9",
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
            "7f16a17e7bc492d8-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: posts_bool_exp!, $_set: posts_set_input!) {\n      update_posts (where: $where, _set: $_set) {\n    returning { id }\n  }\n    }",
        variables: {
            where: {
                id: {
                    _in: [
                        "e890344b-d7b6-4793-b375-b3c2a7f6deea",
                        "3be19a24-ecee-42d9-949b-5f41623b9b5a",
                    ],
                },
            },
            _set: {
                title: "Multiple Updated Title",
                content: "Multiple Updated Content",
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000000032ccac10a83300c00d05f29392f30dbb45dfc151923b1717871a2f554faef63b0e383d7a04815181b5c7b916aaffd73d6f3e7c3ea756cebf60637baa9c15a60047bf03d102996ac092973400d39a286d94b5e523113e837f7ef416d60f184369b21f9c2c8c48a71a121f9a0ac51a03f7bef5f000000ffff030019b8b4ef88000000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 11:58:53 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "866d14bb05a952acaf0380847da6e977",
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
            "7f16a187db3792cb-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: PostsBoolExp!, $_set: PostsSetInput!) {\n      updatePosts (where: $where, _set: $_set) {\n    returning { id, title, content }\n  }\n    }",
        variables: {
            where: {
                id: {
                    _in: [
                        "9fb231b7-a2e6-4602-85a4-7ddab73cd05e",
                        "48a5591e-4ab0-45f8-950e-aee8a63769df",
                    ],
                },
            },
            _set: { content: "Updated Content" },
        },
    })
    .reply(
        200,
        [
            "1f8b080000000000000384cd3d6e84301040e1ab8ca6c6120b363f6ef702dba48a520c785859823132e33488bb47596d912ee57bcd77622025f427963d90f2231d7afc66662d59a23c113c7c9e18037a1c97a9696f536fa8e1ced8ae6ecce0c89a3e049afa760eb563ac50a3ae8c1e798d0a7b4e51208a720e65838d4a8e074812ac704ea22c8a1e3f5e7a80fbfb5c15bc4d3b9073e38d8da5a936d62d83195dcd869807eadabe1bc3f2c7fc7ea15c800f8539c9b330f0ca1b8b960de23fead7755d3f000000ffff0300283fd15813010000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 11:58:55 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "72722ff32a07a55fe1bad2296e07ed95",
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
            "7f16a1915ad592db-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: PostsBoolExp!, $_set: PostsSetInput!) {\n      updatePosts (where: $where, _set: $_set) {\n    returning { id }\n  }\n    }",
        variables: {
            where: {
                id: {
                    _in: [
                        "7086ba36-9746-4f0a-90a1-96d93056d706",
                        "d682533d-9abe-4dcb-bfa5-801acd0ef5ab",
                    ],
                },
            },
            _set: {
                title: "Multiple Updated Title",
                content: "Multiple Updated Content",
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000000032ccac10ac3200c00d05f919c1748a746ed57f43e76888d8e5ebad1da93f8ef63b0e383d741a509cc1dae8f4a2bcbfb6ce78f4769d7b16ffb0bcc6c1e1d3685190245ce621953708cae9260229930b1264b9e3510c3b8997f578e776fad62925cd0e99a3157f118699255a9542f19c6738cf1050000ffff0300d632bf4d87000000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 11:58:55 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "59b1b5a82e3562c5cd628ebafdbb7904",
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
            "7f16a19ab94692d2-IST",
            "Content-Encoding",
            "gzip",
        ],
    );
