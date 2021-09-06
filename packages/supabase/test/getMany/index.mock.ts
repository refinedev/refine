import nock from "nock";

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
    encodedQueryParams: true,
})
    .get("/rest/v1/posts")
    .query({ select: "%2A", id: "in.%282%2C3%29" })
    .reply(
        200,
        [
            {
                id: 2,
                title: "test title",
                slug: "test-slug",
                createdAt: "2021-09-03T07:36:42+00:00",
                content: "test content",
                categoryId: 1,
                image: {},
            },
            {
                id: 3,
                title: "What a library",
                slug: "refine-nokta-kom",
                createdAt: "2021-09-03T09:17:51+00:00",
                content: "Hello lorem ipsum pala baba",
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
            "Mon, 06 Sep 2021 09:26:19 GMT",
            "Server",
            "postgrest/8.0.0",
            "Content-Range",
            "0-1/*",
            "Content-Location",
            "/posts?id=in.%282%2C3%29&select=%2A",
            "Content-Profile",
            "public",
            "vary",
            "Origin",
            "Access-Control-Allow-Origin",
            "*",
            "X-Kong-Upstream-Latency",
            "29",
            "X-Kong-Proxy-Latency",
            "0",
            "Via",
            "kong/2.2.1",
        ],
    );
