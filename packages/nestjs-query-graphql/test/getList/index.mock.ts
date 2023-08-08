import nock from "nock";

nock("http://localhost:3003", { encodedQueryParams: true })
    .post("/graphql", {
        query: "query  { blogPosts  { nodes { id, title }, totalCount } }",
        variables: {},
    })
    .reply(
        200,
        {
            data: {
                blogPosts: {
                    nodes: [
                        {
                            id: "1",
                            title: "Dignissimos voluptas fugiat corporis veniam.",
                        },
                        {
                            id: "2",
                            title: "Nihil consequatur nesciunt architecto cupiditate repellat ad nobis quod iure.",
                        },
                        { id: "3", title: "In fugit dolores saepe." },
                        {
                            id: "4",
                            title: "Exercitationem expedita magnam sunt mollitia repellendus nostrum.",
                        },
                        { id: "5", title: "Aperiam cum nihil." },
                        {
                            id: "6",
                            title: "Laboriosam laboriosam voluptatum repellendus eius.",
                        },
                        {
                            id: "7",
                            title: "Maiores repellendus totam magnam cupiditate deserunt odio itaque repudiandae.",
                        },
                        {
                            id: "8",
                            title: "Quasi expedita modi minus laborum sit veniam.",
                        },
                        { id: "9", title: "Est placeat asperiores." },
                        {
                            id: "10",
                            title: "Aliquam repellat veritatis sapiente.",
                        },
                    ],
                    totalCount: 998,
                },
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
            "731",
            "ETag",
            'W/"2db-bpmF41EtynDnEkYUMa/CQH8gxVA"',
            "Date",
            "Tue, 08 Aug 2023 11:40:35 GMT",
            "Connection",
            "close",
        ],
    );

nock("http://localhost:3003", { encodedQueryParams: true })
    .post("/graphql", {
        query: "query ($sorting: [BlogPostSort!]!) { blogPosts (sorting: $sorting) { nodes { id }, totalCount } }",
        variables: { sorting: [{ field: "id", direction: "DESC" }] },
    })
    .reply(
        200,
        {
            data: {
                blogPosts: {
                    nodes: [
                        { id: "1000" },
                        { id: "999" },
                        { id: "998" },
                        { id: "997" },
                        { id: "996" },
                        { id: "995" },
                        { id: "994" },
                        { id: "993" },
                        { id: "992" },
                        { id: "991" },
                    ],
                    totalCount: 998,
                },
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
            "183",
            "ETag",
            'W/"b7-v3Q1z5D9xQCE0C3GlHmE1xg9KxY"',
            "Date",
            "Tue, 08 Aug 2023 11:40:35 GMT",
            "Connection",
            "close",
        ],
    );

nock("http://localhost:3003", { encodedQueryParams: true })
    .post("/graphql", {
        query: "query ($sorting: [BlogPostSort!]!) { blogPosts (sorting: $sorting) { nodes { id, status }, totalCount } }",
        variables: {
            sorting: [
                { field: "status", direction: "ASC" },
                { field: "id", direction: "DESC" },
            ],
        },
    })
    .reply(
        200,
        {
            data: {
                blogPosts: {
                    nodes: [
                        { id: "1000", status: "DRAFT" },
                        { id: "996", status: "DRAFT" },
                        { id: "995", status: "DRAFT" },
                        { id: "992", status: "DRAFT" },
                        { id: "983", status: "DRAFT" },
                        { id: "982", status: "DRAFT" },
                        { id: "981", status: "DRAFT" },
                        { id: "980", status: "DRAFT" },
                        { id: "979", status: "DRAFT" },
                        { id: "978", status: "DRAFT" },
                    ],
                    totalCount: 998,
                },
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
            "353",
            "ETag",
            'W/"161-EEcnFnxWPCem+wdElkJM8ipMgC4"',
            "Date",
            "Tue, 08 Aug 2023 11:40:35 GMT",
            "Connection",
            "close",
        ],
    );

nock("http://localhost:3003", { encodedQueryParams: true })
    .post("/graphql", {
        query: "query ($paging: OffsetPaging!) { blogPosts (paging: $paging) { nodes { id }, totalCount } }",
        variables: { paging: { limit: 10, offset: 10 } },
    })
    .reply(
        200,
        {
            data: {
                blogPosts: {
                    nodes: [
                        { id: "11" },
                        { id: "12" },
                        { id: "13" },
                        { id: "14" },
                        { id: "15" },
                        { id: "16" },
                        { id: "17" },
                        { id: "18" },
                        { id: "19" },
                        { id: "20" },
                    ],
                    totalCount: 998,
                },
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
            "172",
            "ETag",
            'W/"ac-haaSFYaYjwpY8NZjZRRQW07x2Bk"',
            "Date",
            "Tue, 08 Aug 2023 11:40:35 GMT",
            "Connection",
            "close",
        ],
    );

nock("http://localhost:3003", { encodedQueryParams: true })
    .post("/graphql", {
        query: "query ($filter: BlogPostFilter!) { blogPosts (filter: $filter) { nodes { id, title }, totalCount } }",
        variables: { filter: { id: { eq: "1" } } },
    })
    .reply(
        200,
        {
            data: {
                blogPosts: {
                    nodes: [
                        {
                            id: "1",
                            title: "Dignissimos voluptas fugiat corporis veniam.",
                        },
                    ],
                    totalCount: 1,
                },
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
            "116",
            "ETag",
            'W/"74-JbrEI/QMVTMz+/nfoTrJ9BsOks4"',
            "Date",
            "Tue, 08 Aug 2023 11:40:35 GMT",
            "Connection",
            "close",
        ],
    );

nock("http://localhost:3003", { encodedQueryParams: true })
    .post("/graphql", {
        query: "query ($filter: BlogPostFilter!) { blogPosts (filter: $filter) { nodes { id, status }, totalCount } }",
        variables: { filter: { id: { lt: 10 }, status: { eq: "DRAFT" } } },
    })
    .reply(
        200,
        {
            data: {
                blogPosts: {
                    nodes: [
                        { id: "1", status: "DRAFT" },
                        { id: "3", status: "DRAFT" },
                        { id: "4", status: "DRAFT" },
                        { id: "5", status: "DRAFT" },
                    ],
                    totalCount: 4,
                },
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
            "162",
            "ETag",
            'W/"a2-mOPA0LFfDj3gsFCKBo/PEo20G5s"',
            "Date",
            "Tue, 08 Aug 2023 11:40:35 GMT",
            "Connection",
            "close",
        ],
    );
