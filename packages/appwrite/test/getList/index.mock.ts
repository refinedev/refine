import nock from "nock";

nock("http://localhost:80", { encodedQueryParams: true })
    .get("/v1/database/collections/6180e4315f3e7/documents")
    .query({ limit: "10", offset: "0" })
    .reply(
        200,
        [
            "1f8b0800000000000003bd93c14ec42010865fa5219e4cbb65806dbb9b18cf9ef5b6f54029ddc5d0d200d5e8c67777da3531ae1e5d0f1ce01f66bef9618e244c3dd9b294b44e4dbd1e6220dbdd915c99966c49018a530a503574dd90945c2967ad56d1b861512baa058775c77539aba3f6bd0901554c72245e4b4cb223d7e431252fde44fdb97b4f4934d1e2963ce810f1aa9251ef9d7fbd3b55ad00ca3548de50318b6e8808f6156d7ab9d73f39197208599d730e93b5e7703b249a96ab5e65d3689d6c3328048562232aa8369b0c38e619643f43de2baff590dc1f5c4c18659001cba04c644c80ad04acd67c350e7b8c9fbcc5f0438ce3b6ceebdc3a25edc18558e7cf50e7213a8fe075de19ab439d7fbaab58d156283f1bfd723b7af784e0378bb75c899236658799e3eb38932c9dd7f9a95a306f78068c97459112ec4f2d2e01a5a84519276c149f75d0e43dfde154d7749bbf718a95ffe4146b1563825ed6a9c733afa051b2d26d77b1df9fb0e4d70110bcd03877f2db00b49d0ca735937e00535f3cf1bd030000",
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
            "394",
            "Content-Type",
            "application/json; charset=UTF-8",
            "Date",
            "Wed, 22 Dec 2021 10:49:19 GMT",
            "Server",
            "Appwrite",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.0042541027069092",
            "Connection",
            "close",
        ],
    );

nock("http://localhost:80", { encodedQueryParams: true })
    .get("/v1/database/collections/6180e4315f3e7/documents")
    .query({ limit: "10", offset: "0", orderField: "%24id", orderType: "DESC" })
    .reply(
        200,
        [
            "1f8b0800000000000003bd92c16ee32010865f251af5b4b2630688ed44aa7ade73f716f780314e586163016ed58dfaee3b767269bbc76d857cc0ff307c7c7081380f70e019745ecf83195384c3f10277b6830394a805c356abda743d6470a7bd734627ebc735ad99910277bd30d5924e260c36464aa9c9058251d4e4083fe02983976093b9cdde324836399ac22f13d386d362ad9239f9f0faf3ba6f8d284569ea96a925f46322344aba5ec5eb076fd93b4c8648d5bbf6cb30ff0959ed508996c97790b76a3ba893f9a49371e290aafec839cece7d843b12d1bc2e0d3a9f27e75597632919967b5963bddfe728a8cfa88605f2510763c6cde3d99352c631479e63b55169837c2b71bb13db693c51fd1c1c959f539a0e4dd114ce6be5ce3ea6a678c6a688c907026f8ade3a139be26657f3b2ab297eb6e6e5610afe3781dfaf6e8596156babe581a4d76921594fde14d7dda2fd43ff908baa2c33a0f3e9d51232465952698ecbbdfad17cba5132d5b7fdfeff98e2d53799e29de65cb2af35f544e32f95a51e46bc030000",
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
            "394",
            "Content-Type",
            "application/json; charset=UTF-8",
            "Date",
            "Wed, 22 Dec 2021 10:51:59 GMT",
            "Server",
            "Appwrite",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.0047950744628906",
            "Connection",
            "close",
        ],
    );

nock("http://localhost:80", { encodedQueryParams: true })
    .get("/v1/database/collections/6180e4315f3e7/documents")
    .query({
        "filters%5B0%5D": "%24id%3D61c300118b05b",
        limit: "10",
        offset: "0",
    })
    .reply(
        200,
        [
            "1f8b0800000000000003bd91414fc3300c85ffca647142ed1aa75ddb4d429c39c36de590a6e916943655e20ec1c47fc72b484870059493f39ce7cf2f6788f3003b4ca0f37a1ecc481176fb335cd90e7650a2ce8540ac5bb16921812bed9d339aac1f17b516a6c871d3e7a6baa89309838d9155363943308a4df6700d8f093c074be6b37a4b802c392ee1c144e2a75a9139f8f072f731b546ac36a8f2561417d18fc4605fdd765007f393533247a1eaef9ce3ecdc77b83d13cdcbd3a0d379725e75299685c0725bd4586fb729e6ec33aae10279af8331e3eafee8692585c414658ad54ad10ae5bac0f5265f4fe381fbe7e0b8fd4834ed9aacc99cd7ca1d7da4263b619345f281c19bacb7cec426fb4c57cbb2ab593e59f37c3b05ffc4e0374bb6b92e2ad1563d3bd3cb742159366fb28f69d1bef21dcabc2acb04783fbda48442b0468a665e94bf7534f096fc48aa6ffbedef2425ab7f4a4a765aca42fc6d528f7cde01fbf03daa15030000",
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
            "363",
            "Content-Type",
            "application/json; charset=UTF-8",
            "Date",
            "Wed, 22 Dec 2021 10:55:32 GMT",
            "Server",
            "Appwrite",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.0036900043487549",
            "Connection",
            "close",
        ],
    );
