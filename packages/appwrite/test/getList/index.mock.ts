import nock from "nock";
import zlib from "zlib";

nock("https://matej10qa.appwrite.org:443", { encodedQueryParams: true })
  .post("/v1/account/sessions/anonymous", {})
  .reply(
    201,
    [
      zlib.gzipSync(
        JSON.stringify({
          $id: "632459c5c16744b4afa5",
          $createdAt: "2022-09-16T11:11:01.797+00:00",
          userId: "632459c5bffb53144bee",
          expire: "2023-09-16T11:11:01.792+00:00",
          provider: "anonymous",
          providerUid: "",
          providerAccessToken: "",
          providerAccessTokenExpiry: "",
          providerRefreshToken: "",
          ip: "46.104.49.118",
          osCode: "",
          osName: "",
          osVersion: "",
          clientType: "library",
          clientCode: "",
          clientName: "Node Fetch",
          clientVersion: "1.0",
          clientEngine: "",
          clientEngineVersion: "",
          deviceName: "",
          deviceBrand: "",
          deviceModel: "",
          countryCode: "tr",
          countryName: "Turkey",
          current: true,
        }),
      ),
    ],
    [
      "Access-Control-Allow-Credentials",
      "true",
      "Access-Control-Allow-Headers",
      "Origin, Cookie, Set-Cookie, X-Requested-With, Content-Type, Access-Control-Allow-Origin, Access-Control-Request-Headers, Accept, X-Appwrite-Project, X-Appwrite-Key, X-Appwrite-Locale, X-Appwrite-Mode, X-Appwrite-JWT, X-Appwrite-Response-Format, X-SDK-Version, X-SDK-Name, X-SDK-Language, X-SDK-Platform, X-Appwrite-ID, Content-Range, Range, Cache-Control, Expires, Pragma",
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE",
      "Access-Control-Allow-Origin",
      "https://localhost",
      "Access-Control-Expose-Headers",
      "X-Fallback-Cookies",
      "Content-Encoding",
      "gzip",
      "Content-Length",
      "300",
      "Content-Type",
      "application/json; charset=UTF-8",
      "Date",
      "Fri, 16 Sep 2022 11:11:01 GMT",
      "Server",
      "Appwrite",
      "Set-Cookie",
      "a_session_6324555073b9706cb1f5_legacy=eyJpZCI6IjYzMjQ1OWM1YmZmYjUzMTQ0YmVlIiwic2VjcmV0IjoiMzFmZmY5ZTVlMzA2MjdmYmUzODZlMDBlYzNlYjhhNjdkMzhiNzljMzg1YzBiNzdiM2NlNGRmZTU3ZjQ4MWRmMDg2ZjY0NTFkM2RjNDc1N2FlNjkyNzA5OTQ3NTIwOWVmYmI2ZTJjOGY4ZWU3NTQyYmI3MWQ5MGM3MzNlMWQxYmMxYTQyOTI5ODRkZGU4YTZlMjJlZTJlNzNmNGE0NmFjNjVmNmI3MzE2YjU1ZWUxOTVhYjU4MjA3YjNjMWEyNzE0ZjdlNjI4NWNmZDMxMTcyN2JmODMwMDc2NGExM2UyNmNmYjAxOWEyYWE5NDE0ODcyZWYzMDE4MDhhZTY2MDY4NiJ9; expires=Sat, 16-Sep-2023 11:11:01 GMT; path=/; domain=.matej10qa.appwrite.org; secure; httponly",
      "Set-Cookie",
      "a_session_6324555073b9706cb1f5=eyJpZCI6IjYzMjQ1OWM1YmZmYjUzMTQ0YmVlIiwic2VjcmV0IjoiMzFmZmY5ZTVlMzA2MjdmYmUzODZlMDBlYzNlYjhhNjdkMzhiNzljMzg1YzBiNzdiM2NlNGRmZTU3ZjQ4MWRmMDg2ZjY0NTFkM2RjNDc1N2FlNjkyNzA5OTQ3NTIwOWVmYmI2ZTJjOGY4ZWU3NTQyYmI3MWQ5MGM3MzNlMWQxYmMxYTQyOTI5ODRkZGU4YTZlMjJlZTJlNzNmNGE0NmFjNjVmNmI3MzE2YjU1ZWUxOTVhYjU4MjA3YjNjMWEyNzE0ZjdlNjI4NWNmZDMxMTcyN2JmODMwMDc2NGExM2UyNmNmYjAxOWEyYWE5NDE0ODcyZWYzMDE4MDhhZTY2MDY4NiJ9; expires=Sat, 16-Sep-2023 11:11:01 GMT; path=/; domain=.matej10qa.appwrite.org; secure; httponly; samesite=None",
      "X-Content-Type-Options",
      "nosniff",
      "X-Debug-Fallback",
      "true",
      "X-Debug-Speed",
      "0.022747039794922",
      "X-Fallback-Cookies",
      '{"a_session_6324555073b9706cb1f5":"eyJpZCI6IjYzMjQ1OWM1YmZmYjUzMTQ0YmVlIiwic2VjcmV0IjoiMzFmZmY5ZTVlMzA2MjdmYmUzODZlMDBlYzNlYjhhNjdkMzhiNzljMzg1YzBiNzdiM2NlNGRmZTU3ZjQ4MWRmMDg2ZjY0NTFkM2RjNDc1N2FlNjkyNzA5OTQ3NTIwOWVmYmI2ZTJjOGY4ZWU3NTQyYmI3MWQ5MGM3MzNlMWQxYmMxYTQyOTI5ODRkZGU4YTZlMjJlZTJlNzNmNGE0NmFjNjVmNmI3MzE2YjU1ZWUxOTVhYjU4MjA3YjNjMWEyNzE0ZjdlNjI4NWNmZDMxMTcyN2JmODMwMDc2NGExM2UyNmNmYjAxOWEyYWE5NDE0ODcyZWYzMDE4MDhhZTY2MDY4NiJ9"}',
      "X-Ratelimit-Limit",
      "50",
      "X-Ratelimit-Remaining",
      "21",
      "X-Ratelimit-Reset",
      "1663329600",
      "Connection",
      "close",
    ],
  );

