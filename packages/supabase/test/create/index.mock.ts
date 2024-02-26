import nock from "nock";

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .post("/rest/v1/posts", {
    title: "foo",
    slug: "foo-bar",
    content: "bar",
    categoryId: 2,
    image: {},
  })
  .matchHeader("Prefer", "return=representation")
  .query({ select: "*" })
  .reply(
    201,
    [
      {
        id: 33,
        title: "foo",
        slug: "foo-bar",
        createdAt: "2021-09-06T09:50:17.716058+00:00",
        content: "bar",
        categoryId: 2,
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
      "Mon, 06 Sep 2021 09:50:17 GMT",
      "Server",
      "postgrest/8.0.0",
      "Location",
      "/posts?id=eq.33",
      "Content-Range",
      "*/*",
      "Content-Profile",
      "public",
      "vary",
      "Origin",
      "Access-Control-Allow-Origin",
      "*",
      "X-Kong-Upstream-Latency",
      "4",
      "X-Kong-Proxy-Latency",
      "1",
      "Via",
      "kong/2.2.1",
    ],
  );

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .post("/rest/v1/products", { name: "foo" })
  .query({ select: "%2A" })
  .reply(
    201,
    [{ id: 19, name: "foo" }],
    [
      "Date",
      "Tue, 23 Jan 2024 11:54:21 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "Content-Range",
      "*/*",
      "CF-Ray",
      "849fd76c0a25733a-BUD",
      "CF-Cache-Status",
      "DYNAMIC",
      "Access-Control-Allow-Origin",
      "*",
      "Strict-Transport-Security",
      "max-age=2592000; includeSubDomains",
      "Via",
      "kong/2.8.1",
      "Content-Profile",
      "public",
      "sb-gateway-version",
      "1",
      "X-Kong-Proxy-Latency",
      "1",
      "X-Kong-Upstream-Latency",
      "6",
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
  .post("/rest/v1/products", {})
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
      "Tue, 23 Jan 2024 12:06:17 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "CF-Ray",
      "849fe8e499a068bb-BUD",
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
      "1",
      "Vary",
      "Accept-Encoding",
      "Server",
      "cloudflare",
      "alt-svc",
      'h3=":443"; ma=86400',
    ],
  );
