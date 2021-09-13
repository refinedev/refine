import nock from "nock";

nock("https://dev001.na-dev-engine.altogic.com:443", {
    encodedQueryParams: true,
})
    .delete("/post/613b2f5494cdf00019bfb963")
    .reply(200, "", [
        "Date",
        "Mon, 13 Sep 2021 12:20:55 GMT",
        "Content-Type",
        "application/json; charset=utf-8",
        "Content-Length",
        "0",
        "Connection",
        "close",
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
        "61373d5361cf2c001a1e27fa",
        "X-Duration",
        "11",
        "X-Validated-Duration",
        "12",
        "Strict-Transport-Security",
        "max-age=15724800; includeSubDomains",
    ]);
