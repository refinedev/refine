import nock from "nock";

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
    .post("/graphql", {
        query: "query ($where: JSON, $sort: String, $start: Int, $limit: Int) { postsConnection (where: $where) { aggregate { count } } posts (sort: $sort, where: $where, start: $start, limit: $limit) { id, title } }",
        variables: { where: {}, start: 0, limit: 10 },
    })
    .reply(
        200,
        [
            "1f8b0800000000000003a452c14a033110bdfb1521e722adb255f726f5282278140f633294816c9266264528fbef4eda5277e9d16332f3debcf7660ed68380ed0f362716dea418d109a5d8be60bb2db805c1f670a946b1fdd3e3382e4ecdb6ff3c58f2b6b7ab65b7b40b2b24417bed5b1d76150603ce5586a1b2014f99d89141b9b5e3e2025b4f612f1874b67647dc5534054b1d4cac2180d963d03739c2e88967140f530af6e0ff8aebeedfecdd6a42f10ad543145220482301e35264e503a9e56cf754df5582b9d329d173a06340053386a0535b44ed8fbc19524016029cbb9cc25733857793ca7b62a616784cd14015d50158408e7aae045ed632573a25dca49253216efd7c02317ac3555199c4e808cadc02395b4ace013a10ba8ea0bb9f107f28187f722007dfc920b438d5b7d9a750b3e8cdf179393abe2493b21ea5ae4ec7ea192aedd738defc020000ffff",
            "03005c04f04cbd020000",
        ],
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Mon, 11 Oct 2021 12:28:21 GMT",
            "Content-Type",
            "application/json",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "Vary",
            "Accept-Encoding",
            "Vary",
            "Origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-Powered-By",
            "Strapi <strapi.io>",
            "X-Response-Time",
            "108ms",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
    .post("/graphql", {
        query: "query ($where: JSON, $sort: String, $start: Int, $limit: Int) { postsConnection (where: $where) { aggregate { count } } posts (sort: $sort, where: $where, start: $start, limit: $limit) { id, title } }",
        variables: { where: {}, sort: "id:asc", start: 0, limit: 10 },
    })
    .reply(
        200,
        [
            "1f8b08000000000000035c92bd6e5b310c85f73c05a1d908e23849636f4533a45b5b742b3a30ba8441407fbe248d02c67df7508983ca1929f17c3a3cd4294ca81876a7d0aaa87caba55054aea51fe17e3fd31e957a11ab150dbbede3b2acde9bc3eecf29f01476e1e13eac82b226ef0c4f941c6102850e4630d36c198aa58470a4e43547a632b15c87657506ac6fd703e199234c35d5998073a38915d014848b42a9a563fa91886507e1c8d9dc0d9cdf945b8790c2c1580e86d921bda802b1167183a8360361775a63448aa83c02efc6d1bec2b1266b8af26668447c5c8cdafb9b41fb8366693ebaf3a53be226f8dfd6910a631ec55fb683f8a731a07693f4c97ae6c219c1ddbc25e6f1364ac963b10b2b8feb4b1ac20bf9e2c9536c34b3a7e4a6b06f6a22f18d15bd503f0cea5fd46c62f4e009fa563390088deddbcdd0feddfa06e4ecaf3ff38fe6c88afd9751ee11bc984c8e39370ca4db9bcdc5c31f3fa78bd0478d26ef3e32f259fa7759ae5e010000ffff",
            "0300af850133d5020000",
        ],
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Mon, 11 Oct 2021 12:34:04 GMT",
            "Content-Type",
            "application/json",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "Vary",
            "Accept-Encoding",
            "Vary",
            "Origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-Powered-By",
            "Strapi <strapi.io>",
            "X-Response-Time",
            "72ms",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
    .post("/graphql", {
        query: "query ($where: JSON, $sort: String, $start: Int, $limit: Int) { postsConnection (where: $where) { aggregate { count } } posts (sort: $sort, where: $where, start: $start, limit: $limit) { title } }",
        variables: {
            where: { title: "Delectus neque rerum nulla vel reiciendis." },
            start: 0,
            limit: 10,
        },
    })
    .reply(
        200,
        {
            data: {
                postsConnection: { aggregate: { count: 3 } },
                posts: [
                    { title: "Delectus neque rerum nulla vel reiciendis." },
                    { title: "Delectus neque rerum nulla vel reiciendis." },
                    { title: "Delectus neque rerum nulla vel reiciendis." },
                ],
            },
        },
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Mon, 11 Oct 2021 12:34:54 GMT",
            "Content-Type",
            "application/json",
            "Content-Length",
            "230",
            "Connection",
            "close",
            "Vary",
            "Origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-Powered-By",
            "Strapi <strapi.io>",
            "X-Response-Time",
            "50ms",
        ],
    );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
    .post("/graphql", {
        query: "query ($where: JSON, $sort: String, $start: Int, $limit: Int) { postsConnection (where: $where) { aggregate { count } } posts (sort: $sort, where: $where, start: $start, limit: $limit) { id, title, category { id, title } } }",
        variables: {
            where: { category: "2" },
            sort: "title:asc",
            start: 0,
            limit: 10,
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000000039c93c16a23310c86effb14c2e75292344d9bdc4adb7d89650faa2db2028fe5da72a084bcfbca9340277bdac965185be2fff44bf2d1055474bba3cb52b5be4a4ae49525f52bdcef0bed51a91fbcb4a46ef7b03c9deecec96ef7ebe838b89d7b5eaddd9d53d668a9ee2532560812a550054e50392914ca2d30a680d4ff2946548ba825780ea60d3890de9b8e37e25eca57a78ef2ab89f81b0de2ac844b68b9d82cafd19f0d870b80526815b0df718041225565a41b18d3e8ab942c852b98eaf841a814a0b6ea399b9f6696726dc3196cc588f74806e431f906fae22a1a6d40662bd167eb9d2c464acdba09078a7666cfe69beb5ccee3f6791abc4c6fb4f7073be44085d55c54e8b40122b68049b90d7351abede65f14e422070e646be02555f386daca5ce1f5f269127c2fc584237f5091a92a1ccc078dedb20bea1ee782b64fd3857f57d390735be62aad17db49f0277a2a04a4e34a7d2f8ead6fc56c835502b405b3daf986b7f2b8b96671b46962b6c1da3c7dcb1cfa84cf88881fd2c71ed8abed96c4967becea6dfd6f05bf4fa71f7f010000ffff",
            "0300e5bfa8e66a040000",
        ],
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Mon, 11 Oct 2021 12:36:12 GMT",
            "Content-Type",
            "application/json",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "Vary",
            "Accept-Encoding",
            "Vary",
            "Origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-Powered-By",
            "Strapi <strapi.io>",
            "X-Response-Time",
            "106ms",
            "Content-Encoding",
            "gzip",
        ],
    );
