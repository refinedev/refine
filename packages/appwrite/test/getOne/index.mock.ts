import nock from "nock";

nock("http://localhost:80", { encodedQueryParams: true })
    .get("/v1/database/collections/6180e4315f3e7/documents/61b9dd4a6261d")
    .reply(
        200,
        [
            "1f8b08000000000000035dce3d0ec2300c05e0aba0a74e2843437fe90dd8d91043da982a52db5489114255ef8e29b030fa7d4fb61724cea241a9dba3b5b9290fa5b650483a3f0cd4b1f3d3a6754a79a68b5b46d55b670aa38b5134a25910c8c8920bf662fd9d22e3aaf0088ee92f5d15d8f12031ce12e4229d61ea7d789e3e6fd45a578536599b6ee827a689bff5dd6f5470a3e9496e03eb0b65502ba4c3000000",
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
            "161",
            "Content-Type",
            "application/json; charset=UTF-8",
            "Date",
            "Tue, 21 Dec 2021 12:01:00 GMT",
            "Server",
            "Appwrite",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.0033769607543945",
            "Connection",
            "close",
        ],
    );
