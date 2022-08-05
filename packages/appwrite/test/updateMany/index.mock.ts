import nock from "nock";

nock("http://localhost:80", { encodedQueryParams: true })
    .patch(
        "/v1/databases/default/collections/6180e4315f3e7/documents/61b9dd4a6261d",
        {
            data: { content: "Batch updated content" },
            read: ["role:all"],
            write: ["role:all"],
        },
    )
    .reply(
        200,
        [
            "1f8b0800000000000003358ecb0e823010457f85dcb0325d5079cad29d7b5d1917a51db10950526a8c21fcbb23e2f2cc3d736766c4d6a046219b8331992af68534108847f2bd9d26eb8609f50c4f8ab52b76b809bcbc0db4d1c2ae765d473ab0bb36550965a9ccef2995dc146ce858c665342a9089ce2b0b68a6d6f9f7e977be92b2cca54a9b24fb866e0834044e8e2ae847f4dc96ff7301dbab96f83560f9009712b6cfc4000000",
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
            "168",
            "Content-Type",
            "application/json; charset=UTF-8",
            "Date",
            "Tue, 21 Dec 2021 12:16:15 GMT",
            "Server",
            "Appwrite",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.011150121688843",
            "Connection",
            "close",
        ],
    );

nock("http://localhost:80", { encodedQueryParams: true })
    .patch(
        "/v1/databases/default/collections/6180e4315f3e7/documents/61b886fbd9398",
        {
            data: { content: "Batch updated content" },
            read: ["role:all"],
            write: ["role:all"],
        },
    )
    .reply(
        200,
        [
            "1f8b0800000000000003bd93ed6adb3014866f2588fe1a762c45fe9003636c658cc1ee200a41968f13054512b69cd285dcfbe4b865734660d02ec260cbefabf3f5a0137a50355aa29c548ce54d5597b46428420f0eda83ea3a654d879627d48208b615fa80d6117a6a958797dd3978a5d51aa40fde4b248621a5246b28142192575e0733f2d0f9b095c2c3d6b6cfdfc7ac8c9094e6c02a2c06d11a0fc607e58bf07237eb5d1decf5ecf57f84d4416c21548456dcccc23a8daf61f1a1158e96e163e8a6144033991794a36862fa5ded6036bdd653fd8fce07c36a3d91fbd71cad8c7ba7ada86392d33265056398a438a6d95542230e301e19463077667b65e85b3dea3befdd92273cd1560abdb39de7c991f0a4f3b60d6df3a4511a3a9e8ced159806623858143c7d72addd87ae3e5ec64f655ae0aa68ae12f967f752c9658c3cf9bb964efdbc5808cd70be9848612e3240b8a8184f4f79e1fb6e0c5d5b13228cea39fa274a5032716f4ac56d4ac77800153be13db426de5699c4392eab6293a7f81df9d1f030f67ff8a559996777c2d7347471277c8cd045b9c8e2db772c255f8fdf54238ac71ff3cde7c7cd7cefde8917909a415abf85d7dec1cd0bc73286df0c8c9b353aff02cdfd18a7d4050000",
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
            "463",
            "Content-Type",
            "application/json; charset=UTF-8",
            "Date",
            "Tue, 21 Dec 2021 12:16:15 GMT",
            "Server",
            "Appwrite",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.011473894119263",
            "Connection",
            "close",
        ],
    );
