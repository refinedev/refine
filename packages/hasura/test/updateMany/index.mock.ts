import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: posts_bool_exp!, $_set: posts_set_input!) {\n  update_posts (where: $where, _set: $_set) {\n    returning { id, title, content }\n  }\n}",
        variables: {
            where: {
                id: {
                    _in: [
                        "487524fd-1160-45c8-a28d-717f78893c37",
                        "55c37980-05e5-45b3-8368-a2d8c2210436",
                    ],
                },
            },
            _set: { content: "Vel deserunt rerum et." },
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000403a58d4b0e83300c05af12794daa7c49e020dd545545135321d10405b342dcbd41ed0dbab2fd9e35b3431c68807e876da91b3e96bcd27ade05692b694a2f603dbbed3045e8c1786795192397b215dcd8e0f9a07ce44ebad179dfe9a01d344013cd58dfbfccc8c79cb9ac79c88930516dae38b3882b962d112b75bc19d2058e86fd4cd65654e70517166d353d35f7ba3d75d107a5a430bafdcb743f8ee303bd0e6cdafe000000",
        ],
        [
            "Date",
            "Tue, 19 Oct 2021 13:00:38 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "0c952a8e38c209c55da473e874af3fdc",
            "Content-Encoding",
            "gzip",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "CF-Cache-Status",
            "DYNAMIC",
            "Expect-CT",
            'max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"',
            "Server",
            "cloudflare",
            "CF-RAY",
            "6a0a30ba4c535481-IST",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: posts_bool_exp!, $_set: posts_set_input!) {\n  update_posts (where: $where, _set: $_set) {\n    returning { id }\n  }\n}",
        variables: {
            where: {
                id: {
                    _in: [
                        "487524fd-1160-45c8-a28d-717f78893c37",
                        "55c37980-05e5-45b3-8368-a2d8c2210436",
                    ],
                },
            },
            _set: { title: "updated-foo-1", content: "updated-bar-1" },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004032d8bcb0ac32010007f45f6dc055fab1b7f259462d5945cd2909893f8ef35d0db0ccc34c8b146080dae7d5079eddfb39eb71fa55ec7b66e1f1041cc0dd60c012c7bd276c9a8949368293146cd19bdf28b679e4c321efa43fc73a2e1134b945468e46f836cdcfd644e5a2b698d83feecbdff00f6692c0888000000",
        ],
        [
            "Date",
            "Tue, 19 Oct 2021 13:03:07 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "58639b0036af33e1a8fbb73cf73234fc",
            "Content-Encoding",
            "gzip",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "CF-Cache-Status",
            "DYNAMIC",
            "Expect-CT",
            'max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"',
            "Server",
            "cloudflare",
            "CF-RAY",
            "6a0a345b2cdd5488-IST",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: posts_bool_exp!, $_set: posts_set_input!) {\n  update_posts (where: $where, _set: $_set) {\n    returning { id }\n  }\n}",
        variables: {
            where: {
                id: {
                    _in: [
                        "487524fd-1160-45c8-a28d-717f78893c37",
                        "55c37980-05e5-45b3-8368-a2d8c2210436",
                    ],
                },
            },
            _set: { title: "updated-foo-1", content: "updated-bar-1" },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004032d8bcb0ac32010007f45f6dc055fab1b7f259462d5945cd2909893f8ef35d0db0ccc34c8b146080dae7d5079eddfb39eb71fa55ec7b66e1f1041cc0dd60c012c7bd276c9a8949368293146cd19bdf28b679e4c321efa43fc73a2e1134b945468e46f836cdcfd644e5a2b698d83feecbdff00f6692c0888000000",
        ],
        [
            "Date",
            "Wed, 20 Oct 2021 08:44:31 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "c977780342afaba2339bc77459d0c3b0",
            "Content-Encoding",
            "gzip",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "CF-Cache-Status",
            "DYNAMIC",
            "Expect-CT",
            'max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"',
            "Server",
            "cloudflare",
            "CF-RAY",
            "6a10f6e91c5d5482-IST",
        ],
    );
