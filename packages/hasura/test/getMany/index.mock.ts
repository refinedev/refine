import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($where: posts_bool_exp) { posts (where: $where) { id, title, content, category { id } } }",
        variables: {
            where: {
                id: {
                    _in: [
                        "c82c71c5-0f0b-4042-b9a3-db977fe28a83",
                        "bac2ef0a-899f-4694-84ef-b9c6fe4dc2b7",
                    ],
                },
            },
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000403a58ec16ac33010447fa5ec390bf64ab625ff4ae961b5ab0d8112974a048af1bf574a7b08b9e630979981f77650ae0ceb0e5f5ba905d6f71d2e0a2b482059469970b021a11f3c618aec50535c16cb1438383841bdd4cfdceeac5258b9b44ab66bcdd7dacb72e3a2f7f49e6b3e6fdf3f1d764704e7484617d0911b1b62568cf334e1e82868d6a893111cc7e9edff9f5828dbc0186234f473f4187cb6e625b365af426979542a6a0d6fcdcb9eb4fe863ef6bce0f6711cbf6bf7458542010000",
        ],
        [
            "Date",
            "Tue, 19 Oct 2021 09:50:48 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "2628739d5b0c353f41344c9836ae33f6",
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
            "6a091aa7e8675488-IST",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($where: PostsBoolExp) { posts (where: $where) { id, title, content, category { id } } }",
        variables: {
            where: {
                id: {
                    _in: [
                        "c82c71c5-0f0b-4042-b9a3-db977fe28a83",
                        "bac2ef0a-899f-4694-84ef-b9c6fe4dc2b7",
                    ],
                },
            },
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000403a58ec16ac33010447fa5ec390bf64ab625ff4ae961b5ab0d8112974a048af1bf574a7b08b9e630979981f77650ae0ceb0e5f5ba905d6f71d2e0a2b482059469970b021a11f3c618aec50535c16cb1438383841bdd4cfdceeac5258b9b44ab66bcdd7dacb72e3a2f7f49e6b3e6fdf3f1d764704e7484617d0911b1b62568cf334e1e82868d6a893111cc7e9edff9f5828dbc0186234f473f4187cb6e625b365af426979542a6a0d6fcdcb9eb4fe863ef6bce0f6711cbf6bf7458542010000",
        ],
        [
            "Date",
            "Tue, 19 Oct 2021 09:50:48 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "2628739d5b0c353f41344c9836ae33f6",
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
            "6a091aa7e8675488-IST",
        ],
    );
