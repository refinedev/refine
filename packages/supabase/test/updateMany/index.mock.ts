import nock from "nock";

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
    encodedQueryParams: true,
})
    .patch("/rest/v1/posts", { slug: "update-many" })
    .query({ id: "eq.42" })
    .reply(
        200,
        [
            {
                id: 42,
                title: "Test updateMany 2",
                slug: "update-many",
                createdAt: "2021-09-06T12:45:55+00:00",
                content: "updateMany test content",
                categoryId: 2,
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
            "Mon, 06 Sep 2021 13:28:25 GMT",
            "Server",
            "postgrest/8.0.0",
            "Content-Profile",
            "public",
            "Content-Range",
            "0-0/*",
            "vary",
            "Origin",
            "Access-Control-Allow-Origin",
            "*",
            "X-Kong-Upstream-Latency",
            "4",
            "X-Kong-Proxy-Latency",
            "0",
            "Via",
            "kong/2.2.1",
        ],
    );
