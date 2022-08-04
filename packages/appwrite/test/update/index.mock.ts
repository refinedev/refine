import nock from "nock";

nock("http://localhost:80", { encodedQueryParams: true })
    .patch(
        "/v1/databases/default/collections/6180e4315f3e7/documents/61b9dd4a6261d",
        {
            data: { title: "Updated Title", content: "Updated Content" },
            read: ["role:all"],
            write: ["role:all"],
        },
    )
    .reply(
        200,
        [
            "1f8b08000000000000034d8ebb0e824010457fc5dc50992d58794a4b65af95b158d8916c022c59263186f0ef8e48617966cedcb90b22675121d7cdd9dad4e4a75c5b28441385c1cdb3f3e38c6a412023da1d473c145ec131edb48adbfabea796c5dd92ca98d24467cf840a4962c7bdc8b84dd630d9c375638556a8f3e17df9bd2fb52e326d92264ebf4b3f328dfc7756ef130537988ea414b07e008ec231f8be000000",
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
            "163",
            "Content-Type",
            "application/json; charset=UTF-8",
            "Date",
            "Tue, 21 Dec 2021 12:10:12 GMT",
            "Server",
            "Appwrite",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.0090959072113037",
            "Connection",
            "close",
        ],
    );
