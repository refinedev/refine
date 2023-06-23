import nock from "nock";

/**
 * Hasura default 'snake_case' naming convention
 */

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($id: uuid!) { posts_by_pk (id: $id) { id, title, content, category { id } } }",
        variables: { id: "cddd4ced-651d-4039-abe0-2a9dffbc8c82" },
    })
    .twice()
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

// mock when id is Int
// returning '{"data":{"users_by_pk":{"id":1,"name":"Refine User","email":"dev@refine.com"}}}'
nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($id: Int!) { users_by_pk (id: $id) { id, name, email } }",
        variables: { id: 1 },
    })
    .twice()
    .reply(
        200,
        [
            "1f8b080019b6066402ffab564a492c4954b2aa562a2d4e2d2a8e4faa8c2fc80671335394ac0c7594f212735395ac948252d332f3521542816a947494527313337380a229a9650e456019bde4fc5ca5dada5a00ab4e01a54f000000",
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

/**
 * Graphql default 'camelCase' naming convention
 */
nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($id: uuid!) { postsByPk (id: $id) { id, title, content, category { id } } }",
        variables: { id: "cddd4ced-651d-4039-abe0-2a9dffbc8c82" },
    })
    .twice()
    .reply(
        200,
        [
            "1f8b08000000000000133d8eb16ec3300c447f85d05c154e2c2572c60e45c706fd029aa45221b214d8d41004f9f72a4b6fba3bbc03ee611815cde9616e75d3ede3fe7d7d85c4e66488991d09db83dfb175c338599c65b07b9c38c6990285bd79339a344bc73f2bb50d2e6b6d37f86a0b16f8c922d74e502d2a453b736e09a1a4df94816baeab6c200a487d8945535b20e3dc6b90b6bcbf96a872a9ebfdffd3b83b92a0171b258ed6051f6c185c776e3a88a763f4389b67d71ff388a446d9000000",
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

// mock when id is Int
// returning '{"data":{"usersByPk":{"id":1,"name":"Refine User","email":"dev@refine.com"}}}'
nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($id: Int!) { usersByPk (id: $id) { id, name, email } }",
        variables: { id: 1 },
    })
    .twice()
    .reply(
        200,
        [
            "1f8b0800000000000013ab564a492c4954b2aa562a2d4e2d2a76aa0cc80671325394ac0c7594f212735395ac948252d332f3521542812a947494527313337380a229a9650e456019bde4fc5ca5dada5a00cd35e6aa4d000000",
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
