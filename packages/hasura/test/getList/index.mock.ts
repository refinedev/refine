import nock from "nock";

/**
 * Hasura default 'snake_case' naming convention
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
 * Graphql default 'camelCase' naming convention
 */

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $where: PostsBoolExp) { posts (limit: $limit, offset: $offset) { id, title } postsAggregate (where: $where) { aggregate { count } } }",
        variables: { limit: 10, offset: 0 },
    })
    .reply(
        200,
        [
            "1f8b08000000000000137d934d6bdc301086ff8af03903b22c5bd2de764bdb14da1292dc4a0fa3d168d7c4b182ed0db421ffbdb3e9073a5520d008f1cc3bef8c5e9a841b36bb97e6a9acdbdaecbebd34636a764d44329c35820f21831d82056f39430c3464b6894c74cd55b38ddbc4f21cd7942f7bc5949bd72bf597d2060a3159483907b04c19903203321ab214986c5b51f6479e3775e0e5613d8d0babdbf3ba8d54f128a56489130c7d9bc0ea2e0046d660304886489ebca9781f0a9d57755ccaf9495d9f1f71567713f3430df4865c4b3de8aca300ad910ab183148373998d47df55c0f710cfeb38f3ba2a9c707914ad299725bdc9adb04cc9219a16da90adb8470122750cc6b844497bed72fa0fb622b93ec5ecb5872191061b5d84985a84dce6ceb7cc9a2d55a44399c6e711e7a2be3ca732a98339a83b1cc5d56b9e78467553ce73aaf9ce77fde02ed2b2019b7b2b7c1417c8f7c66287816a47bfe236961927f571c179dc583d966d7c96cbf95841bd47eba4b960c2206d920802f50e5cb45e4be8f5500fcf353e499bd57d391655e6498c90dcb5461fbc77b103ce5d0f969c8690a5ffbd13939397243154b87b8c13ab4f7392e95946d1faeec4f4200ad59e48cadf826f2b7a482e383d18a08832e9d83af0ad21e85beb06ccd95a5b3b70c3cbfae6c0e722f3f487a8d61ff376e275fc794973cb2be342a7c1eae6f5fbd5efafb53f1e173ee2c697cf86ff02b5131d6f8ccbd1f4afb27e01e7cadeae95030000",
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
            "1f8b0800000000000013a5934d8f14211086ff0ae9f356d27cc3dc668c713d688c7a331e0a2866c9f676afd3ccc664b3ffdd5a8d86bb951028024f7df0f23c15ec381d9ea7c76deffb74f8f63cb5321d266f4baa610ee04a9ec1249f2015895065d54112cd64f27433f5d617e2e3a76d694f0dd74d7c782adb224eea24be605bbbb8a58556149fb6eb5aa6971bf197ef83b6ce13285515986a0df35141cac12a831a635603ff23f6b6adb88877175c5b27f1b0f5f6c49beb79848618824f1aa86a0b26fb19629505acf78825a8e8521ca05f312d24deafe5baf74b63f89b3bcaf78c14c79c39df1e831ce8814bcf212a7091121887053071decea560b5975a551ae86f7bc307c119e6569825e8a7b87681d7dcb78ba83cb774dd47bcce7ac660c15272608c9190687650d84d3a06156cf91fbc51018b4350864b30392b08a61498239559e6ea820d03fe482be12aae0b772637dac5baad6269892e9bd81b077aa02e1e69e1c7edb4ffb8d2182aa0f1913270c30b18f62066ebc127136676c3ecfc10ea161f7bcbe2eb76dec4b62e6d2596c0888bb6264d06a48d190c9608c944092c9254ab994bf0230ed9c6db55cae4a503592cb290ad83a0650556440dd965d26e1432eea5be8e1d4b35614c232a6dac973324193d186e1be03c57a85625adac769847d0f1cc9d1127badcef77ed42e2338bac651fddf4f2fde6cf6f3b9ecf173a63a7d7ff87ff1c71e090bff5f7ba54f685ed17ee2e84f0a8030000",
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
            "1f8b08000000000000138d91c16ac3300c865fc5f85c41e238b6935b1963973146af6307d99653439a0cdb1d6ca5ef3e771b23c7e92409e9fbf9a50bf758908f17feb6e692f9f872e1d1f39193f31a51b4d00e4182546e00eb3a0221b477be318d0e9eef788965a63a7e0ff69ce34239339c319df875c77e495a9bae57fab61a04c8d04bb01e45c5995e48ec707062437ac212d70567f690708985d8692df1bd369769031dbc1e74a304388b0124b61a4c2b1cf4add40a4390526ea1cf94f237f471c585ed9d5bcf4b61f9632947caf1b3b2d98132617247259b8d0e5923a4150483511ea46feb19140eb574a844e34323d546e76e4dc40e676b29b153ccb93a019762890ee74e8b0dd83ae93ab40a82d61a24e91e30f4089e50192f3ad129f3bfab98a1e7d7d7ddcf03f7d39468c242b797e25fc1c6aafb6dfa96f6d71a5fc4298423fa010000",
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
            "1f8b0800000000000013bdd44d8bdb301006e0bf627cde017d8c34726e4b29bd946ed94b0fa587d157629a58c1560adb90ff5e392d25c73dd9076109e9d5c3d8d2b58f5cb9df5dfb7359ead2efbe5ffb31f6bbdea788a42881d6de03a27530b8b5419972b2e83884fea9af633da636fd439953f77af13ecddd695c96b14c10e6b18e818f6d5ae09af6657e5b37bac74b12deb08f105db2806403789d23f8a890d08bacedf010ff72be27752f87b174df4a89f1e7a1bfdd9eba7f71c93b855ea5d51801a31cc05b1e5a37b055226681f69d5a4d6a0b7088c4ac24c82123a00d0d1c7402a52886289ca01c1fe23e82bf2ce39496a5e323cfa70d84444e1b4b2b292bc06cb025b16a4c6714b2e621a887b82f5c5b155bdea799a7b1a6ee54eaf8ab0d4efb0db03e60d0ec2d6422024c6480b3618889ad8b4a2b6dddfbb06e301b7887480309ab2078ce802c099c54018c6cd19c33223e16f76b9a97bbf773e1a97b0ea15ca6da2d6f533da465fcddd8dd6b5a12cfe160516ce03726681a9c00619201345e836b250656d105a5a440fd78de2ee776cba408b914901bf0d051fb47db7a29ad68bcb0ca5c049294c9b94137fdf6bc1f4f7f2fd9e7fd7e4efbb6c79acfff3bddaef1ef5f767d75b7f6fc011b6c98a09e050000",
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
            "1f8b0800000000000013754e410ac23010fc4ad973174c9aa6496ebe433c6c92dd52102b269e4aff6e8ae2cd818119186666834c95206cf0584b2d102e1b2c1902444a9ae544e8bc1734d61b748605a34f56d8e4a4e3043dd4a5deb8c5a9643958280bec7df76d71a2549c944595474213478b6e50821391b864130f36fd69314ec37eed3fbfcef3fce4992a1f4fe967bad086d2fabad743eabde10d8cfa6975d1000000",
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
