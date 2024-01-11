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
            "Thu, 11 Jan 2024 06:15:04 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "300",
            "Connection",
            "close",
            "x-request-id",
            "ee9bab5c488b2f420080329c67dd6ef8",
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
            "843b05e92e5068bb-BUD",
        ],
    );

console.log;

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
            "Thu, 11 Jan 2024 06:15:06 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "136",
            "Connection",
            "close",
            "x-request-id",
            "8582699cf0f3e6a5aed4ae39cba6fdbd",
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
            "843b05f20c2d684c-BUD",
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
            "Thu, 11 Jan 2024 06:15:07 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "299",
            "Connection",
            "close",
            "x-request-id",
            "78ef5ca6e5468114245e0cbf5a6d45a5",
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
            "843b05fa0e97c1cd-BUD",
        ],
    );

console.log;

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
            "Thu, 11 Jan 2024 06:15:09 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "135",
            "Connection",
            "close",
            "x-request-id",
            "0bd52cc399544193096d3fa046e6c6c1",
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
            "843b06038bc568b6-BUD",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation UpdateManyPosts($where: posts_bool_exp!, $_set: posts_set_input!) {\n  update_posts(where: $where, _set: $_set) {\n    returning {\n      id\n      title\n      content\n    }\n  }\n}\n",
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
            "Thu, 11 Jan 2024 06:15:49 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "300",
            "Connection",
            "close",
            "x-request-id",
            "4d43d1e6215ee62450c38cba8386ea10",
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
            "843b06fca96cc1a8-BUD",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation UpdateManyPosts($where: PostsBoolExp!, $_set: PostsSetInput!) {\n  updatePosts(where: $where, _set: $_set) {\n    returning {\n      id\n      title\n      content\n    }\n  }\n}\n",
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
            "Thu, 11 Jan 2024 06:15:50 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "299",
            "Connection",
            "close",
            "x-request-id",
            "87926d08abd83ccb70dc141eebd4761e",
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
            "843b0705d87e03bf-BUD",
        ],
    );
