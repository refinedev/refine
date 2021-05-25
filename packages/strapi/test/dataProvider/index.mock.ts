import nock from "nock";

nock("https://refine-strapi.pankod.com:443", { encodedQueryParams: true })
    .post("/posts", { title: "foo", content: "bar", cover: ["116"] })
    .reply(
        200,
        {
            id: 53,
            title: "foo",
            content: "bar",
            aaaa: null,
            published_at: "2021-05-02T11:39:16.587Z",
            created_at: "2021-05-02T11:39:16.590Z",
            updated_at: "2021-05-02T11:39:16.590Z",
            category: null,
            cover: {
                id: 116,
                name:
                    "2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                alternativeText: null,
                caption: null,
                width: 1620,
                height: 1080,
                formats: {
                    large: {
                        ext: ".jpg",
                        url:
                            "/uploads/large_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                        hash:
                            "large_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                        mime: "image/jpeg",
                        name:
                            "large_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                        path: null,
                        size: 77.34,
                        width: 1000,
                        height: 667,
                    },
                    small: {
                        ext: ".jpg",
                        url:
                            "/uploads/small_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                        hash:
                            "small_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                        mime: "image/jpeg",
                        name:
                            "small_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                        path: null,
                        size: 25.11,
                        width: 500,
                        height: 333,
                    },
                    medium: {
                        ext: ".jpg",
                        url:
                            "/uploads/medium_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                        hash:
                            "medium_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                        mime: "image/jpeg",
                        name:
                            "medium_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                        path: null,
                        size: 47.26,
                        width: 750,
                        height: 500,
                    },
                    thumbnail: {
                        ext: ".jpg",
                        url:
                            "/uploads/thumbnail_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                        hash:
                            "thumbnail_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                        mime: "image/jpeg",
                        name:
                            "thumbnail_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                        path: null,
                        size: 7.56,
                        width: 234,
                        height: 156,
                    },
                },
                hash:
                    "2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                ext: ".jpg",
                mime: "image/jpeg",
                size: 160.37,
                url:
                    "/uploads/2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                previewUrl: null,
                provider: "local",
                provider_metadata: null,
                created_at: "2021-05-01T22:19:42.065Z",
                updated_at: "2021-05-01T22:19:42.065Z",
            },
        },
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Sun, 02 May 2021 11:39:16 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "2388",
            "Connection",
            "close",
            "Vary",
            "Accept-Encoding",
            "Vary",
            "Origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-Powered-By",
            "Strapi <strapi.io>",
            "X-Response-Time",
            "44ms",
        ],
    );

nock("https://refine-strapi.pankod.com:443", { encodedQueryParams: true })
    .delete("/posts/46")
    .reply(
        200,
        {
            id: 46,
            title: "tiger",
            content: "tiger",
            aaaa: null,
            published_at: "2021-05-01T22:19:45.401Z",
            created_at: "2021-05-01T22:19:45.405Z",
            updated_at: "2021-05-01T22:19:45.413Z",
            category: {
                id: 1,
                title: "test",
                created_at: "2021-04-27T13:21:20.601Z",
                updated_at: "2021-04-27T13:21:20.615Z",
            },
            cover: {
                id: 116,
                name:
                    "2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                alternativeText: null,
                caption: null,
                width: 1620,
                height: 1080,
                formats: {
                    large: {
                        ext: ".jpg",
                        url:
                            "/uploads/large_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                        hash:
                            "large_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                        mime: "image/jpeg",
                        name:
                            "large_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                        path: null,
                        size: 77.34,
                        width: 1000,
                        height: 667,
                    },
                    small: {
                        ext: ".jpg",
                        url:
                            "/uploads/small_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                        hash:
                            "small_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                        mime: "image/jpeg",
                        name:
                            "small_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                        path: null,
                        size: 25.11,
                        width: 500,
                        height: 333,
                    },
                    medium: {
                        ext: ".jpg",
                        url:
                            "/uploads/medium_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                        hash:
                            "medium_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                        mime: "image/jpeg",
                        name:
                            "medium_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                        path: null,
                        size: 47.26,
                        width: 750,
                        height: 500,
                    },
                    thumbnail: {
                        ext: ".jpg",
                        url:
                            "/uploads/thumbnail_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                        hash:
                            "thumbnail_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                        mime: "image/jpeg",
                        name:
                            "thumbnail_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                        path: null,
                        size: 7.56,
                        width: 234,
                        height: 156,
                    },
                },
                hash:
                    "2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                ext: ".jpg",
                mime: "image/jpeg",
                size: 160.37,
                url:
                    "/uploads/2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                previewUrl: null,
                provider: "local",
                provider_metadata: null,
                created_at: "2021-05-01T22:19:42.065Z",
                updated_at: "2021-05-01T22:19:42.065Z",
            },
        },
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Sun, 02 May 2021 11:42:25 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "2491",
            "Connection",
            "close",
            "Vary",
            "Accept-Encoding",
            "Vary",
            "Origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-Powered-By",
            "Strapi <strapi.io>",
            "X-Response-Time",
            "109ms",
        ],
    );

