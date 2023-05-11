import nock from "nock";

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
    encodedQueryParams: true,
})
    .patch("/rest/v1/posts", {
        title: "test",
        categoryId: 52,
        content: "test content",
    })
    .query({ id: "eq.1246", select: "*" })
    .reply(
        200,
        [
            {
                id: 1246,
                title: "test",
                slug: "255",
                createdAt: "2022-05-17T04:25:58.80596+00:00",
                content: "test content",
                categoryId: 52,
                images: [
                    {
                        uid: "rc-upload-1653445523640-23",
                        name: "Screen Shot 2022-05-24 at 01.44.50.png",
                        url: "https://iwdfzvfqbtokqetmbmbp.supabase.co/storage/v1/object/public/refine/public/Screen Shot 2022-05-24 at 01.44.50.png",
                        type: "image/png",
                        size: 1052925,
                        percent: 100,
                        status: "done",
                    },
                ],
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
            "Mon, 06 Sep 2021 12:14:47 GMT",
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
            "37",
            "X-Kong-Proxy-Latency",
            "0",
            "Via",
            "kong/2.2.1",
        ],
    );