nock("https://matej10qa.appwrite.org:443", { encodedQueryParams: true })
  .get(
    "/v1/databases/632455a0b8d017403ce9/collections/632455a55dc72e1aa016/documents",
  )
  .query({
    "queries%5B0%5D":
      "%7B%22method%22%3A%22offset%22%2C%22values%22%3A%5B0%5D%7D",
    "queries%5B1%5D":
      "%7B%22method%22%3A%22limit%22%2C%22values%22%3A%5B10%5D%7D",
  })
  .reply(
    200,
    [
      zlib.gzipSync(
        JSON.stringify({
          total: 3,
          documents: [
            {
              title: "test",
              description: "test desc",
              $id: "632456bf1eeb69a71a78",
              $createdAt: "2022-09-16T10:58:07.126+00:00",
              $updatedAt: "2022-09-16T10:58:07.126+00:00",
              $permissions: [],
              $collectionId: "632455a55dc72e1aa016",
              $databaseId: "632455a0b8d017403ce9",
            },
            {
              title: "test 2",
              description: "test desc 2",
              $id: "632456c5998583bcb6d3",
              $createdAt: "2022-09-16T10:58:13.628+00:00",
              $updatedAt: "2022-09-16T10:58:13.628+00:00",
              $permissions: [],
              $collectionId: "632455a55dc72e1aa016",
              $databaseId: "632455a0b8d017403ce9",
            },
            {
              title: "1",
              description: "2",
              $id: "632456ccc833a161e740",
              $createdAt: "2022-09-16T10:58:20.820+00:00",
              $updatedAt: "2022-09-16T10:58:20.820+00:00",
              $permissions: [],
              $collectionId: "632455a55dc72e1aa016",
              $databaseId: "632455a0b8d017403ce9",
            },
          ],
        }),
      ),
    ],
    [
      "Access-Control-Allow-Credentials",
      "true",
      "Access-Control-Allow-Headers",
      "Origin, Cookie, Set-Cookie, X-Requested-With, Content-Type, Access-Control-Allow-Origin, Access-Control-Request-Headers, Accept, X-Appwrite-Project, X-Appwrite-Key, X-Appwrite-Locale, X-Appwrite-Mode, X-Appwrite-JWT, X-Appwrite-Response-Format, X-SDK-Version, X-SDK-Name, X-SDK-Language, X-SDK-Platform, X-Appwrite-ID, Content-Range, Range, Cache-Control, Expires, Pragma",
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE",
      "Access-Control-Allow-Origin",
      "https://localhost",
      "Access-Control-Expose-Headers",
      "X-Fallback-Cookies",
      "Content-Encoding",
      "gzip",
      "Content-Length",
      "262",
      "Content-Type",
      "application/json; charset=UTF-8",
      "Date",
      "Fri, 16 Sep 2022 11:11:02 GMT",
      "Server",
      "Appwrite",
      "X-Content-Type-Options",
      "nosniff",
      "X-Debug-Fallback",
      "true",
      "X-Debug-Speed",
      "0.0036628246307373",
      "Connection",
      "close",
    ],
  );

