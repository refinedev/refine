import nock from "nock";

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
    encodedQueryParams: true,
})
    .get("/rest/v1/posts")
    .query({ select: "%2A", offset: "0", limit: "10" })
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
            "/posts?limit=10&offset=0&select=%2A",
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
        offset: "0",
        limit: "10",
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
            "/posts?limit=10&offset=0&order=title.asc.nullslast&select=%2A",
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

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
    encodedQueryParams: true,
})
    .get("/rest/v1/posts")
    .query({
        select: "%2A",
        offset: "0",
        limit: "10",
        title: "eq.Hello%20World",
    })
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
            "Mon, 06 Sep 2021 14:00:04 GMT",
            "Server",
            "postgrest/8.0.0",
            "Content-Range",
            "0-0/1",
            "Content-Location",
            "/posts?limit=10&offset=0&select=%2A&title=eq.Hello%20World",
            "Content-Profile",
            "public",
            "vary",
            "Origin",
            "Access-Control-Allow-Origin",
            "*",
            "X-Kong-Upstream-Latency",
            "5",
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
        offset: "0",
        limit: "10",
        title: "neq.Hello%20World",
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
                id: 42,
                title: "Supabase",
                slug: "supabase-data-provider",
                createdAt: "2021-09-06T12:45:55+00:00",
                content: "supabase content",
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
            "Mon, 06 Sep 2021 14:05:55 GMT",
            "Server",
            "postgrest/8.0.0",
            "Content-Range",
            "0-1/2",
            "Content-Location",
            "/posts?limit=10&offset=0&select=%2A&title=neq.Hello%20World",
            "Content-Profile",
            "public",
            "vary",
            "Origin",
            "Access-Control-Allow-Origin",
            "*",
            "X-Kong-Upstream-Latency",
            "30",
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
    .query({ select: "%2A", offset: "0", limit: "10", id: "lt.3" })
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
            "Mon, 06 Sep 2021 14:09:06 GMT",
            "Server",
            "postgrest/8.0.0",
            "Content-Range",
            "0-0/1",
            "Content-Location",
            "/posts?id=lt.3&limit=10&offset=0&select=%2A",
            "Content-Profile",
            "public",
            "vary",
            "Origin",
            "Access-Control-Allow-Origin",
            "*",
            "X-Kong-Upstream-Latency",
            "24",
            "X-Kong-Proxy-Latency",
            "0",
            "Via",
            "kong/2.2.1",
        ],
    );

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
    encodedQueryParams: true,
})
    .get("/rest/v1/posts")
    .query({ select: "%2A", offset: "0", limit: "10", id: "gt.3" })
    .reply(
        200,
        [
            {
                id: 42,
                title: "Supabase",
                slug: "supabase-data-provider",
                createdAt: "2021-09-06T12:45:55+00:00",
                content: "supabase content",
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
            "Mon, 06 Sep 2021 14:11:34 GMT",
            "Server",
            "postgrest/8.0.0",
            "Content-Range",
            "0-0/1",
            "Content-Location",
            "/posts?id=gt.3&limit=10&offset=0&select=%2A",
            "Content-Profile",
            "public",
            "vary",
            "Origin",
            "Access-Control-Allow-Origin",
            "*",
            "X-Kong-Upstream-Latency",
            "9",
            "X-Kong-Proxy-Latency",
            "0",
            "Via",
            "kong/2.2.1",
        ],
    );

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
    encodedQueryParams: true,
})
    .get("/rest/v1/posts")
    .query({ select: "%2A", offset: "0", limit: "10", id: "lte.2" })
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
            "Mon, 06 Sep 2021 14:13:19 GMT",
            "Server",
            "postgrest/8.0.0",
            "Content-Range",
            "0-0/1",
            "Content-Location",
            "/posts?id=lte.2&limit=10&offset=0&select=%2A",
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
    .query({ select: "%2A", offset: "0", limit: "10", id: "gte.42" })
    .reply(
        200,
        [
            {
                id: 42,
                title: "Supabase",
                slug: "supabase-data-provider",
                createdAt: "2021-09-06T12:45:55+00:00",
                content: "supabase content",
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
            "Mon, 06 Sep 2021 14:14:26 GMT",
            "Server",
            "postgrest/8.0.0",
            "Content-Range",
            "0-0/1",
            "Content-Location",
            "/posts?id=gte.42&limit=10&offset=0&select=%2A",
            "Content-Profile",
            "public",
            "vary",
            "Origin",
            "Access-Control-Allow-Origin",
            "*",
            "X-Kong-Upstream-Latency",
            "24",
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
    .query({ select: "%2A", offset: "0", limit: "10", id: "in.%282%2C3%29" })
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
            "Mon, 06 Sep 2021 14:16:07 GMT",
            "Server",
            "postgrest/8.0.0",
            "Content-Range",
            "0-1/2",
            "Content-Location",
            "/posts?id=in.%282%2C3%29&limit=10&offset=0&select=%2A",
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
        offset: "0",
        limit: "10",
        title: "ilike.%25world%25",
    })
    .reply(
        200,
        [],
        [
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "Date",
            "Mon, 06 Sep 2021 14:41:31 GMT",
            "Server",
            "postgrest/8.0.0",
            "Content-Range",
            "*/0",
            "Content-Location",
            "/posts?limit=10&offset=0&select=%2A&title=ilike.%25world%25",
            "Content-Profile",
            "public",
            "vary",
            "Origin",
            "Access-Control-Allow-Origin",
            "*",
            "X-Kong-Upstream-Latency",
            "9",
            "X-Kong-Proxy-Latency",
            "0",
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
        offset: "0",
        limit: "10",
        title: "like.%25world%25",
    })
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
            "Mon, 06 Sep 2021 14:43:47 GMT",
            "Server",
            "postgrest/8.0.0",
            "Content-Range",
            "0-0/1",
            "Content-Location",
            "/posts?limit=10&offset=0&select=%2A&title=like.%25world%25",
            "Content-Profile",
            "public",
            "vary",
            "Origin",
            "Access-Control-Allow-Origin",
            "*",
            "X-Kong-Upstream-Latency",
            "25",
            "X-Kong-Proxy-Latency",
            "0",
            "Via",
            "kong/2.2.1",
        ],
    );

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
    encodedQueryParams: true,
})
    .get("/rest/v1/posts")
    .query({ select: "%2A", offset: "0", limit: "10", content: "is.null" })
    .reply(
        200,
        [
            {
                id: 42,
                title: "Supabase",
                slug: "supabase-data-provider",
                createdAt: "2021-09-06T12:45:55+00:00",
                content: null,
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
            "Mon, 06 Sep 2021 14:52:17 GMT",
            "Server",
            "postgrest/8.0.0",
            "Content-Range",
            "0-0/1",
            "Content-Location",
            "/posts?content=is.null&limit=10&offset=0&select=%2A",
            "Content-Profile",
            "public",
            "vary",
            "Origin",
            "Access-Control-Allow-Origin",
            "*",
            "X-Kong-Upstream-Latency",
            "2",
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
    .query({ select: "title", offset: "0", limit: "10" })
    .reply(
        206,
        [
            { title: "sadasdsa333" },
            { title: "adfasdfasdf" },
            { title: "test2" },
            { title: "Foo Test" },
            { title: "We've just launched refine!" },
            { title: "1asdasd" },
            { title: "test" },
            { title: "Lorem Ipsum 2-6" },
            { title: "Hello from refine!" },
            { title: "necat," },
        ],
        [
            "Date",
            "Fri, 28 Jan 2022 12:58:14 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "CF-Ray",
            "6d4a641cfc6992cc-IST",
            "Access-Control-Allow-Origin",
            "*",
            "Content-Location",
            "/posts?limit=10&offset=0&select=title",
            "Content-Range",
            "0-9/71",
            "Vary",
            "Origin, Accept-Encoding",
            "Via",
            "kong/2.2.1",
            "CF-Cache-Status",
            "DYNAMIC",
            "Content-Profile",
            "public",
            "Expect-CT",
            'max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"',
            "X-Kong-Proxy-Latency",
            "1",
            "X-Kong-Upstream-Latency",
            "30",
            "Server",
            "cloudflare",
            "alt-svc",
            'h3=":443"; ma=86400, h3-29=":443"; ma=86400',
        ],
    );
