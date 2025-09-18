import nock from "nock";
import { afterAll, beforeEach, afterEach } from "vitest";

// nock.recorder.rec();

// Configure global fetch for Node.js environment if needed
if (typeof global !== "undefined" && !global.fetch) {
  global.fetch = require("node-fetch");
}

// Disable HTTP requests by default
nock.disableNetConnect();

beforeEach(() => {
  // Enable nock for each test
  if (!nock.isActive()) {
    nock.activate();
  }
});

afterEach(() => {
  // Clean up after each test
  nock.cleanAll();
});

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});
