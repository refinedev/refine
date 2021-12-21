import nock from "nock";

nock("http://localhost:80", { encodedQueryParams: true })
    .get("/v1/database/collections/6180e4315f3e7/documents")
    .query({ limit: "10", offset: "0" })
    .reply(
        200,
        [
            "1f8b0800000000000003b5934b8bdb3010c7bf4a117b2a762c594f074a294b29851e7b8b9720cb725641b68c2d67d986fdee1d3b5d9aa687eeaba0cb3c34f39f9f4647344e2d5ae709aa83995adbc511ad374774e56ab44682544a89a6aa0b5a2894a02b13bcb726bad02d51852da38437d4ca39dadba175e3085128724483d5506483dea39b04dd0d2eda5fd64382a28b1e4c14ed18e1aad1d1eec270fff5d455112239d1b4c26c0e862e82b0dfd9aed53b7ba9b3d096722324bdd4d94dde5f8adb80a269b93a9874ea7dd0754a042d98924a61c2704a39d4e974fb2872d5773bf04c8307c76d8cfdbacccacc07a3fd6d1863991d48998d310c20adcc1ae7ed5866275d1253808821c5d9bb8ffd10f620edc3428f1a2671251ba81ceffbb9d7325b999dba8dee07f808e558c00bc10466e140308658d4718251e0e13a8b1e92bf58d842e9376221cf581cd21947daeb18edd0a5bb8a1b2c7051c9ad60f83594281ca55e4c89f142f067436a1a9abf0e9222342f729e9eed0b239f0f5f5ca3e5f5b7d5f6d3f576b5ef5f4ac5925a59563f8bcabeb767cba3b8c2ffc072f30798a2ae9916b920f57ff9f1df617bd8d3bffc9cfeeed104a53f01bd61a5c1b1040000",
        ],
        [
            "Access-Control-Allow-Credentials",
            "true",
            "Access-Control-Allow-Headers",
            "Origin, Cookie, Set-Cookie, X-Requested-With, Content-Type, Access-Control-Allow-Origin, Access-Control-Request-Headers, Accept, X-Appwrite-Project, X-Appwrite-Key, X-Appwrite-Locale, X-Appwrite-Mode, X-Appwrite-JWT, X-Appwrite-Response-Format, X-SDK-Version, Cache-Control, Expires, Pragma",
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, PATCH, DELETE",
            "Access-Control-Allow-Origin",
            "http://localhost",
            "Access-Control-Expose-Headers",
            "X-Fallback-Cookies",
            "Content-Encoding",
            "gzip",
            "Content-Length",
            "449",
            "Content-Type",
            "application/json; charset=UTF-8",
            "Date",
            "Tue, 21 Dec 2021 11:27:11 GMT",
            "Server",
            "Appwrite",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.0042209625244141",
            "Connection",
            "close",
        ],
    );

nock("http://localhost:80", { encodedQueryParams: true })
    .get("/v1/database/collections/6180e4315f3e7/documents")
    .query({ limit: "10", offset: "0", orderField: "id", orderType: "ASC" })
    .reply(
        200,
        [
            "1f8b0800000000000003b5934b8bdb3010c7bf4a117b2a762c594f074a294b29851e7b8b9720cb725641b68c2d67d986fdee1d3b5d9aa687eeaba0cb3c34f39f9f4647344e2d5ae709aa83995adbc511ad374774e56ab44682544a89a6aa0b5a2894a02b13bcb726bad02d51852da38437d4ca39dadba175e3085128724483d5506483dea39b04dd0d2eda5fd64382a28b1e4c14ed18e1aad1d1eec270fff5d455112239d1b4c26c0e862e82b0dfd9aed53b7ba9b3d096722324bdd4d94dde5f8adb80a269b93a9874ea7dd0754a042d98924a61c2704a39d4e974fb2872d5773bf04c8307c76d8cfdbacccacc07a3fd6d1863991d48998d310c20adcc1ae7ed5866275d1253808821c5d9bb8ffd10f620edc3428f1a2671251ba81ceffbb9d7325b999dba8dee07f808e558c00bc10466e140308658d4718251e0e13a8b1e92bf58d842e9376221cf581cd21947daeb18edd0a5bb8a1b2c7051c9ad60f83594281ca55e4c89f142f067436a1a9abf0e9222342f729e9eed0b239f0f5f5ca3e5f5b7d5f6d3f576b5ef5f4ac5925a59563f8bcabeb767cba3b8c2ffc072f30798a2ae9916b920f57ff9f1df617bd8d3bffc9cfeeed104a53f01bd61a5c1b1040000",
        ],
        [
            "Access-Control-Allow-Credentials",
            "true",
            "Access-Control-Allow-Headers",
            "Origin, Cookie, Set-Cookie, X-Requested-With, Content-Type, Access-Control-Allow-Origin, Access-Control-Request-Headers, Accept, X-Appwrite-Project, X-Appwrite-Key, X-Appwrite-Locale, X-Appwrite-Mode, X-Appwrite-JWT, X-Appwrite-Response-Format, X-SDK-Version, Cache-Control, Expires, Pragma",
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, PATCH, DELETE",
            "Access-Control-Allow-Origin",
            "http://localhost",
            "Access-Control-Expose-Headers",
            "X-Fallback-Cookies",
            "Content-Encoding",
            "gzip",
            "Content-Length",
            "449",
            "Content-Type",
            "application/json; charset=UTF-8",
            "Date",
            "Tue, 21 Dec 2021 11:30:43 GMT",
            "Server",
            "Appwrite",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.0041501522064209",
            "Connection",
            "close",
        ],
    );

nock("http://localhost:80", { encodedQueryParams: true })
    .get("/v1/database/collections/6180e4315f3e7/documents")
    .query({
        "filters%5B0%5D": "categoryId%3D61811751a3b04",
        limit: "10",
        offset: "0",
    })
    .reply(
        200,
        [
            "1f8b0800000000000003358ecd0e823010845fc54c38991ea8fcca1b78f746389476354d80927689318477b7221ebf7c3b33bb222c231a29609c5e469a38a0695724d6a04129fbab31b92a2fa5341048b41b06d26cddb4db3aa53c93c523a3ea6b67f2a30d21da58b2c2938a252dcee8045ede321db409b0e52122ee14388f59ad989ecebf6fbfd95acaaa902aebd35dba89e367c7f9e98f5bb77d00d2dc9634bf000000",
        ],
        [
            "Access-Control-Allow-Credentials",
            "true",
            "Access-Control-Allow-Headers",
            "Origin, Cookie, Set-Cookie, X-Requested-With, Content-Type, Access-Control-Allow-Origin, Access-Control-Request-Headers, Accept, X-Appwrite-Project, X-Appwrite-Key, X-Appwrite-Locale, X-Appwrite-Mode, X-Appwrite-JWT, X-Appwrite-Response-Format, X-SDK-Version, Cache-Control, Expires, Pragma",
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, PATCH, DELETE",
            "Access-Control-Allow-Origin",
            "http://localhost",
            "Access-Control-Expose-Headers",
            "X-Fallback-Cookies",
            "Content-Encoding",
            "gzip",
            "Content-Length",
            "164",
            "Content-Type",
            "application/json; charset=UTF-8",
            "Date",
            "Tue, 21 Dec 2021 11:41:56 GMT",
            "Server",
            "Appwrite",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.004457950592041",
            "Connection",
            "close",
        ],
    );
