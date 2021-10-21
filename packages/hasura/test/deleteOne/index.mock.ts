import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($id: uuid!) {\n  delete_posts_by_pk (id: $id) {\n    id, title\n  }\n}",
        variables: { id: "52218781-f240-48d3-8407-fca1d163d3ce" },
    })
    .reply(
        200,
        [
            "1f8b080000000000040315ca4b0ac3201000d0ab845977207eda486e50c81dc438932215953a5d94e0dddb6e1fef040a12603d8138b3b06fb54bf7fbc7b7e75f13c10a57ad955b9cc243db19ad2383cece0b1e312852374326325c409264fef57b91501e69cf3cd5c6057b7dbf224f5b8a5c3a138c31beec58762277000000",
        ],
        [
            "Date",
            "Tue, 19 Oct 2021 07:41:08 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "fbb3478e27c22d0723c2aa3f2428ce6b",
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
            "6a085cb03d565488-IST",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($id: uuid!) {\n  delete_posts_by_pk (id: $id) {\n    id\n  }\n}",
        variables: { id: "b65b724e-7f21-47ad-aa37-194c4dbcf7cd" },
    })
    .reply(
        200,
        [
            "1f8b080000000000040315c8c10a80200c00d07fd97d876c35f267647313a220412f21fe7bf48e6f8049178803cc6fef9eead37a4bfaa67afd7b1a44d07d530ee4c8252c482c86222be3725026d35c381bcc393f759077864d000000",
        ],
        [
            "Date",
            "Tue, 19 Oct 2021 07:47:30 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "6d4af690403b2fdbe4ce743813feedff",
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
            "6a0866075eb0548e-IST",
        ],
    );
