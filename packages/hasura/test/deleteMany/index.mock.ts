import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: posts_bool_exp!) {\n  delete_posts (where: $where) {\n    returning { id, title }\n  }\n}",
        variables: {
            where: {
                id: {
                    _in: [
                        "bb5e4a56-504d-4561-ad8c-fd8198e2e32a",
                        "823a7094-1d5b-4404-80f4-575a99a69280",
                    ],
                },
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004034dccb10ac2301080e15709371b48dba426dd44101ddcdc44e4da3b6db0a6d2a453c9bbabe0e0f8c3cfb70061426816201e38f1f535c614bf3d719aa7e0c31d4423ce0b788206dad6b046534ba334496dea4222d94edec816ce72c95589b082e4d3c09ffd84edc0e210688e69f238886dcfdde3638a4dd78d73489057e247dbb2c2b5725a16645aa9b5d2d2aa9b96666dd039ac5d69d51fbdc7404f2416c7718e2c7613c71ef225e7fc06cb1cc585d3000000",
        ],
        [
            "Date",
            "Tue, 19 Oct 2021 07:18:33 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "091c8b47e209327db366451110a09235",
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
            "6a083ba0fe30548e-IST",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: posts_bool_exp!) {\n  delete_posts (where: $where) {\n    returning { id }\n  }\n}",
        variables: {
            where: {
                id: {
                    _in: [
                        "72182c50-32e5-40bb-b259-67d49c2530ec",
                        "86f4a3b3-a328-4fa5-9d7e-f06a35e3635f",
                    ],
                },
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004032dca4b0ac2301000d0ab84593b1033997c7a952292cf440a52a58dab90bb8be0f2c11b50534fb00ca8f2942ef7f7ebece7cf87f4cfb16ffb03d4a2d6015b8505bcb9065358231961b43a67cc86233a5f6d2c86494b817951ff1e5cb38932612213d0b6c418ab176cda25622147dc60dee69c5fe1b4813c88000000",
        ],
        [
            "Date",
            "Tue, 19 Oct 2021 07:25:56 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "f7c2ba8cf6681e97ce261da9c0f36d0c",
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
            "6a084670eedb548e-IST",
        ],
    );
