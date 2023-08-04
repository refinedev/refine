import nock from "nock";

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($objects: [posts_insert_input!]!) {\n      insert_posts (objects: $objects) {\n    returning { id, title, content, category { id } }\n  }\n    }",
        variables: {
            objects: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
                },
            ],
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000003a48fb14ec33010407fe5e4b9468e9ba471b60efc020b42e8ec5ce024c749ed330255f977d48a0166c627bde1bdab9a50508d57c5a95096d76d2d526e9c496a4e9cde148cf07c553ca95151b066b2c1e8a60dbd6e7b336b37e1a42d5117d00e9371461d94b04452a33a53224c50a3640e4c05d29a20b2a7bc4261015c4860a3182909954b257550614d4249d4a89ea808fb1aeb021f356e5550080a6e4c093087fa70b351e86dcd5ff7837ba13d355d1f8eda3937e8f6d8ceda4f9dd7d69bd36087e33cdb5eedfb017e7c33f45dd7d8936ee6bed1ad73413bc456a32737b76670cd31fc3a7a14c6058453e0a92601fa842a8035c89a61c61ad8d7f2e7e21cf9527181c4fe1d28a3fc27fb65dff76f000000ffff03000371ce87b3010000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 08:30:06 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "63f35619295a75e475df598517709b16",
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
            "7f156fb14a4f5487-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($objects: [posts_insert_input!]!) {\n      insert_posts (objects: $objects) {\n    returning { id }\n  }\n    }",
        variables: {
            objects: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    category_id: "e27156c3-9998-434f-bd5b-2b078283ff26",
                },
            ],
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000000032cca410ac3201000c0afc89ebb1037ba6abe524ad135295e6c31e624febd147a1c980139f608db8052cfbdf5e7e77df6f3e7b6f7abd5525fa036751f50326ce0c87b71da2249ca68567618d8310a332f41534e44306feadf69612d490e349e04cd2116c31a32061b858df35a4782f998737e010000ffff0300e614462188000000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 08:30:07 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "816988dab1551ac5622bcef75d67dbdd",
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
            "7f156fba9c2d92d2-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($objects: [PostsInsertInput!]!) {\n      insertPosts (objects: $objects) {\n    returning { id, title, content, category { id } }\n  }\n    }",
        variables: {
            objects: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    categoryId: "e27156c3-9998-434f-bd5b-2b078283ff26",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    categoryId: "e27156c3-9998-434f-bd5b-2b078283ff26",
                },
            ],
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000003a48fb16ec32014007fe5893954310e9878cbd0bd5397aac3031e2912c6093caa5691ffbd4ad5a19d3b9e74c3dd4d046414f34da4d2a8f2d3dab8ddb112f75a52390b98e1e5265210b318e2e0c31047e9bd37f2a07192d6062ba38b63a0a8291a2b7682136712b33851212cd033d7e41335286b819c1cd5155a62c085182e943315a676ed2476c2af85a9b098c533354eaee7bec07bcf97cec8040d2f890a60f5fde16e23d379ad9fdf03f74252d3a08d1fe5f178b4f2301ea274413ba9dc7eb2ca8e312a23b66d073ffeb41fbc098412550cf230692d9d1d4769266d9452c644d2bf8e1e39e1029c8a4fa11706fa80ce80ddf35a2162f7c9f5f6e7e294d3b5e30225b937a08afc9fecd76ddbbe000000ffff03008549d574b2010000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 08:30:09 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "e10ffa38999b2f39563f4e1b3b76bcd6",
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
            "7f156fc3ee3c92dd-IST",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://ruling-redbird-23.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($objects: [PostsInsertInput!]!) {\n      insertPosts (objects: $objects) {\n    returning { id }\n  }\n    }",
        variables: {
            objects: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    categoryId: "e27156c3-9998-434f-bd5b-2b078283ff26",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    categoryId: "e27156c3-9998-434f-bd5b-2b078283ff26",
                },
            ],
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000000032cca310a03211000c0af1c5b6741ef76d5f315e9430a75bd6063404d25fe3d04520ecc040923809f506acf6ddcdf7df41f5b1e9f564b7dc1e6b7c78422e0418c0e6cc5a2b6bb42127da03b1d23b17349384a3227acdbf6ef2c142ea284ca0823e52363208a98385ca2a2b16937b09e6bad2f000000ffff030034ad03d387000000",
        ],
        [
            "Date",
            "Fri, 04 Aug 2023 08:30:10 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "694684b42f30ed5824ffae488824f1b0",
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
            "7f156fcdf94392d5-IST",
            "Content-Encoding",
            "gzip",
        ],
    );
