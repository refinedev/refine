import nock from "nock";

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/auth/signin/email-password", {
        email: "salih@pankod.com",
        password: "refine-nhost",
    })
    .reply(
        200,
        {
            session: {
                accessToken:
                    "eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsIm1lIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiY2IwZTA1NDQtZTI4ZC00ZmFmLTk2NWEtZWVhNDc4MmExOGNjIiwieC1oYXN1cmEtdXNlci1pc0Fub255bW91cyI6ImZhbHNlIn0sInN1YiI6ImNiMGUwNTQ0LWUyOGQtNGZhZi05NjVhLWVlYTQ3ODJhMThjYyIsImlzcyI6Imhhc3VyYS1hdXRoIiwiaWF0IjoxNjQ1Nzc4NDgwLCJleHAiOjE2NDU3NzkzODB9.NylbzLSEVYfI0SSoYuwOl0llNOrLLH5M7i0H351x8OY",
                accessTokenExpiresIn: 900,
                refreshToken: "46ec3401-f323-4995-8478-2b292f4143c8",
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
            "Fri, 25 Feb 2022 08:41:20 GMT",
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
            'W/"3a1-jrYZbJuIevEyTCsRUU0/9u8sYjI"',
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .options("/v1/graphql")
    .reply(204, "", [
        "Date",
        "Fri, 25 Feb 2022 08:38:31 GMT",
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
        query: "query ($where: posts_bool_exp) { posts (where: $where) { id, title, content, category { id } } }",
        variables: {
            where: {
                id: {
                    _in: [
                        "72fab741-2352-49cb-8b31-06ae4be2f1d1",
                        "acfff044-c728-4030-8d50-330b9224d99b",
                    ],
                },
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004036d8f4b4bc4401084ffca30e76d98472733b357453c29c8dec4c33cba351033b2998b84fc7793e841c15335d505f5d5224b6c519e17f951e736cbf3f3228722cf3266665688909df180ca2af0a55360ad4ac1182c212479926d68236df1cbaee271a2cdcb756a34b5cdbdf9bec45dbd8a5b7aaffb33367aadd7cfbdf228b2d431637010d912a0b108def5051427977352ce7327d7f5247ef2ce704c0e3518db19c09013f86435a83e122632ac8bfe05f6443c4c241edeb67907833850ff60ded3385671a1b9fd07e86cd6981342ec7c0674ba4040ad80737014fb1273df6f802febfa05046024634d010000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 08:38:50 GMT",
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
            "fdf7e1235aae623b3952cc4ab35ec2af",
            "Content-Encoding",
            "gzip",
        ],
    );
