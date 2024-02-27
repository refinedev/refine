import nock from "nock";

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .delete("/rest/v1/posts")
  .query({ id: "eq.43" })
  .reply(
    200,
    [
      {
        id: 43,
        title: "Hello World 2",
        slug: "hello-world-2",
        createdAt: "2021-09-06T13:36:34+00:00",
        content: "Hi, how are you?",
        categoryId: 1,
        image: {},
      },
    ],
    [
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "Date",
      "Mon, 06 Sep 2021 13:41:16 GMT",
      "Server",
      "postgrest/8.0.0",
      "Content-Profile",
      "public",
      "Content-Range",
      "*/*",
      "vary",
      "Origin",
      "Access-Control-Allow-Origin",
      "*",
      "X-Kong-Upstream-Latency",
      "23",
      "X-Kong-Proxy-Latency",
      "1",
      "Via",
      "kong/2.2.1",
    ],
  );

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .delete("/rest/v1/products")
  .query({ id: "eq.28" })
  .reply(
    204,
    [
      {
        id: 28,
      },
    ],
    [
      "Date",
      "Tue, 23 Jan 2024 12:18:48 GMT",
      "Connection",
      "close",
      "Content-Range",
      "*/*",
      "CF-Ray",
      "849ffb3eba53684d-BUD",
      "CF-Cache-Status",
      "DYNAMIC",
      "Access-Control-Allow-Origin",
      "*",
      "Strict-Transport-Security",
      "max-age=2592000; includeSubDomains",
      "Via",
      "kong/2.8.1",
      "sb-gateway-version",
      "1",
      "X-Kong-Proxy-Latency",
      "1",
      "X-Kong-Upstream-Latency",
      "3",
      "Vary",
      "Accept-Encoding",
      "Server",
      "cloudflare",
      "alt-svc",
      'h3=":443"; ma=86400',
    ],
  );
