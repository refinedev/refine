import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int) { posts (limit: $limit, offset: $offset) { id, title } posts_aggregate  { aggregate { count } } }",
        variables: { limit: 10, offset: 0 },
    })
    .reply(
        200,
        [
            "1f8b08000000000004038dd34d6bdc301006e0bf227cce80be6c497beb9696f490529a6329653433da98ecdac1b2d3c392ff5ea52dd4eda906191bec472f339a6bc7b86277b8764f735d6b77f872ed46ee0e5d712198622c0c4c03f86434c4927bb0a5b7ae94a07bd6dd4db78eeb59dae76fe7cb659b46c2759ca7aaee64c5b3fa30f156d765c473f772a37ec359d8071b049ccb19bc1f22a4f87af3468a0c3e22d15ff022eaf396b32cea32d6da78a0655cdb567b95a2a560a8075d7453b5b790133ae09c4228622346b75391a92263dde742b25234424ca9801f9287e8a5348686229ec9e6b0172a176cab3165a710337b1286a137dc72b804984583c5c4a5648a2de84e793fd356d56999b72775bb5d7052f76791c71d187ace25eaf8da070d3e870c990d4231c54523a2c5efcb759ccfe3f388d3acee9e793eaba33daa7b1ca755ddca5926549fe66de29d9f4da294d9438b97c00b15402a022868c95312f26617f8cd499a7594e5b13e8c3f3b535b2b769e1007446bc0a4e25b1929412627606d60621d7528bcf3de41deea3849ad0acfb85c1acd655ef8a7be637d0cbdf585c198a195a1a70868234330a184189323b7efce4759bfcf2da39a9f64823a6f0b897a906d19ff89dbf7edc71435e85efae66607d1b5d3889623596bb477c3ffc6355aebeee5ebcdaf51fa86a7d322275cdb785cbb3f2fead026815a17d6ae3d3af7d2ae1f3ad1a09d86030000",
        ],
        [
            "Date",
            "Tue, 19 Oct 2021 08:26:37 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "25c6845e409121f685aa1ccee9c8339d",
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
            "6a089f52ea55548e-IST",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $order_by: [posts_order_by!], $where: posts_bool_exp) { posts (limit: $limit, offset: $offset, order_by: $order_by, where: $where) { id, title } posts_aggregate  { aggregate { count } } }",
        variables: { limit: 10, offset: 0, order_by: { id: "asc" } },
    })
    .reply(
        200,
        [
            "1f8b0800000000000403a5934d8bdb301086ff8af03903fab4a4dc1a5868615b0a3d965224cd282bead8a9256f0b21ffbd5a5aa8f7bcbec802f1ccab4733b701430bc3f1365c97daea70fc7a1b0a0ec741c460e3983964ca0634371c82cc1130a4c4cd98ac157a380cadb489faf177345398d936b5b5a44295cdcbcca612695d582d8d850b3576a569a2b951fdb9d1703fb07fa5a4454e6ee4405a71d0425a08441c109d535e5a421f77a51e97952eac5ceb7661b84c7db767b994b2f30948fa003a4401d12407523854e84d144eee580fad840b6b654e05b7b931facdb61e764b6d5959ee6b895bdde1158a28a8a70c38aa6e2529709946b0d12b0ce82905b3c3bfc58a76d6489d1184e86af4cb2582740856d86c9df32a29bb2bf589daaf65fd51d972a519eab2ad89d8136d6ba9ada4dd15347a41061df85176ae3208318b0cc21b1f14192365da713fcc2dcce712277a457e2c89e64a680ddfb18de9a1bce3c00df5a631b1eb51e34b7074494ac1b51a77ec07e876cb4cb5b23085f5c24e847959b13e959504e77bf42888eb91100c61ea4d221404c13d8cde67a1b39522ef75044c3560a8f255be515aeb51c79e2a66d0b13b752a7b70d2691ab341ce6997ef2dcf670dc6ecb8831153d71c6d8488224057ad9ce8ed4d7aaff9b44ce5b98479611f9f7b53b3933cb12fa1f4967c4f7d6602fbbc6c330ef76f87bf83fa3d9ccf2b9d43ebc3771bfe6fd8b14f55ea67dbd07f95baf7ef0fe2237c91e4030000",
        ],
        [
            "Date",
            "Tue, 19 Oct 2021 08:30:18 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "40420a366725119adcc66778883cc86b",
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
            "6a08a4b9aa285493-IST",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int) { posts (limit: $limit, offset: $offset) { id, title } posts_aggregate  { aggregate { count } } }",
        variables: { limit: 10, offset: 0 },
    })
    .reply(
        200,
        [
            "1f8b08000000000004038dd34d6bdc301006e0bf227cce80be6c497beb9696f490529a6329653433da98ecdac1b2d3c392ff5ea52dd4eda906191bec472f339a6bc7b86277b8764f735d6b77f872ed46ee0e5d712198622c0c4c03f86434c4927bb0a5b7ae94a07bd6dd4db78eeb59dae76fe7cb659b46c2759ca7aaee64c5b3fa30f156d765c473f772a37ec359d8071b049ccb19bc1f22a4f87af3468a0c3e22d15ff022eaf396b32cea32d6da78a0655cdb567b95a2a560a8075d7453b5b790133ae09c4228622346b75391a92263dde742b25234424ca9801f9287e8a5348686229ec9e6b0172a176cab3165a710337b1286a137dc72b804984583c5c4a5648a2de84e793fd356d56999b72775bb5d7052f76791c71d187ace25eaf8da070d3e870c990d4231c54523a2c5efcb759ccfe3f388d3acee9e793eaba33daa7b1ca755ddca5926549fe66de29d9f4da294d9438b97c00b15402a022868c95312f26617f8cd499a7594e5b13e8c3f3b535b2b769e1007446bc0a4e25b1929412627606d60621d7528bcf3de41deea3849ad0acfb85c1acd655ef8a7be637d0cbdf585c198a195a1a70868234330a184189323b7efce4759bfcf2da39a9f64823a6f0b897a906d19ff89dbf7edc71435e85efae66607d1b5d3889623596bb477c3ffc6355aebeee5ebcdaf51fa86a7d322275cdb785cbb3f2fead026815a17d6ae3d3af7d2ae1f3ad1a09d86030000",
        ],
        [
            "Date",
            "Tue, 19 Oct 2021 09:20:57 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "376d6abd20a76d9a9ba71e15ad91e5d6",
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
            "6a08eeee2bea5481-IST",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "query ($limit: Int, $offset: Int, $order_by: [posts_order_by!], $where: posts_bool_exp) { posts (limit: $limit, offset: $offset, order_by: $order_by, where: $where) { id, title, category { id, title } } posts_aggregate  { aggregate { count } } }",
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
            "1f8b0800000000000403bd954b8bd4401485ff4a91f55ca8f7a3772a22823a321b1722528f5bddc1eed4509528e330ffdd4aabd80a3e36318b904a8a7b3f4e4e9d7b3f243ffb61773fdc9636b761f7f67e18d3b01bb2308665c641a7a8413a46c1e6a08067c545ce86aa4487ab611ee723f6ed4fcae9b44c63f4f358a6465ee2ec8fe4f9949636d7d11ffbcefe09f7a5deadbdce1d98a141f9902059ec1d8c8e10444e10129746069a8576171dae6fe75efe48ae0f63216f4a49380d0f0f57e45b356f7970a835f09865e735093c450ed1f1609c8c4cc57851ed2fbc86aead37460e98a4e106418810404a6dc1d9f5261966d4d2fa5f902b929b2504ace434b6d6858658c7b32adbc362b05c068e2b6202999883a0bdebcbe835a72953a97fd2f7f7b0c2f0ffc01b93f19e33606ef5838e9d370a04ce4d8a895a6a72bae07d0a6169e384ad117ff4f5441e63caa5a676182b6e4fab5414c6590a54a102a982002bba153c4f3672cea81497eafe919651ba9ecc8dcd6b8c154a77f3729e39c8ac643fb89e7791ade2d20befe2fa97bfe7c3ab7330f4e3fbacfa699c919cca3c7eec2fa7fdf6ac21ca287cd0908d3120d128f0597948e8b54d5cf02ef5bfb15aa7b6c795d674097b1232a66937435c7d60131866b2b1d689ee954b5c9c3f95faa191728b13b4b2d488e4804b1d5bcf86ed715d32ce50dda336f80cd2330396f1088af54cf7394b292f9df01a6b2b5377c28be227f228c6b24c336977d37cc0367eee862037d8d0d778d0723b23bfbbfa3af1defbfdbee2be0fa77530fd58905d9f2c67b6a13f0af1d0af2f1a1d78af2d070000",
        ],
        [
            "Date",
            "Tue, 19 Oct 2021 09:36:24 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "917f35c774df11cbbdba809343a8dd5b",
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
            "6a0905906f405481-IST",
        ],
    );
