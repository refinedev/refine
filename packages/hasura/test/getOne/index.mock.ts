import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($id: uuid!) { posts_by_pk (id: $id) { id, title, content, category { id } } }",
        variables: { id: "cddd4ced-651d-4039-abe0-2a9dffbc8c82" },
    })
    .reply(
        200,
        [
            "1f8b08000000000004033d8ec18e022110447f857016333aa08c1fb0d9eb663fc034dd8d121998cc340763f6df172fd6a9aaf22aa9972610d097975eea26db353cafcbe31d13e98b4622b2c8644eee40c60ee36420f0608e30518c013dfaa3de694992b9e35f15dba66e6b6d8bfa6e3314f59b991f9dc05a848b74e6a7255025dd535654735d79532c0ab02fa1486ab3ca107aadb8cdfbf712846f757d7e3e8d873332383691e368ac77def8c17667a7133b3c470741ff75fd03c1841520db000000",
        ],
        [
            "Date",
            "Tue, 19 Oct 2021 11:51:35 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "598d691875f78d7b7ee7e7d059082e3b",
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
            "6a09cb95fa2b5493-IST",
        ],
    );
