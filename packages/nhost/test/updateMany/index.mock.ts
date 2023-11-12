import nock from "nock";

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/auth/signin/email-password", {
        email: "salih@pankod.com",
        password: "refine-nhost",
    })
    .times(2)
    .reply(
        200,
        {
            session: {
                accessToken:
                    "eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsIm1lIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiY2IwZTA1NDQtZTI4ZC00ZmFmLTk2NWEtZWVhNDc4MmExOGNjIiwieC1oYXN1cmEtdXNlci1pc0Fub255bW91cyI6ImZhbHNlIn0sInN1YiI6ImNiMGUwNTQ0LWUyOGQtNGZhZi05NjVhLWVlYTQ3ODJhMThjYyIsImlzcyI6Imhhc3VyYS1hdXRoIiwiaWF0IjoxNjQ1Nzk3ODU2LCJleHAiOjE2NDU3OTg3NTZ9.GnROnKobN6vUvszmQliZzX7pQKkyublW9gSVFDsi44M",
                accessTokenExpiresIn: 900,
                refreshToken: "f3b2b67e-5755-4c5f-b9c1-f9908f9c83ba",
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
            "Fri, 25 Feb 2022 14:04:16 GMT",
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
            'W/"3a1-+DBYjg5sCRI5AnCv0wJGQOmMlbI"',
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .options("/v1/graphql")
    .times(4)
    .reply(204, "", [
        "Date",
        "Fri, 25 Feb 2022 14:04:16 GMT",
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
        query: "mutation ($where: posts_bool_exp!, $_set: posts_set_input!) {\n      update_posts (where: $where, _set: $_set) {\n    returning { id, title, content }\n  }\n    }",
        variables: {
            where: {
                id: {
                    _in: [
                        "6a117e72-9446-4413-9760-30d66b9a27dc",
                        "eccfaeb9-7fc7-45f6-b546-cb6e14109087",
                    ],
                },
            },
            _set: { content: "Vel deserunt rerum et." },
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000403858dcd6ac33010845f65d9b315ac44912a1f0b7d83a49712827ed68dc09183b43e19bf7bd590436f3dcd0c33ccb76274ec705871793447d7c75cb9fee642bc949cf237c2005f2ba688035208a3236f85198311ea386ae18f4a8be03549257bdbbf19ec90134fd4e6e7e76784d3337718e6cc94b9359f3441a44a65c90ca5c91d8877b875f0226927a521b31756b57fa5e44158a37b71e8a3d6debabd89e10fe943f8a5a64cb5829b5cb9c33bc5712eb1de52a1b6fb9f7cd9b6ed076c4f627f0e010000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 14:04:16 GMT",
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
            "2c2ef255f8b91cdecb89f0d8fc36677b",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: PostsBoolExp!, $_set: PostsSetInput!) {\n      updatePosts (where: $where, _set: $_set) {\n    returning { id, title, content }\n  }\n    }",
        variables: {
            where: {
                id: {
                    _in: [
                        "6a117e72-9446-4413-9760-30d66b9a27dc",
                        "eccfaeb9-7fc7-45f6-b546-cb6e14109087",
                    ],
                },
            },
            _set: { content: "Vel deserunt rerum et." },
        },
    })
    .reply(
        200,
        [
            "1f8b080000000000000aa58ebd6ec3300c84773f05a1392aac4491aa8c05b26768b3141df44327021cb990e829f0bb473152a31ddaa513ef3e1ec1bb36002c58b26c07d7aaab1b3fabc7c350a82cb0e28c34e614d3a9c2f70784653d4762a83b86de77169de1baf39acb6da7b8db4ac5bd5328a4684dfbacd9eafb1d45eaf17efa36bf0ef03a831f193f24c244f7d4117b0858308f8920d77101a427b6a4a7d55ff5941542a35e73236b2929c5861bad5abe698352ced8b50efe977a7beec612139602b6b7f9022f18ba2187728ef91f751feaa3f9725333dd006e00775298010000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 14:04:16 GMT",
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
            "2c2ef255f8b91cdecb89f0d8fc36677b",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: posts_bool_exp!, $_set: posts_set_input!) {\n      update_posts (where: $where, _set: $_set) {\n    returning { id }\n  }\n    }",
        variables: {
            where: {
                id: {
                    _in: [
                        "6a117e72-9446-4413-9760-30d66b9a27dc",
                        "eccfaeb9-7fc7-45f6-b546-cb6e14109087",
                    ],
                },
            },
            _set: { title: "updated-foo-1", content: "updated-bar-1" },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004032dca490ac3300c40d1ab18ad2bb01345aa7d95528a07b96493860c2be3bb3785eefe87d7a0c423426870ae57e96bfdecc7fefb4d8f735be6e50d26984783b94000cdb9464d1ea566419a2a639a8831275647ce7a7b17e837f3e71c9d1395013d5d88c88de8852d8eb630271f072919fab3f7fe0584b2687f88000000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 14:05:53 GMT",
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
            "a545aad5488c8f471e704aac9e9a603b",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($where: PostsBoolExp!, $_set: PostsSetInput!) {\n      updatePosts (where: $where, _set: $_set) {\n    returning { id }\n  }\n    }",
        variables: {
            where: {
                id: {
                    _in: [
                        "6a117e72-9446-4413-9760-30d66b9a27dc",
                        "eccfaeb9-7fc7-45f6-b546-cb6e14109087",
                    ],
                },
            },
            _set: { title: "updated-foo-1", content: "updated-bar-1" },
        },
    })
    .reply(
        200,
        [
            "1f8b080000000000000a7d8c3b0ec2301044fb9cc272cd4a76e2ec624e418f28fc4569024a9c2af2dd59a16051d1cdbcd97d7b27848cae3879113b676edb8b7bba3ed7b236c87849655be6697e30bc1d50b4f9733245de640a21bbe42d500e0466cc087e3408c163d2462babce24db5b3dfd73a1d39a12f5600d1b8cd103584205838a88deba9e62f8711de9de7d5bedea1b782251d3e2000000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 14:05:53 GMT",
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
            "a545aad5488c8f471e704aac9e9a603b",
            "Content-Encoding",
            "gzip",
        ],
    );
