import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $where: posts_bool_exp) { posts (limit: $limit, offset: $offset) { id, title } posts_aggregate (where: $where) { aggregate { count } } }",
        variables: { limit: 10, offset: 0 },
    })
    .reply(
        200,
        [
            "1f8b08000000000004035d93cb8edc2010457f05b1ee8ac03cab3f249b288a0a0a5a486ebbe3c76c5af3efa1671285c40b641b73a85b1c3f25d341f2fa948f753f7679fdf6948de5559209bea489a0066bc0e2a481bcf31059b136b5049eacbcc8a31d73e99f7f6d6f743f77d11651cbdc76514eb1d3a39545e473dbfbcc5bd98f96cef9bc7f91ef17f1671be7982869481c1c584e0652f61668321c8a2daa64336cd35954c472ce3309eef8d4c1bcceeb362251474cc64325ebc166e32025a52107b4d151204f7940d2218e737bf492795d4a1e401e754a542320f6026d550e30160dae3af6c5274e18071037ba8bc662dd16da8a68f747d9b89563201a531d2a9f2147ec69abee4163d65075b4a5bf639cdc40fccc495994a5dd078c4de430070decbc02eb92eded4b0526d29a0d577296460cedb9f48c626bdc723f817d6061b431539e202a0e60636f1952303055a327eb10271c593fcf1ef277bf885b6f5b6ecb6de0914b89512160ca3d62f40ca9a8002517cc3ab8c9541c6afb5f9381e42c63f52e83c3aea12545801f2e261fbc564645f78f1aebf246f34bbdfbbaa526566eebc730201386ec3c2b88e675a2d1d4ae46cebd8546b9ec8d55344add8b3bda921b9fcbf1327b2eab7cff7ef9fc557ed0edb6951b1d5dffa7fcfb20aeddedbcf625b2dfe2f4deaf5f45003b0666030000",
        ],
        [
            "Date",
            "Thu, 03 Aug 2023 13:49:51 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "499",
            "Connection",
            "close",
            "x-request-id",
            "82a4dfe0892d78db3928e6421559b780",
            "Content-Encoding",
            "gzip",
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
            "7f0f06bca8e192d5-IST",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $where: PostsBoolExp) { posts (limit: $limit, offset: $offset) { id, title } postsAggregate (where: $where) { aggregate { count } } }",
        variables: { limit: 10, offset: 0 },
    })
    .reply(
        200,
        [
            "1f8b08000000000004035d93cb8edc2010457f05b1ee8ac03cab77f9896ca22c0a0a5a486ebbe3c76c5af3efa1679288c40b641b73a85b1c3f25d341f2fa948f753f7679fdfe948de5559209bea489a0066bc0e2a481bcf31059b136b5049eacbcc8a31d73e99f7f6b6f743f77d11651cbdc76514eb1d3a39545e473dbfbcc5bd98f96cef9bc7f91ef17f1671be7982869481c1c584e0652f61668321c8a2daa64336cd35954c472ce3309eef8d4c1bcceeb362251474cc64325ebc166e32025a52107b4d151204f7940d2218e737bf492795d4a1e401e754a542320f6026d550e30160dae3af6c5274e18071037ba8bc662dd16da8a68f747d9b89563201a531d2a9f2147ec69abee4163d65075b4a5bf639cdc40fccc495994a5dd078c4de430070decbc02eb92eded4b0526d29a0d577296460cedb9f48c626bdc723f817d6061b431539e202a0e60636f1952303055a327eb10271c593fcf1ef277bf885b6f5b6ecb6de0914b89512160ca3d62f40ca9a8002517cc3ab8c9541c6afb5f9381e42c63f52e83c3aea12545801f2e261fbc564645f78f1aebf246f34bbdfbbaa526566eebc730201386ec3c2b88e675a2d1d4ae46cebd8546b9ec8d55344add8b3bda921b9fcbf1327b2eab7cff71f9fc55bede6e5bb9d1d1ed7f4afafb20ae5dedbcf615b2dfe2f4deaf5f0731fe7165030000",
        ],
        [
            "Date",
            "Thu, 03 Aug 2023 13:49:52 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "500",
            "Connection",
            "close",
            "x-request-id",
            "c73e5f954345db9ddac53891cf26031b",
            "Content-Encoding",
            "gzip",
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
            "7f0f06bec9e35487-IST",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $order_by: [posts_order_by!], $where: posts_bool_exp) { posts (limit: $limit, offset: $offset, order_by: $order_by) { id, title } posts_aggregate (where: $where) { aggregate { count } } }",
        variables: { limit: 10, offset: 0, order_by: { id: "asc" } },
    })
    .reply(
        200,
        [
            "1f8b08000000000004036d93cbaa1c2110865f457a7d0abc5f6697c55966932c4308a5964d438f33b4ed6c86f3ee7108211e881b2db13efefaab7c2e194f5c2ecfe57e6b675b2e3f9ecb9697cb221dc91c30804d9c83ce9820149f800c173c6991b237cbdb726ee74ee3f937bc12516b6df978637f11e808651939ce14d0da2044451eacf09e73e96d3261467cf9fafefe7dce2f59988434f2b3009dd040e03e42c936a4849aa4f2537e3ab0b1adb27b3f7a63d4d915d78aecd1f77b3ff1a489ac848c21a80cc16a0f1a8501c420410872d139e2dc89898c54092bc39ecedbc1d6031f5b46d6e83a23553181db04c90703ba080de8938022bca67197839cfdaa7ddf91616254b74f18e7b417aa809583a087d3e0791961325687621c993229dbea492b1decdc6ada72af27c371c31eb4b3eddefa27722411506aa044047a3417820e114cd1c24a1543343891e9b835d67abb53cd5b6b34b4a67e6d58e79a33faa2b2079563046d488c060b01144526cbd5283a4ec8bab5edbfedd0bcf02c88c3d8e46887f3104bc920adf14a79235398bd13524d22b4e1ba8c710285da81765941b4c378e4ae14f552166912916e75edc468a72bd5f3e5d0cfb73fb3ff0bd7f5a0f53529e33bfc0bd8650c74ba0d7397710cf263acdf56c14ec637030000",
        ],
        [
            "Date",
            "Thu, 03 Aug 2023 13:50:38 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "478",
            "Connection",
            "close",
            "x-request-id",
            "c3cd8cb93af1ca8c2f7c3c4baf0dd981",
            "Content-Encoding",
            "gzip",
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
            "7f0f07dfeaba92db-IST",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $orderBy: [PostsOrderBy!], $where: PostsBoolExp) { posts (limit: $limit, offset: $offset, orderBy: $orderBy) { id, title } postsAggregate (where: $where) { aggregate { count } } }",
        variables: { limit: 10, offset: 0, orderBy: { id: "ASC" } },
    })
    .reply(
        200,
        [
            "1f8b08000000000004036d933d8f1c210c86ff0a9afa2cf1fdb1dd1557a649ca288501331a69965d0dc336abfbef611525e2a4d080117ef4fab5792e194f5c2ecfe57e6b675b2e3f9fcb9697cb221dc91c30804d9c83ce9820149f800c173c6991b237cbdb726ee74ee3f977bc12516b6df97c637f11e808651939ce14d0da2044451eacf09e73e96d326146bc7ffbf8f831e7972c4c421af959804e6820701fa1641b52424d52f9293f1dd8d856d9bd1fbd31eaec8a6b45f6e8fbbd9f78d2445642c610548660b5078dc20062902004b9e81c71eec44446aa8495614fe7ed60eb818f2d236b749d91aa98c06d82e483015d8406f44940115ed3b8cb41ce7ed5beefc83031aadb178c73da0b55c0ca41d0c369f0bc8c3019ab43318e4c99946df5a4950e766e356db9d793e1b8610fdad9766ffd0b39920828355022023d9a0b418708a66861a58a211a9cc874dc1a6bbddda9e6ad351a5a53bf36ac73cd197d51d983ca31823624468385008a2293e56a141d2764dddaf6df76685e7816c4616c72b4c37988a56490d678a5bc9129ccde09a92611da705dc6388142ed40bbac20da613c72578a7a298b348948b7ba7662b4d395eaf972e8d7db9fd97f5fd783d6d7a08cdf80ff027619f39c6ec3db651c83fc1ceb37788f53be36030000",
        ],
        [
            "Date",
            "Thu, 03 Aug 2023 13:50:39 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "478",
            "Connection",
            "close",
            "x-request-id",
            "a24cd7cc23566596ab72b5d6eed07a75",
            "Content-Encoding",
            "gzip",
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
            "7f0f07e5f8eb92d1-IST",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $where: posts_bool_exp) { posts (limit: $limit, offset: $offset) { id, title, category { id, title } } posts_aggregate (where: $where) { aggregate { count } } }",
        variables: { limit: 10, offset: 0 },
    })
    .reply(
        200,
        [
            "1f8b0800000000000403b595496e23471045af52e05a61e43ce8043e81370dc388cc88a4b3bb06750d040c41777750b2ecb2cd9501735120ab2a235fc6fff1f97a21dcf1f2fc7a7959b67dbb3c7f79bd74ba3c5fd0c6c0c520b4e82cb86c3460f0011229d2b67124e32e4f97bdef23cbeb3ff51b4ec736f479683cf66de063d8f0a5f33cd463dde4c98db7bd97633ca61f645dc59dafcbfadb7de7f7fd28566b43ce5095cde08a2f80566948581893cfa5b972da4f1b7b797b7b1a3e69bd27c4a2a150f4e0a858283538406329b263c5d59e560b12f2301fe388030965113e5ac665fd1fc8b24eb9d8000d5d0057ad8752e45c3566973c460c584f64b80ffbb1be48036999f9fee45f9d0a29e4c2c64394cae0142ac86c2b68a383ab3a9bfcbeee5399bacc1b7f3fa4f0fb79cf5d0b5997822d41ced23ad794879c58836f9e02874225a7131b759c864ec3b2ceb8f2d0a7175ea9f3fe085231eaa49180c82470c93928ad4a17c8c4c42e44ade854fa768c2fc72e9e1878e489e7fd983e70a7c19c89ad6d3eab50a1a62c3a372d12a7aaa1e9e458ee5136fe54f64361ac03cf7d7a84a9b5a7da7c042ccd88cb2d81946fc0dac5e44dab358553bd1f8f09e76d3b13b9823ed7a8817c50e07c9183526130a835596ae81d9e2accb855168587b553af320ddb23acd6726dad2490312091d828484d29302d179f327a13cec3279acc7d1b65c4669e7117f38c58fbdcf10c9a934b15ab81a428de150990315aa969b5713e8b6fcea0e298e9d38a485d1c2915af0f61b906e995e403a2f831cb05bdd520d31c389aac5c3d17befd9114371ecf78e84ba1ac32e45245d914080aab085c39571dbdb12d9ffaf8cf787904c6266a1faa157b67f1a0754da4915c3145c564926dcd9cc595f167f1f72cc1c4ebb0f7b9763ae6fd0ce91de5167c059f25191d2a84fc1e8f25c4a09555c9ff2d6696f986e33d0da7652d7d58a82fef9747b452816cac0d940f1214d6544015117c102735435cf57918c5d15faf6da36f5f7fbdb66f1bb53367c9b1fa40e21a7b1f6c39aa844ead624fab7c0d5642e3ec1f69e69fc7bd27f8c8cb23c2ff14d13f3f7dfcb3fc82d7ebca5719f17be4fff56378960cafcbbdd1f2359b37f9fc0eb04f879995060000",
        ],
        [
            "Date",
            "Thu, 03 Aug 2023 14:05:24 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "820",
            "Connection",
            "close",
            "x-request-id",
            "2c0db04bd1fc79b34a3d7369537dfddf",
            "Content-Encoding",
            "gzip",
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
            "7f0f1d81fad692d7-IST",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $where: posts_bool_exp) { posts (limit: $limit, offset: $offset, where: $where) { id, title } posts_aggregate (where: $where) { aggregate { count } } }",
        variables: {
            limit: 10,
            offset: 0,
            where: {
                _and: [
                    {
                        category_id: {
                            _eq: "ff9cffb8-b5bd-4020-8f00-2f9b589a5264",
                        },
                    },
                ],
            },
        },
    })
    .reply(
        200,
        [
            "1f8b080000000000000364d04b6ac4301004d0ab885e4fc328fafb2a218496d432028f67b0a46c8cef1e4c02316457b57914b543a64e30edf07ab6de607adfa16698404732213989d9d83b6a1335c61c19df48caac7221a3096ed06b5f182658a925ee63135bcd358d6534386ee2d74a452b922120bb2051472f9164c9a8522a9e5db1d2da8bf5c54beda266f1dab8d7f11095d258ea55d49e8c099251533cd7158fc1dc1989d99355ce865cfe893c04b72ed2739d070b5ef8c16b3ff9f5225b67a4525162ce56a3a6a4908c37a8ac0f255a22e7ae5b29a5f168b48ac24b6d6274411d8e8fdbcf9d9f34cf1bcfd4f97cf8af8849ec909e63ed67d4c7711cdf000000ffff03000e38adbe89010000",
        ],
        [
            "Date",
            "Thu, 03 Aug 2023 14:11:59 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "d4c5cf87c070cb6c28c06a647c0411be",
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
            "7f0f27287efc5482-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $where: PostsBoolExp) { posts (limit: $limit, offset: $offset, where: $where) { id, title } postsAggregate (where: $where) { aggregate { count } } }",
        variables: {
            limit: 10,
            offset: 0,
            where: {
                _and: [
                    {
                        categoryId: {
                            _eq: "ff9cffb8-b5bd-4020-8f00-2f9b589a5264",
                        },
                    },
                ],
            },
        },
    })
    .reply(
        200,
        [
            "1f8b080000000000000364d0bd6ac4301004e057115bdfc229fa7797e7082956d2ca087cbec392d218bf7b3009c1906ea6f91866874c9d60dae1f56cbdc1f4b143cd30818e64427212b3b177d4266a8c3932be919459e5424613dca0d7be304cb0524bdcc726b69a6b1acb6870dcc4af958a562443407641a28e5e22c99251a5543cbb62a5b517eb8b97da45cde2b571afe3212aa5b1d4aba83d191324a3a678ae2b1e83b93312b327ab9c0db9fc1379086e5da4e73a0f16bcf083d77ef2eb45b6ce48a5a2c49cad464d4921196f50591f4ab444ce5db7524ae3d168158597dac4e8823a1c9fb79f3bdfe779e3993a9f07d35f1193d8213dc7dacfa88fe338be010000ffff0300c1a1638388010000",
        ],
        [
            "Date",
            "Thu, 03 Aug 2023 14:12:00 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "b0e79549c07cb48f526b71c759c0c183",
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
            "7f0f272acf285487-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $where: posts_bool_exp) { posts (limit: $limit, offset: $offset, where: $where) { id, title } posts_aggregate (where: $where) { aggregate { count } } }",
        variables: {
            limit: 10,
            offset: 0,
            where: {
                _and: [
                    {
                        category: {
                            id: { _eq: "ff9cffb8-b5bd-4020-8f00-2f9b589a5264" },
                        },
                    },
                ],
            },
        },
    })
    .reply(
        200,
        [
            "1f8b080000000000000364d04b6ac4301004d0ab885e4fc328fafb2a218496d432028f67b0a46c8cef1e4c02316457b57914b543a64e30edf07ab6de607adfa16698404732213989d9d83b6a1335c61c19df48caac7221a3096ed06b5f182658a925ee63135bcd358d6534386ee2d74a452b922120bb2051472f9164c9a8522a9e5db1d2da8bf5c54beda266f1dab8d7f11095d258ea55d49e8c099251533cd7158fc1dc1989d99355ce865cfe893c04b72ed2739d070b5ef8c16b3ff9f5225b67a4525162ce56a3a6a4908c37a8ac0f255a22e7ae5b29a5f168b48ac24b6d6274411d8e8fdbcf9d9f34cf1bcfd4f97cf8af8849ec909e63ed67d4c7711cdf000000ffff03000e38adbe89010000",
        ],
        [
            "Date",
            "Thu, 03 Aug 2023 14:20:27 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "a6667cd2daca68a18bbaa991b27742c6",
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
            "7f0f33879ee692dd-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $where: PostsBoolExp) { posts (limit: $limit, offset: $offset, where: $where) { id, title } postsAggregate (where: $where) { aggregate { count } } }",
        variables: {
            limit: 10,
            offset: 0,
            where: {
                _and: [
                    {
                        category: {
                            id: { _eq: "ff9cffb8-b5bd-4020-8f00-2f9b589a5264" },
                        },
                    },
                ],
            },
        },
    })
    .reply(
        200,
        [
            "1f8b080000000000000364d0bd6ac4301004e057115bdfc229fa7797e7082956d2ca087cbec392d218bf7b3009c1906ea6f91866874c9d60dae1f56cbdc1f4b143cd30818e64427212b3b177d4266a8c3932be919459e5424613dca0d7be304cb0524bdcc726b69a6b1acb6870dcc4af958a562443407641a28e5e22c99251a5543cbb62a5b517eb8b97da45cde2b571afe3212aa5b1d4aba83d191324a3a678ae2b1e83b93312b327ab9c0db9fc1379086e5da4e73a0f16bcf083d77ef2eb45b6ce48a5a2c49cad464d4921196f50591f4ab444ce5db7524ae3d168158597dac4e8823a1c9fb79f3bdfe779e3993a9f07d35f1193d8213dc7dacfa88fe338be010000ffff0300c1a1638388010000",
        ],
        [
            "Date",
            "Thu, 03 Aug 2023 14:20:28 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "c8937f4dcbe81d251c38df98d94f1756",
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
            "7f0f338e89fc5493-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $order_by: [posts_order_by!], $where: posts_bool_exp) { posts (limit: $limit, offset: $offset, order_by: $order_by, where: $where) { id, title, category { id, title } } posts_aggregate (where: $where) { aggregate { count } } }",
        variables: {
            limit: 10,
            offset: 0,
            order_by: { title: "asc" },
            where: {
                _and: [
                    {
                        category_id: {
                            _eq: "6869be25-7189-40a0-9e3c-12164c1929ec",
                        },
                    },
                ],
            },
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000403b5925b6ec3201045b782f8ce48060630d94a5555038c5d4b7ed5d81f5594bd17f7a16603e18b2be0e888b93799692779bdc975297b91d7979b1cb2bc4a0aaa0dd138e8081d603216626c14241fb0b5e4c9519217b90ffbc8e7f55decc7b60e45e465e6f324d1cefdb27d9eec6fa26b5d88ac2df84a066ca881c02681d2ca61524187ef777fc4b4cc853f8e0a9e8f712479bf5fc42fc944568134022766409d03040c116c87ca691343b4f4e0c6db524439caca731e4a6141291d53a1f9b996ce61eebad683cdc9027a6fa0f59e2022920a816c67f9c1725c369ec4b09663aa7f58d373ed7c87adebb40254e801eb44810c6bf086283a6e7262f360b7bd2f733a8aa071a83399c448353dc5f0f5f253c537eafb8dfbdaa2b341ff415c6b0dd272ccbbac5bbcd7f5055cbcdb94c5020000",
        ],
        [
            "Date",
            "Thu, 03 Aug 2023 14:28:32 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "314",
            "Connection",
            "close",
            "x-request-id",
            "493bc0d41356b1049e4a3852eba71ff1",
            "Content-Encoding",
            "gzip",
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
            "7f0f3f651ad792cf-IST",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $orderBy: [PostsOrderBy!], $where: PostsBoolExp) { posts (limit: $limit, offset: $offset, orderBy: $orderBy, where: $where) { id, title, category { id, title } } postsAggregate (where: $where) { aggregate { count } } }",
        variables: {
            limit: 10,
            offset: 0,
            orderBy: { title: "ASC" },
            where: {
                _and: [
                    {
                        categoryId: {
                            _eq: "6869be25-7189-40a0-9e3c-12164c1929ec",
                        },
                    },
                ],
            },
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000403b592496ec4201045af82587749060a30bdcb39a22c0a283b963cc5d88ba8d5770fcea4be40b3e20b787aa2fe4d66da495e6f725dca5ee4f5f526872caf92826a43340e3a4207988c85181b05c9076c2d797294e445eec33ef2797d17fbb1ad43117999f93c49b473bf6c9f27fb9be85a17226b0bbe92011b6a20b049a0b4729854d0e1fbdd1f312d73e18fa382e7631c49deef17f14b329155208dc0891950e700014304dba172dac4102d3db8f1b614518eb2f29c875258504ac754687eaea57398bbaef56073b280de1b68bd278888a44220db597eb01c978d2731ace598ea1fd6f45c3bdf61eb3aad00157ac03a5120c31abc218a8e9b9cd83cd86defcb9c8e22681cea4c2631524d4f317cbbfc54f1a5ef37ee6b89ce02d17f10d7da82b41cf32eeb16ef757d013a67cc9ac4020000",
        ],
        [
            "Date",
            "Thu, 03 Aug 2023 14:28:32 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "315",
            "Connection",
            "close",
            "x-request-id",
            "b7060435b7c63168ca8060cac8150424",
            "Content-Encoding",
            "gzip",
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
            "7f0f3f67283c92db-IST",
        ],
    );
