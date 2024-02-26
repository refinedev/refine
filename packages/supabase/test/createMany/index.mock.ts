import nock from "nock";

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .post("/rest/v1/posts", [
    {
      title: "foo",
      slug: "foo-bar",
      content: "bar",
      categoryId: 2,
      image: {},
    },
    {
      title: "foo-2",
      slug: "foo-bar-2",
      content: "bar-2",
      categoryId: 1,
      image: {},
    },
  ])
  .matchHeader("Prefer", "return=representation")
  .query({
    columns:
      "%22title%22%2C%22slug%22%2C%22content%22%2C%22categoryId%22%2C%22image%22",
    select: "*",
  })
  .reply(
    201,
    [
      {
        id: 36,
        title: "foo",
        slug: "foo-bar",
        createdAt: "2021-09-06T11:06:50.489609+00:00",
        content: "bar",
        categoryId: 2,
        image: {},
      },
      {
        id: 37,
        title: "foo-2",
        slug: "foo-bar-2",
        createdAt: "2021-09-06T11:06:50.489609+00:00",
        content: "bar-2",
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
      "Mon, 06 Sep 2021 11:06:50 GMT",
      "Server",
      "postgrest/8.0.0",
      "Content-Range",
      "*/*",
      "Content-Profile",
      "public",
      "vary",
      "Origin",
      "Access-Control-Allow-Origin",
      "*",
      "X-Kong-Upstream-Latency",
      "27",
      "X-Kong-Proxy-Latency",
      "0",
      "Via",
      "kong/2.2.1",
    ],
  );

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .post("/rest/v1/products", [{ name: "foo" }, { name: "foo-2" }])
  .query({ columns: "%22name%22", select: "%2A" })
  .reply(
    201,
    [
      { id: 31, name: "foo" },
      { id: 32, name: "foo-2" },
    ],
    [
      "Date",
      "Tue, 23 Jan 2024 12:12:53 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "Content-Range",
      "*/*",
      "CF-Ray",
      "849ff2934b0868c1-BUD",
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
      "3",
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
  .post("/rest/v1/products", [])
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
      "Tue, 23 Jan 2024 12:12:54 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "CF-Ray",
      "849ff2957b6b68bb-BUD",
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
      "0",
      "Vary",
      "Accept-Encoding",
      "Server",
      "cloudflare",
      "alt-svc",
      'h3=":443"; ma=86400',
    ],
  );
