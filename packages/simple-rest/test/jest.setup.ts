import nock from "nock";
import axios from "axios";

// nock.recorder.rec();

axios.defaults.adapter = "http";

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});
