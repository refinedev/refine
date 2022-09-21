import nock from "nock";

nock("https://matej10qa.appwrite.org:443", { encodedQueryParams: true })
    .post("/v1/account/sessions/anonymous", {})
    .reply(
        201,
        [
            "1f8b0800000000000003758f5d4bc3301486ff8a94dde94ad2a69deddd94095eb80ba9dea7c9a90beb9272920e8bf8dfcdd6da0f44082479de93e79c7c052b25833c48e388259948044d378c958c573c09ee829540e00ee4d6f99a8844d19a646b9a1694e67e111a6eb2cd2d213921beb8b580cf73595955651253ef03f0397c360aa117c57f45d1286ad09c9504f4a55c1bdd9d4c6b67f8ed3af10c6c85006b0b7304fd6fb0bb34ef96f12b5408f6307ba81abfb334a484852c0b29bdf7d0d84723a12f3076cf4fe3f91dd02a33bc15b502ed8aaeb9c4b52a91fb7ebf7832f4f7c1b2f7f8e6099c388cc9e4a42119e94e7f28bd30f464318184b312300dd8df1f906b39072fbe693da84cab1d76c3740e2734588a168f70fd468be8bb06b9c316be7f0009b1b98c37020000",
        ],
        [
            "Access-Control-Allow-Credentials",
            "true",
            "Access-Control-Allow-Headers",
            "Origin, Cookie, Set-Cookie, X-Requested-With, Content-Type, Access-Control-Allow-Origin, Access-Control-Request-Headers, Accept, X-Appwrite-Project, X-Appwrite-Key, X-Appwrite-Locale, X-Appwrite-Mode, X-Appwrite-JWT, X-Appwrite-Response-Format, X-SDK-Version, X-SDK-Name, X-SDK-Language, X-SDK-Platform, X-Appwrite-ID, Content-Range, Range, Cache-Control, Expires, Pragma",
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, PATCH, DELETE",
            "Access-Control-Allow-Origin",
            "https://localhost",
            "Access-Control-Expose-Headers",
            "X-Fallback-Cookies",
            "Content-Encoding",
            "gzip",
            "Content-Length",
            "300",
            "Content-Type",
            "application/json; charset=UTF-8",
            "Date",
            "Fri, 16 Sep 2022 11:11:01 GMT",
            "Server",
            "Appwrite",
            "Set-Cookie",
            "a_session_6324555073b9706cb1f5_legacy=eyJpZCI6IjYzMjQ1OWM1YmZmYjUzMTQ0YmVlIiwic2VjcmV0IjoiMzFmZmY5ZTVlMzA2MjdmYmUzODZlMDBlYzNlYjhhNjdkMzhiNzljMzg1YzBiNzdiM2NlNGRmZTU3ZjQ4MWRmMDg2ZjY0NTFkM2RjNDc1N2FlNjkyNzA5OTQ3NTIwOWVmYmI2ZTJjOGY4ZWU3NTQyYmI3MWQ5MGM3MzNlMWQxYmMxYTQyOTI5ODRkZGU4YTZlMjJlZTJlNzNmNGE0NmFjNjVmNmI3MzE2YjU1ZWUxOTVhYjU4MjA3YjNjMWEyNzE0ZjdlNjI4NWNmZDMxMTcyN2JmODMwMDc2NGExM2UyNmNmYjAxOWEyYWE5NDE0ODcyZWYzMDE4MDhhZTY2MDY4NiJ9; expires=Sat, 16-Sep-2023 11:11:01 GMT; path=/; domain=.matej10qa.appwrite.org; secure; httponly",
            "Set-Cookie",
            "a_session_6324555073b9706cb1f5=eyJpZCI6IjYzMjQ1OWM1YmZmYjUzMTQ0YmVlIiwic2VjcmV0IjoiMzFmZmY5ZTVlMzA2MjdmYmUzODZlMDBlYzNlYjhhNjdkMzhiNzljMzg1YzBiNzdiM2NlNGRmZTU3ZjQ4MWRmMDg2ZjY0NTFkM2RjNDc1N2FlNjkyNzA5OTQ3NTIwOWVmYmI2ZTJjOGY4ZWU3NTQyYmI3MWQ5MGM3MzNlMWQxYmMxYTQyOTI5ODRkZGU4YTZlMjJlZTJlNzNmNGE0NmFjNjVmNmI3MzE2YjU1ZWUxOTVhYjU4MjA3YjNjMWEyNzE0ZjdlNjI4NWNmZDMxMTcyN2JmODMwMDc2NGExM2UyNmNmYjAxOWEyYWE5NDE0ODcyZWYzMDE4MDhhZTY2MDY4NiJ9; expires=Sat, 16-Sep-2023 11:11:01 GMT; path=/; domain=.matej10qa.appwrite.org; secure; httponly; samesite=None",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.022747039794922",
            "X-Fallback-Cookies",
            '{"a_session_6324555073b9706cb1f5":"eyJpZCI6IjYzMjQ1OWM1YmZmYjUzMTQ0YmVlIiwic2VjcmV0IjoiMzFmZmY5ZTVlMzA2MjdmYmUzODZlMDBlYzNlYjhhNjdkMzhiNzljMzg1YzBiNzdiM2NlNGRmZTU3ZjQ4MWRmMDg2ZjY0NTFkM2RjNDc1N2FlNjkyNzA5OTQ3NTIwOWVmYmI2ZTJjOGY4ZWU3NTQyYmI3MWQ5MGM3MzNlMWQxYmMxYTQyOTI5ODRkZGU4YTZlMjJlZTJlNzNmNGE0NmFjNjVmNmI3MzE2YjU1ZWUxOTVhYjU4MjA3YjNjMWEyNzE0ZjdlNjI4NWNmZDMxMTcyN2JmODMwMDc2NGExM2UyNmNmYjAxOWEyYWE5NDE0ODcyZWYzMDE4MDhhZTY2MDY4NiJ9"}',
            "X-Ratelimit-Limit",
            "50",
            "X-Ratelimit-Remaining",
            "21",
            "X-Ratelimit-Reset",
            "1663329600",
            "Connection",
            "close",
        ],
    );