nock("https://refine-strapi.pankod.com:443", { encodedQueryParams: true })
    .delete("/posts/47")
    .reply(
        200,
        {
            id: 47,
            title: "test",
            content: "test",
            aaaa: null,
            published_at: "2021-05-01T22:20:01.877Z",
            created_at: "2021-05-01T22:20:01.880Z",
            updated_at: "2021-05-01T22:27:22.677Z",
            category: {
                id: 1,
                title: "test",
                created_at: "2021-04-27T13:21:20.601Z",
                updated_at: "2021-04-27T13:21:20.615Z",
            },
            cover: {
                id: 119,
                name: "maxresdefault.jpg",
                alternativeText: null,
                caption: null,
                width: 1280,
                height: 720,
                formats: {
                    large: {
                        ext: ".jpg",
                        url: "/uploads/large_maxresdefault_417a3ce0dc.jpg",
                        hash: "large_maxresdefault_417a3ce0dc",
                        mime: "image/jpeg",
                        name: "large_maxresdefault.jpg",
                        path: null,
                        size: 60.51,
                        width: 1000,
                        height: 563,
                    },
                    small: {
                        ext: ".jpg",
                        url: "/uploads/small_maxresdefault_417a3ce0dc.jpg",
                        hash: "small_maxresdefault_417a3ce0dc",
                        mime: "image/jpeg",
                        name: "small_maxresdefault.jpg",
                        path: null,
                        size: 22.51,
                        width: 500,
                        height: 281,
                    },
                    medium: {
                        ext: ".jpg",
                        url: "/uploads/medium_maxresdefault_417a3ce0dc.jpg",
                        hash: "medium_maxresdefault_417a3ce0dc",
                        mime: "image/jpeg",
                        name: "medium_maxresdefault.jpg",
                        path: null,
                        size: 39.78,
                        width: 750,
                        height: 422,
                    },
                    thumbnail: {
                        ext: ".jpg",
                        url: "/uploads/thumbnail_maxresdefault_417a3ce0dc.jpg",
                        hash: "thumbnail_maxresdefault_417a3ce0dc",
                        mime: "image/jpeg",
                        name: "thumbnail_maxresdefault.jpg",
                        path: null,
                        size: 7.7,
                        width: 245,
                        height: 138,
                    },
                },
                hash: "maxresdefault_417a3ce0dc",
                ext: ".jpg",
                mime: "image/jpeg",
                size: 78.96,
                url: "/uploads/maxresdefault_417a3ce0dc.jpg",
                previewUrl: null,
                provider: "local",
                provider_metadata: null,
                created_at: "2021-05-01T22:27:20.566Z",
                updated_at: "2021-05-01T22:27:20.566Z",
            },
        },
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Sun, 02 May 2021 11:48:26 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "1571",
            "Connection",
            "close",
            "Vary",
            "Accept-Encoding",
            "Vary",
            "Origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-Powered-By",
            "Strapi <strapi.io>",
            "X-Response-Time",
            "108ms",
        ],
    );

