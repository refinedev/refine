import nock from "nock";

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .post("/auth/login", {
        email: "test@mail.com",
        password: "123123",
        applicationClientId: "client-id",
    })
    .reply(
        200,
        {
            user: {
                id: "a010b758-5207-44f7-b3e4-9321e04eb312",
                email: "test@mail.com",
                phone: null,
                name: "test@mail.com",
                createdAt: "2022-04-27T11:43:35.874Z",
            },
            accessToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEwMTBiNzU4LTUyMDctNDRmNy1iM2U0LTkzMjFlMDRlYjMxMiIsImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsIm5hbWUiOiJ0ZXN0QG1haWwuY29tIiwiYXBwbGljYXRpb25DbGllbnRJZCI6ImNsaWVudC1pZCIsImlhdCI6MTY1MTgyMzg4MiwiZXhwIjoxNjUxOTEwMjgyfQ.QD7rS0lLxlXT_B5x5OWk7ll-2HUQDzw2puYTvMZsUc4",
            refreshToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEwMTBiNzU4LTUyMDctNDRmNy1iM2U0LTkzMjFlMDRlYjMxMiIsImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsIm5hbWUiOiJ0ZXN0QG1haWwuY29tIiwiYXBwbGljYXRpb25DbGllbnRJZCI6ImNsaWVudC1pZCIsImlhdCI6MTY1MTgyMzg4MiwiZXhwIjoxNjU0NDE1ODgyfQ.dpEvgJJRiQPvQMRTDm1oj8hzb6V8sf-cWGqJBYOvsX8",
        },
        [
            "X-Powered-By",
            "Express",
            "Access-Control-Allow-Origin",
            "*",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "778",
            "ETag",
            'W/"30a-G/bGbthij5GcEoXKKqsiGauF/WQ"',
            "Date",
            "Fri, 06 May 2022 07:58:02 GMT",
            "Connection",
            "keep-alive",
            "Keep-Alive",
            "timeout=5",
        ],
    );

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .options("/auth/register")
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
        "Fri, 06 May 2022 09:28:55 GMT",
        "Connection",
        "keep-alive",
        "Keep-Alive",
        "timeout=5",
    ]);

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .post("/auth/register", {
        email: "john@mail.com",
        name: "John Doe",
        password: "123123",
        applicationClientId: "client-id",
    })
    .reply(
        200,
        {
            user: {
                id: "b378a760-5136-49c1-9b15-8b0fa7c64ab7",
                email: "john@mail.com",
                phone: null,
                name: "John Doe",
                createdAt: "2022-05-06T06:27:14.174Z",
            },
            accessToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIzNzhhNzYwLTUxMzYtNDljMS05YjE1LThiMGZhN2M2NGFiNyIsImVtYWlsIjoiam9obkBtYWlsLmNvbSIsIm5hbWUiOiJKb2huIERvZSIsImFwcGxpY2F0aW9uQ2xpZW50SWQiOiJjbGllbnQtaWQiLCJpYXQiOjE2NTE4MjkyMzQsImV4cCI6MTY1MTkxNTYzNH0.LvopdLnMIoWltEwYM_d5n6K_aWhdj-yvV3a-EpZ9nmQ",
            refreshToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIzNzhhNzYwLTUxMzYtNDljMS05YjE1LThiMGZhN2M2NGFiNyIsImVtYWlsIjoiam9obkBtYWlsLmNvbSIsIm5hbWUiOiJKb2huIERvZSIsImFwcGxpY2F0aW9uQ2xpZW50SWQiOiJjbGllbnQtaWQiLCJpYXQiOjE2NTE4MjkyMzQsImV4cCI6MTY1NDQyMTIzNH0.WHvnjd_J5looPXh5qobs-3tRxqvOmvHxX_ucuOHUdKU",
        },
        [
            "X-Powered-By",
            "Express",
            "Access-Control-Allow-Origin",
            "*",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "759",
            "ETag",
            'W/"2f7-d26ZA/n6orXpXwNtIA0gfxqAJQY"',
            "Date",
            "Fri, 06 May 2022 09:27:14 GMT",
            "Connection",
            "keep-alive",
            "Keep-Alive",
            "timeout=5",
        ],
    );

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .options("/auth/me")
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
        "Fri, 06 May 2022 09:31:11 GMT",
        "Connection",
        "keep-alive",
        "Keep-Alive",
        "timeout=5",
    ]);

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .get("/auth/me")
    .reply(
        200,
        {
            id: "a010b758-5207-44f7-b3e4-9321e04eb312",
            email: "test@mail.com",
            phone: null,
            name: "test@mail.com",
            createdAt: "2022-05-06T06:27:14.174Z",
        },
        [
            "X-Powered-By",
            "Express",
            "Access-Control-Allow-Origin",
            "*",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "139",
            "ETag",
            'W/"8b-kGVoWm6D6uYAGVRuP1vnJU2dOvA"',
            "Date",
            "Fri, 06 May 2022 09:31:11 GMT",
            "Connection",
            "keep-alive",
            "Keep-Alive",
            "timeout=5",
        ],
    );

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .options("/auth/me")
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
        "Fri, 06 May 2022 09:46:34 GMT",
        "Connection",
        "keep-alive",
        "Keep-Alive",
        "timeout=5",
    ]);

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .get("/auth/me")
    .reply(
        200,
        {
            id: "b378a760-5136-49c1-9b15-8b0fa7c64ab7",
            email: "john@mail.com",
            phone: null,
            name: "John Doe",
            createdAt: "2022-05-06T06:27:14.174Z",
        },
        [
            "X-Powered-By",
            "Express",
            "Access-Control-Allow-Origin",
            "*",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "139",
            "ETag",
            'W/"8b-kGVoWm6D6uYAGVRuP1vnJU2dOvA"',
            "Date",
            "Fri, 06 May 2022 09:46:35 GMT",
            "Connection",
            "keep-alive",
            "Keep-Alive",
            "timeout=5",
        ],
    );
