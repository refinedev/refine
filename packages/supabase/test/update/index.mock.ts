import nock from "nock";

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .patch("/rest/v1/posts", {
    title: "test",
    categoryId: 52,
    content: "test content",
  })
  .query({ id: "eq.1246", select: "*" })
  .reply(
    200,
    [
      {
        id: 1246,
        title: "test",
        slug: "255",
        createdAt: "2022-05-17T04:25:58.80596+00:00",
        content: "test content",
        categoryId: 52,
        images: [
          {
            uid: "rc-upload-1653445523640-23",
            name: "Screen Shot 2022-05-24 at 01.44.50.png",
            url: "https://iwdfzvfqbtokqetmbmbp.supabase.co/storage/v1/object/public/refine/public/Screen Shot 2022-05-24 at 01.44.50.png",
            type: "image/png",
            size: 1052925,
            percent: 100,
            status: "done",
          },
        ],
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
      "Mon, 06 Sep 2021 12:14:47 GMT",
      "Server",
      "postgrest/8.0.0",
      "Content-Profile",
      "public",
      "Content-Range",
      "0-0/*",
      "vary",
      "Origin",
      "Access-Control-Allow-Origin",
      "*",
      "X-Kong-Upstream-Latency",
      "37",
      "X-Kong-Proxy-Latency",
      "0",
      "Via",
      "kong/2.2.1",
    ],
  );

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .patch("/rest/v1/products", { name: "IPhone 16" })
  .query({ id: "eq.1", select: "%2A" })
  .reply(
    200,
    [
      "1f8b08000000000000038bae56ca4c51b232d451ca4bcc4d55b252f20cc8c8cf4b55303453aa8d0500428272751d000000",
    ],
    [
      "Date",
      "Tue, 23 Jan 2024 14:34:21 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "Content-Range",
      "0-0/*",
      "CF-Ray",
      "84a0c1cd9e09c1cb-BUD",
      "CF-Cache-Status",
      "DYNAMIC",
      "Access-Control-Allow-Origin",
      "*",
      "Content-Encoding",
      "gzip",
      "Strict-Transport-Security",
      "max-age=2592000; includeSubDomains",
      "Vary",
      "Accept-Encoding",
      "Via",
      "kong/2.8.1",
      "Content-Profile",
      "public",
      "sb-gateway-version",
      "1",
      "X-Kong-Proxy-Latency",
      "0",
      "X-Kong-Upstream-Latency",
      "6",
      "Server",
      "cloudflare",
      "alt-svc",
      'h3=":443"; ma=86400',
    ],
  );

nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .patch("/rest/v1/products", { name: "IPhone 16" })
  .query({ id: "eq.1" })
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
      "Tue, 23 Jan 2024 14:10:00 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Transfer-Encoding",
      "chunked",
      "Connection",
      "close",
      "CF-Ray",
      "84a09e22498e6846-BUD",
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