nock("https://refine-strapi.pankod.com:443", { encodedQueryParams: true })
    .get("/posts")
    .query({ _limit: "10", _start: "0" })
    .reply(
        200,
        [
            {
                id: 49,
                title: "0001",
                content: "0001",
                aaaa: null,
                published_at: "2021-05-02T11:31:56.343Z",
                created_at: "2021-05-02T11:31:56.346Z",
                updated_at: "2021-05-02T11:31:56.346Z",
                category: null,
                cover: null,
            },
            {
                id: 50,
                title: "0001",
                content: "0001",
                aaaa: null,
                published_at: "2021-05-02T11:32:01.555Z",
                created_at: "2021-05-02T11:32:01.559Z",
                updated_at: "2021-05-02T11:32:01.559Z",
                category: null,
                cover: null,
            },
            {
                id: 51,
                title: "foo",
                content: "bar",
                aaaa: null,
                published_at: "2021-05-02T11:33:12.533Z",
                created_at: "2021-05-02T11:33:12.535Z",
                updated_at: "2021-05-02T11:33:12.535Z",
                category: null,
                cover: null,
            },
            {
                id: 52,
                title: "foo",
                content: "bar",
                aaaa: null,
                published_at: "2021-05-02T11:38:36.918Z",
                created_at: "2021-05-02T11:38:36.921Z",
                updated_at: "2021-05-02T11:38:36.921Z",
                category: null,
                cover: {},
            },
            {
                id: 53,
                title: "foo",
                content: "bar",
                aaaa: null,
                published_at: "2021-05-02T11:39:16.587Z",
                created_at: "2021-05-02T11:39:16.590Z",
                updated_at: "2021-05-02T11:39:16.590Z",
                category: null,
                cover: {
                    id: 116,
                    name:
                        "2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                    alternativeText: null,
                    caption: null,
                    width: 1620,
                    height: 1080,
                    formats: {
                        large: {
                            ext: ".jpg",
                            url:
                                "/uploads/large_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                            hash:
                                "large_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                            mime: "image/jpeg",
                            name:
                                "large_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                            path: null,
                            size: 77.34,
                            width: 1000,
                            height: 667,
                        },
                        small: {
                            ext: ".jpg",
                            url:
                                "/uploads/small_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                            hash:
                                "small_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                            mime: "image/jpeg",
                            name:
                                "small_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                            path: null,
                            size: 25.11,
                            width: 500,
                            height: 333,
                        },
                        medium: {
                            ext: ".jpg",
                            url:
                                "/uploads/medium_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                            hash:
                                "medium_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                            mime: "image/jpeg",
                            name:
                                "medium_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                            path: null,
                            size: 47.26,
                            width: 750,
                            height: 500,
                        },
                        thumbnail: {
                            ext: ".jpg",
                            url:
                                "/uploads/thumbnail_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                            hash:
                                "thumbnail_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                            mime: "image/jpeg",
                            name:
                                "thumbnail_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                            path: null,
                            size: 7.56,
                            width: 234,
                            height: 156,
                        },
                    },
                    hash:
                        "2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                    ext: ".jpg",
                    mime: "image/jpeg",
                    size: 160.37,
                    url:
                        "/uploads/2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                    previewUrl: null,
                    provider: "local",
                    provider_metadata: null,
                    created_at: "2021-05-01T22:19:42.065Z",
                    updated_at: "2021-05-01T22:19:42.065Z",
                },
            },
        ],
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Sun, 02 May 2021 11:52:31 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "3204",
            "Connection",
            "close",
            "Vary",
            "Accept-Encoding",
            "Vary",
            "Origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-Powered-By",
            "Strapi <strapi.io>",
            "X-Response-Time",
            "32ms",
        ],
    );

