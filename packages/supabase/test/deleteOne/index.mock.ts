import nock from "nock";

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
    encodedQueryParams: true,
})
    .delete("/rest/v1/posts")
    .query({ id: "eq.40" })
    .reply(
        200,
        [
            {
                id: 40,
                title: "Delete me",
                slug: "delete-me",
                createdAt: "2021-09-06T12:23:27+00:00",
                content: "Will delete record",
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
            "Mon, 06 Sep 2021 12:26:18 GMT",
            "Server",
            "postgrest/8.0.0",
            "Content-Profile",
            "public",
            "Content-Range",
            "*/*",
            "vary",
            "Origin",
            "Access-Control-Allow-Origin",
            "*",
            "X-Kong-Upstream-Latency",
            "33",
            "X-Kong-Proxy-Latency",
            "0",
            "Via",
            "kong/2.2.1",
        ],
    );
