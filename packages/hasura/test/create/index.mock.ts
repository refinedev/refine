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
