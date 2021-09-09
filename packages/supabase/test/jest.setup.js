const fetch = require("node-fetch");

global.fetch = window.fetch = fetch;
global.Request = window.Request = fetch.Request;
global.Response = window.Response = fetch.Response;
