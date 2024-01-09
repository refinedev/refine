import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($object: posts_insert_input!) {\n      insert_posts_one (object: $object) {\n    id, title, content, category { id }\n  }\n    }",
        variables: {
            object: {
                content: "Lorem ipsum dolor sit amet.",
                title: "Lorem ipsum dolore",
                category_id: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000000036c8d410ac3201000bf227b8ec52412346fe81fc2aa6b11120dba3d94e0df4b7be8a9d79981b9202023ac17a4dca8f27696c66d2b99be2cc00a7e192785c6ca60c7516aa38cb4da45498a627466f6e8220cc089778215eea5d221d2d99e8708652f9560005f3253e67f5ab4c4020fe2dba743a647a9afdf9ca2b6482e4874de4bedd04ba7162d7199dd3cc6898c27e8bdf737000000ffff0300ddcef1ebc9000000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 07:32:44 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "ae7fa9b6bcd80753256272f8f67e155a",
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
            "7f151baa5d0392cf-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($object: PostsInsertInput!) {\n      insertPostsOne (object: $object) {\n    id, title, content, category { id }\n  }\n    }",
        variables: {
            object: {
                content: "Lorem ipsum dolor sit amet.",
                title: "Lorem ipsum dolore",
                categoryId: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000000036c8d4b0ac2301040af1266dd486cd2ef1904bdc24c329540db48322ea4e4eea20b576edf7bf00e082808f301712f9ce5968a94ebce5f1260066bce6e0abdd13e70ab9de551e340adeea81bed128c271aa00189b232cc70499937151fe5b9a990d694191af06917dee59f56258ac28de5f4e950f89ef2eb37e7c54dc8143492f7da117a4da6771a7b4bf6bcb43c7a865a6b7d030000ffff03003d0f627cc7000000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 07:32:44 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "3717565044823507629ad789cd729018",
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
            "7f151baf8a165488-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

// correct response with hasura-default & gqlQuery
nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation CreatePost($object: posts_insert_input!) {\n  insert_posts_one(object: $object) {\n    id\n    title\n    content\n    category {\n      id\n    }\n  }\n}\n",
        variables: {
            object: {
                content: "Lorem ipsum dolor sit amet.",
                title: "Lorem ipsum dolore",
                category_id: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
            },
        },
        operationName: "CreatePost",
    })
    .reply(
        200,
        [
            "1f8b08000000000000036c8d410ac3201000bf227b8ec52412346fe81fc2aa6b11120dba3d94e0df4b7be8a9d79981b9202023ac17a4dca8f27696c66d2b99be2cc00a7e192785c6ca60c7516aa38cb4da45498a627466f6e8220cc089778215eea5d221d2d99e8708652f9560005f3253e67f5ab4c4020fe2dba743a647a9afdf9ca2b6482e4874de4bedd04ba7162d7199dd3cc6898c27e8bdf737000000ffff0300ddcef1ebc9000000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 07:32:44 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "ae7fa9b6bcd80753256272f8f67e155a",
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
            "7f151baa5d0392cf-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

// correct response with hasura-default & gqlMutation
nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation CreatePost($object: posts_insert_input!) {\n  insert_posts_one(object: $object) {\n    id\n    title\n    content\n    category {\n      id\n    }\n  }\n}\n",
        variables: {
            object: {
                content: "Lorem ipsum dolor sit amet.",
                title: "Lorem ipsum dolore",
                category_id: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
            },
        },
        operationName: "CreatePost",
    })
    .reply(
        200,
        [
            "1f8b08000000000000036c8d410ec2201000bf42f65c4c6d29d2bec13f340b2c86a48506d68369f8bbd19307af3393cc091e19613921a64a85d72357ae6b4ef4651e16a0303b8d7493579a8c54361889ce38d96bd243b0d49bc943071c792358e09e0bed221ef5b90b9fb75c083a70393125fea7458d2c7027be7c3a647ae4f2fa99ab19c97a89d639a92c3a697bad24ead18ed730907104adb5f6060000ffff",
            "0300aa4b5946c9000000",
        ],
        [
            "Date",
            "Tue, 09 Jan 2024 08:49:19 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "2f2533186fc7d2c6679ef37e6fb69740",
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
            "842b6d156a831cb8-BUD",
            "Content-Encoding",
            "gzip",
        ],
    );

// correct response with graphql-default & gqlQuery
nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation CreatePost($object: PostsInsertInput!) {\n  insertPostsOne(object: $object) {\n    id\n    title\n    content\n    category {\n      id\n    }\n  }\n}\n",
        variables: {
            object: {
                content: "Lorem ipsum dolor sit amet.",
                title: "Lorem ipsum dolore",
                categoryId: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
            },
        },
        operationName: "CreatePost",
    })
    .reply(
        200,
        [
            "1f8b08000000000000036c8d4b0ac2301040af1266dd486cd2ef1904bdc24c329540db48322ea4e4eea20b576edf7bf00e082808f301712f9ce5968a94ebce5f1260066bce6e0abdd13e70ab9de551e340adeea81bed128c271aa00189b232cc70499937151fe5b9a990d694191af06917dee59f56258ac28de5f4e950f89ef2eb37e7c54dc8143492f7da117a4da6771a7b4bf6bcb43c7a865a6b7d030000ffff03003d0f627cc7000000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 07:32:44 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "3717565044823507629ad789cd729018",
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
            "7f151baf8a165488-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

// correct response with graphql-default & gqlMutation
nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation CreatePost($object: PostsInsertInput!) {\n  insertPostsOne(object: $object) {\n    id\n    title\n    content\n    category {\n      id\n    }\n  }\n}\n",
        variables: {
            object: {
                content: "Lorem ipsum dolor sit amet.",
                title: "Lorem ipsum dolore",
                categoryId: "ef49aebd-abcc-4bac-b064-a63b31f2e8ce",
            },
        },
        operationName: "CreatePost",
    })
    .reply(
        200,
        [
            "1f8b08000000000000036c8d410ec2201000bf42f65c4c11c4d23798e81716580c495b0cac07d3f077a3074f5e6726991d2232c2bc43de1a55be95c6edbad1974498c107eb122927d19196468d493aad4ff23c69eb51598b93860138f34230c3a5545a457eb4e72a62594a251820948d69e37f5ab4cc0257e2c3a743a67ba9afdf9c9271483e4af42148e331483f5a23d16aaf553ad214087aeffd0d0000ffff030064ea9370c7000000",
        ],
        [
            "Date",
            "Tue, 09 Jan 2024 08:52:59 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "c7ac1681970305b08f67addd874e8046",
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
            "842b7278b8ab1cd0-BUD",
            "Content-Encoding",
            "gzip",
        ],
    );
