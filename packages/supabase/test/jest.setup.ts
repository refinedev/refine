import nock from "nock";

// nock.recorder.rec();

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});
