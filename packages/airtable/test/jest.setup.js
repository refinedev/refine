const fetch = require("node-fetch");
const nock = require("nock");

global.fetch = window.fetch = fetch;
global.Request = window.Request = fetch.Request;
global.Response = window.Response = fetch.Response;

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});
