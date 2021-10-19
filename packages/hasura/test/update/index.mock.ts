import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($pk_columns: posts_pk_columns_input!, $_set: posts_set_input!) {\n  update_posts_by_pk (pk_columns: $pk_columns, _set: $_set) {\n    id, title, content, category { id }\n  }\n}",
        variables: {
            pk_columns: { id: "c82c71c5-0f0b-4042-b9a3-db977fe28a83" },
            _set: {
                title: "E-business alarm Bedfordshire",
                content: "Updated Content",
                category_id: "4653050e-f969-4d58-939b-ece4c17aa506",
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004033d8e4d0ec2201484afd2b0f625b440812e351ec175c3cf4389da3640174de3dd45639cd564e64b6676e24d3164d8c9ba5487e332e79247bb8dcbfd93464f06e254e764eb04d0402d70ca3bb0da30f0564b19b0534631722025960756fc0c76cd71c29c1bf330e9d91cd18739f97c8b092be7e6a9e0542a79f96efae6f44b6a573f5ce7b4fdb7792f18151421e85e03f7428166da023ae4ae95c608da9357d51b6be3c99aca000000",
        ],
        [
            "Date",
            "Tue, 19 Oct 2021 12:00:15 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "722f3b2006b32a2489764d005ca7f668",
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
            "6a09d847da925482-IST",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($pk_columns: posts_pk_columns_input!, $_set: posts_set_input!) {\n  update_posts_by_pk (pk_columns: $pk_columns, _set: $_set) {\n    id\n  }\n}",
        variables: {
            pk_columns: { id: "ecd7aa21-19f4-46c9-bc3e-227dcd0807fd" },
            _set: { title: "E-business alarm" },
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000403ab564a492c4954b2aa562a2d00b252e30bf28b4b8ae3932ae30bb241a299294a564aa9c929e689894686ba86966926ba2666c996ba49c9c6a9ba4646e629c929061606e669294ab5b5b5002b8c06984d000000",
        ],
        [
            "Date",
            "Tue, 19 Oct 2021 12:13:00 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "eea46c21addfabe5edcdcf7fc96eb00a",
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
            "6a09eaf438405482-IST",
        ],
    );
