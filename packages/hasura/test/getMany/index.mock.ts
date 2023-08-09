import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($where: posts_bool_exp) { posts (where: $where) { id, title, content, category { id } } }",
        variables: {
            where: {
                id: {
                    _in: [
                        "6379bbda-0857-40f2-a277-b401ea6134d7",
                        "c7ba5e30-8c5f-46bb-862d-e2bcf6487749",
                    ],
                },
            },
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000003a4cf314ec4301040d1ab8ca65ea3ace3d849ba2db8020da2183b13b0e438d9788c40abdc1d2da2809afe17efdf7022211c6fb8ad450a8ecf378c138e685b37783f916aface29d3cc5a91764e79d39c99ecb93593c3134a94c438e2853353869a648f217281bc6648d1f3be428902b4b0c0c62971162ed7ca78c2b066e12c38e2131789bea6bac07b4d5b151286425be40cb487fa70af49f875dd3fefd66f216b77ee6c68d5300cbd32ad99959f3aafb46f5caffb769eb5c5e338c14f1f9ca78edb46f5a19b95b1deabdeea49b1f661b6a677ce0cbf8e1e25d20212738853cd02fc0155806a907587996a88be963f179714af9516c8d1bf01ef24ff61bf1cc717000000ffff0300a6cf5e269c010000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 09:14:00 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "3e6d706a744081738a5e57508e8a6d89",
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
            "7f15b00099d3548e-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($where: PostsBoolExp) { posts (where: $where) { id, title, content, category { id } } }",
        variables: {
            where: {
                id: {
                    _in: [
                        "4ef4ba41-92d5-4d1f-b1a5-fc91c9a08284",
                        "4040c05e-c4c8-4314-aafd-0baf3faae354",
                    ],
                },
            },
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000003a4cf3d4ec4301040e1ab8ca65ea3fc38bb49ba2db8020da2183b6318c971b2f11881a2dc1d2d1212d4f4aff8de8e1329e1b8e3ba64cd383eef28138e68395847b636433375c64e7530aea6ce043fd47ea0aa6f7a8b2754d1c838e2951353821275132f9c212d09a238de16c8a240332bac1c2327e57c2b8c27f44b524e8a233e715671259619de4b5c8b9232645a8513d0e6cbc3bd26e5d765fbbc5bbf85dc5ceaeeec5b330c436f6c6b837153e74ce3aa4bdff46d08cd198fe3043f4795ad7cd5b1f1d6dffbda1aa23099ca51680311b7ddefa347159a412579994a52e00f280a54bc2e1b042a5e5cc97f2eae516e856648e2de8037d2ffb05f8ee30b0000ffff03002e99e3b89c010000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 09:14:01 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "970eb0a9904fc37ae6a9efb0841ce742",
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
            "7f15b0077d2092cb-IST",
            "Content-Encoding",
            "gzip",
        ],
    );
