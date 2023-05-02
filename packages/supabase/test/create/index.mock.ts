import nock from "nock";

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
    encodedQueryParams: true,
})
    .post("/rest/v1/posts", {
        title: "foo",
        slug: "foo-bar",
        content: "bar",
        categoryId: 2,
        image: {},
    })
    .matchHeader("Prefer", "return=representation")
    .query({ select: "*" })
    .reply(
        201,
        [
            {
                id: 33,
                title: "foo",
                slug: "foo-bar",
                createdAt: "2021-09-06T09:50:17.716058+00:00",
                content: "bar",
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
            "Mon, 06 Sep 2021 09:50:17 GMT",
            "Server",
            "postgrest/8.0.0",
            "Location",
            "/posts?id=eq.33",
            "Content-Range",
            "*/*",
            "Content-Profile",
            "public",
            "vary",
            "Origin",
            "Access-Control-Allow-Origin",
            "*",
            "X-Kong-Upstream-Latency",
            "4",
            "X-Kong-Proxy-Latency",
            "1",
            "Via",
            "kong/2.2.1",
        ],
    );
