import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query  { posts_aggregate  { aggregate  { count } } }",
        variables: {},
    })
    .reply(
        200,
        [
            "1f8b0800000000000403ab564a492c4954b2aa562ac82f2e298e4f4c4f2f4a4d4f2c49050921380a560ad54ac9f9a579254a40a6b1492d100000e650fda43b000000",
        ],
        [
            "Date",
            "Thu, 21 Oct 2021 06:50:25 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "30a1563d24685d59b6651dbb6e8b9270",
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
            "6a188d2dbda3548e-IST",
        ],
    );
