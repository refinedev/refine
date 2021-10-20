import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($object: posts_insert_input!) {\n  insert_posts_one (object: $object) {\n    id, title, status, content, category { id }\n  }\n}",
        variables: {
            object: {
                content: "Lorem ipsum dolor sit amet.",
                title: "Lorem ipsum dolore",
                status: "draft",
                category_id: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004036d4e4b0e823010bd4a336b6b100a2d9cc13b902933352440493b2c0cf1ee5617ae7cabf74dde098482309c306f99938c7bcc92c7b8f1d72318002d4d641ceb867bab4df05efb8a9c36445d5dbba6bbf5355c406659ca08ee31f1aae63d1faba2b81455c22c28472e29250c528c296ec29bfcebab3c8bc295e5fae9a1f023a6e7ef4d73b31363cb3a7068b471add3ae328599bee376b2a1450faf82376686fc62da000000",
        ],
        [
            "Date",
            "Wed, 20 Oct 2021 08:54:55 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "ed1c6b999ca3b808ce33c95f2a7556bb",
            "Content-Encoding",
            "gzip",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "CF-Cache-Status",
            "DYNAMIC",
            "Expect-CT",
            'max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"',
            "Server",
            "cloudflare",
            "CF-RAY",
            "6a11062c4f3f5482-IST",
        ],
    );
