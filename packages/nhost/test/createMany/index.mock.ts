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
                    "eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsIm1lIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiY2IwZTA1NDQtZTI4ZC00ZmFmLTk2NWEtZWVhNDc4MmExOGNjIiwieC1oYXN1cmEtdXNlci1pc0Fub255bW91cyI6ImZhbHNlIn0sInN1YiI6ImNiMGUwNTQ0LWUyOGQtNGZhZi05NjVhLWVlYTQ3ODJhMThjYyIsImlzcyI6Imhhc3VyYS1hdXRoIiwiaWF0IjoxNjQ1Nzk2MTk3LCJleHAiOjE2NDU3OTcwOTd9.kLczIY1oRpAzIuFLWx0nbEK7AbRyWgJHy6rfKlBNJOo",
                accessTokenExpiresIn: 900,
                refreshToken: "5d0ff9c5-d30f-46cc-9746-a4abe563172f",
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
            "Fri, 25 Feb 2022 13:36:37 GMT",
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
            'W/"3a1-6/Z1dqa3miYYf0v+K6TfZADIwC8"',
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .options("/v1/graphql")
    .times(4)
    .reply(204, "", [
        "Date",
        "Fri, 25 Feb 2022 13:36:37 GMT",
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
        query: "mutation ($objects: [posts_insert_input!]!) {\n      insert_posts (objects: $objects) {\n    returning { id, title, content, category { id } }\n  }\n    }",
        variables: {
            objects: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    category_id: "73c14cb4-a58c-471d-9410-fc97ea6dac66",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    category_id: "3e5ff497-af3e-4234-876d-0fb7ccb078f5",
                },
            ],
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004036d8f416ec3201045af32621daac4c660679745afd04d5555030c2992831d18aa5691ef5e5275d14a5d0d33fc2fbd77131e19c5f126622a94f9755d0a97fb9e896b4e319d051ce1b9fd7b7114964cf07def2505eca4f26a92e360b454a39f703038587b103bc191676af11325c20475e61c5da402694930474b79811219f0420c2bcd3325a672add4ba6e69efc4adfd4485a3ad73bdc07b9dd7cac80405d7480930bbfa704fb7db79c99fdf067742d3bb837256491c462795397839a9c35e06371942edd1692db66d073f46e48dd59dd7d2e82e48d5214a34a1e5a9d766efcd80dafc327ae48817e0985cf43531d007d4e6511d2f19429b0db8fcb138cdf15a5b2745fb069491ffc5ee6908414d4662e8a961f44a8e467bb90fd63867f7660c43c37ed9b6ed0b63c634feb3010000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 13:36:37 GMT",
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
            "2819bedaa1ef91ffe3374968020dbd9f",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($objects: [PostsInsertInput!]!) {\n      insertPosts (objects: $objects) {\n    returning { id, title, content, category { id } }\n  }\n    }",
        variables: {
            objects: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    categoryId: "73c14cb4-a58c-471d-9410-fc97ea6dac66",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    categoryId: "3e5ff497-af3e-4234-876d-0fb7ccb078f5",
                },
            ],
        },
    })
    .reply(
        200,
        [
            "1f8b080000000000000a9550c14e023114bcf3152f7ba606d86ebbeb8d83774f5e8c87d7f6559b2c5d685f8d86f0ef9688044c30f1d47933994967f63380c62163730ffb8aeb1562a6c48f53e67c262b9d884b8a21be56f2f944c259fe76baaa3586b4776deb04795c09e9e420fa4e2b217b3760a7b13366d9cc2f7d1c78a4a3754d9130421939051b28439c228cc1509a200706dc10c396c6912253de15baceb153a5231f939e287330652c1b782fe3b6303241c66da008986cb9fbe5acf2eb943e2f0a5f75d2ad5d4a6ba4c0aeb742eaa513835c2e84b78326540ead52cd85f170c687f95f5b91d346ad9c125aadbc902b4481dad75c6a955e38dda1d237b67ae0801be0106d702532d00794ba50b13c25f0f5adf5f3cd7dd663d895ea8fc1bc0125e47f0ed252e7bd1cb440df52fd782b45af95130b6fb4b566a17bdfdd18e4845e663fd76176f802c237308b87020000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 13:36:37 GMT",
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
            "2819bedaa1ef91ffe3374968020dbd9f",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($objects: [posts_insert_input!]!) {\n      insert_posts (objects: $objects) {\n    returning { id }\n  }\n    }",
        variables: {
            objects: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    category_id: "73c14cb4-a58c-471d-9410-fc97ea6dac66",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    category_id: "3e5ff497-af3e-4234-876d-0fb7ccb078f5",
                },
            ],
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004032dca4b0a03211045d1ad488d234875899fad84104aab0d3d3141cda871efb121930797774e101e0cf184a3f6bd8de7e7dd47bfbaede3dbea515fa0a2baaf5f20028ac92e60d624e8d794a2d926af37e7ad1753982dc1bca93f0f98520a840bb1d39425688f1b6a71172436990cccc79cf307736cb78c88000000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 13:38:22 GMT",
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
            "a23e3087e6afc4b2fc1f65ff0410b0d6",
            "Content-Encoding",
            "gzip",
        ],
    );

nock("https://oxhhlmqsjahbyedrmvll.nhost.run:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($objects: [PostsInsertInput!]!) {\n      insertPosts (objects: $objects) {\n    returning { id }\n  }\n    }",
        variables: {
            objects: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    categoryId: "73c14cb4-a58c-471d-9410-fc97ea6dac66",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    categoryId: "3e5ff497-af3e-4234-876d-0fb7ccb078f5",
                },
            ],
        },
    })
    .reply(
        200,
        [
            "1f8b080000000000000a7d8c310a032110457b4f21d611645651738af421c5e8ac611b036aaa65ef9e09d92ca9d20c7fdee7bf5548a90807aab35c39f3b7d43eb77179f4d10fc8b8cde3d9ea52ef0caf3b9447fd5912770ac8641f216b4b10f894a2d1a5a0271f5c2053109d55c76c3bfd73454829450b6c40af6da6a8034ca0c9bf2d164db6e6c7b5a79bf87e9bd85e81da5bf6e2000000",
        ],
        [
            "Date",
            "Fri, 25 Feb 2022 13:38:22 GMT",
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
            "a23e3087e6afc4b2fc1f65ff0410b0d6",
            "Content-Encoding",
            "gzip",
        ],
    );
