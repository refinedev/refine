import nock from "nock";

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
    encodedQueryParams: true,
})
    .get("/rest/v1/posts")
    .query({ select: "%2A", offset: "-9", limit: "20" })
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
                title: "What a library, sayın seyirciler",
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
            "Mon, 06 Sep 2021 08:23:41 GMT",
            "Server",
            "postgrest/8.0.0",
            "Content-Range",
            "0-1/2",
            "Content-Location",
            "/posts?limit=20&offset=-9&select=%2A",
            "Content-Profile",
            "public",
            "vary",
            "Origin",
            "Access-Control-Allow-Origin",
            "*",
            "X-Kong-Upstream-Latency",
            "23",
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
    .query({
        select: "%2A",
        offset: "-9",
        limit: "20",
        order: "title.asc.nullslast",
    })
    .reply(
        200,
        [
            {
                id: 3,
                title: "What a library",
                slug: "refine-nokta-kom",
                createdAt: "2021-09-03T09:17:51+00:00",
                content: "Hello lorem ipsum pala baba",
                categoryId: 1,
                image: {},
            },
            {
                id: 2,
                title: "test title",
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
            "Mon, 06 Sep 2021 09:12:46 GMT",
            "Server",
            "postgrest/8.0.0",
            "Content-Range",
            "0-1/2",
            "Content-Location",
            "/posts?limit=20&offset=-9&order=title.asc.nullslast&select=%2A",
            "Content-Profile",
            "public",
            "vary",
            "Origin",
            "Access-Control-Allow-Origin",
            "*",
            "X-Kong-Upstream-Latency",
            "29",
            "X-Kong-Proxy-Latency",
            "1",
            "Via",
            "kong/2.2.1",
        ],
    );
