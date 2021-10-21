import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($objects: [posts_insert_input!]!) {\n  insert_posts (objects: $objects) {\n    returning { id, title, content, status, category { id } }\n  }\n}",
        variables: {
            objects: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    status: "draft",
                    category_id: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    status: "draft",
                    category_id: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
            ],
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000403ad8fc14ec33010447f65e533464d9d38496f3df00b5c10426b7b5d2cb94e6aaf11a8cabfe35670e0ce69677767a47957e190511cae22a44299dfd6a570b9ed99b8e614d249c0015edadf898350ae331da99d44a795ec7756c9c99396a39995433793c5413c080e1ca9d98f940813d4c839d84005d29220064379811218f04c0c2bc54889a95c2ab5ac5d9a4edcd2cf5438981aeb193e6a5c2b2313145c0325c06ceb63739776acadaf70193ddfe2cd745af2d71de95eb91b2de140d2936f95a76192d3ae6faa9f350d76f4031ab16d0ff08338755ed969de4b3d9391bd4627d10cbdd4da4c831a3bb5f7b79abf884f1cf00c1c920dae2606fa84dac0aae525836fb311943f58c7182eb5655230ef4019f95f395eb76dfb064aa383e5d5010000",
        ],
        [
            "Date",
            "Mon, 18 Oct 2021 13:37:34 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "792054bf9c36fd2f2f9c822d2a6f0962",
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
            "6a0229720ce75488-IST",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($objects: [posts_insert_input!]!) {\n  insert_posts (objects: $objects) {\n    returning { id }\n  }\n}",
        variables: {
            objects: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    status: "draft",
                    category_id: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    status: "draft",
                    category_id: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
            ],
        },
    })
    .reply(
        200,
        [
            "1f8b080000000000040335ca410e02210c40d1ab90ae6dc2402185ab186380a2990d1ac0d584bb3b2e5cbefc7f80a499201eb0b751fbbcbf5f638e9f7b9d9fdef6f60415d5f5ec0211980c27f1090d0583548a412611d4a18adecac3b3635817f5df6db13ab14357b34722da3057ed514e661bd8b01358b7b5d617fdbb0d1688000000",
        ],
        [
            "Date",
            "Tue, 19 Oct 2021 06:51:58 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "f8f2fdd27b989b4960ea559b99842e69",
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
            "6a0814b35fa35493-IST",
        ],
    );
