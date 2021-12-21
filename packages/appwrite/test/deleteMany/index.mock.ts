import nock from "nock";

nock("http://localhost:80", { encodedQueryParams: true })
    .delete(
        "/v1/database/collections/6180e6efb14df/documents/61c0832765134",
        {},
    )
    .reply(204, "", [
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
        "Content-Type",
        "",
        "Date",
        "Tue, 21 Dec 2021 09:30:55 GMT",
        "Server",
        "Appwrite",
        "X-Content-Type-Options",
        "nosniff",
        "X-Debug-Fallback",
        "true",
        "X-Debug-Speed",
        "0.0050520896911621",
        "Connection",
        "close",
    ]);

nock("http://localhost:80", { encodedQueryParams: true })
    .delete(
        "/v1/database/collections/6180e6efb14df/documents/61bb4c710fbbf",
        {},
    )
    .reply(204, "", [
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
        "Content-Type",
        "",
        "Date",
        "Tue, 21 Dec 2021 09:30:55 GMT",
        "Server",
        "Appwrite",
        "X-Content-Type-Options",
        "nosniff",
        "X-Debug-Fallback",
        "true",
        "X-Debug-Speed",
        "0.0060958862304688",
        "Connection",
        "close",
    ]);
