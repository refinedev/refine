import nock from "nock";

/**
 * Hasura default 'snake_case' naming convension
 */

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $where: posts_bool_exp) { posts (limit: $limit, offset: $offset) { id, title } posts_aggregate (where: $where) { aggregate { count } } }",
        variables: { limit: 10, offset: 0 },
    })
    .reply(
        200,
        [
            "1f8b08000000000004037d93516bdc300cc7bf8ac973058ee3c4f6bdf5c6b60eb651dabe8d326459be0b4d9312e70adbd1ef3eb5db989f663058c6fcf4f75fd2b949b861b33b374f4bd94ab3fb766ec6d4ec9a8864386b041f42063b040bde72861868c86c1399e89a8b661bb789e53996945f77c1949b970bf597d2060a3159483907b04c19903203321ab214986c5b512e0f3c6f6acfeb43398e2bab9b53d946aa789452b2c40986be4d60751700236b30182443244fde54bc0f0b9d8a3aaccbe9495d9d1e7156b713f3430df4865c4b3de8aca300ad911f62072906e7321b8fbeab80ef219eca3873290a275c1f456bcacb9adee45658a6e4104d0b6dc856dca300913a06635ca2a4bd7639fd075b915c9f62f6dac39048838d2e424c2d426e73e75b66cd962ad27e99c6e711e7457d794ecba4f666af6e711457af78e219d5f5729a53cd77beeb07f72a2d1bb0b9b7c24771817c6f2c7618a876f42b6ee332e3a43eae388f1babc7651b9fe5723e5450efd13a292e98304899248240bd0317add7127a3dd4cd73854f526675b71c16b5cc93f82bb92b9cf3c17b173be0dcf560c9690859eadf3b313979491243e5c11dc689d5a73949f7aca3687d77647a1085ea9248bebf05df56f4905c707a304011a5d3b175e05b43d0b7d60d98b3b5b676e09ad7f2e6c0e745fae90f51951ff376e432fe7c4d73c38571a5e36075f3727ff17bb4bee3e1b0f20137199773f32f503b199637598d1c4dff22eb17578a0b6196030000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 14:35:04 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "d5bc03c31935595b070080fbbaef5456",
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
            "6e31a86fae22723d-IST",
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
            "1f8b0800000000000403a5934d8b14311086ff4ae8f31674be93b9ed88b81e14516f2252492ab3617bbbd7e9cc220cfbdf2d1531770b42522179525579eb3a15ec381daed3d3b6f77d3a7cb94ead4c87c9db926a9803b8926730c927484522545975904433993cdd4cbdf585f8f8715bda73c37513ef9ecbb688a33a8a4fd8d62eee68a115c587edb296e9e546fce5fba0adf3044a5505a65ac37c549072b0caa0c698d5c07f8fbd6d2b2ee2cd19d7d6493c6ebd3df3e67a1aa12186e09306aada82c97e86586501eb3d62092aba1407e8674c0b89b76bb9ecfddc18feea9ef20323c56dce1c6f8f410ef4c0a9e71015b848098cc30298386ee752b0da4bad2a0df4d7bde1a3e008732bcc12f4435cbac04beedb59549e5bbaec235e673d63b060293930c64848343b28ec261d830ab6fc0fdea880c52128c329989c1504530acc91ca2c7375c186017f4b2be12a2e0b572637dac5baad626989ce9bd81be7f1485d3cd1c29fdb69ff7ea1319380c647cac0052f60d88398ad079f4c98d90db3f3c35377f8d45b169fb7d326b675692bb104465cb4356932206dcc60b04448264a6091a45acd5c821f71c836deae52262f1dc86291856c1d042d2bb0226ac82e9376a390712ff5d7d8b15413c630a2d2c67a394392d183e1b201ce73856a55d2ca6a877904dd9eb832e248e787fdbe9d497c6491b5eca39b5ebedefce9b66f783a9de9849d3be83afd73c481bbe4b700275e2afbc2f61317688918a9030000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 14:32:22 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "cdf00dc694fee84c1c520b2374713736",
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
            "6e31a47a1c645136-IST",
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
                            _eq: "170b5abd-d8e6-476c-b3fd-bd2474b0f369",
                        },
                    },
                ],
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004037d914b4b04310cc7bf4ae97903339d3ef726225e4464af2292be660bb333d276051df6bb5b57c139995312925f1eff957aac48f72b7d5b4a2d74ffbcd2e4e99e06e71522eba137910397ce80754300c69477bed39d8a9eee684d750aadfc0eecb9a439944270c27ca2971df92529a50721d5776b64c0a3e0603db286d382711cd038b6213d624dcb8c13b9cf38a71ac869a9e9bd25e77103355e19d54906ce62048ebd02dd3307a2e74a628c9cf32df429e472853e2c38931be796f35c49f998eb3194f4d9d8e4104ac0ec8e92779b39c16ac62d0b60b4f4c07ddfde20d1b4d0a1649d8f1d979be56f971cc8e16c6dc8e4944a699780cba92687d3a0d8066c1d77035a095129053c28011805820f28b567031ba4de80fff98a36825e5e763f02bee238e630626da2acf42f20fb26c7f56ada5c7169f6051cd15b38fb010000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 14:36:24 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "6448cb28c9f8ec1a08be0c18dc29629a",
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
            "6e31aa65382c7240-IST",
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
                            _eq: "170b5abd-d8e6-476c-b3fd-bd2474b0f369",
                        },
                    },
                ],
            },
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000403bd944babdb301085ff8ad03a037a8c1eceee524a37a5b7dc4d17a594d12b314dac603b85db90ff5e396da957a52b6b2124218e3ece8cce8d279a89ef6ffc52a779e2fbcf37de27bee7212774ca65d03a0440b41e3abf4c2873c9163dc5c8777ceee7536ed7dfd431b3976b087964e77e9afa3a401cfbb98f746ad722cdf950c7d7e5a187bc7422180a0992cf16d0d9084197042129741844d1b65bc93f5f1e4aecf9d857f6a9d694be1df9fdbe63bfe572f00a83ca0b63024cb28360a96bdb4856895404da95dcbf68b5535b00c7e4889404d91504b4b101479d41299762125eb89256c06f215ca77ec8d3c4e844e3790342e7bc36b635805245011683ad38a41aa6370a49531717a3fe34c0079a5bcde9c4de8d34f47366e73af7dfdbe170d80036448c9a8285e29c03ccce0015439032599f9456dafaff83f59dd980b74bae73c22a88810a2049075eaa0846b6af40a520e2dadc8f799c1ee6beaf34b0a718eb7598d9f43accc73cf53f9ac7ec254f99c678b42836e037266ad77901c26403688206df2c0652c947a5a440bdfe6fd74b4b999ca0d40a72033cf4aef5688b1329ad68787121f3099c74c579dfe946bf6a878df0beec7e85ec573a1cc67c688e2c71f877c3f62dce1ea5e56de9ef6dfc0473d5ba6a9f050000",
        ],
        [
            "Date",
            "Thu, 30 Dec 2021 06:52:28 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "b1243eb2890133b324252c79366e8b95",
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
            "6c59586e8bf05488-IST",
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
                            id: { _eq: "8332c138-3231-406d-9655-1328ded9d5f2" },
                        },
                    },
                ],
            },
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000403754ed10ac23010fb15b9e71dd8aeebdafe8a885cafbd311027b63e95fdbb15059f0c041208491a24aa04a1c17d2bb540383558130488c43acb91d0792f68ac37e84c168c9ead649358c71906a86bbde61ea792e4cd4249601f0edf16274ac559595469223471b2e8462538138963cb79b4fca7c5380dfb79f8fcbad0b23cf242b56f35f89943e84bbc3d6f15bad47bc70bc5192fefd2000000",
        ],
        [
            "Date",
            "Tue, 23 Aug 2022 12:42:59 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "4d6b8e1a42671cb194971665d7bd0276",
            "Content-Encoding",
            "gzip",
            "CF-Cache-Status",
            "DYNAMIC",
            "Expect-CT",
            'max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"',
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
            "73f3ee5f8943b9d8-OTP",
        ],
    );

