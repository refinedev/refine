import nock from "nock";

nock("https://api.fake-rest.refine.dev:443", { encodedQueryParams: true })
  .delete("/posts/1")
  .reply(200, {}, [
    "Server",
    "nginx/1.17.10",
    "Date",
    "Tue, 30 Mar 2021 12:23:06 GMT",
    "Content-Type",
    "application/json; charset=utf-8",
    "Content-Length",
    "2",
    "Connection",
    "close",
    "X-Powered-By",
    "Express",
    "Vary",
    "Origin, Accept-Encoding",
    "Access-Control-Allow-Credentials",
    "true",
    "Cache-Control",
    "no-cache",
    "Pragma",
    "no-cache",
    "Expires",
    "-1",
    "X-Content-Type-Options",
    "nosniff",
    "ETag",
    'W/"2-vyGp6PvFo4RvsFtPoIWeCReyIC8"',
  ]);

nock("https://api.fake-rest.refine.dev:443", {
  encodedQueryParams: true,
  reqheaders: { "x-custom": "1" },
})
  .delete("/posts/2", { reason: "spam" })
  .reply(200, { id: 2 });

nock("https://api.fake-rest.refine.dev:443", {
  encodedQueryParams: true,
  reqheaders: { "x-custom": "1" },
})
  .post("/posts/3", { reason: "spam" })
  .reply(200, { id: 3 });

nock("https://api.fake-rest.refine.dev:443", {
  encodedQueryParams: true,
  reqheaders: { "x-custom": "1" },
})
  .put("/posts/4", { reason: "spam" })
  .reply(200, { id: 4 });

nock("https://api.fake-rest.refine.dev:443", {
  encodedQueryParams: true,
  reqheaders: { "x-custom": "1" },
})
  .patch("/posts/5", { reason: "spam" })
  .reply(200, { id: 5 });
