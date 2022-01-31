import nock from "nock";

nock("http://localhost:80", { encodedQueryParams: true })
    .post("/v1/database/collections/6180e6efb14df/documents", {
        data: { title: "Lorem ipsum dolor" },
        read: ["role:all"],
        write: ["role:all"],
    })
    .reply(
        201,
        [
            "1f8b08000000000000032d8d410ac2301405af521e5d4916a66a919ec11b880b4d5ee143e22f3f1117a577378acb816166452f1113461f7ce089c38103e1d02fb42ca5883e0ba615c67bd3aed8e1e6f036a9fcd3e650a5a686b8a83177b29457eea226b56f27684a0cb5757e97f39e23e7873fc619db077e3051457d000000",
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
            "127",
            "Content-Type",
            "application/json; charset=UTF-8",
            "Date",
            "Tue, 21 Dec 2021 12:53:50 GMT",
            "Server",
            "Appwrite",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.0068850517272949",
            "Connection",
            "close",
        ],
    );