nock("https://matej10qa.appwrite.org:443", { encodedQueryParams: true })
    .get(
        "/v1/databases/632455a0b8d017403ce9/collections/632455a55dc72e1aa016/documents",
    )
    .query({
        "queries%5B0%5D": "offset%280%29",
        "queries%5B1%5D": "limit%2810%29",
    })
    .reply(
        200,
        [
            "1f8b0800000000000003bd90bd6e032110845fc542e9629f76c17040e7327dbac8053f1b09e9ec3b1db8b2fcee81288a1c5b91af49da990f7666ceac8cc50dcc8a358b63381de85832b36f675652198859562817564dca614e5349e3f14b5c35a93a4f29564509be95cabf239157c6f5e87addcc30932b1477a5321c38df80d9a07a45b0525be83be4ea19c00234f834c5e5f044f321e55c03b5c0fb766b1c060a2de2cb7724e9a48ca1e784ce01aaf6b0de70de65ba86c0eb08d86f410432ecb2fed97fc57f5fe0d3bbde204863b4d4c207afa278b8018a4e71bd70835bf89f36c0bbfa77a543d042385448f58387a539749ac3c2d2b7f05f96de5f3e00ac55482c12030000",
        ],
        [
            "Access-Control-Allow-Credentials",
            "true",
            "Access-Control-Allow-Headers",
            "Origin, Cookie, Set-Cookie, X-Requested-With, Content-Type, Access-Control-Allow-Origin, Access-Control-Request-Headers, Accept, X-Appwrite-Project, X-Appwrite-Key, X-Appwrite-Locale, X-Appwrite-Mode, X-Appwrite-JWT, X-Appwrite-Response-Format, X-SDK-Version, X-SDK-Name, X-SDK-Language, X-SDK-Platform, X-Appwrite-ID, Content-Range, Range, Cache-Control, Expires, Pragma",
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, PATCH, DELETE",
            "Access-Control-Allow-Origin",
            "https://localhost",
            "Access-Control-Expose-Headers",
            "X-Fallback-Cookies",
            "Content-Encoding",
            "gzip",
            "Content-Length",
            "262",
            "Content-Type",
            "application/json; charset=UTF-8",
            "Date",
            "Fri, 16 Sep 2022 11:11:02 GMT",
            "Server",
            "Appwrite",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.0036628246307373",
            "Connection",
            "close",
        ],
    );

