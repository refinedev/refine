import nock from "nock";

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/auth/signin/email-password", {
        email: "salih@pankod.com",
        password: "refine-nhost",
    })
    .twice()
    .reply(
        200,
        {
            session: {
                accessToken:
                    "eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsIm1lIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiY2IwZTA1NDQtZTI4ZC00ZmFmLTk2NWEtZWVhNDc4MmExOGNjIiwieC1oYXN1cmEtdXNlci1pc0Fub255bW91cyI6ImZhbHNlIn0sInN1YiI6ImNiMGUwNTQ0LWUyOGQtNGZhZi05NjVhLWVlYTQ3ODJhMThjYyIsImlzcyI6Imhhc3VyYS1hdXRoIiwiaWF0IjoxNjQ1Nzk2NjM4LCJleHAiOjE2NDU3OTc1Mzh9.Oef5u7Sf9b5iyptFqBKjtNhTauwzqbZ8pVVnOUsNImg",
                accessTokenExpiresIn: 900,
                refreshToken: "4401a395-fa4a-4bec-8f66-f01000ed5e07",
                user: {
                    id: "cb0e0544-e28d-4faf-965a-eea4782a18cc",
                    createdAt: "2022-02-23T14:49:56.701205+00:00",
                    displayName: "salih@pankod.com",
                    avatarUrl:
                        "https://s.gravatar.com/avatar/00cfdb0bc9cf7d668d0df28e18536166?r=g&default=blank",
                    locale: "en",
                    email: "salih@pankod.com",
                    isAnonymous: false,
                    defaultRole: "user",
                    roles: ["user", "me"],
                    metadata: {},
                },
            },
            mfa: null,
        },
        [
            "Date",
            "Fri, 25 Feb 2022 13:43:58 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "929",
            "Connection",
            "keep-alive",
            "X-DNS-Prefetch-Control",
            "off",
            "X-Frame-Options",
            "SAMEORIGIN",
            "Strict-Transport-Security",
            "max-age=15552000; includeSubDomains",
            "X-Download-Options",
            "noopen",
            "X-Content-Type-Options",
            "nosniff",
            "X-XSS-Protection",
            "1; mode=block",
            "Access-Control-Allow-Origin",
            "*",
            "Surrogate-Control",
            "no-store",
            "Cache-Control",
            "no-store, no-cache, must-revalidate, proxy-revalidate",
            "Pragma",
            "no-cache",
            "Expires",
            "0",
            "ETag",
            'W/"3a1-OgQarQyV1skzVL6VM8QxBMXgj20"',
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .options("/v1/graphql")
    .times(6)
    .reply(204, "", [
        "Date",
        "Fri, 25 Feb 2022 13:43:58 GMT",
        "Content-Type",
        "text/plain charset=UTF-8",
        "Content-Length",
        "0",
        "Connection",
        "keep-alive",
        "Access-Control-Max-Age",
        "1728000",
        "Access-Control-Allow-Headers",
        "Authorization",
        "Access-Control-Allow-Origin",
        "http://localhost",
        "Access-Control-Allow-Credentials",
        "true",
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    ]);

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($id: uuid!) {\n      delete_posts_by_pk (id: $id) {\n    id, title\n  }\n    }",
        variables: { id: "92bbb942-a5a7-4cd9-8232-d7aa544a0c40" },
    })
    .reply(
        200,
        [
            "1f8b080000000000040315cad10ac2300c40d15f2979b6306ac6ecdefd8e92361182731b360565f4df9d4f170ef7002623980f6059c424ed5bb59af237edcfbf2ac30c31e49c23064f234d1e0b477f0bd7e079221a11692838c0054c6d9173bf9bd2cb99ae45b9ade6e4e39a396ac5b6b77b9cd5dc2af4de7fc2ecbe637d000000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 13:43:58 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "keep-alive",
            "Access-Control-Allow-Origin",
            "http://localhost",
            "Access-Control-Allow-Credentials",
            "true",
            "Access-Control-Allow-Methods",
            "GET,POST,PUT,PATCH,DELETE,OPTIONS",
            "x-request-id",
            "f39bd8b7b51590d9960c15776b96a060",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($id: uuid!) {\n      deletePostsByPk (id: $id) {\n    id, title\n  }\n    }",
        variables: { id: "92bbb942-a5a7-4cd9-8232-d7aa544a0c40" },
    })
    .reply(
        200,
        [
            "1f8b080000000000000a3d8bc10ac2301044effd8a256703256ea9f12878ef2f6cb211166b0b66034ae9bf9b087a18661ec3db3a00c3a464ceb0d5dd28cd49d3b466cd97f774ff1ff512ae64bc0b21787496061a2d46f6f6e48ecef2483420521fb137879fa3a2736ada55851ea0b244e1b228a41714052a51d727dc6a4b28d97cb5bd6bd93f4b0556269d000000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 13:43:58 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "keep-alive",
            "Access-Control-Allow-Origin",
            "http://localhost",
            "Access-Control-Allow-Credentials",
            "true",
            "Access-Control-Allow-Methods",
            "GET,POST,PUT,PATCH,DELETE,OPTIONS",
            "x-request-id",
            "f39bd8b7b51590d9960c15776b96a060",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($id: uuid!) {\n      delete_posts_by_pk (id: $id) {\n    id\n  }\n    }",
        variables: { id: "2d0c792c-4d28-4dff-a5b8-37858d0faa54" },
    })
    .reply(
        200,
        [
            "1f8b0800000000000403ab564a492c4954b2aa564a49cd492d498d2fc82f2e298e4faa8c2fc8068966a628592919a518249b5b1a25eb9aa418590089b434dd44d3240b5d63730b538b1483b4c4445313a5dada5a00f46473374d000000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 13:45:25 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "keep-alive",
            "Access-Control-Allow-Origin",
            "http://localhost",
            "Access-Control-Allow-Credentials",
            "true",
            "Access-Control-Allow-Methods",
            "GET,POST,PUT,PATCH,DELETE,OPTIONS",
            "x-request-id",
            "73328edc038ca1baf85b11f7e9af33f8",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($id: uuid!) {\n      deletePostsByPk (id: $id) {\n    id\n  }\n    }",
        variables: { id: "2d0c792c-4d28-4dff-a5b8-37858d0faa54" },
    })
    .reply(
        200,
        [
            "1f8b080000000000000aabe65250504a492c4954b252a806b241bcd49cd492d480fce29262a7ca806cb804502a3305c853324a314836b7344ad6354931b200126969ba89a64916bac6e616a6162906698989a6264a602db55c205c0b00a18507a365000000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 13:45:25 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "keep-alive",
            "Access-Control-Allow-Origin",
            "http://localhost",
            "Access-Control-Allow-Credentials",
            "true",
            "Access-Control-Allow-Methods",
            "GET,POST,PUT,PATCH,DELETE,OPTIONS",
            "x-request-id",
            "73328edc038ca1baf85b11f7e9af33f8",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($id: Int!) {\n      delete_users_by_pk (id: $id) {\n    id, name\n  }\n    }",
        variables: { id: 1 },
    })
    .reply(
        200,
        [
            "1f8b080035c1066402ffab564a492c4954b2aa564a49cd492d498d2f2d4e2d2a8e4faa8c2fc8068966a6285919ea28e525e6a62a592905a5a665e6a52ab8a49629d5d6d602005304de7c3c000000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 13:43:58 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "keep-alive",
            "Access-Control-Allow-Origin",
            "http://localhost",
            "Access-Control-Allow-Credentials",
            "true",
            "Access-Control-Allow-Methods",
            "GET,POST,PUT,PATCH,DELETE,OPTIONS",
            "x-request-id",
            "f39bd8b7b51590d9960c15776b96a060",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($id: Int!) {\n      deleteUsersByPk (id: $id) {\n    id, name\n  }\n    }",
        variables: { id: 1 },
    })
    .reply(
        200,
        [
            "1f8b080000000000000aabe65250504a492c4954b252a806b241bcd49cd492d4d0e2d4a262a7ca806cb804502a3305c833d48171f312735381024a41a9699979a90a2ea9654a60a95a2e10ae0500c891a2d55c000000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 13:43:58 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "keep-alive",
            "Access-Control-Allow-Origin",
            "http://localhost",
            "Access-Control-Allow-Credentials",
            "true",
            "Access-Control-Allow-Methods",
            "GET,POST,PUT,PATCH,DELETE,OPTIONS",
            "x-request-id",
            "f39bd8b7b51590d9960c15776b96a060",
            "Content-Encoding",
            "gzip",
        ],
    );