nock("https://refine-strapi.pankod.com:443", { encodedQueryParams: true })
    .get("/posts/count")
    .reply(200, "5", [
        "Server",
        "nginx/1.17.10",
        "Date",
        "Sun, 02 May 2021 11:53:11 GMT",
        "Content-Type",
        "application/json; charset=utf-8",
        "Content-Length",
        "1",
        "Connection",
        "close",
        "Vary",
        "Origin",
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains",
        "X-Frame-Options",
        "SAMEORIGIN",
        "X-Powered-By",
        "Strapi <strapi.io>",
        "X-Response-Time",
        "16ms",
    ]);

nock("https://refine-strapi.pankod.com:443", { encodedQueryParams: true })
    .get("/posts")
    .query({ _limit: "10", _sort: "id%3Adesc", _start: "0" })
    .reply(
        200,
        [
            {
                id: 53,
                title: "foo",
                content: "bar",
                aaaa: null,
                published_at: "2021-05-02T11:39:16.587Z",
                created_at: "2021-05-02T11:39:16.590Z",
                updated_at: "2021-05-02T11:39:16.590Z",
                category: null,
                cover: {
                    id: 116,
                    name:
                        "2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                    alternativeText: null,
                    caption: null,
                    width: 1620,
                    height: 1080,
                    formats: {
                        large: {
                            ext: ".jpg",
                            url:
                                "/uploads/large_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                            hash:
                                "large_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                            mime: "image/jpeg",
                            name:
                                "large_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                            path: null,
                            size: 77.34,
                            width: 1000,
                            height: 667,
                        },
                        small: {
                            ext: ".jpg",
                            url:
                                "/uploads/small_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                            hash:
                                "small_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                            mime: "image/jpeg",
                            name:
                                "small_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                            path: null,
                            size: 25.11,
                            width: 500,
                            height: 333,
                        },
                        medium: {
                            ext: ".jpg",
                            url:
                                "/uploads/medium_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                            hash:
                                "medium_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                            mime: "image/jpeg",
                            name:
                                "medium_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                            path: null,
                            size: 47.26,
                            width: 750,
                            height: 500,
                        },
                        thumbnail: {
                            ext: ".jpg",
                            url:
                                "/uploads/thumbnail_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                            hash:
                                "thumbnail_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                            mime: "image/jpeg",
                            name:
                                "thumbnail_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                            path: null,
                            size: 7.56,
                            width: 234,
                            height: 156,
                        },
                    },
                    hash:
                        "2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                    ext: ".jpg",
                    mime: "image/jpeg",
                    size: 160.37,
                    url:
                        "/uploads/2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                    previewUrl: null,
                    provider: "local",
                    provider_metadata: null,
                    created_at: "2021-05-01T22:19:42.065Z",
                    updated_at: "2021-05-01T22:19:42.065Z",
                },
            },
            {
                id: 52,
                title: "foo",
                content: "bar",
                aaaa: null,
                published_at: "2021-05-02T11:38:36.918Z",
                created_at: "2021-05-02T11:38:36.921Z",
                updated_at: "2021-05-02T11:38:36.921Z",
                category: null,
                cover: {},
            },
            {
                id: 51,
                title: "foo",
                content: "bar",
                aaaa: null,
                published_at: "2021-05-02T11:33:12.533Z",
                created_at: "2021-05-02T11:33:12.535Z",
                updated_at: "2021-05-02T11:33:12.535Z",
                category: null,
                cover: null,
            },
            {
                id: 50,
                title: "0001",
                content: "0001",
                aaaa: null,
                published_at: "2021-05-02T11:32:01.555Z",
                created_at: "2021-05-02T11:32:01.559Z",
                updated_at: "2021-05-02T11:32:01.559Z",
                category: null,
                cover: null,
            },
            {
                id: 49,
                title: "0001",
                content: "0001",
                aaaa: null,
                published_at: "2021-05-02T11:31:56.343Z",
                created_at: "2021-05-02T11:31:56.346Z",
                updated_at: "2021-05-02T11:31:56.346Z",
                category: null,
                cover: null,
            },
        ],
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Sun, 02 May 2021 11:58:46 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "3204",
            "Connection",
            "close",
            "Vary",
            "Accept-Encoding",
            "Vary",
            "Origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-Powered-By",
            "Strapi <strapi.io>",
            "X-Response-Time",
            "25ms",
        ],
    );

