import { Models } from "appwrite";
import nock from "nock";
import { account } from "./appwriteClient";

nock("https://matej10qa.appwrite.org", { encodedQueryParams: true })
    .persist()
    .post("/v1/account/sessions/anonymous", {})
    .reply(
        201,
        [
            "1f8b0800000000000003558ecb4ec33010457f05592cdba813d4a4cd12d44a2ce8aa659fc714aca633d1382e44887fc7c156dcacec39d73e777ed4a36e54a132a8617baeaa7c93ae412d943528afb3e009600cf0bbd382aa802c870cd6e91616aa13bee906c53d2f8969b8b2352ae2d37fc31d38f205c923ddb913f234814db24ac602362fdca04fd91ccaeb747f47319ac3c7bad548fd71e8c6b8d59594324c381afc1c2c07871ff6d8d79f53129d90ac26baa30f4d338327b30d1abce91ae3827e7e96929a7bf0e64adba0624bbd0c61bbe532a26039d185f88b466e455cad2a7ab1f8fb070a007e28a6010000",
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
            "238",
            "Content-Type",
            "application/json; charset=UTF-8",
            "Date",
            "Tue, 21 Dec 2021 09:34:51 GMT",
            "Server",
            "Appwrite",
            "Set-Cookie",
            "a_session_6180e3c470b7f_legacy=eyJpZCI6IjYxYzE5ZmJiNzMxMTEiLCJzZWNyZXQiOiJkMzZjOGYwZGMwYTNmYzc2MzYyOTRmZTdjZGIwYjM5ZDU2MWI3NTdlYjcxOTJkYjM4YWI5Zjc2MjkzNTk2NjQxODFjOTUxYTg0N2E5ZjI4ZGI2ODBiMjgwYzNlZTRhOWFmOTI5YzE3OTNhYjRkNzQ5ZWNkZDViYWUzODc0NWUxMzFhYWJhMzNhZGFkNTk2N2UwOGIxZDAxY2IxYzA0MDkzOTI5MjBhYTBiMzQyMWE5MzNkZjVkYTFkMWYyODM0MzEyNTA2MDgyZDEwY2YzMGIyMmUxZTIzMTMzODMzZDVkM2ZkNDM5NTQ5ODFiMjI1YzMyN2ExZWUyZWY2MjhlZmM1In0%3D; expires=Wed, 21-Dec-2022 09:34:51 GMT; path=/; httponly",
            "Set-Cookie",
            "a_session_6180e3c470b7f=eyJpZCI6IjYxYzE5ZmJiNzMxMTEiLCJzZWNyZXQiOiJkMzZjOGYwZGMwYTNmYzc2MzYyOTRmZTdjZGIwYjM5ZDU2MWI3NTdlYjcxOTJkYjM4YWI5Zjc2MjkzNTk2NjQxODFjOTUxYTg0N2E5ZjI4ZGI2ODBiMjgwYzNlZTRhOWFmOTI5YzE3OTNhYjRkNzQ5ZWNkZDViYWUzODc0NWUxMzFhYWJhMzNhZGFkNTk2N2UwOGIxZDAxY2IxYzA0MDkzOTI5MjBhYTBiMzQyMWE5MzNkZjVkYTFkMWYyODM0MzEyNTA2MDgyZDEwY2YzMGIyMmUxZTIzMTMzODMzZDVkM2ZkNDM5NTQ5ODFiMjI1YzMyN2ExZWUyZWY2MjhlZmM1In0%3D; expires=Wed, 21-Dec-2022 09:34:51 GMT; path=/; httponly; samesite=None",
            "X-Content-Type-Options",
            "nosniff",
            "X-Debug-Fallback",
            "true",
            "X-Debug-Speed",
            "0.062147855758667",
            "X-Fallback-Cookies",
            '{"a_session_6180e3c470b7f":"eyJpZCI6IjYxYzE5ZmJiNzMxMTEiLCJzZWNyZXQiOiJkMzZjOGYwZGMwYTNmYzc2MzYyOTRmZTdjZGIwYjM5ZDU2MWI3NTdlYjcxOTJkYjM4YWI5Zjc2MjkzNTk2NjQxODFjOTUxYTg0N2E5ZjI4ZGI2ODBiMjgwYzNlZTRhOWFmOTI5YzE3OTNhYjRkNzQ5ZWNkZDViYWUzODc0NWUxMzFhYWJhMzNhZGFkNTk2N2UwOGIxZDAxY2IxYzA0MDkzOTI5MjBhYTBiMzQyMWE5MzNkZjVkYTFkMWYyODM0MzEyNTA2MDgyZDEwY2YzMGIyMmUxZTIzMTMzODMzZDVkM2ZkNDM5NTQ5ODFiMjI1YzMyN2ExZWUyZWY2MjhlZmM1In0="}',
            "X-Ratelimit-Limit",
            "50",
            "X-Ratelimit-Remaining",
            "40",
            "X-Ratelimit-Reset",
            "1640080800",
            "Connection",
            "close",
        ],
    );

beforeAll(async () => {
    return await account.createAnonymousSession();
});

afterAll(async () => {
    nock.cleanAll();
    nock.restore();
});
