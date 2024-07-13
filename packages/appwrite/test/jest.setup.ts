import nock from "nock";
import { account } from "./appwriteClient";
import zlib from "zlib";

nock("https://matej10qa.appwrite.org", { encodedQueryParams: true })
  .persist()
  .post("/v1/account/sessions/anonymous", {})
  .reply(
    201,
    [
      zlib.gzipSync(
        JSON.stringify({
          $id: "669256d23f17cfded25b",
          $createdAt: "2024-07-13T10:28:34.642+00:00",
          $updatedAt: "2024-07-13T10:28:34.642+00:00",
          userId: "669256d239ac8e93a365",
          expire: "2025-07-13T10:28:34.258+00:00",
          provider: "anonymous",
          providerUid: "",
          providerAccessToken: "",
          providerAccessTokenExpiry: "",
          providerRefreshToken: "",
          ip: "172.25.0.1",
          osCode: "",
          osName: "",
          osVersion: "",
          clientType: "",
          clientCode: "",
          clientName: "",
          clientVersion: "",
          clientEngine: "",
          clientEngineVersion: "",
          deviceName: "smartphone",
          deviceBrand: "Highscreen",
          deviceModel: "Thunder",
          countryCode: "--",
          countryName: "Unknown",
          current: true,
          factors: ["anonymous"],
          secret: "",
          mfaUpdatedAt: "",
        }),
      ),
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
