import nock from "nock";

nock("http://localhost:80", { encodedQueryParams: true })
    .post("/v1/databases/default/collections/6180e6efb14df/documents", {
        data: { title: "Test 2" },
        read: ["role:all"],
        write: ["role:all"],
    })
    .reply(
        201,
        [
            "1f8b08000000000000032d8cb10a843010057fe578581d295c919cf81d768785261b58c89d922c5888ff6e14cb8199d95189470f4b8e26fa586aa9e96050ad9c7e92b32cff8c7e47e2a9685fbc311a6c49941f3a0c543416c4c0595fcd15bb2546765ae27bddd56c39ccd4fa80e304e3dadb6772000000",
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
            "119",
            "Content-Type",
            "application/json; charset=UTF-8",
            "Date",
            "Tue, 21 Dec 2021 09:42:14 GMT",
            "Server",
            "Appwrite",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.0084810256958008",
            "Connection",
            "close",
        ],
    );

nock("http://localhost:80", { encodedQueryParams: true })
    .post("/v1/databases/default/collections/6180e6efb14df/documents", {
        data: { title: "Test 1" },
        read: ["role:all"],
        write: ["role:all"],
    })
    .reply(
        201,
        [
            "1f8b08000000000000032d8c4b0a84301005af220f5743163648fc9cc39dcc22c6161ae287a4c18578f78932cb82aaba50ca8c1e963c396a2cd5ae6b60501e1c574949f62da1bf10d9656dc4075f83338af29f6e03150d193170d2829ed8ef21b0d71cbfebb662cbcb44f5bce0fe013406e5e772000000",
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
            "119",
            "Content-Type",
            "application/json; charset=UTF-8",
            "Date",
            "Tue, 21 Dec 2021 09:42:14 GMT",
            "Server",
            "Appwrite",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.0077130794525146",
            "Connection",
            "close",
        ],
    );
