import nock from "nock";

nock("http://localhost:80", { encodedQueryParams: true })
    .get("/v1/database/collections/6180e4315f3e7/documents/61b886fbd9398")
    .reply(
        200,
        [
            "1f8b0800000000000003bd93fd6adb3014c55f6588fe35ec588afc21074a19658c41df200a41b6af5d054532b69cd286bcfb247ba3754aa0d02ec260a17374af8e7ee8886e64855628250563695d5439cd190ad04d699482d24aa34795618829496a0a99575be8f6b2ef9ddaa3d51175205c9135faeeb46680dea24d809e3a69e16cf514202bad72cbc8fa850095c24263bae7dfd3291821314d81155878d1680bdabebae55e34e05aa235d7dfdc384e3f3fb84fc2d1ca4d7c985c004dca34a31c0533d36b306fd6835273fd4d346f586f66f2f0af47578643ab8ca84292d23c66196398c438a4c959432df6306df11916ad6ece0c43a726fdd1da76c5231e29530af5687acba303e1516f4de762f3a8960a7a1e4df1324c1d30ec2c129eeedaceec5caadb91142de30c17597dd6c83eb77f4f325e238fde9fa5972fa385d004a7cb99e4eea5742c4615e3f92e2becd04fa52ba35d85493d051fa2043913d7a6945da674083da8b015d642a7c3a6484a9ce2bcc8b6698cbf901f751f63ff875f9ce46972257c754d9757c2c7085de6cb24bcfcc662f2f3f04bd622bb7f586c7fdc6f17bbf68b7801a918c4d56778ed5ab8f8e058c2f0a78171bd41a73fbc7cce5fd3050000",
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
            "453",
            "Content-Type",
            "application/json; charset=UTF-8",
            "Date",
            "Tue, 21 Dec 2021 11:53:01 GMT",
            "Server",
            "Appwrite",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.0045790672302246",
            "Connection",
            "close",
        ],
    );

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
            "Tue, 21 Dec 2021 11:53:01 GMT",
            "Server",
            "Appwrite",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.0024120807647705",
            "Connection",
            "close",
        ],
    );
