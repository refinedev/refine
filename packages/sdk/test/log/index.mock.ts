import nock from "nock";

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .options("/log/client")
    .reply(204, "", [
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
        "Content-Length",
        "0",
        "Date",
        "Fri, 06 May 2022 11:29:50 GMT",
        "Connection",
        "keep-alive",
        "Keep-Alive",
        "timeout=5",
    ]);

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .post("/log/client", {
        resource: "post",
        action: "create",
        meta: { id: "1" },
        data: { title: "Test" },
        applicationClientId: "client-id",
    })
    .reply(
        200,
        {
            meta: { id: "1" },
            data: { title: "Test" },
            resource: "post",
            action: "create",
            author: {
                id: "a010b758-5207-44f7-b3e4-9321e04eb312",
                email: "test@mail.com",
                name: "test@mail.com",
            },
        },
        [
            "X-Powered-By",
            "Express",
            "Access-Control-Allow-Origin",
            "*",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "181",
            "ETag",
            'W/"b5-0l7XInMKkZI4E7mG6YMX2Z+r8B0"',
            "Date",
            "Fri, 06 May 2022 11:29:50 GMT",
            "Connection",
            "keep-alive",
            "Keep-Alive",
            "timeout=5",
        ],
    );

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .options("/log/client")
    .query({ resource: "post" })
    .reply(204, "", [
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
        "Content-Length",
        "0",
        "Date",
        "Fri, 06 May 2022 11:35:07 GMT",
        "Connection",
        "keep-alive",
        "Keep-Alive",
        "timeout=5",
    ]);

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .get("/log/client")
    .query({ resource: "post" })
    .reply(
        200,
        [
            {
                id: "507a172c-49d8-4620-a983-5c161e20862b",
                meta: { id: "1" },
                data: { title: "Test" },
                previousData: null,
                resource: "post",
                action: "create",
                name: null,
                author: {
                    id: "a010b758-5207-44f7-b3e4-9321e04eb312",
                    email: "test@mail.com",
                    name: "test@mail.com",
                },
                createdAt: "2022-05-06T08:29:50.548Z",
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
            "1342",
            "ETag",
            'W/"53e-tlm65PjI3ZSg5aiYY8j7+kvdCcM"',
            "Date",
            "Fri, 06 May 2022 11:35:08 GMT",
            "Connection",
            "keep-alive",
            "Keep-Alive",
            "timeout=5",
        ],
    );

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .options("/log/client/507a172c-49d8-4620-a983-5c161e20862b")
    .reply(204, "", [
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
        "Content-Length",
        "0",
        "Date",
        "Fri, 06 May 2022 12:29:44 GMT",
        "Connection",
        "keep-alive",
        "Keep-Alive",
        "timeout=5",
    ]);

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .patch("/log/client/507a172c-49d8-4620-a983-5c161e20862b", {
        name: "updated name",
        applicationClientId: "client-id",
    })
    .reply(
        200,
        {
            id: "507a172c-49d8-4620-a983-5c161e20862b",
            meta: { id: "1" },
            data: { title: "Test" },
            previousData: null,
            resource: "post",
            action: "create",
            name: "updated name",
            author: {
                id: "a010b758-5207-44f7-b3e4-9321e04eb312",
                email: "test@mail.com",
                name: "test@mail.com",
            },
            createdAt: "2022-05-06T08:29:50.548Z",
        },
        [
            "X-Powered-By",
            "Express",
            "Access-Control-Allow-Origin",
            "*",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "306",
            "ETag",
            'W/"132-EHtUppTEnUrq0LFtdUKa61YSEak"',
            "Date",
            "Fri, 06 May 2022 12:29:44 GMT",
            "Connection",
            "keep-alive",
            "Keep-Alive",
            "timeout=5",
        ],
    );
