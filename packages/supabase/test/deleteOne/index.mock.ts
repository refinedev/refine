import nock from "nock";

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .delete("/rest/v1/posts")
  .query({ id: "eq.40" })
  .reply(
    200,
    [
      {
        id: 40,
        title: "Delete me",
        slug: "delete-me",
        createdAt: "2021-09-06T12:23:27+00:00",
        content: "Will delete record",
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
      "Mon, 06 Sep 2021 12:26:18 GMT",
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
      "33",
      "X-Kong-Proxy-Latency",
      "0",
      "Via",
      "kong/2.2.1",
    ],
  );

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .delete("/rest/v1/products")
  .query({ id: "eq.27" })
  .reply(
    204,
    [{ id: 27, name: "foo" }],
    [
      "Date",
      "Tue, 23 Jan 2024 12:32:04 GMT",
      "Connection",
      "close",
      "Content-Range",
      "*/*",
      "CF-Ray",
      "84a00ea85e2fc1a8-BUD",
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
      "0",
      "X-Kong-Upstream-Latency",
      "5",
      "Vary",
      "Accept-Encoding",
      "Server",
      "cloudflare",
      "alt-svc",
      'h3=":443"; ma=86400',
    ],
  );

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .delete("/rest/v1/products")
  .query({ id: "eq.41" })
  .reply(
    406,
    {
      code: "PGRST106",
      details: null,
      hint: null,
      message: "The schema must be one of the following: public, storage",
    },
    [
      "Date",
      "Tue, 23 Jan 2024 12:33:44 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "CF-Ray",
      "84a0111d6c9303bf-BUD",
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
      "1",
      "Vary",
      "Accept-Encoding",
      "Server",
      "cloudflare",
      "alt-svc",
      'h3=":443"; ma=86400',
    ],
  );
