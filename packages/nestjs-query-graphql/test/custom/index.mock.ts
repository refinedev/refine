import nock from "nock";

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
