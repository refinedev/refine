import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation UpdateManyPosts($where: posts_bool_exp!, $_set: posts_set_input!) {\n  update_posts(where: $where, _set: $_set) {\n    returning {\n      id\n      id\n      title\n      content\n    }\n  }\n}\n",
        variables: {
            where: {
                id: {
                    _in: [
                        "85e2f56d-53e9-4d43-8099-4c7622c8e8e1",
                        "881a45fd-a5da-46f4-a045-58eeb647862f",
                    ],
                },
            },
            _set: { content: "Updated Content" },
        },
        operationName: "UpdateManyPosts",
    })
    .reply(
        200,
        {
            data: {
                update_posts: {
                    returning: [
                        {
                            id: "85e2f56d-53e9-4d43-8099-4c7622c8e8e1",
                            title: "Aenean ultricies non libero sit amet pellentesque",
                            content: "Updated Content",
                        },
                        {
                            id: "881a45fd-a5da-46f4-a045-58eeb647862f",
                            title: "Etiam tincidunt ex ut auctor faucibus",
                            content: "Updated Content",
                        },
                    ],
                },
            },
        },
        [
            "Date",
            "Wed, 10 Jan 2024 21:14:40 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "300",
            "Connection",
            "close",
            "x-request-id",
            "8d90a177333ffad71c6840457ec8ea26",
            "CF-Cache-Status",
            "DYNAMIC",
            "Content-Security-Policy",
            "upgrade-insecure-requests",
            "Referrer-Policy",
            "strict-origin-when-cross-origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Content-Type-Options",
            "nosniff",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-XSS-Protection",
            "0",
            "Server",
            "cloudflare",
            "CF-RAY",
            "8437ee4aaac01cc0-BUD",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation UpdateManyPosts($where: posts_bool_exp!, $_set: posts_set_input!) {\n  update_posts(where: $where, _set: $_set) {\n    returning {\n      id\n    }\n  }\n}\n",
        variables: {
            where: {
                id: {
                    _in: [
                        "b8a4c5ee-16a0-4c90-bc8d-84ae7085c575",
                        "71cc13bf-6261-4cd4-a892-22250eb0f6b3",
                    ],
                },
            },
            _set: {
                title: "Multiple Updated Title",
                content: "Multiple Updated Content",
            },
        },
        operationName: "UpdateManyPosts",
    })
    .reply(
        200,
        {
            data: {
                update_posts: {
                    returning: [
                        { id: "b8a4c5ee-16a0-4c90-bc8d-84ae7085c575" },
                        { id: "71cc13bf-6261-4cd4-a892-22250eb0f6b3" },
                    ],
                },
            },
        },
        [
            "Date",
            "Wed, 10 Jan 2024 21:14:41 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "136",
            "Connection",
            "close",
            "x-request-id",
            "2a574a8d222b73ef5304d10adf395d2b",
            "CF-Cache-Status",
            "DYNAMIC",
            "Content-Security-Policy",
            "upgrade-insecure-requests",
            "Referrer-Policy",
            "strict-origin-when-cross-origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Content-Type-Options",
            "nosniff",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-XSS-Protection",
            "0",
            "Server",
            "cloudflare",
            "CF-RAY",
            "8437ee53dc7268b3-BUD",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation UpdateManyPosts($where: PostsBoolExp!, $_set: PostsSetInput!) {\n  updatePosts(where: $where, _set: $_set) {\n    returning {\n      id\n      id\n      title\n      content\n    }\n  }\n}\n",
        variables: {
            where: {
                id: {
                    _in: [
                        "4ec22cb3-b679-4891-a489-3d19cf275ab3",
                        "ae316d48-025a-47db-b4c0-ff4694f52c85",
                    ],
                },
            },
            _set: { content: "Updated Content" },
        },
        operationName: "UpdateManyPosts",
    })
    .reply(
        200,
        {
            data: {
                updatePosts: {
                    returning: [
                        {
                            id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
                            title: "Aenean ultricies non libero sit amet pellentesque",
                            content: "Updated Content",
                        },
                        {
                            id: "ae316d48-025a-47db-b4c0-ff4694f52c85",
                            title: "Etiam tincidunt ex ut auctor faucibus",
                            content: "Updated Content",
                        },
                    ],
                },
            },
        },
        [
            "Date",
            "Wed, 10 Jan 2024 21:14:42 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "299",
            "Connection",
            "close",
            "x-request-id",
            "e0863cdcff3c7bfabd2d4dc2675d83ad",
            "CF-Cache-Status",
            "DYNAMIC",
            "Content-Security-Policy",
            "upgrade-insecure-requests",
            "Referrer-Policy",
            "strict-origin-when-cross-origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Content-Type-Options",
            "nosniff",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-XSS-Protection",
            "0",
            "Server",
            "cloudflare",
            "CF-RAY",
            "8437ee58bc4e1cfa-BUD",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation UpdateManyPosts($where: PostsBoolExp!, $_set: PostsSetInput!) {\n  updatePosts(where: $where, _set: $_set) {\n    returning {\n      id\n    }\n  }\n}\n",
        variables: {
            where: {
                id: {
                    _in: [
                        "3d71a408-ac30-41f2-b530-3fe951b16b86",
                        "9cff1379-349e-4a4c-b436-b18d12857c5c",
                    ],
                },
            },
            _set: {
                title: "Multiple Updated Title",
                content: "Multiple Updated Content",
            },
        },
        operationName: "UpdateManyPosts",
    })
    .reply(
        200,
        {
            data: {
                updatePosts: {
                    returning: [
                        { id: "3d71a408-ac30-41f2-b530-3fe951b16b86" },
                        { id: "9cff1379-349e-4a4c-b436-b18d12857c5c" },
                    ],
                },
            },
        },
        [
            "Date",
            "Wed, 10 Jan 2024 21:14:43 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "135",
            "Connection",
            "close",
            "x-request-id",
            "6f993810d1589312e8eb2d33d8ddb1da",
            "CF-Cache-Status",
            "DYNAMIC",
            "Content-Security-Policy",
            "upgrade-insecure-requests",
            "Referrer-Policy",
            "strict-origin-when-cross-origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Content-Type-Options",
            "nosniff",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-XSS-Protection",
            "0",
            "Server",
            "cloudflare",
            "CF-RAY",
            "8437ee6248101cee-BUD",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation UpdateManyPosts($ids: [uuid!]!, $_set: posts_set_input!) {\n  update_posts(where: {id: {_in: $ids}}, _set: $_set) {\n    returning {\n      id\n      title\n      content\n    }\n  }\n}\n",
        variables: {
            ids: [
                "85e2f56d-53e9-4d43-8099-4c7622c8e8e1",
                "881a45fd-a5da-46f4-a045-58eeb647862f",
            ],
            _set: { content: "Updated Content" },
        },
        operationName: "UpdateManyPosts",
    })
    .reply(
        200,
        {
            data: {
                update_posts: {
                    returning: [
                        {
                            id: "85e2f56d-53e9-4d43-8099-4c7622c8e8e1",
                            title: "Aenean ultricies non libero sit amet pellentesque",
                            content: "Updated Content",
                        },
                        {
                            id: "881a45fd-a5da-46f4-a045-58eeb647862f",
                            title: "Etiam tincidunt ex ut auctor faucibus",
                            content: "Updated Content",
                        },
                    ],
                },
            },
        },
        [
            "Date",
            "Wed, 10 Jan 2024 21:14:44 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "300",
            "Connection",
            "close",
            "x-request-id",
            "2d88db3eecc9b580d37abeb167d4f79d",
            "CF-Cache-Status",
            "DYNAMIC",
            "Content-Security-Policy",
            "upgrade-insecure-requests",
            "Referrer-Policy",
            "strict-origin-when-cross-origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Content-Type-Options",
            "nosniff",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-XSS-Protection",
            "0",
            "Server",
            "cloudflare",
            "CF-RAY",
            "8437ee67dbdb733b-BUD",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation UpdateManyPosts($ids: [uuid!]!, $_set: PostsSetInput!) {\n  updatePosts(where: {id: {_in: $ids}}, _set: $_set) {\n    returning {\n      id\n      title\n      content\n    }\n  }\n}\n",
        variables: {
            ids: [
                "4ec22cb3-b679-4891-a489-3d19cf275ab3",
                "ae316d48-025a-47db-b4c0-ff4694f52c85",
            ],
            _set: { content: "Updated Content" },
        },
        operationName: "UpdateManyPosts",
    })
    .reply(
        200,
        {
            data: {
                updatePosts: {
                    returning: [
                        {
                            id: "4ec22cb3-b679-4891-a489-3d19cf275ab3",
                            title: "Aenean ultricies non libero sit amet pellentesque",
                            content: "Updated Content",
                        },
                        {
                            id: "ae316d48-025a-47db-b4c0-ff4694f52c85",
                            title: "Etiam tincidunt ex ut auctor faucibus",
                            content: "Updated Content",
                        },
                    ],
                },
            },
        },
        [
            "Date",
            "Wed, 10 Jan 2024 21:14:45 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "299",
            "Connection",
            "close",
            "x-request-id",
            "01ff0dc515ac47da068721acc83ed799",
            "CF-Cache-Status",
            "DYNAMIC",
            "Content-Security-Policy",
            "upgrade-insecure-requests",
            "Referrer-Policy",
            "strict-origin-when-cross-origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Content-Type-Options",
            "nosniff",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-XSS-Protection",
            "0",
            "Server",
            "cloudflare",
            "CF-RAY",
            "8437ee6c186a6847-BUD",
        ],
    );
