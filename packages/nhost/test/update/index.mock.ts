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
                    "eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsIm1lIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiY2IwZTA1NDQtZTI4ZC00ZmFmLTk2NWEtZWVhNDc4MmExOGNjIiwieC1oYXN1cmEtdXNlci1pc0Fub255bW91cyI6ImZhbHNlIn0sInN1YiI6ImNiMGUwNTQ0LWUyOGQtNGZhZi05NjVhLWVlYTQ3ODJhMThjYyIsImlzcyI6Imhhc3VyYS1hdXRoIiwiaWF0IjoxNjQ1Nzk3NDgxLCJleHAiOjE2NDU3OTgzODF9.R837ediNAaebqFqXgze6sQYbDE-hXCQ9ZX36AV4gQmM",
                accessTokenExpiresIn: 900,
                refreshToken: "7f2c8d9b-d5f1-48a3-a3ee-85838860be02",
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
            "Fri, 25 Feb 2022 13:58:01 GMT",
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
            'W/"3a1-TibAk4culC/0rQmzDNmSBO/1BiQ"',
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .options("/v1/graphql")
    .times(4)
    .reply(204, "", [
        "Date",
        "Fri, 25 Feb 2022 13:58:01 GMT",
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
        query: "mutation ($pk_columns: posts_pk_columns_input!, $_set: posts_set_input!) {\n      update_posts_by_pk (pk_columns: $pk_columns, _set: $_set) {\n    id, title, content, category { id }\n  }\n    }",
        variables: {
            pk_columns: { id: "6a117e72-9446-4413-9760-30d66b9a27dc" },
            _set: {
                title: "E-business alarm Bedfordshire",
                content: "Updated Content",
                category_id: "3e5ff497-af3e-4234-876d-0fb7ccb078f5",
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004033d8e4d0ec2201484afd2b0f625b450285d6a3c82eb869f8712b53440174de3dd45639cd564e64b6676e274d164dcc9ba5487d31273c993d9a6e5fe4983232311ba6d25ca0e14e702386f1928292830ea84304a77d259722025940756fc0c66cd61c69c1bfdd0e9d91cd1f9985cbe858495b3712e38974a5ebe9bae39fd92dad50fd798b6ff36c3de7bae2468cf1078c7380c5238a0de486b0d9583efc9abea0d6c326e17ca000000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 13:58:01 GMT",
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
            "8cb2ccd881d65c933df1c40fd2fea162",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($pkColumns: PostsPkColumnsInput!, $_set: PostsSetInput!) {\n      updatePostsByPk (pkColumns: $pkColumns, _set: $_set) {\n    id, title, content, category { id }\n  }\n    }",
        variables: {
            pkColumns: { id: "6a117e72-9446-4413-9760-30d66b9a27dc" },
            _set: {
                title: "E-business alarm Bedfordshire",
                content: "Updated Content",
                categoryId: "3e5ff497-af3e-4234-876d-0fb7ccb078f5",
            },
        },
    })
    .reply(
        200,
        [
            "1f8b080000000000000a4d8ecb0e82301045f77c45d3b593002dadb8c4b867e307143a55225243cb8210fedd6278b899cc7d9ce44e1121542bafe8854ce10f6af8048da575de1563f9da8310353a282a5492489429e49c0be03c61904b11038bb51055ae52a96b7ada18dff81617ec06d5e09a0e9d23aa55fd9b14a88dedb57b363d1efdda761e3bbf10f7df124daeab757482fdb0fdf8b76d5fc7303386e7129461083c651cce5268884d25ebba8ae5d9647485e668bb73347f012802c6220b010000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 13:58:01 GMT",
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
            "8cb2ccd881d65c933df1c40fd2fea162",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($pk_columns: posts_pk_columns_input!, $_set: posts_set_input!) {\n      update_posts_by_pk (pk_columns: $pk_columns, _set: $_set) {\n    id\n  }\n    }",
        variables: {
            pk_columns: { id: "eccfaeb9-7fc7-45f6-b546-cb6e14109087" },
            _set: { title: "Updated Title" },
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000403ab564a492c4954b2aa562a2d00b252e30bf28b4b8ae3932ae30bb241a299294a564aa9c9c96989a94996bae669c9e6ba26a66966ba49a62666bac94966a986268606960616e64ab5b5b5008a86d2944d000000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 14:00:17 GMT",
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
            "4ebc3ac7292818c8bed109943d2c7c35",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($pkColumns: PostsPkColumnsInput!, $_set: PostsSetInput!) {\n      updatePostsByPk (pkColumns: $pkColumns, _set: $_set) {\n    id\n  }\n    }",
        variables: {
            pkColumns: { id: "eccfaeb9-7fc7-45f6-b546-cb6e14109087" },
            _set: { title: "Updated Title" },
        },
    })
    .reply(
        200,
        [
            "1f8b080000000000000aabe65250504a492c4954b252a806b281bcd202203f3520bfb8a4d8a932201b2e0194ca4c01f294529393d31253932c75cdd392cd754d4cd3cc74934c4dcc749393cc520d4d0c0d2c0d2ccc95c05a6ab940b816009f4afbf465000000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 14:00:17 GMT",
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
            "4ebc3ac7292818c8bed109943d2c7c35",
            "Content-Encoding",
            "gzip",
        ],
    );