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
                    "eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsIm1lIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiY2IwZTA1NDQtZTI4ZC00ZmFmLTk2NWEtZWVhNDc4MmExOGNjIiwieC1oYXN1cmEtdXNlci1pc0Fub255bW91cyI6ImZhbHNlIn0sInN1YiI6ImNiMGUwNTQ0LWUyOGQtNGZhZi05NjVhLWVlYTQ3ODJhMThjYyIsImlzcyI6Imhhc3VyYS1hdXRoIiwiaWF0IjoxNjQ1Nzk2ODk2LCJleHAiOjE2NDU3OTc3OTZ9.zq21vBhl30oIH08_2GxkvyEJpSoey7-7Nu-3v1kUW7U",
                accessTokenExpiresIn: 900,
                refreshToken: "4d9ad0cd-ec03-4cc7-8e3f-9bd09578488d",
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
            "Fri, 25 Feb 2022 13:48:16 GMT",
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
            'W/"3a1-UIuoGmP8896Bgh2eaFdbmtKi0/w"',
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .options("/v1/graphql")
    .times(4)
    .reply(204, "", [
        "Date",
        "Fri, 25 Feb 2022 13:48:16 GMT",
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
        query: "mutation ($where: posts_bool_exp!) {\n      delete_posts (where: $where) {\n    returning { id, title }\n  }\n    }",
        variables: {
            where: {
                id: {
                    _in: [
                        "b16d671e-1172-4622-8c2f-b4b88fd60bfc",
                        "56c313f2-8709-4e75-9d01-6d89583e4939",
                    ],
                },
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004034dcd4b6ac4301045d1ad14356e81e58f2c7b964156119aa04f2914a8e58e558206e3bdc7810c327a5c78700e8c4e1cae0746ca24f4f9dcaad4dfde49da5eb87c21acf07120475c713261d043ea959dbb458d344f6a899d5626da65b2038dcbb0e00d8525d3757fa342ae40cbb27360aa50b602993ded1b5416700f127852ce5484ea77233c6ff047796da2993529ade75e8da6bfd0d027e5476f6d8aa6f329fca3de85dd03844be0d88a00bda05d400bb2ed90ae65df2a9ef7f33c7f00d8f51589f4000000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 13:48:16 GMT",
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
            "c95ce7d0b9759243b2aa9f1185f2d9f9",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: PostsBoolExp!) {\n      deletePosts (where: $where) {\n    returning { id, title }\n  }\n    }",
        variables: {
            where: {
                id: {
                    _in: [
                        "b16d671e-1172-4622-8c2f-b4b88fd60bfc",
                        "56c313f2-8709-4e75-9d01-6d89583e4939",
                    ],
                },
            },
        },
    })
    .reply(
        200,
        [
            "1f8b080000000000000a7d8e3b6bc4300cc7f77c0a91f90c711e4e725b87eedd4b073fe422f039ad2d43e1c877afaf5cc32deda4ff4312bf6b03d03acdba3dc3b5ea9bc3808c2f5be67c84354ec825458aef357cbd8770d43f2be46ad74eca0e72f0bd58e66e1523ce93585d278572cb3a2d038eebb0b6a7c73b260e783b7dc2883a42099cc81266885b844006d3069918f405193e30048c8cf9b3607bbcd94fff3119a99c9a250a29e75e8caaaf74b6f7c28c6659bc539df1f60fa667267d01a668c995c8805f502a49b1bc25f0759229f981e3aede9a5fb737fb37bf9eff4166010000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 13:48:16 GMT",
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
            "c95ce7d0b9759243b2aa9f1185f2d9f9",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: posts_bool_exp!) {\n      delete_posts (where: $where) {\n    returning { id }\n  }\n    }",
        variables: {
            where: {
                id: {
                    _in: [
                        "be7fd33d-efa2-4d49-8576-48d9a57a5bb1",
                        "ed7b62d6-762f-42aa-a7f0-fe3670d75a67",
                    ],
                },
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004032dcadb0ac2300c00d05f297936307b49b6fe8a88a42495814cd9baa7d27f17c1c703a7834a13c81dd45ed6ecf1791fedf879b776eedbba3dc16577ebb02a6428c6554350b42a1ea3c605e7c48471d645124b2ae50ae3e2fedd940b792564f215a31741e13a61b5403c29272186711f637c01d95d807f88000000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 13:54:55 GMT",
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
            "3680c1f0fcba090174d863ea44505f35",
            "Content-Encoding",
            "gzip",
        ],
    );
nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: PostsBoolExp!) {\n      deletePosts (where: $where) {\n    returning { id }\n  }\n    }",
        variables: {
            where: {
                id: {
                    _in: [
                        "be7fd33d-efa2-4d49-8576-48d9a57a5bb1",
                        "ed7b62d6-762f-42aa-a7f0-fe3670d75a67",
                    ],
                },
            },
        },
    })
    .reply(
        200,
        [
            "1f8b080000000000000a7d8ccb0ac2301045f7fd8a90b50335af69fd0af7e262c24ca42015dab82af977a3d4e0caddbde73eb64e29cd94499fd456f5dbc95db29c1f6b5e1bac7891fc5ce669be5578d9a16af1a73271cd74144c6c2d832432e0d88d30780ce0061ec923f9188fbacdcae1df9730c66038000693c01922204c3d24b1017b464f017fbe7675edbeae74e5053dcd0ca0e2000000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 13:54:55 GMT",
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
            "3680c1f0fcba090174d863ea44505f35",
            "Content-Encoding",
            "gzip",
        ],
    );