nock("https://matej10qa.appwrite.org:443", { encodedQueryParams: true })
    .get(
        "/v1/databases/632455a0b8d017403ce9/collections/632455a55dc72e1aa016/documents",
    )
    .query({
        "queries%5B0%5D": "offset%280%29",
        "queries%5B1%5D": "limit%2810%29",
        "queries%5B2%5D": "orderAsc%28%22title%22%29",
    })
    .reply(
        200,
        [
            "1f8b0800000000000003bd923f6bc33010c5bf8a11dd9a983b2992256d19bb672b19f4e70a0627369632857cf7481ddae250e2a5ddc4bb27eefd1e776579cc6e60566c581cc3e544e79c987dbfb2dce7819865c8ca845298fb29f7e3b928bc282f7d2c2f25f84eaa108216c2a142ea76508761269729ee737503e75b305b5407042bb5e5d06a0eaf00163ecd9729ae374f349ffa944a909af258778dc340a1467bfb8a249d9431749cd03940553f961dcebb443f4de075042c994520c36e9b6fe84c293f7057b1a9d282df7f209157c675e83afd941fba16b95ac9bf34ff237fc37f6fa079b801698c965af8e055144f3b40d12aae5776b034ff6507c7db1d27cfd7e912030000",
        ],
        [
            "Access-Control-Allow-Credentials",
            "true",
            "Access-Control-Allow-Headers",
            "Origin, Cookie, Set-Cookie, X-Requested-With, Content-Type, Access-Control-Allow-Origin, Access-Control-Request-Headers, Accept, X-Appwrite-Project, X-Appwrite-Key, X-Appwrite-Locale, X-Appwrite-Mode, X-Appwrite-JWT, X-Appwrite-Response-Format, X-SDK-Version, X-SDK-Name, X-SDK-Language, X-SDK-Platform, X-Appwrite-ID, Content-Range, Range, Cache-Control, Expires, Pragma",
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, PATCH, DELETE",
            "Access-Control-Allow-Origin",
            "https://localhost",
            "Access-Control-Expose-Headers",
            "X-Fallback-Cookies",
            "Content-Encoding",
            "gzip",
            "Content-Length",
            "263",
            "Content-Type",
            "application/json; charset=UTF-8",
            "Date",
            "Fri, 16 Sep 2022 11:11:02 GMT",
            "Server",
            "Appwrite",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.0038249492645264",
            "Connection",
            "close",
        ],
    );

