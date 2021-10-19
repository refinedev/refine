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
            "1f8b08000000000004036d4e4b0e832010bd0a997569ac82a867e81dcc004343a262605c34a6772feda2abbed5fb26ef048f8c309d10b74299e73d152e73dae8eb79988046b24446494dc148d5682dadb5286d68fba6bd759a5c0b17e0c84b1dc13d655a45dccbb10a9f96aa6a5818f92835f5190357c3a58d69e37f7d51220b5c89af9f1e323d527efede7437e30835c940a1936ad0831c1a55991a7bd2ce048d165e156fef5e19a9da000000",
        ],
        [
            "Date",
            "Mon, 18 Oct 2021 12:11:21 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "858d4d8fe96ba79623009d2519b62375",
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
            "6a01ab263aef5488-IST",
        ],
    );
