import nock from "nock";

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
    encodedQueryParams: true,
})
    .get("/rest/v1/posts")
    .query({ select: "%2A", id: "eq.2" })
    .reply(
        200,
        [
            {
                id: 2,
                title: "Hello World",
                slug: "test-slug",
                createdAt: "2021-09-03T07:36:42+00:00",
                content: "test content",
                categoryId: 1,
                image: {},
            },
        ],
        [
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "Date",
            "Mon, 06 Sep 2021 12:20:54 GMT",
            "Server",
            "postgrest/8.0.0",
            "Content-Range",
            "0-0/*",
            "Content-Location",
            "/posts?id=eq.2&select=%2A",
            "Content-Profile",
            "public",
            "vary",
            "Origin",
            "Access-Control-Allow-Origin",
            "*",
            "X-Kong-Upstream-Latency",
            "22",
            "X-Kong-Proxy-Latency",
            "1",
            "Via",
            "kong/2.2.1",
        ],
    );

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
    encodedQueryParams: true,
})
    .get("/rest/v1/posts")
    .query({ select: "title", id: "eq.3" })
    .reply(
        200,
        [
            "1f8b08000000000000038bae562ac92cc94955b252f2c92f4acd55f02c282ecd5530d23553aa8d050032f8af081d000000",
        ],
        [
            "Date",
            "Fri, 28 Jan 2022 13:00:12 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "CF-Ray",
            "6d4a67027f4492d1-IST",
            "Access-Control-Allow-Origin",
            "*",
            "Content-Encoding",
            "gzip",
            "Content-Location",
            "/posts?id=eq.3&select=title",
            "Content-Range",
            "0-0/*",
            "Vary",
            "Accept-Encoding, Origin",
            "Via",
            "kong/2.2.1",
            "CF-Cache-Status",
            "DYNAMIC",
            "Content-Profile",
            "public",
            "Expect-CT",
            'max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"',
            "X-Kong-Proxy-Latency",
            "0",
            "X-Kong-Upstream-Latency",
            "3",
            "Server",
            "cloudflare",
            "alt-svc",
            'h3=":443"; ma=86400, h3-29=":443"; ma=86400',
        ],
    );
