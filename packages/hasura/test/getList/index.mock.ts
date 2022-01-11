import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $where: posts_bool_exp) { posts (limit: $limit, offset: $offset) { id, title } posts_aggregate (where: $where) { aggregate { count } } }",
        variables: { limit: 10, offset: 0 },
    })
    .reply(
        200,
        [
            "1f8b08000000000004037d934b6b1c311084ff8a98b31bf49a91b4376f48e24b42888f218456776b337876c6ccc317e3ff1ed909449744202109f15154959e3bc61dbbd373f7b86cfbd69dbe3d772377a72e2359291a21a654c00fc943f45220271a8a78269b4377d3ede33e497d8e1b97d7b92197eee546fda1849e73893ac2c0a4c1e79021b34128a6b86844b4786a28e7651a9f469c17f5e98997499ded59dde338efea4e2699517d598e991b7e368952660f5c4a022f5400a908a0a0254f49c89b867f7b91ca3acbfab0fd1c57515f8f6d1fa9e509fb608380733983f74384145f176fa4c8e02352abf7ddf206c95956751db76d5c66a075ac4c9c1a2a31b32761187ac3e0b54b805934584c5577a648d1362a3f2c746ceab22ec7a3ba3bae38abfb49e4a105464bc1500fbae82a537b5b7341079c5308456cc4e81ae07bc8c736ceb26d0a275cafd5012ecbca6f263458210e88d68049c5d7cc29412627606d60621d7528fc1f6c43f231f4d6170663869a7b4f11d04686604209312647ae6dcff1585b58fd29cb02a6c1f47d7d97a206dd4b5f31d94174350eb41cc95aa3bd1b1a41ffc284105d3fd454ad2d167ce97d6d2156cf285695e83051ebff67dc6b9038a98f2bcee32eeabaece353bd9c2fddcbf79bdf3fe5075e2eab5caaecd7cff3f7a04eb5fb546bba77756bd34b1dbf00a45d630965030000",
        ],
        [
            "Date",
            "Thu, 30 Dec 2021 06:52:25 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "4db236d8dbc5d00a9e4e829f713636bc",
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
            "6c5958588e9a5482-IST",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $order_by: [posts_order_by!], $where: posts_bool_exp) { posts (limit: $limit, offset: $offset, order_by: $order_by, where: $where) { id, title } posts_aggregate (where: $where) { aggregate { count } } }",
        variables: { limit: 10, offset: 0, order_by: { id: "asc" } },
    })
    .reply(
        200,
        [
            "1f8b080000000000040375934d8b14311086ff4ae8f3063adfc9dc7645744145d09b885492ca18ec498fd3e94158e6bf5bab82f1605ffa83cec3536f553d4d193a4c87a7e9bc6e7d9b0e9f9ea69aa7c324a38124b4e173f1816b549e834f8683b451446195c86aba9b7aed0bd2ef191b9e70baddb13fe7b57746ea92b91076e6da243a2f7de64eb8e2bc0f2a29379cdfcfe481999775e562c4e420d064cf8395845126f35844e12298000a8d91320d98c7d6a11d6b5c90ad676c7c5bf74b42f6a6266c1b6667e6816d0c39043ff3d9a021c5a8b857f6d933fb24a598b5b203fb7f8a56e0ac2db91bcc896b21140731076e432842172745192b859c36c8b0c97f5cac742e641dc92016ae23c5e55509dc4bafd11693e71907977b8a1b1adb977ea9a9e2c6dadad852235e56b6d5cee0849d9d7159b075dcbeef63679cc9b1f8d9739b13451a5de4310be014abf20271463d46fab02ef55aa1adeced35af0b7b900fec03d4d6d96b243cb0f7ebdef210ab735e19eb904b5924d7c568e283e454134d042808490ea5bc835ed7060b7b7581563bb2d3daeb953eb6e308f5c17b471dc2a2a857c9cd9cd2a5cc9d03c85e061bc300fd08cf23f0d8f2be5142047ff115d33742b2fb94c8b7073f4e99a7d2930f927a86916b0b9943246f6ba337ca0925cb98fecb5ee1c4c830d54c2c863fd84e99efa9af1756e85ee3be4db7cf77bf97ea0b1c8f173cd27c3fefd9df1776a065f96533d1a30c37ba7e028d31c39790030000",
        ],
        [
            "Date",
            "Thu, 30 Dec 2021 06:52:26 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "548f5f3d4ba87ac6ff3fbf1c1062ed53",
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
            "6c595861ce35548e-IST",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $where: posts_bool_exp) { posts (limit: $limit, offset: $offset) { id, title } posts_aggregate (where: $where) { aggregate { count } } }",
        variables: {
            limit: 10,
            offset: 0,
            where: {
                category_id: { _eq: "170b5abd-d8e6-476c-b3fd-bd2474b0f369" },
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004037d934b6b1c311084ff8a98b31bf49a91b4376f48e24b42888f218456776b337876c6ccc317e3ff1ed909449744202109f15154959e3bc61dbbd373f7b86cfbd69dbe3d772377a72e2359291a21a654c00fc943f45220271a8a78269b4377d3ede33e497d8e1b97d7b92197eee546fda1849e73893ac2c0a4c1e79021b34128a6b86844b4786a28e7651a9f469c17f5e98997499ded59dde338efea4e2699517d598e991b7e368952660f5c4a022f5400a908a0a0254f49c89b867f7b91ca3acbfab0fd1c57515f8f6d1fa9e509fb608380733983f74384145f176fa4c8e02352abf7ddf206c95956751db76d5c66a075ac4c9c1a2a31b32761187ac3e0b54b805934584c5577a648d1362a3f2c746ceab22ec7a3ba3bae38abfb49e4a105464bc1500fbae82a537b5b7341079c5308456cc4e81ae07bc8c736ceb26d0a275cafd5012ecbca6f263458210e88d68049c5d7cc29412627606d60621d7528fc1f6c43f231f4d6170663869a7b4f11d04686604209312647ae6dcff1585b58fd29cb02a6c1f47d7d97a206dd4b5f31d94174350eb41cc95aa3bd1b1a41ffc284105d3fd454ad2d167ce97d6d2156cf285695e83051ebff67dc6b9038a98f2bcee32eeabaece353bd9c2fddcbf79bdf3fe5075e2eab5caaecd7cff3f7a04eb5fb546bba77751b5feaf8059c28bd8464030000",
        ],
        [
            "Date",
            "Thu, 30 Dec 2021 06:52:27 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "12dbc039384f373abd33e98e8ef028e8",
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
            "6c5958686d2a5481-IST",
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
                category_id: { _eq: "170b5abd-d8e6-476c-b3fd-bd2474b0f369" },
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
