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
                    "eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsIm1lIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiY2IwZTA1NDQtZTI4ZC00ZmFmLTk2NWEtZWVhNDc4MmExOGNjIiwieC1oYXN1cmEtdXNlci1pc0Fub255bW91cyI6ImZhbHNlIn0sInN1YiI6ImNiMGUwNTQ0LWUyOGQtNGZhZi05NjVhLWVlYTQ3ODJhMThjYyIsImlzcyI6Imhhc3VyYS1hdXRoIiwiaWF0IjoxNjQ1NzgxOTgwLCJleHAiOjE2NDU3ODI4ODB9.-pEb4Q4UXuthpdC4TPtXbdn0DtXTKqjk38DROJSR-gQ",
                accessTokenExpiresIn: 900,
                refreshToken: "0f5e0eef-7aeb-4117-80f0-4b3e44dee15c",
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
            "Fri, 25 Feb 2022 09:39:40 GMT",
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
            'W/"3a1-vQjDqygpcHrP60NWKBSxykPNEdo"',
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .options("/v1/graphql")
    .reply(204, "", [
        "Date",
        "Fri, 25 Feb 2022 09:41:37 GMT",
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
        query: "query ($limit: Int, $offset: Int, $where: posts_bool_exp) { posts (limit: $limit, offset: $offset) { id, title } posts_aggregate (where: $where) { aggregate { count } } }",
        variables: { limit: 10, offset: 0 },
    })
    .reply(
        200,
        [
            "1f8b080000000000040355904d4bc4400c40ffca907303f391763a3d7b116415f12622994ea65bb05bd91dd943d9ff6e5d85ad39252479e46581c485a15be0733e951374af0b8c093af03673f464d0bada22853e621b9d41ddb050149b4d32504119cb87ace3cf92c783a8dd7ea5a83b9966f572ed5c2af507e43ee7ac89b0f7b645d24e639b6a8dcee918aca51442dc00afebeaf12070434422ef750e48d4d6483e11b26e0ca6c8497a1724ff43ece4ac9e7eee398f65afee271eb6b0ac6d9bb369b07181911aad917b11d47510f69e4d1db7820ff35126b8bc55bf8f7ae76138cac065955fe056a86ef5ede7af438135a5cb1adf25e1f01763010000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 09:41:02 GMT",
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
            "4a0e098d5b2b2476c90b70aa487d7690",
            "Content-Encoding",
            "gzip",
        ],
    );

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
                    "eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsIm1lIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiY2IwZTA1NDQtZTI4ZC00ZmFmLTk2NWEtZWVhNDc4MmExOGNjIiwieC1oYXN1cmEtdXNlci1pc0Fub255bW91cyI6ImZhbHNlIn0sInN1YiI6ImNiMGUwNTQ0LWUyOGQtNGZhZi05NjVhLWVlYTQ3ODJhMThjYyIsImlzcyI6Imhhc3VyYS1hdXRoIiwiaWF0IjoxNjQ1NzkxODg2LCJleHAiOjE2NDU3OTI3ODZ9.GMTdfkPgxcHZgDMRaFqMj_CU3vK0NeLqwRAqqwn6eEQ",
                accessTokenExpiresIn: 900,
                refreshToken: "5a0f3e5a-2593-4310-8101-c58b589ebebe",
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
            "Fri, 25 Feb 2022 12:24:46 GMT",
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
            'W/"3a1-CqG8Yr5ltL2KpUsDXn2bHkT/PxY"',
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .options("/v1/graphql")
    .reply(204, "", [
        "Date",
        "Fri, 25 Feb 2022 12:24:46 GMT",
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
        query: "query ($limit: Int, $offset: Int, $order_by: [posts_order_by!], $where: posts_bool_exp) { posts (limit: $limit, offset: $offset, order_by: $order_by) { id, title } posts_aggregate (where: $where) { aggregate { count } } }",
        variables: { limit: 10, offset: 0, order_by: { id: "asc" } },
    })
    .reply(
        200,
        [
            "1f8b080000000000040355904d4bc4400c40ffca907303f391763a3d7b116415f12622994ea65bb05bd91dd943d9ff6e5d85ad39252479e46581c485a15be0733e951374af0b8c093af03673f464d0bada22853e621b9d41ddb050149b4d32504119cb87ace3cf92c783a8dd7ea5a83b9966f572ed5c2af507e43ee7ac89b0f7b645d24e639b6a8dcee918aca51442dc00afebeaf12070434422ef750e48d4d6483e11b26e0ca6c8497a1724ff43ece4ac9e7eee398f65afee271eb6b0ac6d9bb369b07181911aad917b11d47510f69e4d1db7820ff35126b8bc55bf8f7ae76138cac065955fe056a86ef5ede7af438135a5cb1adf25e1f01763010000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 12:24:46 GMT",
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
            "701679dd1608996b2cfb832ec42a73eb",
            "Content-Encoding",
            "gzip",
        ],
    );

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
                    "eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsIm1lIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiY2IwZTA1NDQtZTI4ZC00ZmFmLTk2NWEtZWVhNDc4MmExOGNjIiwieC1oYXN1cmEtdXNlci1pc0Fub255bW91cyI6ImZhbHNlIn0sInN1YiI6ImNiMGUwNTQ0LWUyOGQtNGZhZi05NjVhLWVlYTQ3ODJhMThjYyIsImlzcyI6Imhhc3VyYS1hdXRoIiwiaWF0IjoxNjQ1NzkxNDMwLCJleHAiOjE2NDU3OTIzMzB9.L8bQ65qTPW8i2EPnzGroc7TCPGYn00QZT4miP0rIog4",
                accessTokenExpiresIn: 900,
                refreshToken: "b319a278-d390-41b8-bcc2-a6b4bd5771a0",
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
            "Fri, 25 Feb 2022 12:17:10 GMT",
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
            'W/"3a1-BMi4c/4vGOU5dCbnEftC2+mnlNQ"',
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .options("/v1/graphql")
    .reply(204, "", [
        "Date",
        "Fri, 25 Feb 2022 12:17:10 GMT",
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
        query: "query ($limit: Int, $offset: Int, $where: posts_bool_exp) { posts (limit: $limit, offset: $offset, where: $where) { id, title, category_id } posts_aggregate (where: $where) { aggregate { count } } }",
        variables: {
            limit: 10,
            offset: 0,
            where: {
                category_id: { _eq: "73c14cb4-a58c-471d-9410-fc97ea6dac66" },
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004039d90316bc3301085ff8ab8d907922c4b96e78ea543e9164a384927d79044c5518762f2dfa3268176ee4df7e0b8f7bdb741a24a306df059cef50cd36e8325c10459ea316765d1f69ed05829912233cac13339476a080a3aa84b3d703b7f2e2b1f9b8e54792eebf7fef6c4f55199180cd23046344e25f44649ccd13b269b285a0b974e3c3c9dce149c51a8fb41a3f131e0187a85d2129bc03aabf4d7f395f37262f1f2d1c8c5131f8b78bbd1fc8fe2bdbb57b0a7795e796e397e5af915626a98b17c9d2ab4555fda5c010904ca6e3d010000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 12:17:10 GMT",
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
            "5b499695be91d1b04f0dc0eb943a2598",
            "Content-Encoding",
            "gzip",
        ],
    );

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
                    "eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsIm1lIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiY2IwZTA1NDQtZTI4ZC00ZmFmLTk2NWEtZWVhNDc4MmExOGNjIiwieC1oYXN1cmEtdXNlci1pc0Fub255bW91cyI6ImZhbHNlIn0sInN1YiI6ImNiMGUwNTQ0LWUyOGQtNGZhZi05NjVhLWVlYTQ3ODJhMThjYyIsImlzcyI6Imhhc3VyYS1hdXRoIiwiaWF0IjoxNjQ1NzkxNzA4LCJleHAiOjE2NDU3OTI2MDh9.-l-IzXJZaFYSKB-jWW8uCg32YziusHPOlJhkCi6ZWvE",
                accessTokenExpiresIn: 900,
                refreshToken: "a4d8904f-ad83-40be-b8af-5a98bded68db",
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
            "Fri, 25 Feb 2022 12:21:48 GMT",
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
            'W/"3a1-ik4KlbmrEKF2oq1bOT+mre1oiwM"',
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .options("/v1/graphql")
    .reply(204, "", [
        "Date",
        "Fri, 25 Feb 2022 12:21:48 GMT",
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
        query: "query ($limit: Int, $offset: Int, $order_by: [posts_order_by!], $where: posts_bool_exp) { posts (limit: $limit, offset: $offset, order_by: $order_by, where: $where) { id, title, category { id, title } } posts_aggregate (where: $where) { aggregate { count } } }",
        variables: {
            limit: 10,
            offset: 0,
            order_by: { title: "desc" },
            where: {
                category_id: { _eq: "73c14cb4-a58c-471d-9410-fc97ea6dac66" },
            },
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000403ad90b14ec4300c407f25f25c4b499a264d571811036243083989532a7117d40b03aafaefe4b893b80fc09323dbcf2fde2051259836f82ca77a82e9658325c1044e670ace28d4fda0d1f818700cbd4269894d609d5552d0415dea07b7f627cecb91c5e37ba3887b3e14f1fc5be92052e5b9acdfe71d17721f9589c1200d6344e354426f94c41cbd63b289a2b537e4bbebbcd0b0ef9db842b2d463cecaa2ed3da1b152224566948367728ed4106ef51ecaca8706fd5799d7ee72b4379ae795e7e679fee3df434ccd3696af638596eabdc50f7f1fdc266f010000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 12:21:48 GMT",
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
            "8b8bbc10ace3d263aec28418a85d3a8f",
            "Content-Encoding",
            "gzip",
        ],
    );