/**
 * Graphql  default 'camelCase' naming convension
 */

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $where: PostsBoolExp) { posts (limit: $limit, offset: $offset) { id, title } postsAggregate (where: $where) { aggregate { count } } }",
        variables: { limit: 10, offset: 0 },
    })
    .reply(
        200,
        [
            "1f8b08000000000004037d93516bdc300cc7bf8ac973058ee3c4f6bdf5c6b60eb651dabe8d326459be0b4d9312e70adbd1ef3eb5db989f663058c6fcf4f75fd2b949b861b33b374f4bd94ab3fb766ec6d4ec9a8864386b041f42063b040bde72861868c86c1399e89a8b661bb789e53996945f77c1949b970bf597d2060a3159483907b04c19903203321ab214986c5b512e0f3c6f6acfeb43398e2bab9b53d946aa789452b2c40986be4d60751700236b30182443244fde54bc0f0b9d8a3aaccbe9495d9d1e7156b713f3430df4865c4b3de8aca300ad911f62072906e7321b8fbeab80ef219eca3873290a275c1f456bcacb9adee45658a6e4104d0b6dc856dca300913a06635ca2a4bd7639fd075b915c9f62f6dac39048838d2e424c2d426e73e75b66cd962ad27e99c6e711e7457d794ecba4f666af6e711457af78e219d5f5729a53cd77beeb07f72a2d1bb0b9b7c24771817c6f2c7618a876f42b6ee332e3a43eae388f1babc7651b9fe5723e5450efd13a292e98304899248240bd0317add7127a3dd4cd73854f526675b71c16b5cc93f82bb92b9cf3c17b173be0dcf560c9690859eadf3b313979491243e5c11dc689d5a73949f7aca3687d77647a1085ea9248bebf05df56f4905c707a304011a5d3b175e05b43d0b7d60d98b3b5b676e09ad7f2e6c0e745fae90f51951ff376e432fe7c4d73c38571a5e36075f3727ff17bb4bee3e1b0f20137199773f32f503b199637598d1c4dff22eb17578a0b6196030000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 14:35:04 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "d5bc03c31935595b070080fbbaef5456",
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
            "6e31a86fae22723d-IST",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $orderBy: [PostsOrderBy!], $where: PostsBoolExp) { posts (limit: $limit, offset: $offset, orderBy: $orderBy) { id, title } postsAggregate (where: $where) { aggregate { count } } }",
        variables: { limit: 10, offset: 0, orderBy: { id: "ASC" } },
    })
    .reply(
        200,
        [
            "1f8b0800000000000403a5934d8b14311086ff4ae8f31674be93b9ed88b81e14516f2252492ab3617bbbd7e9cc220cfbdf2d1531770b42522179525579eb3a15ec381daed3d3b6f77d3a7cb94ead4c87c9db926a9803b8926730c927484522545975904433993cdd4cbdf585f8f8715bda73c37513ef9ecbb688a33a8a4fd8d62eee68a115c587edb296e9e546fce5fba0adf3044a5505a65ac37c549072b0caa0c698d5c07f8fbd6d2b2ee2cd19d7d6493c6ebd3df3e67a1aa12186e09306aada82c97e86586501eb3d62092aba1407e8674c0b89b76bb9ecfddc18feea9ef20323c56dce1c6f8f410ef4c0a9e71015b848098cc30298386ee752b0da4bad2a0df4d7bde1a3e008732bcc12f4435cbac04beedb59549e5bbaec235e673d63b060293930c64848343b28ec261d830ab6fc0fdea880c52128c329989c1504530acc91ca2c7375c186017f4b2be12a2e0b572637dac5baad626989ce9bd81be7f1485d3cd1c29fdb69ff7ea1319380c647cac0052f60d88398ad079f4c98d90db3f3c35377f8d45b169fb7d326b675692bb104465cb4356932206dcc60b04448264a6091a45acd5c821f71c836deae52262f1dc86291856c1d042d2bb0226ac82e9376a390712ff5d7d8b15413c630a2d2c67a394392d183e1b201ce73856a55d2ca6a877904dd9eb832e248e787fdbe9d497c6491b5eca39b5ebedefce9b66f783a9de9849d3be83afd73c481bbe4b700275e2afbc2f61317688918a9030000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 14:32:22 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "cdf00dc694fee84c1c520b2374713736",
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
            "6e31a47a1c645136-IST",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $where: PostsBoolExp) { posts (limit: $limit, offset: $offset, where: $where) { id, title } postsAggregate (where: $where) { aggregate { count } } }",
        variables: {
            limit: 10,
            offset: 0,
            where: {
                _and: [
                    {
                        categoryId: {
                            _eq: "170b5abd-d8e6-476c-b3fd-bd2474b0f369",
                        },
                    },
                ],
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004037d914b4b04310cc7bf4ae97903339d3ef726225e4464af2292be660bb333d276051df6bb5b57c139995312925f1eff957aac48f72b7d5b4a2d74ffbcd2e4e99e06e71522eba137910397ce80754300c69477bed39d8a9eee684d750aadfc0eecb9a439944270c27ca2971df92529a50721d5776b64c0a3e0603db286d382711cd038b6213d624dcb8c13b9cf38a71ac869a9e9bd25e77103355e19d54906ce62048ebd02dd3307a2e74a628c9cf32df429e472853e2c38931be796f35c49f998eb3194f4d9d8e4104ac0ec8e92779b39c16ac62d0b60b4f4c07ddfde20d1b4d0a1649d8f1d979be56f971cc8e16c6dc8e4944a699780cba92687d3a0d8066c1d77035a095129053c28011805820f28b567031ba4de80fff98a36825e5e763f02bee238e630626da2acf42f20fb26c7f56ada5c7169f6051cd15b38fb010000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 14:36:24 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "6448cb28c9f8ec1a08be0c18dc29629a",
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
            "6e31aa65382c7240-IST",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
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
                            _eq: "170b5abd-d8e6-476c-b3fd-bd2474b0f369",
                        },
                    },
                ],
            },
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000403bd944babdb301085ff8ad03a037a8c1eceee524a37a5b7dc4d17a594d12b314dac603b85db90ff5e396da957a52b6b2124218e3ece8cce8d279a89ef6ffc52a779e2fbcf37de27bee7212774ca65d03a0440b41e3abf4c2873c9163dc5c8777ceee7536ed7dfd431b3976b087964e77e9afa3a401cfbb98f746ad722cdf950c7d7e5a187bc7422180a0992cf16d0d9084197042129741844d1b65bc93f5f1e4aecf9d857f6a9d694be1df9fdbe63bfe572f00a83ca0b63024cb28360a96bdb4856895404da95dcbf68b5535b00c7e4889404d91504b4b101479d41299762125eb89256c06f215ca77ec8d3c4e844e3790342e7bc36b635805245011683ad38a41aa6370a49531717a3fe34c0079a5bcde9c4de8d34f47366e73af7dfdbe170d80036448c9a8285e29c03ccce0015439032599f9456dafaff83f59dd980b74bae73c22a88810a2049075eaa0846b6af40a520e2dadc8f799c1ee6beaf34b0a718eb7598d9f43accc73cf53f9ac7ec254f99c678b42836e037266ad77901c26403688206df2c0652c947a5a440bdfe6fd74b4b999ca0d40a72033cf4aef5688b1329ad68787121f3099c74c579dfe946bf6a878df0beec7e85ec573a1cc67c688e2c71f877c3f62dce1ea5e56de9ef6dfc0473d5ba6a9f050000",
        ],
        [
            "Date",
            "Thu, 30 Dec 2021 06:52:28 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "b1243eb2890133b324252c79366e8b95",
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
            "6c59586e8bf05488-IST",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $where: PostsBoolExp) { posts (limit: $limit, offset: $offset, where: $where) { id, title } postsAggregate (where: $where) { aggregate { count } } }",
        variables: {
            limit: 10,
            offset: 0,
            where: {
                _and: [
                    {
                        category: {
                            id: { _eq: "8332c138-3231-406d-9655-1328ded9d5f2" },
                        },
                    },
                ],
            },
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000403754ed10ac23010fb15b9e71dd8aeebdafe8a885cafbd311027b63e95fdbb15059f0c041208491a24aa04a1c17d2bb540383558130488c43acb91d0792f68ac37e84c168c9ead649358c71906a86bbde61ea792e4cd4249601f0edf16274ac559595469223471b2e8462538138963cb79b4fca7c5380dfb79f8fcbad0b23cf242b56f35f89943e84bbc3d6f15bad47bc70bc5192fefd2000000",
        ],
        [
            "Date",
            "Tue, 23 Aug 2022 12:42:59 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "4d6b8e1a42671cb194971665d7bd0276",
            "Content-Encoding",
            "gzip",
            "CF-Cache-Status",
            "DYNAMIC",
            "Expect-CT",
            'max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"',
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
            "73f3ee5f8943b9d8-OTP",
        ],
    );
