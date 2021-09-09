import nock from "nock";

nock("https://api.fake-rest.refine.dev:443", { encodedQueryParams: true })
    .patch("/posts/999", { title: "foo", content: "bar" })
    .reply(200, { title: "foo", content: "bar", id: 999 }, [
        "Server",
        "nginx/1.17.10",
        "Date",
        "Tue, 30 Mar 2021 11:46:50 GMT",
        "Content-Type",
        "application/json; charset=utf-8",
        "Content-Length",
        "53",
        "Connection",
        "close",
        "X-Powered-By",
        "Express",
        "Vary",
        "Origin, Accept-Encoding",
        "Access-Control-Allow-Credentials",
        "true",
        "Cache-Control",
        "no-cache",
        "Pragma",
        "no-cache",
        "Expires",
        "-1",
        "X-Content-Type-Options",
        "nosniff",
        "ETag",
        'W/"35-gfX3zFb0+NPh6hrlRvdfu6Qm4cE"',
    ]);