nock("https://refine-strapi.pankod.com:443", { encodedQueryParams: true })
    .get("/posts/count")
    .reply(200, "5", [
        "Server",
        "nginx/1.17.10",
        "Date",
        "Sun, 02 May 2021 11:58:46 GMT",
        "Content-Type",
        "application/json; charset=utf-8",
        "Content-Length",
        "1",
        "Connection",
        "close",
        "Vary",
        "Origin",
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains",
        "X-Frame-Options",
        "SAMEORIGIN",
        "X-Powered-By",
        "Strapi <strapi.io>",
        "X-Response-Time",
        "17ms",
    ]);

nock("https://refine-strapi.pankod.com:443", { encodedQueryParams: true })
    .get("/posts")
    .query({ _limit: "10", _start: "0", title_eq: "foo" })
    .reply(
        200,
        [
            {
                id: 51,
                title: "foo",
                content: "bar",
                aaaa: null,
                published_at: "2021-05-02T11:33:12.533Z",
                created_at: "2021-05-02T11:33:12.535Z",
                updated_at: "2021-05-02T11:33:12.535Z",
                category: null,
                cover: null,
            },
            {
                id: 52,
                title: "foo",
                content: "bar",
                aaaa: null,
                published_at: "2021-05-02T11:38:36.918Z",
                created_at: "2021-05-02T11:38:36.921Z",
                updated_at: "2021-05-02T11:38:36.921Z",
                category: null,
                cover: {},
            },
            {
                id: 53,
                title: "foo",
                content: "bar",
                aaaa: null,
                published_at: "2021-05-02T11:39:16.587Z",
                created_at: "2021-05-02T11:39:16.590Z",
                updated_at: "2021-05-02T11:39:16.590Z",
                category: null,
                cover: {
                    id: 116,
                    name:
                        "2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                    alternativeText: null,
                    caption: null,
                    width: 1620,
                    height: 1080,
                    formats: {
                        large: {
                            ext: ".jpg",
                            url:
                                "/uploads/large_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                            hash:
                                "large_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                            mime: "image/jpeg",
                            name:
                                "large_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                            path: null,
                            size: 77.34,
                            width: 1000,
                            height: 667,
                        },
                        small: {
                            ext: ".jpg",
                            url:
                                "/uploads/small_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                            hash:
                                "small_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                            mime: "image/jpeg",
                            name:
                                "small_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                            path: null,
                            size: 25.11,
                            width: 500,
                            height: 333,
                        },
                        medium: {
                            ext: ".jpg",
                            url:
                                "/uploads/medium_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                            hash:
                                "medium_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                            mime: "image/jpeg",
                            name:
                                "medium_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                            path: null,
                            size: 47.26,
                            width: 750,
                            height: 500,
                        },
                        thumbnail: {
                            ext: ".jpg",
                            url:
                                "/uploads/thumbnail_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                            hash:
                                "thumbnail_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                            mime: "image/jpeg",
                            name:
                                "thumbnail_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                            path: null,
                            size: 7.56,
                            width: 234,
                            height: 156,
                        },
                    },
                    hash:
                        "2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                    ext: ".jpg",
                    mime: "image/jpeg",
                    size: 160.37,
                    url:
                        "/uploads/2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                    previewUrl: null,
                    provider: "local",
                    provider_metadata: null,
                    created_at: "2021-05-01T22:19:42.065Z",
                    updated_at: "2021-05-01T22:19:42.065Z",
                },
            },
        ],
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Sun, 02 May 2021 12:00:43 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "2794",
            "Connection",
            "close",
            "Vary",
            "Accept-Encoding",
            "Vary",
            "Origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-Powered-By",
            "Strapi <strapi.io>",
            "X-Response-Time",
            "54ms",
        ],
    );

