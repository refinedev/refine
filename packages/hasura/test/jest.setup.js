const fetch = require("node-fetch");
const nock = require("nock");

// it's actually sending request to the server and print "mock" to console for you to copy and paste.
// nock.recorder.rec();

global.fetch = window.fetch = fetch;
global.Request = window.Request = fetch.Request;
global.Response = window.Response = fetch.Response;

afterAll(() => {
    nock.cleanAll();
    nock.restore();
});
