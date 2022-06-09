import nock from "nock";

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .post("/log", {
        resource: "post",
        action: "create",
        meta: { id: "1" },
        data: { title: "Test" },
        author: { username: "admin" },
        applicationClientId: "client-id",
        applicationClientSecret: "client-secret",
    })
    .reply(
        200,
        {
            meta: { id: "1" },
            data: { title: "Test" },
            resource: "post",
            action: "create",
            author: { username: "admin" },
        },
        [
            "X-Powered-By",
            "Express",
            "Access-Control-Allow-Origin",
            "*",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "109",
            "ETag",
            'W/"6d-a979pQ+w8V6CeK1S5YzBQmiZYWQ"',
            "Date",
            "Fri, 06 May 2022 13:33:19 GMT",
            "Connection",
            "keep-alive",
            "Keep-Alive",
            "timeout=5",
        ],
    );

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .get("/log")
    .query({
        applicationClientId: "client-id",
        applicationClientSecret: "client-secret",
        resource: "post",
    })
    .reply(
        200,
        [
            {
                id: "9ade6617-fe68-4408-89b6-0b0db70be1d5",
                meta: { id: "1" },
                data: { title: "Test" },
                previousData: null,
                resource: "post",
                action: "create",
                name: null,
                author: { username: "admin" },
                createdAt: "2022-05-06T10:34:07.909Z",
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
            "2252",
            "ETag",
            'W/"8cc-rS+KFjRQfp0zmxmt2cS3j3ZQ+RA"',
            "Date",
            "Fri, 06 May 2022 13:34:08 GMT",
            "Connection",
            "keep-alive",
            "Keep-Alive",
            "timeout=5",
        ],
    );

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .options("/log/9ade6617-fe68-4408-89b6-0b0db70be1d5")
    .reply(204, "", [
        "X-Powered-By",
        "Express",
        "Access-Control-Allow-Origin",
        "*",
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE",
        "Vary",
        "Access-Control-Request-Headers",
        "Content-Length",
        "0",
        "Date",
        "Fri, 06 May 2022 13:42:55 GMT",
        "Connection",
        "keep-alive",
        "Keep-Alive",
        "timeout=5",
    ]);

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .patch("/log/9ade6617-fe68-4408-89b6-0b0db70be1d5", {
        name: "updated name",
        applicationClientId: "client-id",
        applicationClientSecret: "client-secret",
    })
    .reply(
        200,
        {
            id: "9ade6617-fe68-4408-89b6-0b0db70be1d5",
            meta: { id: "1" },
            data: { title: "Test" },
            previousData: null,
            resource: "post",
            action: "create",
            name: "updated name",
            author: { username: "admin" },
            createdAt: "2022-05-06T10:34:07.909Z",
        },
        [
            "X-Powered-By",
            "Express",
            "Access-Control-Allow-Origin",
            "*",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "234",
            "ETag",
            'W/"ea-jrCVQcWxASClvjEQkGNfiMx3tVQ"',
            "Date",
            "Fri, 06 May 2022 13:42:55 GMT",
            "Connection",
            "keep-alive",
            "Keep-Alive",
            "timeout=5",
        ],
    );