nock("https://matej10qa.appwrite.org:443", { encodedQueryParams: true })
  .get(
    "/v1/databases/632455a0b8d017403ce9/collections/632455a55dc72e1aa016/documents",
  )
  .query({
    "queries%5B0%5D":
      "%7B%22method%22%3A%22offset%22%2C%22values%22%3A%5B0%5D%7D",
    "queries%5B1%5D":
      "%7B%22method%22%3A%22limit%22%2C%22values%22%3A%5B10%5D%7D",
    "queries%5B2%5D":
      "%7B%22method%22%3A%22orderAsc%22%2C%22attribute%22%3A%22title%22%7D",
  })
  .reply(
    200,
    [
      zlib.gzipSync(
        JSON.stringify({
          total: 3,
          documents: [
            {
              title: "1",
              description: "2",
              $id: "632456ccc833a161e740",
              $createdAt: "2022-09-16T10:58:20.820+00:00",
              $updatedAt: "2022-09-16T10:58:20.820+00:00",
              $permissions: [],
              $collectionId: "632455a55dc72e1aa016",
              $databaseId: "632455a0b8d017403ce9",
            },
            {
              title: "test",
              description: "test desc",
              $id: "632456bf1eeb69a71a78",
              $createdAt: "2022-09-16T10:58:07.126+00:00",
              $updatedAt: "2022-09-16T10:58:07.126+00:00",
              $permissions: [],
              $collectionId: "632455a55dc72e1aa016",
              $databaseId: "632455a0b8d017403ce9",
            },
            {
              title: "test 2",
              description: "test desc 2",
              $id: "632456c5998583bcb6d3",
              $createdAt: "2022-09-16T10:58:13.628+00:00",
              $updatedAt: "2022-09-16T10:58:13.628+00:00",
              $permissions: [],
              $collectionId: "632455a55dc72e1aa016",
              $databaseId: "632455a0b8d017403ce9",
            },
          ],
        }),
      ),
    ],
    [
      "Access-Control-Allow-Credentials",
      "true",
      "Access-Control-Allow-Headers",
      "Origin, Cookie, Set-Cookie, X-Requested-With, Content-Type, Access-Control-Allow-Origin, Access-Control-Request-Headers, Accept, X-Appwrite-Project, X-Appwrite-Key, X-Appwrite-Locale, X-Appwrite-Mode, X-Appwrite-JWT, X-Appwrite-Response-Format, X-SDK-Version, X-SDK-Name, X-SDK-Language, X-SDK-Platform, X-Appwrite-ID, Content-Range, Range, Cache-Control, Expires, Pragma",
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE",
      "Access-Control-Allow-Origin",
      "https://localhost",
      "Access-Control-Expose-Headers",
      "X-Fallback-Cookies",
      "Content-Encoding",
      "gzip",
      "Content-Length",
      "263",
      "Content-Type",
      "application/json; charset=UTF-8",
      "Date",
      "Fri, 16 Sep 2022 11:11:02 GMT",
      "Server",
      "Appwrite",
      "X-Content-Type-Options",
      "nosniff",
      "X-Debug-Fallback",
      "true",
      "X-Debug-Speed",
      "0.0038249492645264",
      "Connection",
      "close",
    ],
  );

