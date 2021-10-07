import nock from "nock";

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
    .get("/posts/count")
    .query({})
    .reply(200, "98", [
        "Server",
        "nginx/1.17.10",
        "Date",
        "Thu, 07 Oct 2021 09:08:45 GMT",
        "Content-Type",
        "application/json; charset=utf-8",
        "Content-Length",
        "2",
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
        "15ms",
    ]);

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
    .post("/graphql", {
        query: "query ($sort: String, $where: JSON, $start: Int, $limit: Int) { posts (sort: $sort, where: $where, start: $start, limit: $limit) { id, title } }",
        variables: { where: {}, start: 0, limit: 10 },
    })
    .reply(
        200,
        [
            "1f8b0800000000000003a4523d6b03310cddfb2b8ce750ee5a2e856ca5194b29742c1d545b83c0673b961c0a21ffbd7272141f193bcad2fbd0934fd68380dd9d6c4e2c6c779f274bdeeeec384c83dd582109a8e55b9d0f156603ce5586b9b2014f99d89141b9b7e7cd02db4e1d688f019de86cc4434553b0d4d9c41a02982306adc911464fdc118cc376f837c5534fc11e7cdf9cc6aef90ad54314525690a600c6a5c82a0652cbb2eeb57fa8046ba33dd173a04b40053386a0965a44ed8dbc99534016025c9bece1e3cae143d7794fccd4028f291aa8a23e000bc8c5cf8dc1bfb3ac9df6842fa9e45488db3c5f418cde70555426312a41995b20cb4ac939400742b7114c8f1df18782f1270772f09d0c428b53f736c7146a1610e4e5722a5f92495928e95d55b6c6f687becee7bb5f000000ffff",
            "0300393b2ef890020000",
        ],
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Thu, 07 Oct 2021 09:08:45 GMT",
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
            "67ms",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
    .get("/posts/count")
    .query({})
    .reply(200, "98", [
        "Server",
        "nginx/1.17.10",
        "Date",
        "Thu, 07 Oct 2021 09:10:15 GMT",
        "Content-Type",
        "application/json; charset=utf-8",
        "Content-Length",
        "2",
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
        "28ms",
    ]);

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
    .post("/graphql", {
        query: "query ($sort: String, $where: JSON, $start: Int, $limit: Int) { posts (sort: $sort, where: $where, start: $start, limit: $limit) { id, title } }",
        variables: { sort: "id:asc", where: {}, start: 0, limit: 10 },
    })
    .reply(
        200,
        [
            "1f8b08000000000000035c92bb6ec3300c45f77e85a039289a67936c053ab45b5f5bd181913910d02ba2141408f2efa58c14a53b18b06cdde3e34b9ded0015ecfe6c73e2ca76ff79b634d8bdddacedcc56aa1e65f1881e5d6d6c221e1b9a82a505139bf7604ee8654d8e300ec4b7f632bb02760b05786fb19a6323b9208c372e451618d456fa432c505578be98abf4133933249f0a1a0a1907aa065a354c028d297687fe88b905b100cd59ae14e70343ee101c5d787461ea8bc4132184fe9bc9394007953470a57b7930a7e45baec0a39046fcbed0d9f59dcabe60e12cbd099fbb1165863fad134682a0c3f73b157e9506a17649fca71e28520023366363329b8cde4b2d6da2b29d4f69600e280701a5c58c85a42591823ee60159c61d27d3d96e54fa0d731b08a47834fd480483cca8b7ef966afb73eb13e0ab5fffcc371647557a4811c7c371683c08e6ba41485f97cbcd0f000000ffff",
            "0300a09cd20faa020000",
        ],
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Thu, 07 Oct 2021 09:10:15 GMT",
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
            "270ms",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
    .get("/posts/count")
    .query({ title_eq: "Delectus%20neque%20rerum%20nulla%20vel%20reiciendis." })
    .reply(200, "2", [
        "Server",
        "nginx/1.17.10",
        "Date",
        "Thu, 07 Oct 2021 09:17:30 GMT",
        "Content-Type",
        "application/json; charset=utf-8",
        "Content-Length",
        "1",
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
        "23ms",
    ]);

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
    .post("/graphql", {
        query: "query ($sort: String, $where: JSON, $start: Int, $limit: Int) { posts (sort: $sort, where: $where, start: $start, limit: $limit) { title } }",
        variables: {
            where: { title_eq: "Delectus neque rerum nulla vel reiciendis." },
            start: 0,
            limit: 10,
        },
    })
    .reply(
        200,
        {
            data: {
                posts: [
                    { title: "Delectus neque rerum nulla vel reiciendis." },
                    { title: "Delectus neque rerum nulla vel reiciendis." },
                ],
            },
        },
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Thu, 07 Oct 2021 09:17:30 GMT",
            "Content-Type",
            "application/json",
            "Content-Length",
            "131",
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
            "51ms",
        ],
    );

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
    .get("/posts/count")
    .query({ category_eq: "2" })
    .reply(200, "33", [
        "Server",
        "nginx/1.17.10",
        "Date",
        "Thu, 07 Oct 2021 09:19:40 GMT",
        "Content-Type",
        "application/json; charset=utf-8",
        "Content-Length",
        "2",
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
        "28ms",
    ]);

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
    .post("/graphql", {
        query: "query ($sort: String, $where: JSON, $start: Int, $limit: Int) { posts (sort: $sort, where: $where, start: $start, limit: $limit) { id, title, category { id, title } } }",
        variables: {
            sort: "title:asc",
            where: { category_eq: "2" },
            start: 0,
            limit: 10,
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000003bc93cf4ec3300cc6ef3c8595f384b669ff6f08c64b200e26b1c052da74b153094d7d77dc6e121d27ca814b95e4b3be5f3ed739bb808aee70764d12157778393b0eeee076cb959b39658d64bb87c82810524c9904b806e15a21535302631d90fa35c5886a8a5a81e750ac022bd27bf3f1a8f49ef2670f1aec9723f327aa92ebbad9555acc378b5bf4a9607505501d8a00f6671ca04a914419e90f8cb1fa987293320b98ebf041100a20453c3796a758a4464a7501db6592f74806e4a1782a7db3bed12279b550359d4adfc76c9cba582fa1a5687bf66ca959a6522ce3fc3f38ebfd6e2c5e676468e207f6909632abf54aa0a75510b104ac954b3515b5dc6f7ea2a0c9a9e540366c3ed562d9504b9e6abc5a6c47e23167338efc46398d5da1b51c34b4cb0ea8cf3815b4df8e9fd551cd235dda32d56935df8fc467f494094887c1fd1e4f7b24828dfd5825401b63bb3bfffa45be76dddd17000000ffff",
            "03005543f5e321040000",
        ],
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Thu, 07 Oct 2021 09:19:40 GMT",
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
            "70ms",
            "Content-Encoding",
            "gzip",
        ],
    );
