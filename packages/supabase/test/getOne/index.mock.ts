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
