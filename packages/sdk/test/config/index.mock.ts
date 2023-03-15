import nock from "nock";

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .get("/config/auth")
    .query({ applicationClientId: "client-id" })
    .reply(
        200,
        [
            {
                disableSignup: false,
                name: "database",
                type: "database",
            },
        ],
        [
            "X-Powered-By",
            "Express",
            "Access-Control-Allow-Origin",
            "*",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "65",
            "ETag",
            'W/"41-ZS84Jy9vCwrR0p1e6ANd4UMMQE4"',
            "Date",
            "Mon, 06 Jun 2022 13:17:53 GMT",
            "Connection",
            "keep-alive",
            "Keep-Alive",
            "timeout=5",
        ],
    );

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .get("/config/resources")
    .query({ applicationClientId: "client-id", resourceName: "dev" })
    .reply(
        200,
        [{ name: "post", meta: { auditLog: { permissions: ["list"] } } }],
        [
            "X-Powered-By",
            "Express",
            "Access-Control-Allow-Origin",
            "*",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "65",
            "ETag",
            'W/"41-ZS84Jy9vCwrR0p1e6ANd4UMMQE4"',
            "Date",
            "Mon, 06 Jun 2022 13:17:53 GMT",
            "Connection",
            "keep-alive",
            "Keep-Alive",
            "timeout=5",
        ],
    );
