import nock from "nock";

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
    encodedQueryParams: true,
})
    .post("/rest/v1/posts", [
        {
            title: "foo",
            slug: "foo-bar",
            content: "bar",
            categoryId: 2,
            image: {},
        },
        {
            title: "foo-2",
            slug: "foo-bar-2",
            content: "bar-2",
            categoryId: 1,
            image: {},
        },
    ])
    .matchHeader("Prefer", "return=representation")
    .query({
        columns:
            "%22title%22%2C%22slug%22%2C%22content%22%2C%22categoryId%22%2C%22image%22",
        select: "*",
    })
    .reply(
        201,
        [
            {
                id: 36,
                title: "foo",
                slug: "foo-bar",
                createdAt: "2021-09-06T11:06:50.489609+00:00",
                content: "bar",
                categoryId: 2,
                image: {},
            },
            {
                id: 37,
                title: "foo-2",
                slug: "foo-bar-2",
                createdAt: "2021-09-06T11:06:50.489609+00:00",
                content: "bar-2",
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
            "Mon, 06 Sep 2021 11:06:50 GMT",
            "Server",
            "postgrest/8.0.0",
            "Content-Range",
            "*/*",
            "Content-Profile",
            "public",
            "vary",
            "Origin",
            "Access-Control-Allow-Origin",
            "*",
            "X-Kong-Upstream-Latency",
            "27",
            "X-Kong-Proxy-Latency",
            "0",
            "Via",
            "kong/2.2.1",
        ],
    );