nock("https://refine-strapi.pankod.com:443", {
    encodedQueryParams: true,
})
    .get("/posts/count")
    .reply(200, "5", [
        "Server",
        "nginx/1.17.10",
        "Date",
        "Sun, 02 May 2021 12:00:44 GMT",
        "Content-Type",
        "application/json; charset=utf-8",
        "Content-Length",
        "1",
        "Connection",
        "close",
        "Vary",
        "Origin",
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains",
        "X-Frame-Options",
        "SAMEORIGIN",
        "X-Powered-By",
        "Strapi <strapi.io>",
        "X-Response-Time",
        "15ms",
    ]);

nock("https://refine-strapi.pankod.com:443", { encodedQueryParams: true })
    .get("/posts/count")
    .reply(200, "5", [
        "Server",
        "nginx/1.17.10",
        "Date",
        "Sun, 02 May 2021 12:05:24 GMT",
        "Content-Type",
        "application/json; charset=utf-8",
        "Content-Length",
        "1",
        "Connection",
        "close",
        "Vary",
        "Origin",
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains",
        "X-Frame-Options",
        "SAMEORIGIN",
        "X-Powered-By",
        "Strapi <strapi.io>",
        "X-Response-Time",
        "16ms",
    ]);

nock("https://refine-strapi.pankod.com:443", {
    encodedQueryParams: true,
})
    .get("/posts")
    .query({
        _limit: "10",
        _sort: "id%3Adesc",
        _start: "0",
        title_eq: "foo",
    })
    .reply(
        200,
        [
            {
                id: 53,
                title: "foo",
                content: "bar",
                aaaa: null,
                published_at: "2021-05-02T11:39:16.587Z",
                created_at: "2021-05-02T11:39:16.590Z",
                updated_at: "2021-05-02T11:39:16.590Z",
                category: null,
                cover: {
                    id: 116,
                    name:
                        "2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                    alternativeText: null,
                    caption: null,
                    width: 1620,
                    height: 1080,
                    formats: {
                        large: {
                            ext: ".jpg",
                            url:
                                "/uploads/large_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                            hash:
                                "large_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                            mime: "image/jpeg",
                            name:
                                "large_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                            path: null,
                            size: 77.34,
                            width: 1000,
                            height: 667,
                        },
                        small: {
                            ext: ".jpg",
                            url:
                                "/uploads/small_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                            hash:
                                "small_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                            mime: "image/jpeg",
                            name:
                                "small_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                            path: null,
                            size: 25.11,
                            width: 500,
                            height: 333,
                        },
                        medium: {
                            ext: ".jpg",
                            url:
                                "/uploads/medium_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                            hash:
                                "medium_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                            mime: "image/jpeg",
                            name:
                                "medium_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                            path: null,
                            size: 47.26,
                            width: 750,
                            height: 500,
                        },
                        thumbnail: {
                            ext: ".jpg",
                            url:
                                "/uploads/thumbnail_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                            hash:
                                "thumbnail_2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                            mime: "image/jpeg",
                            name:
                                "thumbnail_2021-Triumph-Tiger-850-Sport-First-Look-adv-adventure-touring-motorcycle-1.jpg",
                            path: null,
                            size: 7.56,
                            width: 234,
                            height: 156,
                        },
                    },
                    hash:
                        "2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e",
                    ext: ".jpg",
                    mime: "image/jpeg",
                    size: 160.37,
                    url:
                        "/uploads/2021_Triumph_Tiger_850_Sport_First_Look_adv_adventure_touring_motorcycle_1_afa38b3e5e.jpg",
                    previewUrl: null,
                    provider: "local",
                    provider_metadata: null,
                    created_at: "2021-05-01T22:19:42.065Z",
                    updated_at: "2021-05-01T22:19:42.065Z",
                },
            },
            {
                id: 52,
                title: "foo",
                content: "bar",
                aaaa: null,
                published_at: "2021-05-02T11:38:36.918Z",
                created_at: "2021-05-02T11:38:36.921Z",
                updated_at: "2021-05-02T11:38:36.921Z",
                category: null,
                cover: {},
            },
            {
                id: 51,
                title: "foo",
                content: "bar",
                aaaa: null,
                published_at: "2021-05-02T11:33:12.533Z",
                created_at: "2021-05-02T11:33:12.535Z",
                updated_at: "2021-05-02T11:33:12.535Z",
                category: null,
                cover: null,
            },
        ],
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Sun, 02 May 2021 12:05:24 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "2794",
            "Connection",
            "close",
            "Vary",
            "Accept-Encoding",
            "Vary",
            "Origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-Powered-By",
            "Strapi <strapi.io>",
            "X-Response-Time",
            "30ms",
        ],
    );

