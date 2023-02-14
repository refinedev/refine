import nock from "nock";

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .options("/draft-resource/client")
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
        "x-refine-cloud-token",
        "Content-Length",
        "0",
        "Date",
        "Wed, 25 May 2022 13:11:19 GMT",
        "Connection",
        "keep-alive",
        "Keep-Alive",
        "timeout=5",
    ]);

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .post("/draft-resource/client", {
        resources: [
            {
                name: "posts",
                key: "posts",
                hasList: true,
                hasCreate: true,
                hasEdit: true,
                hasShow: true,
                hasDelete: false,
            },
        ],
        applicationClientId: "client-id",
    })
    .reply(
        200,
        {
            id: "77db3164-f76d-4758-b77b-d7d37dc2021d",
            resources: [
                {
                    key: "posts",
                    name: "posts",
                    hasList: true,
                    hasCreate: true,
                    hasEdit: true,
                    hasShow: true,
                    hasDelete: false,
                },
            ],
            user: {
                id: "3f229564-78f9-4b5f-96f7-b8521b294563",
                name: "Admin",
                email: "admin@refine.dev",
            },
            createdAt: "2022-05-18T05:22:03.383Z",
            updatedAt: "2022-05-18T05:22:03.383Z",
        },
        [
            "X-Powered-By",
            "Express",
            "Access-Control-Allow-Origin",
            "*",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "343",
            "ETag",
            'W/"157-cySHrxLaUuWyOwKGH8uc1goKLfE"',
            "Date",
            "Wed, 25 May 2022 13:11:19 GMT",
            "Connection",
            "keep-alive",
            "Keep-Alive",
            "timeout=5",
        ],
    );

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .options("/draft-resource/client")
    .query({ applicationClientId: "client-id" })
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
        "x-refine-cloud-token",
        "Content-Length",
        "0",
        "Date",
        "Wed, 25 May 2022 13:11:19 GMT",
        "Connection",
        "keep-alive",
        "Keep-Alive",
        "timeout=5",
    ]);

nock("http://awesome.localhost:3001", { encodedQueryParams: true })
    .get("/draft-resource/client")
    .query({ applicationClientId: "client-id" })
    .reply(
        200,
        [
            {
                id: "77db3164-f76d-4758-b77b-d7d37dc2021d",
                resources: [
                    {
                        key: "posts",
                        name: "posts",
                        hasList: true,
                        hasCreate: true,
                        hasEdit: true,
                        hasShow: true,
                        hasDelete: false,
                    },
                ],
                user: {
                    id: "3f229564-78f9-4b5f-96f7-b8521b294563",
                    name: "Admin",
                    email: "admin@refine.dev",
                },
                createdAt: "2022-05-18T05:22:03.383Z",
                updatedAt: "2022-05-18T05:22:03.383Z",
            },
            {
                id: "bd6d835d-8a66-47ef-bc8e-769e49ffb324",
                resources: [
                    {
                        key: "string",
                        name: "string",
                        parentName: "",
                        meta: {},
                        hasList: false,
                        hasCreate: false,
                        hasEdit: true,
                        hasShow: false,
                        hasDelete: false,
                    },
                ],
                user: {
                    id: "3f229564-78f9-4b5f-96f7-b8521b294563",
                    name: "Admin",
                    email: "admin@refine.dev",
                },
                createdAt: "2022-05-16T11:32:04.455Z",
                updatedAt: "2022-05-16T11:32:04.455Z",
            },
            {
                id: "adad83c0-0c48-4933-b86e-613f515b0f87",
                resources: [
                    {
                        key: "string",
                        name: "string",
                        parentName: "",
                        meta: {},
                        hasList: false,
                        hasCreate: false,
                        hasEdit: true,
                        hasShow: false,
                        hasDelete: true,
                    },
                ],
                user: {
                    id: "3f229564-78f9-4b5f-96f7-b8521b294563",
                    name: "Admin",
                    email: "admin@refine.dev",
                },
                createdAt: "2022-05-16T11:31:49.048Z",
                updatedAt: "2022-05-16T11:31:49.048Z",
            },
            {
                id: "0936788b-0e94-4b86-9f68-19befe6916a2",
                resources: [
                    {
                        key: "string",
                        name: "string",
                        parentName: "",
                        meta: {},
                        hasList: false,
                        hasCreate: false,
                        hasEdit: false,
                        hasShow: false,
                        hasDelete: true,
                    },
                ],
                user: {
                    id: "3f229564-78f9-4b5f-96f7-b8521b294563",
                    name: "Admin",
                    email: "admin@refine.dev",
                },
                createdAt: "2022-05-16T11:31:34.162Z",
                updatedAt: "2022-05-16T11:31:34.162Z",
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
            "1478",
            "ETag",
            'W/"5c6-zopIQJO6OXvXkOTALkUzemEuuhM"',
            "Date",
            "Wed, 25 May 2022 13:11:19 GMT",
            "Connection",
            "keep-alive",
            "Keep-Alive",
            "timeout=5",
        ],
    );