nock("https://matej10qa.appwrite.org:443", { encodedQueryParams: true })
  .get(
    "/v1/databases/632455a0b8d017403ce9/collections/632455a55dc72e1aa016/documents",
  )
  .query({
    "queries%5B0%5D":
      "%7B%22method%22%3A%22offset%22%2C%22values%22%3A%5B0%5D%7D",
    "queries%5B1%5D":
      "%7B%22method%22%3A%22limit%22%2C%22values%22%3A%5B10%5D%7D",
    "queries%5B2%5D":
      "%7B%22method%22%3A%22orderAsc%22%2C%22attribute%22%3A%22%24id%22%7D",
    "queries%5B3%5D":
      "%7B%22method%22%3A%22orderAsc%22%2C%22attribute%22%3A%22title%22%7D",
  })
  .reply(
    200,
    [
      zlib.gzipSync(
        JSON.stringify({
          total: 3,
          documents: [
            {
              title: "test",
              description: "test desc",
              $id: "632456bf1eeb69a71a78",
              $createdAt: "2022-09-16T10:58:07.126+00:00",
              $updatedAt: "2022-09-16T10:58:07.126+00:00",
              $permissions: [],
              $collectionId: "632455a55dc72e1aa016",
              $databaseId: "632455a0b8d017403ce9",
            },
            {
              title: "test 2",
              description: "test desc 2",
              $id: "632456c5998583bcb6d3",
              $createdAt: "2022-09-16T10:58:13.628+00:00",
              $updatedAt: "2022-09-16T10:58:13.628+00:00",
              $permissions: [],
              $collectionId: "632455a55dc72e1aa016",
              $databaseId: "632455a0b8d017403ce9",
            },
            {
              title: "1",
              description: "2",
              $id: "632456ccc833a161e740",
              $createdAt: "2022-09-16T10:58:20.820+00:00",
              $updatedAt: "2022-09-16T10:58:20.820+00:00",
              $permissions: [],
              $collectionId: "632455a55dc72e1aa016",
              $databaseId: "632455a0b8d017403ce9",
            },
          ],
        }),
      ),
    ],
    [
      "Access-Control-Allow-Credentials",
      "true",
      "Access-Control-Allow-Headers",
      "Origin, Cookie, Set-Cookie, X-Requested-With, Content-Type, Access-Control-Allow-Origin, Access-Control-Request-Headers, Accept, X-Appwrite-Project, X-Appwrite-Key, X-Appwrite-Locale, X-Appwrite-Mode, X-Appwrite-JWT, X-Appwrite-Response-Format, X-SDK-Version, X-SDK-Name, X-SDK-Language, X-SDK-Platform, X-Appwrite-ID, Content-Range, Range, Cache-Control, Expires, Pragma",
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE",
      "Access-Control-Allow-Origin",
      "https://localhost",
      "Access-Control-Expose-Headers",
      "X-Fallback-Cookies",
      "Content-Encoding",
      "gzip",
      "Content-Length",
      "262",
      "Content-Type",
      "application/json; charset=UTF-8",
      "Date",
      "Fri, 16 Sep 2022 11:11:02 GMT",
      "Server",
      "Appwrite",
      "X-Content-Type-Options",
      "nosniff",
      "X-Debug-Fallback",
      "true",
      "X-Debug-Speed",
      "0.0050230026245117",
      "Connection",
      "close",
    ],
  );

nock("https://matej10qa.appwrite.org:443", { encodedQueryParams: true })
  .get(
    "/v1/databases/632455a0b8d017403ce9/collections/632455a55dc72e1aa016/documents",
  )
  .query({
    "queries%5B0%5D":
      "%7B%22method%22%3A%22equal%22%2C%22attribute%22%3A%22%24id%22%2C%22values%22%3A%5B%22632456c5998583bcb6d3%22%5D%7D",
    "queries%5B1%5D":
      "%7B%22method%22%3A%22offset%22%2C%22values%22%3A%5B0%5D%7D",
    "queries%5B2%5D":
      "%7B%22method%22%3A%22limit%22%2C%22values%22%3A%5B10%5D%7D",
  })
  .reply(
    200,
    [
      zlib.gzipSync(
        JSON.stringify({
          total: 1,
          documents: [
            {
              title: "test 2",
              description: "test desc 2",
              $id: "632456c5998583bcb6d3",
              $createdAt: "2022-09-16T10:58:13.628+00:00",
              $updatedAt: "2022-09-16T10:58:13.628+00:00",
              $permissions: [],
              $collectionId: "632455a55dc72e1aa016",
              $databaseId: "632455a0b8d017403ce9",
            },
          ],
        }),
      ),
    ],
    [
      "Access-Control-Allow-Credentials",
      "true",
      "Access-Control-Allow-Headers",
      "Origin, Cookie, Set-Cookie, X-Requested-With, Content-Type, Access-Control-Allow-Origin, Access-Control-Request-Headers, Accept, X-Appwrite-Project, X-Appwrite-Key, X-Appwrite-Locale, X-Appwrite-Mode, X-Appwrite-JWT, X-Appwrite-Response-Format, X-SDK-Version, X-SDK-Name, X-SDK-Language, X-SDK-Platform, X-Appwrite-ID, Content-Range, Range, Cache-Control, Expires, Pragma",
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE",
      "Access-Control-Allow-Origin",
      "https://localhost",
      "Access-Control-Expose-Headers",
      "X-Fallback-Cookies",
      "Content-Encoding",
      "gzip",
      "Content-Length",
      "194",
      "Content-Type",
      "application/json; charset=UTF-8",
      "Date",
      "Fri, 16 Sep 2022 11:11:02 GMT",
      "Server",
      "Appwrite",
      "X-Content-Type-Options",
      "nosniff",
      "X-Debug-Fallback",
      "true",
      "X-Debug-Speed",
      "0.0060338973999023",
      "Connection",
      "close",
    ],
  );