nock("https://refine-strapi.pankod.com:443", { encodedQueryParams: true })
    .get("/posts")
    .query({ id_in: "49" })
    .reply(
        200,
        [
            {
                id: 49,
                title: "0001",
                content: "0001",
                aaaa: null,
                published_at: "2021-05-02T11:31:56.343Z",
                created_at: "2021-05-02T11:31:56.346Z",
                updated_at: "2021-05-02T11:31:56.346Z",
                category: null,
                cover: null,
            },
        ],
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Sun, 02 May 2021 12:09:04 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "206",
            "Connection",
            "close",
            "Vary",
            "Origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-Powered-By",
            "Strapi <strapi.io>",
            "X-Response-Time",
            "23ms",
        ],
    );

nock("https://refine-strapi.pankod.com:443", { encodedQueryParams: true })
    .get("/posts/49")
    .reply(
        200,
        {
            id: 49,
            title: "0001",
            content: "0001",
            aaaa: null,
            published_at: "2021-05-02T11:31:56.343Z",
            created_at: "2021-05-02T11:31:56.346Z",
            updated_at: "2021-05-02T11:31:56.346Z",
            category: null,
            cover: null,
        },
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Sun, 02 May 2021 12:10:22 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "204",
            "Connection",
            "close",
            "Vary",
            "Origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-Powered-By",
            "Strapi <strapi.io>",
            "X-Response-Time",
            "24ms",
        ],
    );

nock("https://refine-strapi.pankod.com:443", { encodedQueryParams: true })
    .put("/posts/49", { title: "updated" })
    .reply(
        200,
        {
            id: 49,
            title: "updated",
            content: "0001",
            aaaa: null,
            published_at: "2021-05-02T11:31:56.343Z",
            created_at: "2021-05-02T11:31:56.346Z",
            updated_at: "2021-05-02T12:11:32.012Z",
            category: null,
            cover: null,
        },
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Sun, 02 May 2021 12:11:32 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "207",
            "Connection",
            "close",
            "Vary",
            "Origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-Powered-By",
            "Strapi <strapi.io>",
            "X-Response-Time",
            "295ms",
        ],
    );

nock("https://refine-strapi.pankod.com:443", { encodedQueryParams: true })
    .put("/posts/50", { title: "updated" })
    .reply(
        200,
        {
            id: 50,
            title: "updated",
            content: "0001",
            aaaa: null,
            published_at: "2021-05-02T11:32:01.555Z",
            created_at: "2021-05-02T11:32:01.559Z",
            updated_at: "2021-05-02T12:12:57.327Z",
            category: null,
            cover: null,
        },
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Sun, 02 May 2021 12:12:57 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "207",
            "Connection",
            "close",
            "Vary",
            "Origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-Powered-By",
            "Strapi <strapi.io>",
            "X-Response-Time",
            "111ms",
        ],
    );

nock("https://refine-strapi.pankod.com:443", { encodedQueryParams: true })
    .put("/posts/51", { title: "updated" })
    .reply(
        200,
        {
            id: 51,
            title: "updated",
            content: "bar",
            aaaa: null,
            published_at: "2021-05-02T11:33:12.533Z",
            created_at: "2021-05-02T11:33:12.535Z",
            updated_at: "2021-05-02T12:12:57.313Z",
            category: null,
            cover: null,
        },
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Sun, 02 May 2021 12:15:41 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "206",
            "Connection",
            "close",
            "Vary",
            "Origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-Powered-By",
            "Strapi <strapi.io>",
            "X-Response-Time",
            "116ms",
        ],
    );
