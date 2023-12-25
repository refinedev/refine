import nock from "nock";

nock("http://localhost:3003", { encodedQueryParams: true })
    .post("/graphql", {
        query: "query BlogPostAggregate {\n  blogPostAggregate {\n    groupBy {\n      status\n    }\n    count {\n      status\n    }\n  }\n}\n",
        variables: {},
        operationName: "BlogPostAggregate",
    })
    .reply(
        200,
        {
            data: {
                blogPostAggregate: [
                    { groupBy: { status: "DRAFT" }, count: { status: 327 } },
                    {
                        groupBy: { status: "PUBLISHED" },
                        count: { status: 330 },
                    },
                    { groupBy: { status: "REJECTED" }, count: { status: 341 } },
                ],
            },
        },
        [
            "X-Powered-By",
            "Express",
            "cache-control",
            "no-store",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "202",
            "ETag",
            'W/"ca-6w/o6KLhG7ECL6B1j+01HCRQ2WI"',
            "Date",
            "Tue, 08 Aug 2023 11:40:35 GMT",
            "Connection",
            "close",
        ],
    );

nock("http://localhost:3003", { encodedQueryParams: true })
    .post("/graphql", {
        query: "query GetAllBlogPosts($sorting: [BlogPostSort!], $filter: BlogPostFilter!, $paging: OffsetPaging!) {\n  sorted: blogPosts(sorting: $sorting, paging: $paging) {\n    nodes {\n      id\n      title\n      createdAt\n    }\n  }\n  filtered: blogPosts(filter: $filter) {\n    nodes {\n      id\n    }\n  }\n}\n",
        variables: {
            sorting: [
                {
                    field: "id",
                    direction: "ASC",
                },
            ],
            filter: {
                id: {
                    eq: 1,
                },
            },
            paging: {
                limit: 2,
                offset: 0,
            },
        },
        operationName: "GetAllBlogPosts",
    })
    .reply(
        200,
        {
            data: {
                sorted: {
                    nodes: [
                        {
                            id: "1",
                            title: "updated-foo-3asdadsasd",
                            createdAt: "2023-08-08T08:40:24.554Z",
                        },
                        {
                            id: "2",
                            title: "updated-foo-2qwdqwdqwd",
                            createdAt: "2023-08-08T08:40:24.558Z",
                        },
                    ],
                },
                filtered: { nodes: [{ id: "1" }] },
            },
        },
        [
            "X-Powered-By",
            "Express",
            "Access-Control-Allow-Origin",
            "*",
            "cache-control",
            "no-store",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "232",
            "ETag",
            'W/"e8-BmQnXB76cWxgdpzFJzlbXG/5e40"',
            "Date",
            "Wed, 09 Aug 2023 09:59:49 GMT",
            "Connection",
            "close",
        ],
    );

nock("http://localhost:3003", { encodedQueryParams: true })
    .post("/graphql", {
        query: "mutation UpdateManyBlogPosts($input: UpdateManyBlogPostsInput!) {\n  updateManyBlogPosts(input: $input) {\n    updatedCount\n  }\n}\n",
        variables: {
            input: {
                value: {
                    filter: {
                        id: {
                            in: ["42"],
                        },
                    },
                    update: {
                        status: "REJECTED",
                    },
                },
                type: "UpdateManyBlogPostsInput",
                required: true,
            },
        },
        operationName: "UpdateManyBlogPosts",
    })
    .reply(200, { data: { updateManyBlogPosts: { updatedCount: 1 } } }, [
        "X-Powered-By",
        "Express",
        "cache-control",
        "no-store",
        "Content-Type",
        "application/json; charset=utf-8",
        "Content-Length",
        "52",
        "ETag",
        'W/"34-q7TcgM8PgtPGtmI2KSKG50FWvSI"',
        "Date",
        "Tue, 08 Aug 2023 11:40:35 GMT",
        "Connection",
        "close",
    ]);

nock("http://localhost:3003", { encodedQueryParams: true })
    .post("/graphql", {
        query: "query  { blogPostAggregate  { groupBy { status }, count { status } } }",
        variables: {},
    })
    .reply(
        200,
        {
            data: {
                blogPostAggregate: [
                    { groupBy: { status: "DRAFT" }, count: { status: 327 } },
                    {
                        groupBy: { status: "PUBLISHED" },
                        count: { status: 330 },
                    },
                    { groupBy: { status: "REJECTED" }, count: { status: 341 } },
                ],
            },
        },
        [
            "X-Powered-By",
            "Express",
            "cache-control",
            "no-store",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "202",
            "ETag",
            'W/"ca-6w/o6KLhG7ECL6B1j+01HCRQ2WI"',
            "Date",
            "Tue, 08 Aug 2023 11:40:35 GMT",
            "Connection",
            "close",
        ],
    );

nock("http://localhost:3003", { encodedQueryParams: true })
    .post("/graphql", {
        query: "\n                    query GetAllBlogPosts(\n                        $sorting: [BlogPostSort!]\n                        $filter: BlogPostFilter!\n                        $paging: OffsetPaging!\n                      ) {\n                        sorted: blogPosts(sorting: $sorting, paging: $paging) {\n                          nodes {\n                            id\n                            title\n                            createdAt\n                          }\n                        }\n                        filtered: blogPosts(filter: $filter) {\n                          nodes {\n                            id\n                          }\n                        }\n                      }\n                ",
        variables: {
            sorting: [{ field: "id", direction: "ASC" }],
            filter: { id: { eq: 1 } },
            paging: { limit: 2, offset: 0 },
        },
        operationName: "GetAllBlogPosts",
    })
    .reply(
        200,
        {
            data: {
                sorted: {
                    nodes: [
                        {
                            id: "1",
                            title: "updated-foo-3asdadsasd",
                            createdAt: "2023-08-08T08:40:24.554Z",
                        },
                        {
                            id: "2",
                            title: "updated-foo-2qwdqwdqwd",
                            createdAt: "2023-08-08T08:40:24.558Z",
                        },
                    ],
                },
                filtered: { nodes: [{ id: "1" }] },
            },
        },
        [
            "X-Powered-By",
            "Express",
            "Access-Control-Allow-Origin",
            "*",
            "cache-control",
            "no-store",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "232",
            "ETag",
            'W/"e8-BmQnXB76cWxgdpzFJzlbXG/5e40"',
            "Date",
            "Wed, 09 Aug 2023 09:59:49 GMT",
            "Connection",
            "close",
        ],
    );

nock("http://localhost:3003", { encodedQueryParams: true })
    .post("/graphql", {
        query: "mutation ($input: UpdateManyBlogPostsInput!) {\n      updateManyBlogPosts (input: $input) {\n    updatedCount\n  }\n    }",
        variables: {
            input: {
                filter: { id: { in: ["42"] } },
                update: { status: "REJECTED" },
            },
        },
    })
    .reply(200, { data: { updateManyBlogPosts: { updatedCount: 1 } } }, [
        "X-Powered-By",
        "Express",
        "cache-control",
        "no-store",
        "Content-Type",
        "application/json; charset=utf-8",
        "Content-Length",
        "52",
        "ETag",
        'W/"34-q7TcgM8PgtPGtmI2KSKG50FWvSI"',
        "Date",
        "Tue, 08 Aug 2023 11:40:35 GMT",
        "Connection",
        "close",
    ]);