nock("https://matej10qa.appwrite.org:443", { encodedQueryParams: true })
    .get(
        "/v1/databases/632455a0b8d017403ce9/collections/632455a55dc72e1aa016/documents",
    )
    .query({
        "queries%5B0%5D": "offset%280%29",
        "queries%5B1%5D": "limit%2810%29",
        "queries%5B2%5D": "orderAsc%28%22%24id%22%29",
        "queries%5B3%5D": "orderAsc%28%22title%22%29",
    })
    .reply(
        200,
        [
            "1f8b0800000000000003bd90bd6e032110845fc542e9629f76c17040e7327dbac8053f1b09e9ec3b1db8b2fcee81288a1c5b91af49da990f7666ceac8cc50dcc8a358b63381de85832b36f675652198859562817564dca614e5349e3f14b5c35a93a4f29564509be95cabf239157c6f5e87addcc30932b1477a5321c38df80d9a07a45b0525be83be4ea19c00234f834c5e5f044f321e55c03b5c0fb766b1c060a2de2cb7724e9a48ca1e784ce01aaf6b0de70de65ba86c0eb08d86f410432ecb2fed97fc57f5fe0d3bbde204863b4d4c207afa278b8018a4e71bd70835bf89f36c0bbfa77a543d042385448f58387a539749ac3c2d2b7f05f96de5f3e00ac55482c12030000",
        ],
        [
            "Access-Control-Allow-Credentials",
            "true",
            "Access-Control-Allow-Headers",
            "Origin, Cookie, Set-Cookie, X-Requested-With, Content-Type, Access-Control-Allow-Origin, Access-Control-Request-Headers, Accept, X-Appwrite-Project, X-Appwrite-Key, X-Appwrite-Locale, X-Appwrite-Mode, X-Appwrite-JWT, X-Appwrite-Response-Format, X-SDK-Version, X-SDK-Name, X-SDK-Language, X-SDK-Platform, X-Appwrite-ID, Content-Range, Range, Cache-Control, Expires, Pragma",
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, PATCH, DELETE",
            "Access-Control-Allow-Origin",
            "https://localhost",
            "Access-Control-Expose-Headers",
            "X-Fallback-Cookies",
            "Content-Encoding",
            "gzip",
            "Content-Length",
            "262",
            "Content-Type",
            "application/json; charset=UTF-8",
            "Date",
            "Fri, 16 Sep 2022 11:11:02 GMT",
            "Server",
            "Appwrite",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.0050230026245117",
            "Connection",
            "close",
        ],
    );

nock("https://matej10qa.appwrite.org:443", { encodedQueryParams: true })
    .get(
        "/v1/databases/632455a0b8d017403ce9/collections/632455a55dc72e1aa016/documents",
    )
    .query({
        "queries%5B0%5D":
            "equal%28%22%24id%22%2C%20%5B%22632456c5998583bcb6d3%22%5D%29",
        "queries%5B1%5D": "offset%280%29",
        "queries%5B2%5D": "limit%2810%29",
    })
    .reply(
        200,
        [
            "1f8b08000000000000038d8e3d0f02211044ff8ad9d8e9990504393a4b7b3b63c1c11624f79563af32fe77c14463693bf326f31ec013fb1e9cd8439cc23ad0c819dced019cb82770c0947923a1d494c392664ed3f8896bf4eeb62996cc2879d426e8b6b5daaa2e7426aa5a86853c533c7361244ad960db087315e8b475421d8cb43b448758e1758effc3332d43cab92855e97bfd9afa9e4295bc7c95b4d73a869324e13d0a5387e5c3773ed32f849d8d284e4754815a78de9f2f21d5d6c71d010000",
        ],
        [
            "Access-Control-Allow-Credentials",
            "true",
            "Access-Control-Allow-Headers",
            "Origin, Cookie, Set-Cookie, X-Requested-With, Content-Type, Access-Control-Allow-Origin, Access-Control-Request-Headers, Accept, X-Appwrite-Project, X-Appwrite-Key, X-Appwrite-Locale, X-Appwrite-Mode, X-Appwrite-JWT, X-Appwrite-Response-Format, X-SDK-Version, X-SDK-Name, X-SDK-Language, X-SDK-Platform, X-Appwrite-ID, Content-Range, Range, Cache-Control, Expires, Pragma",
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, PATCH, DELETE",
            "Access-Control-Allow-Origin",
            "https://localhost",
            "Access-Control-Expose-Headers",
            "X-Fallback-Cookies",
            "Content-Encoding",
            "gzip",
            "Content-Length",
            "194",
            "Content-Type",
            "application/json; charset=UTF-8",
            "Date",
            "Fri, 16 Sep 2022 11:11:02 GMT",
            "Server",
            "Appwrite",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.0060338973999023",
            "Connection",
            "close",
        ],
    );
