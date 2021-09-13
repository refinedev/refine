import nock from "nock";

nock("https://dev001.na-dev-engine.altogic.com:443", {
    encodedQueryParams: true,
})
    .get("/category")
    .query({ id: ["61373e585d65d30019e2b0a2", "61373e5e59c5a7001aeac77d"] })
    .reply(
        200,
        [
            {
                _id: "61373e585d65d30019e2b0a2",
                createdAt: "2021-09-07T10:26:32.697Z",
                updatedAt: "2021-09-07T10:26:32.697Z",
                title: "text",
            },
            {
                _id: "61373e5e59c5a7001aeac77d",
                createdAt: "2021-09-07T10:26:38.373Z",
                updatedAt: "2021-09-07T10:26:38.373Z",
                title: "text2",
            },
        ],
        [
            "Date",
            "Mon, 13 Sep 2021 12:22:27 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "258",
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
            "61373d0861cf2c001a1e27d5",
            "X-Duration",
            "6",
            "X-Validated-Duration",
            "8",
            "Strict-Transport-Security",
            "max-age=15724800; includeSubDomains",
        ],
    );
