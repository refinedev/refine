import nock from "nock";

nock("https://dev001.na-dev-engine.altogic.com:443", {
    encodedQueryParams: true,
})
    .options("/post/613a25eb65f2050012410a41")
    .reply(204, "", [
        "Date",
        "Mon, 13 Sep 2021 12:27:14 GMT",
        "Content-Length",
        "0",
        "Connection",
        "keep-alive",
        "X-Powered-By",
        "Express",
        "Access-Control-Allow-Origin",
        "*",
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE",
        "Vary",
        "Access-Control-Request-Headers",
        "Access-Control-Allow-Headers",
        "Authorization",
        "Strict-Transport-Security",
        "max-age=15724800; includeSubDomains",
    ]);

nock("https://dev001.na-dev-engine.altogic.com:443", {
    encodedQueryParams: true,
})
    .put("/post/613a25eb65f2050012410a41", { title: "foo", content: "bar" })
    .reply(
        200,
        {
            _id: "613a25eb65f2050012410a41",
            createdAt: "2021-09-09T15:19:07.122Z",
            updatedAt: "2021-09-13T12:26:13.816Z",
            title: "foo",
            categoryId: "61373e585d65d30019e2b0a2",
            status: "draft",
            content: "bar",
        },
        [
            "Date",
            "Mon, 13 Sep 2021 12:26:13 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "199",
            "Connection",
            "keep-alive",
            "X-Powered-By",
            "Altogic",
            "Access-Control-Allow-Origin",
            "*",
            "Surrogate-Control",
            "no-store",
            "Cache-Control",
            "no-store, no-cache, must-revalidate, proxy-revalidate",
            "Pragma",
            "no-cache",
            "Expires",
            "0",
            "Access-Control-Expose-Headers",
            "X-Service-Id, X-Duration, X-Validated-Duration, Content-Length, Content-Type, Content-Disposition, X-Powered-By",
            "X-Service-Id",
            "61373d5361cf2c001a1e27f9",
            "X-Duration",
            "8",
            "X-Validated-Duration",
            "12",
            "Strict-Transport-Security",
            "max-age=15724800; includeSubDomains",
        ],
    );
